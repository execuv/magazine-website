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
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Lock, Download, ShieldCheck, Truck, CreditCard } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { useAuth } from "@/authContext"
import {
  Magazine,
  getMagazineById,
  createOrder,
  OrderItem,
} from "@/firebase/firestore"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  initializeRazorpay,
  RazorpayOptions,
  RazorpayResponse,
} from "@/utils/razorpay"

interface CheckoutItemDetails extends Magazine {
  quantity: number
  isPhysical: boolean
}

interface CustomerInfo {
  firstName: string
  lastName: string
  email: string
  address: string
  city: string
  zipCode: string
  country: string
}

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("razorpay")
  const [items, setItems] = useState<CheckoutItemDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [placingOrder, setPlacingOrder] = useState(false)
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    country: "in",
  })

  const { cartItems, isLoading: isCartLoading } = useCart()
  const { userLoggedIn, currentUser } = useAuth()
  const router = useRouter()

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

        // Pre-fill email if user is logged in
        if (currentUser?.email) {
          setCustomerInfo((prev) => ({
            ...prev,
            email: currentUser.email || "",
          }))
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
  }, [cartItems, userLoggedIn, currentUser])

  const calculateItemTotal = (item: CheckoutItemDetails) => {
    const deliveryPrice = item.deliveryPrice || Math.round(item.price * 0.1)
    return item.price + (item.isPhysical ? deliveryPrice : 0)
  }

  const subtotal = items.reduce(
    (sum, item) => sum + calculateItemTotal(item) * item.quantity,
    0
  )
  // Remove tax calculation
  const total = subtotal // Just use subtotal as the total

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setCustomerInfo((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleCountryChange = (value: string) => {
    setCustomerInfo((prev) => ({
      ...prev,
      country: value,
    }))
  }

  const validateForm = (): boolean => {
    // For digital purchases, we only need email
    if (!hasPhysicalItems) {
      return !!customerInfo.email
    }

    // For physical purchases, validate all required fields
    const { firstName, lastName, email, address, city, zipCode, country } =
      customerInfo
    return !!(
      firstName &&
      lastName &&
      email &&
      address &&
      city &&
      zipCode &&
      country
    )
  }

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields")
      return
    }

    try {
      setPlacingOrder(true)

      // In a real app, you would call your backend to create an order
      // For this demo, we'll simulate creating an order
      const orderId = `order_${Math.random().toString(36).substring(2, 15)}`

      // Calculate amount in paise/cents (Razorpay expects amount in smallest currency unit)
      const amountInSmallestUnit = total * 100

      // Configure Razorpay options
      const options: RazorpayOptions = {
        key: "rzp_test_KbOQqEyOpRpz55", // Replace with your Razorpay key
        amount: amountInSmallestUnit, // Amount in smallest currency unit
        currency: "INR",
        name: "Magazine Store",
        description: `Purchase of ${items.length} magazines`,
        image: "/logo.png", // URL of your logo
        prefill: {
          name: hasPhysicalItems
            ? `${customerInfo.firstName} ${customerInfo.lastName}`
            : "",
          email: customerInfo.email,
        },
        theme: {
          color: "#661AE6", // Purple color to match your UI
        },
        handler: function (response: RazorpayResponse) {
          handlePaymentSuccess(response, orderId)
        },
        modal: {
          ondismiss: function () {
            setPlacingOrder(false)
            toast.error("Payment cancelled")
          },
        },
      }

      // Initialize Razorpay
      await initializeRazorpay(options)
    } catch (error) {
      console.error("Payment error:", error)
      toast.error("Payment failed. Please try again.")
      setPlacingOrder(false)
    }
  }

  const handlePaymentSuccess = async (
    response: RazorpayResponse,
    orderId: string
  ) => {
    setPlacingOrder(false)

    try {
      // Create order items from cart items
      const orderItems: OrderItem[] = items.map((item) => ({
        magazineId: item.id,
        quantity: item.quantity,
        isPhysical: item.isPhysical,
        price: calculateItemTotal(item),
        name: item.name,
        image: item.image,
      }))

      // Prepare shipping details
      const shippingDetails = hasPhysicalItems
        ? {
            firstName: customerInfo.firstName,
            lastName: customerInfo.lastName,
            email: customerInfo.email,
            address: customerInfo.address,
            city: customerInfo.city,
            zipCode: customerInfo.zipCode,
            country: customerInfo.country,
          }
        : {
            email: customerInfo.email,
            firstName: "",
            lastName: "",
            address: "",
            city: "",
            zipCode: "",
            country: "",
          }

      // Prepare order data
      const orderData = {
        userId: currentUser?.uid || "",
        items: orderItems,
        totalAmount: total,
        paymentId: response.razorpay_payment_id,
        status: "pending" as const,
        hasPhysicalItems: hasPhysicalItems,
        shippingDetails: shippingDetails,
      }

      // Save order to database
      const firestoreOrderId = await createOrder(orderData)

      toast.success("Payment successful! Your order has been placed.")

      // Redirect to success page with order details
      router.push(
        `/order-confirmation?orderId=${firestoreOrderId}&paymentId=${response.razorpay_payment_id}`
      )
    } catch (error) {
      console.error("Error saving order:", error)
      toast.error(
        "Payment processed but we couldn't save your order details. Please contact support."
      )
    }
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
          {/* Show different forms based on purchase type */}
          {hasPhysicalItems ? (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Truck className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Shipping Information</h2>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name*</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={customerInfo.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name*</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={customerInfo.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email*</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address*</Label>
                  <Input
                    id="address"
                    placeholder="123 Main St"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City*</Label>
                    <Input
                      id="city"
                      placeholder="New York"
                      value={customerInfo.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code*</Label>
                    <Input
                      id="zipCode"
                      placeholder="10001"
                      value={customerInfo.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country*</Label>
                  <Select
                    value={customerInfo.country}
                    onValueChange={handleCountryChange}
                  >
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
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Contact Information</h2>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address*</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Your digital magazines and receipt will be sent to this
                    email
                  </p>
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
              {/* Tax row removed */}
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

