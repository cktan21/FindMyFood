import { useState, useRef, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { supabase } from "@/supabaseClient";
import { useAuth } from "@/context/AuthContext";
import { LogOut, ShoppingBag, User, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoadingScreen from "@/components/blocks/LoadingScreen.tsx";
import { orderFood } from "../../services/api";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

// Define a type for the order structure
interface Order {
  order_id: string;
  restaurant: string;
  status: string;
  info: {
    items: Array<{
      qty: number;
      dish: string;
      price: number;
    }>;
  };
  total: number;
}

export default function ProfilePage() {
  const { isLoggedIn, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // State to hold the profile data
  const [profile, setProfile] = useState<{
    id: string;
    name: string;
    email: string;
  } | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // New state for orders
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Fetch profile from the "User" table on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Get the authenticated user first
        const { data: authData, error: authError } = await supabase.auth.getUser();

        if (authError) {
          console.error("Error fetching user:", authError);
          setLoadingProfile(false);
          return;
        }

        const user = authData?.user;

        if (!user) {
          setLoadingProfile(false);
          return;
        }

        // Query the "User" table for this user's profile.
        const { data: profileData, error: profileError } = await supabase
          .from("User")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();

        if (profileError) {
          console.error("Error fetching profile:", profileError);
        } else {
          setProfile(profileData);
        }
      } catch (error) {
        console.error("Unexpected error while fetching profile:", error);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, []);

  // Fetch orders when profile is available
  useEffect(() => {
    const fetchOrders = async () => {
      if (profile?.name) {
        try {
          const response = await orderFood.getOrdersByFilter(profile.name, '', '');
          if (response && response.data) {
            setOrders(response.data);
          } else {
            console.error("Invalid response from getOrdersByFilter:", response);
          }
        } catch (err) {
          console.error("Error fetching orders:", err);
        } finally {
          setLoadingOrders(false);
        }
      }
    };

    fetchOrders();
  }, [profile?.name]);

  // Handle clicks outside the menu to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loadingProfile || loading) {
    return <LoadingScreen />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/home"
                className="flex items-center gap-2 text-sm font-medium hover:text-blue-600 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                Continue Shopping
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold">Profile</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/cart">
                <Button className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Cart
                </Button>
              </Link>
              <div className="relative" ref={menuRef}>
                <Button variant="ghost" size="icon" className="rounded-full" onClick={toggleMenu}>
                  <User className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </Button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <Link to="/home">
                      <button className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left">
                        Home
                      </button>
                    </Link>
                    <Link to="/profile">
                      <button className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left">
                        Profile
                      </button>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        {/* Responsive layout: sidebar + main content on md+; only main content on mobile */}
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr] gap-8 py-8 px-4">
          {/* Sidebar with profile summary only (nav removed) */}
          <div className="hidden md:block">
            <div className="sticky top-20">
              <Card className="border-0 shadow-none">
                <CardHeader className="p-0 pb-6">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="text-center">
                      <h2 className="text-lg font-semibold">
                        {profile?.name || "No Name"}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {profile?.email || "No email"}
                      </p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
          {/* Main Content */}
          <div className="space-y-6">
            <Tabs defaultValue="personal" className="w-full">
              {/* Tablist (always visible) */}
              <div className="w-full overflow-x-auto">
                <TabsList className="flex space-x-2 min-w-max bg-white">
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
              </div>
              {/* Personal Info Tab */}
              <TabsContent value="personal" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      View and edit your personal details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Full Name</Label>
                      <div>{profile?.name || "No Name Provided"}</div>
                    </div>
                    <div>
                      <Label>Email</Label>
                      <div>{profile?.email || "No Email Provided"}</div>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit Personal Info
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              {/* Orders Tab */}
              <TabsContent value="orders" className="space-y-4">
                {loadingOrders ? (
                  <div>Loading orders...</div>
                ) : orders.length ? (
                  <div className="grid gap-4">
                    {orders.map((order: any) => (
                      <Card key={order.order_id}>
                        <CardHeader className="pb-4 flex items-center justify-between">
                          <div className="flex flex-col gap-1">
                            <CardTitle className="text-base">
                              {order.restaurant}
                            </CardTitle>
                            <CardDescription className="text-sm">
                              Order ID: {order.order_id}
                            </CardDescription>
                          </div>
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-700 hover:bg-green-100"
                          >
                            {order.status}
                          </Badge>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                          <ul className="list-disc ml-4">
                            {order.info.items.map((item: any, index: number) => (
                              <li key={index} className="text-sm">
                                {item.qty} x {item.dish.replace(/_/g, " ")} - ${item.price}
                              </li>
                            ))}
                          </ul>
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-medium">
                              Total: ${order.total}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div>No orders found.</div>
                )}
              </TabsContent>
              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>
                      Manage your notification preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Order Updates</Label>
                        <div className="text-sm text-muted-foreground">
                          Receive updates about your order status
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Special Offers</Label>
                        <div className="text-sm text-muted-foreground">
                          Get notified about special offers and discounts
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Newsletter</Label>
                        <div className="text-sm text-muted-foreground">
                          Receive our weekly newsletter
                        </div>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>
                      Update your account settings and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2">
                      <Label>Language</Label>
                      <select className="w-full rounded-md border p-2">
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                      </select>
                    </div>
                    <div className="grid gap-2">
                      <Label>Time Zone</Label>
                      <select className="w-full rounded-md border p-2">
                        <option>Eastern Time (ET)</option>
                        <option>Pacific Time (PT)</option>
                        <option>Central Time (CT)</option>
                      </select>
                    </div>
                    <Button variant="destructive" className="w-full sm:w-auto">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
