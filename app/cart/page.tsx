"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Pen, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/context/CartContext"
import { useAuth } from "@/authContext"
import {
  Magazine,
  getMagazineById,
  updateCartItemFormat,
} from "@/firebase/firestore"
import { toast } from "sonner"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface CartItemWithDetails extends Magazine {
  quantity: number
  isPhysical: boolean
}

export default function CartPage() {
  const {
    cartItems,
    removeItem,
    isLoading: isCartLoading,
    refreshCart,
  } = useCart()
  const { userLoggedIn, user } = useAuth()
  const [items, setItems] = useState<CartItemWithDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updatingFormat, setUpdatingFormat] = useState<string | null>(null)

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (!userLoggedIn) {
          setError("Please login to view your cart")
          setLoading(false)
          return
        }

        const itemsWithDetails = await Promise.all(
          cartItems.map(async (item) => {
            const magazine = await getMagazineById(item.magazineId)
            if (!magazine) return null
            return {
              ...magazine,
              quantity: item.quantity,
              isPhysical: item.isPhysical || false,
            }
          })
        )

        setItems(
          itemsWithDetails.filter(
            (item): item is CartItemWithDetails => item !== null
          )
        )
      } catch (err) {
        setError("Failed to fetch cart items")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCartItems()
  }, [cartItems, userLoggedIn])

  const handleRemoveItem = async (magazineId: string) => {
    try {
      await removeItem(magazineId)
      toast.success("Item removed from cart")
    } catch (error) {
      toast.error("Failed to remove item")
    }
  }

  const handleFormatToggle = async (
    magazineId: string,
    isCurrentlyPhysical: boolean
  ) => {
    if (!user?.uid) return

    try {
      setUpdatingFormat(magazineId)
      await updateCartItemFormat(user.uid, magazineId, !isCurrentlyPhysical)
      await refreshCart()
      toast.success(
        `Changed to ${!isCurrentlyPhysical ? "physical" : "digital"} format`
      )
    } catch (error) {
      toast.error("Failed to update format")
    } finally {
      setUpdatingFormat(null)
    }
  }

  // Calculate delivery cost for each item - assuming a default 10% of magazine price if not specified
  const calculateItemTotal = (item: CartItemWithDetails) => {
    const deliveryPrice = item.deliveryPrice || Math.round(item.price * 0.1)
    return item.price + (item.isPhysical ? deliveryPrice : 0)
  }

  if (!userLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Please Login</h1>
        <p className="mb-4">You need to be logged in to view your cart</p>
        <Button asChild>
          <Link href="/auth/login">Login</Link>
        </Button>
      </div>
    )
  }

  if (loading || isCartLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        Loading cart...
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        {error}
      </div>
    )
  }

  const subtotal = items.reduce(
    (sum, item) => sum + calculateItemTotal(item) * item.quantity,
    0
  )
  const tax = subtotal * 0.1
  const total = subtotal + tax

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-xl mb-4">Your cart is empty</p>
          <Button asChild>
            <Link href="/magazines">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            {items.map((item) => {
              const itemTotal = calculateItemTotal(item)
              const deliveryPrice =
                item.deliveryPrice || Math.round(item.price * 0.1)
              return (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 border rounded-lg p-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-36 object-cover rounded"
                  />
                  <div className="flex-grow space-y-2">
                    <h3 className="font-semibold">{item.name}</h3>
                    <div className="flex items-center gap-2">
                      <div>
                        {item.isPhysical ? "Physical" : "Digital"} Edition
                      </div>
                      <p className="text-muted-foreground">
                        ${(itemTotal / 100).toFixed(2)}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>

                    {/* Format toggle */}
                    {item.physicalDelivery && (
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="flex items-center space-x-2">
                          <Label
                            htmlFor={`format-${item.id}`}
                            className="text-sm"
                          >
                            Digital
                          </Label>
                          <Switch
                            id={`format-${item.id}`}
                            checked={item.isPhysical}
                            disabled={
                              updatingFormat === item.id ||
                              !item.physicalDelivery
                            }
                            onCheckedChange={() =>
                              handleFormatToggle(item.id, item.isPhysical)
                            }
                          />
                          <Label
                            htmlFor={`format-${item.id}`}
                            className="text-sm"
                          >
                            Physical
                          </Label>
                        </div>
                        {updatingFormat === item.id && (
                          <span className="w-4 h-4 animate-spin rounded-full border-2 border-primary border-t-transparent ml-2"></span>
                        )}
                      </div>
                    )}

                    {item.isPhysical && (
                      <p className="text-xs text-muted-foreground">
                        Includes ${(deliveryPrice / 100).toFixed(2)} shipping
                        and handling
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              )
            })}
          </div>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${(subtotal / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${(tax / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${(total / 100).toFixed(2)}</span>
                </div>
              </div>
            </div>
            <Button className="w-full" size="lg" asChild>
              <Link href="/checkout">
                Proceed to Checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/magazines">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

