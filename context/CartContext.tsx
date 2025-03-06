'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from '@/authContext'
import { addToCart, getCartItems, removeFromCart } from '@/app/utils/firestore'

interface CartItem {
  magazineId: string
  quantity: number
}

interface CartContextType {
  cartItems: CartItem[]
  addItem: (magazineId: string) => Promise<void>
  removeItem: (magazineId: string) => Promise<void>
  isLoading: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { currentUser } = useAuth()

  useEffect(() => {
    const loadCart = async () => {
      if (currentUser) {
        const items = await getCartItems(currentUser.uid)
        setCartItems(items)
      } else {
        setCartItems([])
      }
      setIsLoading(false)
    }
    loadCart()
  }, [currentUser])

  const addItem = async (magazineId: string) => {
    if (!currentUser) {
      throw new Error('Must be logged in to add items to cart')
    }
    await addToCart(currentUser.uid, magazineId)
    const updatedCart = await getCartItems(currentUser.uid)
    setCartItems(updatedCart)
  }

  const removeItem = async (magazineId: string) => {
    if (!currentUser) return
    await removeFromCart(currentUser.uid, magazineId)
    const updatedCart = await getCartItems(currentUser.uid)
    setCartItems(updatedCart)
  }

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem, isLoading }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
