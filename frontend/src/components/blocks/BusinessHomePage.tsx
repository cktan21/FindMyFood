import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/supabaseClient";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export default function BusinessHomePage() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // State for filtering orders by status
  const [selectedFilter, setSelectedFilter] = useState("processing");

  // Sample orders data with statuses matching the filter options.
  const initialOrdersData = [
    {
      id: "ORD-1001",
      customer: "Alice Smith",
      status: "processing",
      total: "$45.00",
      time: "10 mins ago"
    },
    {
      id: "ORD-1002",
      customer: "Bob Johnson",
      status: "completed",
      total: "$30.00",
      time: "15 mins ago"
    },
    {
      id: "ORD-1003",
      customer: "Charlie Brown",
      status: "cancelled",
      total: "$25.00",
      time: "20 mins ago"
    },
    {
      id: "ORD-1004",
      customer: "Diana Prince",
      status: "processing",
      total: "$50.00",
      time: "5 mins ago"
    }
  ];

  // Use state for orders to allow status updates.
  const [orders, setOrders] = useState(initialOrdersData);

  // Sample queue data (this could come from your API in a real app)
  const queueData = [
    {
      id: "QUEUE-1",
      description: "Order ORD-1001 is waiting in the queue",
      time: "10 mins ago"
    },
    {
      id: "QUEUE-2",
      description: "Order ORD-1004 is waiting in the queue",
      time: "5 mins ago"
    }
  ];

  // Filter orders based on the selected status
  const filteredOrders = orders.filter(
    (order) => order.status === selectedFilter
  );

  // Function to update the order's status
  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">FoodExpress Business</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => supabase.auth.signOut()}>
              Log out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content: Only Orders & Queues Sections */}
      <main className="flex flex-1 flex-col gap-4 p-4 md:p-8">
        <div className="grid gap-4 md:grid-cols-2">
          {/* Orders Section */}
          <Card>
            <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <CardTitle>Orders</CardTitle>
              <div className="flex gap-2">
                {["processing", "cancelled", "completed"].map((filter) => (
                  <Button
                    key={filter}
                    variant={selectedFilter === filter ? "default" : "outline"}
                    onClick={() => setSelectedFilter(filter)}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              {filteredOrders.length ? (
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className="grid grid-cols-[1fr_100px_100px_80px] gap-4 text-sm"
                    >
                      <div>
                        <div className="font-medium">{order.id}</div>
                        <div className="text-muted-foreground">
                          {order.customer}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {order.time}
                        </div>
                      </div>
                      <div>
                        <Badge
                          variant="outline"
                          className={
                            order.status === "processing"
                              ? "border-blue-500 text-blue-500"
                              : order.status === "completed"
                              ? "border-green-500 text-green-500"
                              : "border-red-500 text-red-500"
                          }
                        >
                          {order.status}
                        </Badge>
                      </div>
                      <div>{order.total}</div>
                      <div className="flex justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {/* Provide options to update the status */}
                            <DropdownMenuItem
                              onClick={() =>
                                updateOrderStatus(order.id, "processing")
                              }
                            >
                              Processing
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                updateOrderStatus(order.id, "cancelled")
                              }
                            >
                              Cancelled
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                updateOrderStatus(order.id, "completed")
                              }
                            >
                              Completed
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No orders with status &quot;{selectedFilter}&quot;
                </p>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Orders
              </Button>
            </CardFooter>
          </Card>

          {/* Queues Section */}
          <Card>
            <CardHeader>
              <CardTitle>Queues</CardTitle>
              <CardDescription>Current order queues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {queueData.map((queue) => (
                  <div key={queue.id} className="rounded border p-4 text-sm">
                    <div className="font-medium">{queue.description}</div>
                    <div className="text-xs text-muted-foreground">
                      {queue.time}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Queues
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
