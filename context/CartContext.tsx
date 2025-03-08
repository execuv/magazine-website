'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from '@/authContext'
import { addToCart, getCartItems, removeFromCart } from "@/firebase/firestore"

interface CartItem {
  magazineId: string
  quantity: number
  isPhysical: boolean
}

interface CartContextType {
  cartItems: CartItem[]
  addItem: (magazineId: string, isPhysical?: boolean) => Promise<void>
  removeItem: (magazineId: string) => Promise<void>
  isLoading: boolean
  refreshCart: () => Promise<void>
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

  const addItem = async (magazineId: string, isPhysical = false) => {
    if (!currentUser) {
      throw new Error("Must be logged in to add items to cart")
    }
    await addToCart(currentUser.uid, magazineId, isPhysical)
    refreshCart()
  }

  const removeItem = async (magazineId: string) => {
    if (!currentUser) return
    await removeFromCart(currentUser.uid, magazineId)
    refreshCart()
  }

  const refreshCart = async () => {
    if (!currentUser) return
    setIsLoading(true)
    try {
      const items = await getCartItems(currentUser.uid)
      setCartItems(items || [])
    } catch (error) {
      console.error("Error refreshing cart:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CartContext.Provider
      value={{ cartItems, addItem, removeItem, isLoading, refreshCart }}
    >
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
