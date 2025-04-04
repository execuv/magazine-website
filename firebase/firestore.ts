import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  addDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { app } from "@/firebase/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const db = getFirestore(app);

export interface Magazine {
  id: string;
  badge?: string;
  brand: string;
  category: string;
  description: string;
  image: string;
  language: string;
  name: string;
  pageCount: number;
  previewImage: string[];
  price: number;
  publicationDate: string;
  physicalDelivery: boolean;
  deliveryPrice?: number;
  pdfUrl: string; // Add this new field
}

export interface OrderItem {
  magazineId: string;
  quantity: number;
  isPhysical: boolean;
  price: number;
  name: string;
  image: string;
}

export interface OrderDetails {
  id?: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  paymentId: string;
  orderDate: any; // Firestore Timestamp
  shippingDetails?: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
  };
  status: "pending" | "processing" | "shipped" | "delivered" | "completed";
  hasPhysicalItems: boolean;
}

export async function getMagazines(): Promise<Magazine[]> {
  const magazinesCol = collection(db, "magazines");
  const magazineSnapshot = await getDocs(magazinesCol);
  return magazineSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Magazine[];
}

export async function getMagazineById(id: string): Promise<Magazine | null> {
  const docRef = doc(db, "magazines", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as Magazine;
  }
  return null;
}

export async function addToCart(
  userId: string,
  magazineId: string,
  isPhysical: boolean = false
) {
  const cartRef = doc(db, "carts", userId);
  const cartDoc = await getDoc(cartRef);

  if (!cartDoc.exists()) {
    await setDoc(cartRef, { items: [{ magazineId, quantity: 1, isPhysical }] });
  } else {
    const cart = cartDoc.data();
    // Look for the exact same item with the same format
    const existingItem = cart.items.find(
      (item: any) =>
        item.magazineId === magazineId && item.isPhysical === isPhysical
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ magazineId, quantity: 1, isPhysical });
    }

    await updateDoc(cartRef, cart);
  }
}

export async function removeFromCart(userId: string, magazineId: string) {
  const cartRef = doc(db, "carts", userId);
  const cartDoc = await getDoc(cartRef);

  if (cartDoc.exists()) {
    const cart = cartDoc.data();
    cart.items = cart.items.filter(
      (item: any) => item.magazineId !== magazineId
    );
    await updateDoc(cartRef, cart);
  }
}

export async function getCartItems(userId: string) {
  const cartRef = doc(db, "carts", userId);
  const cartDoc = await getDoc(cartRef);

  if (!cartDoc.exists()) {
    return [];
  }

  return cartDoc.data().items;
}

// Create a new order in the database
export async function createOrder(
  orderData: Omit<OrderDetails, "id">
): Promise<string> {
  try {
    // Add order to Firestore
    const ordersCol = collection(db, "orders");
    const orderRef = await addDoc(ordersCol, {
      ...orderData,
      orderDate: serverTimestamp(),
    });

    // Clear the user's cart after successful order
    const cartRef = doc(db, "carts", orderData.userId);
    await setDoc(cartRef, { items: [] });

    return orderRef.id;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

// Get a specific order by ID
export async function getOrderById(
  orderId: string
): Promise<OrderDetails | null> {
  try {
    const orderRef = doc(db, "orders", orderId);
    const orderSnap = await getDoc(orderRef);

    if (orderSnap.exists()) {
      return {
        id: orderSnap.id,
        ...orderSnap.data(),
      } as OrderDetails;
    }

    return null;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
}

// Get all orders for a specific user
export async function getUserOrders(userId: string): Promise<OrderDetails[]> {
  try {
    // Create a basic query without ordering first
    const ordersCol = collection(db, "orders");
    const basicQuery = query(ordersCol, where("userId", "==", userId));

    // Get the documents
    const orderSnapshot = await getDocs(basicQuery);

    // Convert to array and sort manually
    const orders = orderSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as OrderDetails[];

    // Sort by orderDate manually (descending)
    return orders.sort((a, b) => {
      // Convert Firebase timestamps to milliseconds if they exist
      const dateA = a.orderDate
        ? a.orderDate.toMillis
          ? a.orderDate.toMillis()
          : a.orderDate
        : 0;
      const dateB = b.orderDate
        ? b.orderDate.toMillis
          ? b.orderDate.toMillis()
          : b.orderDate
        : 0;

      // Sort in descending order (most recent first)
      return dateB - dateA;
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error;
  }
}

// Get all orders for admin
export async function getAllOrders(): Promise<OrderDetails[]> {
  try {
    const ordersCol = collection(db, "orders");
    const ordersQuery = query(
      ordersCol,
      orderBy("orderDate", "desc") // Add proper ordering
    );
    const orderSnapshot = await getDocs(ordersQuery);

    return orderSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as OrderDetails[];
  } catch (error) {
    console.error("Error fetching all orders:", error);
    throw error;
  }
}

// Update order status
export async function updateOrderStatus(
  orderId: string,
  newStatus: OrderDetails["status"]
) {
  try {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, {
      status: newStatus,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
}

// Get downloadable magazines for a user
export async function getUserDownloadableMagazines(
  userId: string
): Promise<Magazine[]> {
  try {
    // First, get all user's orders
    const orders = await getUserOrders(userId);

    // Extract unique magazine IDs from all orders
    const magazineIds = new Set<string>();
    orders.forEach((order) => {
      order.items.forEach((item) => {
        magazineIds.add(item.magazineId);
      });
    });

    // Fetch details for each magazine
    const magazines = await Promise.all(
      Array.from(magazineIds).map((id) => getMagazineById(id))
    );

    // Filter out any null values and return the magazines
    return magazines.filter((mag): mag is Magazine => mag !== null);
  } catch (error) {
    console.error("Error fetching user downloadable magazines:", error);
    throw error;
  }
}

export async function addMagazine(magazineData: Omit<Magazine, "id">) {
  try {
    const magazinesRef = collection(db, "magazines");
    const docRef = await addDoc(magazinesRef, {
      ...magazineData,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding magazine:", error);
    throw error;
  }
}

export async function deleteMagazine(magazineId: string) {
  try {
    const magazineRef = doc(db, "magazines", magazineId);
    await deleteDoc(magazineRef);
  } catch (error) {
    console.error("Error deleting magazine:", error);
    throw error;
  }
}

export async function updateMagazine(
  magazineId: string,
  magazineData: Partial<Magazine>
) {
  try {
    const magazineRef = doc(db, "magazines", magazineId);
    await updateDoc(magazineRef, {
      ...magazineData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating magazine:", error);
    throw error;
  }
}

export async function uploadImage(file: File, folder: string): Promise<string> {
  try {
    const storage = getStorage();
    const fileRef = ref(storage, `${folder}/${file.name}-${Date.now()}`);

    // Upload the file to Firebase Storage
    const snapshot = await uploadBytes(fileRef, file);

    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

export async function addArticle(articleData: {
  title: string;
  content: string;
  category: string;
  readingTime?: number;
  imageUrl?: string | undefined;
}) {
  try {
    const articlesRef = collection(db, "articles");
    const docRef = await addDoc(articlesRef, {
      ...articleData,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding article:", error);
    throw error;
  }
}

export async function getAllArticles() {
  try {
    const articlesRef = collection(db, "articles");
    const articlesSnapshot = await getDocs(articlesRef);

    return articlesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
}
