"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Lock, Download, ShieldCheck, Truck, CreditCard } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { useAuth } from "@/authContext"
import { Magazine, getMagazineById } from "@/firebase/firestore"
import Link from "next/link"

interface CheckoutItemDetails extends Magazine {
  quantity: number
  isPhysical: boolean
}

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("credit_card")
  const [items, setItems] = useState<CheckoutItemDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [placingOrder, setPlacingOrder] = useState(false)
  const { cartItems, isLoading: isCartLoading } = useCart()
  const { userLoggedIn } = useAuth()

  // Determine if any physical items exist in the cart
  const hasPhysicalItems = items.some((item) => item.isPhysical)

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (!userLoggedIn) {
          setError("Please login to checkout")
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
            (item): item is CheckoutItemDetails => item !== null
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

  const calculateItemTotal = (item: CheckoutItemDetails) => {
    const deliveryPrice = item.deliveryPrice || Math.round(item.price * 0.1)
    return item.price + (item.isPhysical ? deliveryPrice : 0)
  }

  const subtotal = items.reduce(
    (sum, item) => sum + calculateItemTotal(item) * item.quantity,
    0
  )
  const tax = subtotal * 0.1
  const total = subtotal + tax

  const handlePlaceOrder = () => {
    setPlacingOrder(true)
    // Simulate payment processing
    setTimeout(() => {
      // In a real app, you would integrate with Razorpay or other payment gateway here
      setPlacingOrder(false)
      // Redirect to success page or show success message
    }, 2000)
  }

  if (!userLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Please Login</h1>
        <p className="mb-4">You need to be logged in to checkout</p>
        <Button asChild>
          <Link href="/auth/login">Login</Link>
        </Button>
      </div>
    )
  }

  if (loading || isCartLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        Loading checkout...
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

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="mb-4">Add some products to your cart before checkout</p>
        <Button asChild>
          <Link href="/magazines">Browse Magazines</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          {/* Only show shipping information if there are physical items */}
          {hasPhysicalItems && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Truck className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Shipping Information</h2>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main St" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="New York" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" placeholder="10001" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select>
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="in">India</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="bg-muted rounded-lg p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="max-h-80 overflow-auto mb-6 pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 mb-4 pb-4 border-b">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-24 object-cover rounded"
                  />
                  <div className="space-y-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <Badge
                      variant={item.isPhysical ? "outline" : "default"}
                      className="mt-1"
                    >
                      {item.isPhysical ? "Digital + Physical" : "Digital"}{" "}
                      Edition
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      ${(calculateItemTotal(item) / 100).toFixed(2)} ×{" "}
                      {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${(subtotal / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${(tax / 100).toFixed(2)}</span>
              </div>
              {hasPhysicalItems && (
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Shipping</span>
                  <span>Included</span>
                </div>
              )}
              <Separator className="my-2" />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${(total / 100).toFixed(2)}</span>
              </div>
            </div>

            {/* Display message for digital-only purchases */}
            {!hasPhysicalItems && (
              <div className="my-4 p-3 bg-blue-50 text-blue-700 rounded-lg flex gap-2 items-start">
                <Download className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Digital Purchase</p>
                  <p className="text-sm">
                    After payment, you'll get immediate access to download your
                    magazines in PDF format.
                  </p>
                </div>
              </div>
            )}

            {/* Display message for physical edition purchases */}
            {hasPhysicalItems && (
              <div className="my-4 p-3 bg-green-50 text-green-700 rounded-lg flex gap-2 items-start">
                <Truck className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Physical Delivery</p>
                  <p className="text-sm">
                    Your physical copies will be delivered to your address
                    within 3-5 business days. Digital versions will be available
                    for immediate download after payment.
                  </p>
                </div>
              </div>
            )}

            <Button
              className="w-full mt-6 gap-2"
              size="lg"
              onClick={handlePlaceOrder}
              disabled={placingOrder}
            >
              {placingOrder ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  Processing...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  Pay ${(total / 100).toFixed(2)}
                </>
              )}
            </Button>

            <div className="mt-3 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4" />
              <span>Secure payment with Razorpay</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

