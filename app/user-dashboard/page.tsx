import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, FileText, CreditCard, User } from "lucide-react"
import Link from "next/link"

interface Order {
  id: string
  date: string
  total: number
  status: string
}

interface Subscription {
  id: string
  name: string
  price: number
  renewalDate: string
}

export default function UserDashboardPage() {
  const orders: Order[] = [
    { id: "ORD-1234", date: "2025-06-01", total: 29.99, status: "Delivered" },
    { id: "ORD-5678", date: "2025-05-15", total: 49.99, status: "Processing" },
  ]

  const subscriptions: Subscription[] = [
    { id: "SUB-1", name: "Monthly Digital Pass", price: 9.99, renewalDate: "2025-07-01" },
    { id: "SUB-2", name: "Annual Premium Access", price: 99.99, renewalDate: "2026-01-01" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">User Dashboard</h1>
      <Tabs defaultValue="orders">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="orders">
            <Package className="mr-2 h-4 w-4" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="subscriptions">
            <FileText className="mr-2 h-4 w-4" />
            Subscriptions
          </TabsTrigger>
          <TabsTrigger value="billing">
            <CreditCard className="mr-2 h-4 w-4" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="account">
            <User className="mr-2 h-4 w-4" />
            Account
          </TabsTrigger>
        </TabsList>
        <TabsContent value="orders" className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-semibold">{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                </div>
                <div className="text-right">
                  <p>${order.total.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
          <Button className="mt-4" asChild>
            <Link href="/orders">View All Orders</Link>
          </Button>
        </TabsContent>
        <TabsContent value="subscriptions" className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Your Subscriptions</h2>
          <div className="space-y-4">
            {subscriptions.map((sub) => (
              <div key={sub.id} className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-semibold">{sub.name}</p>
                  <p className="text-sm text-muted-foreground">Renews on {sub.renewalDate}</p>
                </div>
                <div className="text-right">
                  <p>${sub.price.toFixed(2)}</p>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="billing" className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Billing Information</h2>
          <p>Your billing information and payment methods will be displayed here.</p>
        </TabsContent>
        <TabsContent value="account" className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
          <p>Your account settings and preferences will be displayed here.</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}

