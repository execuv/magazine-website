import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function OrderConfirmationPage() {
  const orderNumber = "ORD-12345" // This would typically come from the order processing system

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
        <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
        <p className="text-xl mb-8">
          Your order number is: <span className="font-semibold">{orderNumber}</span>
        </p>
        <p className="text-muted-foreground mb-8">
          We've sent a confirmation email with order details and tracking information to your email address.
        </p>
        <div className="space-y-4">
          <Button asChild>
            <Link href="/user-dashboard">View Order Status</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

