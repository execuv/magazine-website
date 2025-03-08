"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  CheckCircle2,
  Download,
  FileText,
  Home,
  Truck,
  AlertCircle,
  Loader2,
} from "lucide-react"
import { getOrderById, OrderDetails } from "@/firebase/firestore"
import { Badge } from "@/components/ui/badge"

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const paymentId = searchParams.get("paymentId")
  const [order, setOrder] = useState<OrderDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) {
        setError("Invalid order ID")
        setLoading(false)
        return
      }

      try {
        const orderData = await getOrderById(orderId)
        setOrder(orderData)
      } catch (err) {
        console.error("Failed to fetch order:", err)
        setError("Could not load order details")
      } finally {
        setLoading(false)
      }
    }

    fetchOrderDetails()
  }, [orderId])

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "Processing"

    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleDateString()
    }

    return new Date(timestamp).toLocaleDateString()
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4 text-primary" />
        <h2 className="text-xl">Loading order details...</h2>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="flex flex-col items-center gap-3 mb-6">
          <AlertCircle className="h-12 w-12 text-red-500" />
          <h1 className="text-2xl font-bold">Order Not Found</h1>
          <p className="text-muted-foreground mb-4">
            {error || "We couldn't find your order information."}
          </p>
        </div>
        <Button asChild>
          <Link href="/magazines">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-green-50 rounded-lg p-6 mb-8 flex items-center gap-3">
        <CheckCircle2 className="h-8 w-8 text-green-600" />
        <div>
          <h1 className="text-2xl font-bold text-green-700">
            Order Placed Successfully!
          </h1>
          <p className="text-green-600">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6 shadow-sm mb-8">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <span className="text-muted-foreground">
            Date: {formatDate(order.orderDate)}
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium">Order ID</span>
            <span className="font-mono">{order.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Payment ID</span>
            <span className="font-mono">{order.paymentId}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Status</span>
            <Badge variant="outline" className="uppercase font-medium">
              {order.status}
            </Badge>
          </div>
          {order.hasPhysicalItems && order.shippingDetails && (
            <div className="border-t pt-4 mt-4">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Truck className="h-4 w-4" /> Shipping Details
              </h3>
              <div className="text-sm text-muted-foreground">
                {order.shippingDetails.firstName}{" "}
                {order.shippingDetails.lastName}
                <br />
                {order.shippingDetails.address}
                <br />
                {order.shippingDetails.city}, {order.shippingDetails.zipCode}
                <br />
                {order.shippingDetails.country}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border rounded-lg overflow-hidden mb-8">
        <h3 className="text-lg font-medium p-4 border-b">Order Items</h3>
        <div className="divide-y">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex p-4 gap-4">
              <div className="w-16 h-24 flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="flex-grow">
                <p className="font-medium">{item.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    variant={item.isPhysical ? "outline" : "default"}
                    className="text-xs"
                  >
                    {item.isPhysical ? "Digital + Physical" : "Digital"}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Qty: {item.quantity}
                  </span>
                </div>
              </div>
              <div className="font-medium">
                ${(item.price / 100).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-muted/20 p-4 border-t">
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>${(order.totalAmount / 100).toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="text-center space-y-6">
        <div className="space-y-2">
          <p>
            Your purchase contains digital items that are now ready to download.
          </p>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Download Your Magazines
          </Button>
        </div>

        <div className="space-y-2">
          <p>A receipt has been sent to your email address.</p>
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            View Receipt
          </Button>
        </div>

        <div className="pt-4">
          <Button variant="outline" className="gap-2" asChild>
            <Link href="/">
              <Home className="h-4 w-4" />
              Return to Homepage
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
