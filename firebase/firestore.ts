import { getFirestore, collection, getDocs, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { app } from '@/firebase/firebase';

const db = getFirestore(app);

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
  const cartRef = doc(db, 'carts', userId)
  const cartDoc = await getDoc(cartRef)

  if (cartDoc.exists()) {
    const cart = cartDoc.data()
    cart.items = cart.items.filter((item: any) => item.magazineId !== magazineId)
    await updateDoc(cartRef, cart)
  }
}

export async function getCartItems(userId: string) {
  const cartRef = doc(db, 'carts', userId)
  const cartDoc = await getDoc(cartRef)
  
  if (!cartDoc.exists()) {
    return []
  }
  
  return cartDoc.data().items
}
