import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/supabaseClient";
import {
  ArrowDown,
  ArrowUp,
  Bell,
  Calendar,
  ChevronRight,
  Clock,
  DollarSign,
  Download,
  FileText,
  Filter,
  MoreVertical,
  Package,
  PieChart,
  Plus,
  Settings,
  ShoppingBag,
  Star,
  Truck,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function BusinessHomePage() {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    const handleSignOut = async () => {
        await supabase.auth.signOut();
      };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500" />
            <span className="text-xl font-bold">FoodExpress Business</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-[10px] font-medium text-white">
                3
              </span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@owner" />
                    <AvatarFallback>BO</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Burger Palace</p>
                    <p className="text-xs leading-none text-muted-foreground">owner@burgerpalace.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Business Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                    Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <div className="grid flex-1 md:grid-cols-[240px_1fr]">
        <aside className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2 py-4">
            <div className="px-4 py-2">
              <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Dashboard</h2>
              <div className="space-y-1">
                <Link to="/overview">
                  <Button variant="secondary" className="w-full justify-start">
                    <PieChart className="mr-2 h-4 w-4" />
                    Overview
                  </Button>
                </Link>
                <Link to="/orders">
                  <Button variant="ghost" className="w-full justify-start">
                    <Package className="mr-2 h-4 w-4" />
                    Orders
                  </Button>
                </Link>
                <Link to="/menu-items">
                  <Button variant="ghost" className="w-full justify-start">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Menu Items
                  </Button>
                </Link>
                <Link to="/customers">
                  <Button variant="ghost" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Customers
                  </Button>
                </Link>
                <Link to="/finances">
                  <Button variant="ghost" className="w-full justify-start">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Finances
                  </Button>
                </Link>
              </div>
            </div>
            <div className="px-4 py-2">
              <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">Settings</h2>
              <div className="space-y-1">
                <Link to="/settings/general">
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    General
                  </Button>
                </Link>
                <Link to="/settings/business-hours">
                  <Button variant="ghost" className="w-full justify-start">
                    <Clock className="mr-2 h-4 w-4" />
                    Business Hours
                  </Button>
                </Link>
                <Link to="/settings/delivery">
                  <Button variant="ghost" className="w-full justify-start">
                    <Truck className="mr-2 h-4 w-4" />
                    Delivery Settings
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </aside>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="ml-auto flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Calendar className="h-4 w-4" />
                Today
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Total Orders",
                value: "156",
                change: "+12%",
                changeType: "positive",
                icon: Package,
              },
              {
                title: "Total Revenue",
                value: "$4,320.50",
                change: "+8%",
                changeType: "positive",
                icon: DollarSign,
              },
              {
                title: "Average Order Value",
                value: "$27.69",
                change: "+2%",
                changeType: "positive",
                icon: ShoppingBag,
              },
              {
                title: "Customer Rating",
                value: "4.8",
                change: "-0.1",
                changeType: "negative",
                icon: Star,
              },
            ].map((item, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{item.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className={item.changeType === "positive" ? "text-green-500" : "text-red-500"}>
                      {item.changeType === "positive" ? (
                        <ArrowUp className="mr-1 inline h-3 w-3" />
                      ) : (
                        <ArrowDown className="mr-1 inline h-3 w-3" />
                      )}
                      {item.change}
                    </span>{" "}
                    from last week
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>You have 12 orders that need attention</CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Filter className="h-3.5 w-3.5" />
                    Filter
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        Today
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Today</DropdownMenuItem>
                      <DropdownMenuItem>Yesterday</DropdownMenuItem>
                      <DropdownMenuItem>This Week</DropdownMenuItem>
                      <DropdownMenuItem>This Month</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-[1fr_100px_100px_80px] gap-4 text-sm font-medium text-muted-foreground">
                    <div>Order</div>
                    <div>Status</div>
                    <div>Total</div>
                    <div className="text-right">Actions</div>
                  </div>
                  <Separator />
                  {[
                    {
                      id: "ORD-5678",
                      customer: "Sarah Johnson",
                      items: ["Classic Cheeseburger (2)", "French Fries (1)"],
                      status: "New",
                      total: "$30.97",
                      time: "5 mins ago",
                    },
                    {
                      id: "ORD-5677",
                      customer: "Michael Brown",
                      items: ["Double Bacon Burger (1)", "Onion Rings (1)", "Soda (1)"],
                      status: "Preparing",
                      total: "$24.50",
                      time: "12 mins ago",
                    },
                    {
                      id: "ORD-5676",
                      customer: "Emily Davis",
                      items: ["Veggie Burger (1)", "Sweet Potato Fries (1)"],
                      status: "Ready",
                      total: "$18.99",
                      time: "20 mins ago",
                    },
                    {
                      id: "ORD-5675",
                      customer: "James Wilson",
                      items: ["Spicy Chicken Burger (1)", "Milkshake (1)"],
                      status: "Delivered",
                      total: "$22.49",
                      time: "35 mins ago",
                    },
                    {
                      id: "ORD-5674",
                      customer: "Olivia Martinez",
                      items: ["Classic Cheeseburger (1)", "Chicken Wings (1)", "Soda (2)"],
                      status: "Delivered",
                      total: "$29.99",
                      time: "45 mins ago",
                    },
                  ].map((order) => (
                    <div key={order.id} className="grid grid-cols-[1fr_100px_100px_80px] gap-4 text-sm">
                      <div>
                        <div className="font-medium">{order.id}</div>
                        <div className="text-muted-foreground">{order.customer}</div>
                        <div className="text-xs text-muted-foreground">{order.time}</div>
                      </div>
                      <div>
                        <Badge
                          variant="outline"
                          className={
                            order.status === "New"
                              ? "border-blue-500 text-blue-500"
                              : order.status === "Preparing"
                                ? "border-yellow-500 text-yellow-500"
                                : order.status === "Ready"
                                  ? "border-green-500 text-green-500"
                                  : "border-muted text-muted-foreground"
                          }
                        >
                          {order.status}
                        </Badge>
                      </div>
                      <div>{order.total}</div>
                      <div className="flex justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Order</DropdownMenuItem>
                            <DropdownMenuItem>Update Status</DropdownMenuItem>
                            <DropdownMenuItem>Contact Customer</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Orders
                </Button>
              </CardFooter>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Pending Tasks</CardTitle>
                <CardDescription>Tasks that require your attention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {[
                    {
                      title: "Update menu prices",
                      description: "Review and update prices for seasonal items",
                      priority: "High",
                    },
                    {
                      title: "Respond to customer reviews",
                      description: "5 new reviews need responses",
                      priority: "Medium",
                    },
                    {
                      title: "Restock inventory",
                      description: "Low stock on burger buns and chicken",
                      priority: "High",
                    },
                    {
                      title: "Staff schedule for next week",
                      description: "Finalize employee shifts by Friday",
                      priority: "Medium",
                    },
                    {
                      title: "Maintenance request",
                      description: "Schedule repair for kitchen equipment",
                      priority: "Low",
                    },
                  ].map((task, index) => (
                    <div key={index} className="flex items-start gap-4 rounded-lg border p-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{task.title}</h4>
                          <Badge
                            variant="outline"
                            className={
                              task.priority === "High"
                                ? "border-red-500 text-red-500"
                                : task.priority === "Medium"
                                  ? "border-yellow-500 text-yellow-500"
                                  : "border-green-500 text-green-500"
                            }
                          >
                            {task.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  Mark All Complete
                </Button>
                <Button
                  size="sm"
                  className="gap-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  <Plus className="h-4 w-4" />
                  Add Task
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Popular Items</CardTitle>
                <CardDescription>Your best-selling menu items this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Classic Cheeseburger",
                      orders: 87,
                      revenue: "$1,131.00",
                      image: "/placeholder.svg?height=50&width=50",
                    },
                    {
                      name: "Double Bacon Burger",
                      orders: 64,
                      revenue: "$1,023.36",
                      image: "/placeholder.svg?height=50&width=50",
                    },
                    {
                      name: "French Fries",
                      orders: 112,
                      revenue: "$558.88",
                      image: "/placeholder.svg?height=50&width=50",
                    },
                    {
                      name: "Chocolate Milkshake",
                      orders: 43,
                      revenue: "$257.57",
                      image: "/placeholder.svg?height=50&width=50",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">{item.orders} orders</div>
                      </div>
                      <div className="font-medium">{item.revenue}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Reviews</CardTitle>
                <CardDescription>Latest customer feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      customer: "John D.",
                      rating: 5,
                      comment:
                        "Best burger I've had in a while! The patty was juicy and the cheese was perfectly melted.",
                      time: "2 hours ago",
                    },
                    {
                      customer: "Sarah M.",
                      rating: 4,
                      comment: "Really good burger, but I wish they had more sauce options. Still, would order again!",
                      time: "Yesterday",
                    },
                    {
                      customer: "Mike R.",
                      rating: 5,
                      comment: "The brioche bun makes all the difference. Absolutely delicious!",
                      time: "2 days ago",
                    },
                  ].map((review, index) => (
                    <div key={index} className="space-y-2 rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{review.customer}</div>
                        <div className="text-xs text-muted-foreground">{review.time}</div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                      <Button variant="ghost" size="sm" className="mt-2">
                        Respond
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Inventory Alerts</CardTitle>
                <CardDescription>Items that need restocking soon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Burger Buns",
                      current: 24,
                      minimum: 50,
                      status: "Low",
                    },
                    {
                      name: "Chicken Breast",
                      current: 8,
                      minimum: 20,
                      status: "Critical",
                    },
                    {
                      name: "Cheddar Cheese",
                      current: 15,
                      minimum: 30,
                      status: "Low",
                    },
                    {
                      name: "Bacon",
                      current: 12,
                      minimum: 25,
                      status: "Low",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">{item.current} remaining</div>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          item.status === "Critical"
                            ? "border-red-500 text-red-500"
                            : "border-yellow-500 text-yellow-500"
                        }
                      >
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Inventory
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
