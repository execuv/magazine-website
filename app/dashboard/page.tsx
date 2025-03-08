"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/authContext"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Package,
  Download,
  FileText,
  User,
  ShoppingBag,
  ChevronRight,
  Loader2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  getUserOrders,
  getUserDownloadableMagazines,
  OrderDetails,
  Magazine,
} from "@/firebase/firestore"
import { toast } from "sonner"

export default function DashboardPage() {
  const { currentUser, userLoggedIn, loading: authLoading } = useAuth()
  const [orders, setOrders] = useState<OrderDetails[]>([])
  const [magazines, setMagazines] = useState<Magazine[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("orders")
  const router = useRouter()

  useEffect(() => {
    // Redirect if not logged in (after auth is done loading)
    if (!authLoading && !userLoggedIn) {
      router.push("/auth/login")
      return
    }

    const fetchUserData = async () => {
      if (!userLoggedIn || !currentUser) return

      try {
        setLoading(true)
        // Fetch orders
        const userOrders = await getUserOrders(currentUser.uid)
        setOrders(userOrders)

        // Fetch downloadable magazines
        const userMagazines = await getUserDownloadableMagazines(
          currentUser.uid
        )
        setMagazines(userMagazines)
      } catch (error) {
        console.error("Error fetching user data:", error)
        toast.error("Failed to load your dashboard data")
      } finally {
        setLoading(false)
      }
    }

    if (userLoggedIn && currentUser) {
      fetchUserData()
    }
  }, [currentUser, userLoggedIn, authLoading, router])

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A"

    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleDateString()
    }

    return new Date(timestamp).toLocaleDateString()
  }

  const handleDownload = (magazine: Magazine) => {
    // In a real application, this would fetch the actual file from storage
    // For demo purposes, we'll just show a toast
    toast.success(`Download started for ${magazine.name}`)

    // In a real application, you would redirect to the download URL or trigger a file download
    // window.open(magazine.downloadUrl, '_blank')
  }

  if (authLoading || loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4 text-primary" />
        <h2 className="text-xl">Loading your dashboard...</h2>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Dashboard</h1>
        <Button variant="outline" asChild>
          <Link href="/magazines">Browse Magazines</Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="md:col-span-4">
          <Tabs
            defaultValue={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="orders" className="flex gap-2 items-center">
                <Package className="h-4 w-4" /> Orders
              </TabsTrigger>
              <TabsTrigger
                value="downloads"
                className="flex gap-2 items-center"
              >
                <Download className="h-4 w-4" /> Downloads
              </TabsTrigger>
              <TabsTrigger value="invoices" className="flex gap-2 items-center">
                <FileText className="h-4 w-4" /> Invoices
              </TabsTrigger>
              <TabsTrigger value="account" className="flex gap-2 items-center">
                <User className="h-4 w-4" /> Account
              </TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Your Orders</h2>
              </div>
              <Separator />

              {orders.length === 0 ? (
                <div className="text-center py-12 bg-muted/20 rounded-lg">
                  <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                  <p className="text-muted-foreground mb-6">
                    You haven't placed any orders yet.
                  </p>
                  <Button asChild>
                    <Link href="/magazines">Start Shopping</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border rounded-lg overflow-hidden"
                    >
                      <div className="bg-muted/20 p-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <p className="text-sm font-medium">
                            Order #{order.id}
                          </p>
                          <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground">
                            <span>{formatDate(order.orderDate)}</span>
                            <span>•</span>
                            <span>${(order.totalAmount / 100).toFixed(2)}</span>
                            <span>•</span>
                            <Badge variant="outline">
                              {order.status.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link
                            href={`/order-confirmation?orderId=${order.id}`}
                          >
                            View Details
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>

                      <div className="p-4">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                          {order.items.slice(0, 4).map((item, idx) => (
                            <div key={idx} className="flex gap-3">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-16 object-cover rounded"
                              />
                              <div>
                                <p className="font-medium text-sm line-clamp-1">
                                  {item.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {item.isPhysical
                                    ? "Physical + Digital"
                                    : "Digital"}
                                </p>
                                <div className="flex items-center gap-1 mt-1">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-7 px-2 text-xs"
                                    onClick={() =>
                                      handleDownload(
                                        magazines.find(
                                          (m) => m.id === item.magazineId
                                        )!
                                      )
                                    }
                                  >
                                    <Download className="h-3 w-3 mr-1" />{" "}
                                    Download
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}

                          {order.items.length > 4 && (
                            <div className="flex items-center justify-center">
                              <p className="text-sm text-muted-foreground">
                                +{order.items.length - 4} more items
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="downloads" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Your Magazines</h2>
              </div>
              <Separator />

              {magazines.length === 0 ? (
                <div className="text-center py-12 bg-muted/20 rounded-lg">
                  <Download className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    No magazines available
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    You don't have any magazines available for download yet.
                  </p>
                  <Button asChild>
                    <Link href="/magazines">Browse Magazines</Link>
                  </Button>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {magazines.map((magazine) => (
                    <div
                      key={magazine.id}
                      className="border rounded-lg overflow-hidden flex flex-col"
                    >
                      <div className="h-40 overflow-hidden">
                        <img
                          src={magazine.image}
                          alt={magazine.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 flex flex-col flex-grow">
                        <h3 className="font-semibold line-clamp-1 mb-1">
                          {magazine.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-2">
                          {magazine.brand} • {magazine.pageCount} pages
                        </p>
                        <div className="flex gap-2 mt-auto">
                          <Button
                            className="flex-1"
                            onClick={() => handleDownload(magazine)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                          <Button variant="outline" size="icon" asChild>
                            <Link href={`/magazines/${magazine.id}`}>
                              <ChevronRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="invoices" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Your Invoices</h2>
              </div>
              <Separator />

              <div className="text-center py-12 bg-muted/20 rounded-lg">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
                <p className="text-muted-foreground">
                  This feature is still in development.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="account" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Account Settings</h2>
              </div>
              <Separator />

              <div className="max-w-2xl mx-auto">
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Email Address</h3>
                      <p className="text-sm text-muted-foreground">
                        {currentUser?.email}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Change Email
                    </Button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Password</h3>
                      <p className="text-sm text-muted-foreground">
                        Last changed: Never
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Change Password
                    </Button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Delete Account</h3>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all associated data.
                      </p>
                    </div>
                    <Button variant="destructive" size="sm">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
