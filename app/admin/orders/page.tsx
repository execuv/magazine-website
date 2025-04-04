"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/authContext"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getOrderById, OrderDetails, updateOrderStatus, getAllOrders } from "@/firebase/firestore"
import { formatDistance } from "date-fns"

export default function AdminOrdersPage() {
  const { currentUser, userLoggedIn } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<OrderDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Redirect if not admin
    if (!userLoggedIn || currentUser?.email !== "admin@example.com") {
      router.push("/")
      return
    }

    const loadOrders = async () => {
      setLoading(true)
      try {
        const fetchedOrders = await getAllOrders()
        console.log("Fetched orders:", fetchedOrders) // Debug log
        setOrders(fetchedOrders)
      } catch (error) {
        console.error("Error loading orders:", error) // Debug log
        toast.error("Failed to load orders")
      } finally {
        setLoading(false)
      }
    }

    loadOrders()
  }, [userLoggedIn, currentUser, router])

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus as OrderDetails["status"])
      toast.success("Order status updated")
      
      // Refresh the order in the list
      const updatedOrder = await getOrderById(orderId)
      if (updatedOrder) {
        setOrders(orders.map(order => 
          order.id === orderId ? updatedOrder : order
        ))
      }
    } catch (error) {
      toast.error("Failed to update order status")
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "pending":
        return "default"
      case "processing":
        return "secondary"
      case "shipped":
        return "secondary"
      case "delivered":
        return "default"
      default:
        return "outline"
    }
  }

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesSearch = 
      order.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.shippingDetails?.email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-3">Loading orders...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Order Management</h1>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search by order ID or customer email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-mono">{order.id}</TableCell>
                <TableCell>
                  {order.orderDate?.toDate?.() 
                    ? formatDistance(order.orderDate.toDate(), new Date(), { addSuffix: true })
                    : 'N/A'
                  }
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p>{order.shippingDetails?.email}</p>
                    {order.hasPhysicalItems && (
                      <p className="text-muted-foreground">
                        {order.shippingDetails?.firstName} {order.shippingDetails?.lastName}
                      </p>
                    )}
                  </div>
                </TableCell>
                <TableCell>{order.items.length} items</TableCell>
                <TableCell>${(order.totalAmount / 100).toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(order.status)}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Select
                    value={order.status}
                    onValueChange={(value) => handleStatusUpdate(order.id!, value)}
                  >
                    <SelectTrigger className="w-[130px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
