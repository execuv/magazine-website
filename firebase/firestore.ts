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
} from "firebase/firestore"
import { app } from "@/firebase/firebase"

const db = getFirestore(app)

export interface Magazine {
  id: string
  badge?: string
  brand: string
  category: string
  description: string
  image: string
  language: string
  name: string
  pageCount: number
  previewImage: string[]
  price: number
  publicationDate: string
  physicalDelivery: boolean
  deliveryPrice?: number
}

export interface OrderItem {
  magazineId: string
  quantity: number
  isPhysical: boolean
  price: number
  name: string
  image: string
}

export interface OrderDetails {
  id?: string
  userId: string
  items: OrderItem[]
  totalAmount: number
  paymentId: string
  orderDate: any // Firestore Timestamp
  shippingDetails?: {
    firstName: string
    lastName: string
    email: string
    address: string
    city: string
    zipCode: string
    country: string
  }
  status: "pending" | "processing" | "shipped" | "delivered" | "completed"
  hasPhysicalItems: boolean
}

export async function getMagazines(): Promise<Magazine[]> {
  const magazinesCol = collection(db, "magazines")
  const magazineSnapshot = await getDocs(magazinesCol)
  return magazineSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Magazine[]
}

export async function getMagazineById(id: string): Promise<Magazine | null> {
  const docRef = doc(db, "magazines", id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as Magazine
  }
  return null
}

export async function addToCart(
  userId: string,
  magazineId: string,
  isPhysical: boolean = false
) {
  const cartRef = doc(db, "carts", userId)
  const cartDoc = await getDoc(cartRef)

  if (!cartDoc.exists()) {
    await setDoc(cartRef, { items: [{ magazineId, quantity: 1, isPhysical }] })
  } else {
    const cart = cartDoc.data()
    // Look for the exact same item with the same format
    const existingItem = cart.items.find(
      (item: any) =>
        item.magazineId === magazineId && item.isPhysical === isPhysical
    )

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.items.push({ magazineId, quantity: 1, isPhysical })
    }

    await updateDoc(cartRef, cart)
  }
}

export async function removeFromCart(userId: string, magazineId: string) {
  const cartRef = doc(db, "carts", userId)
  const cartDoc = await getDoc(cartRef)

  if (cartDoc.exists()) {
    const cart = cartDoc.data()
    cart.items = cart.items.filter(
      (item: any) => item.magazineId !== magazineId
    )
    await updateDoc(cartRef, cart)
  }
}

export async function getCartItems(userId: string) {
  const cartRef = doc(db, "carts", userId)
  const cartDoc = await getDoc(cartRef)

  if (!cartDoc.exists()) {
    return []
  }

  return cartDoc.data().items
}

// Create a new order in the database
export async function createOrder(
  orderData: Omit<OrderDetails, "id">
): Promise<string> {
  try {
    // Add order to Firestore
    const ordersCol = collection(db, "orders")
    const orderRef = await addDoc(ordersCol, {
      ...orderData,
      orderDate: serverTimestamp(),
    })

    // Clear the user's cart after successful order
    const cartRef = doc(db, "carts", orderData.userId)
    await setDoc(cartRef, { items: [] })

    return orderRef.id
  } catch (error) {
    console.error("Error creating order:", error)
    throw error
  }
}

// Get a specific order by ID
export async function getOrderById(
  orderId: string
): Promise<OrderDetails | null> {
  try {
    const orderRef = doc(db, "orders", orderId)
    const orderSnap = await getDoc(orderRef)

    if (orderSnap.exists()) {
      return {
        id: orderSnap.id,
        ...orderSnap.data(),
      } as OrderDetails
    }

    return null
  } catch (error) {
    console.error("Error fetching order:", error)
    throw error
  }
}

// Get all orders for a specific user
export async function getUserOrders(userId: string): Promise<OrderDetails[]> {
  try {
    // Create a basic query without ordering first
    const ordersCol = collection(db, "orders")
    const basicQuery = query(ordersCol, where("userId", "==", userId))

    // Get the documents
    const orderSnapshot = await getDocs(basicQuery)

    // Convert to array and sort manually
    const orders = orderSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as OrderDetails[]

    // Sort by orderDate manually (descending)
    return orders.sort((a, b) => {
      // Convert Firebase timestamps to milliseconds if they exist
      const dateA = a.orderDate
        ? a.orderDate.toMillis
          ? a.orderDate.toMillis()
          : a.orderDate
        : 0
      const dateB = b.orderDate
        ? b.orderDate.toMillis
          ? b.orderDate.toMillis()
          : b.orderDate
        : 0

      // Sort in descending order (most recent first)
      return dateB - dateA
    })
  } catch (error) {
    console.error("Error fetching user orders:", error)
    throw error
  }
}

// Get downloadable magazines for a user
export async function getUserDownloadableMagazines(
  userId: string
): Promise<Magazine[]> {
  try {
    // First, get all user's orders
    const orders = await getUserOrders(userId)

    // Extract unique magazine IDs from all orders
    const magazineIds = new Set<string>()
    orders.forEach((order) => {
      order.items.forEach((item) => {
        magazineIds.add(item.magazineId)
      })
    })

    // Fetch details for each magazine
    const magazines = await Promise.all(
      Array.from(magazineIds).map((id) => getMagazineById(id))
    )

    // Filter out any null values and return the magazines
    return magazines.filter((mag): mag is Magazine => mag !== null)
  } catch (error) {
    console.error("Error fetching user downloadable magazines:", error)
    throw error
  }
}
