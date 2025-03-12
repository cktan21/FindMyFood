import { useState, useRef, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { supabase } from "@/supabaseClient";
import { useAuth } from "@/context/AuthContext";
import { CreditCard, Home, MapPin, Package, LogOut, ShoppingBag, User, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import LoadingScreen from "@/components/blocks/LoadingScreen.tsx";

export default function ProfilePage() {
    const { isLoggedIn, loading } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
  // State to hold the profile data
  const [profile, setProfile] = useState<{
    id: string;
    name: string;
    email: string;
    // add other fields as needed (e.g. phone)
  } | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // Fetch profile from the "User" table on mount
  useEffect(() => {
    const fetchProfile = async () => {
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
      setLoadingProfile(false);
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loadingProfile) {
    return <LoadingScreen />;
  }

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
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
                    {/* Profile image could be added here */}
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
                  <TabsTrigger value="addresses">Addresses</TabsTrigger>
                  <TabsTrigger value="payments">Payments</TabsTrigger>
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
                    {/* Uncomment or add additional fields as needed */}
                    {/* <div>
                      <Label>Phone Number</Label>
                      <div>{profile?.phone || "No Phone Provided"}</div>
                    </div> */}
                    <Button variant="outline" size="sm">
                      Edit Personal Info
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              {/* Orders Tab */}
              <TabsContent value="orders" className="space-y-4">
                <div className="grid gap-4">
                  {[
                    {
                      id: "ORD-123456",
                      restaurant: "Burger Palace",
                      date: "Today, 2:30 PM",
                      status: "Delivered",
                      total: "$24.99",
                      items: ["Cheese Burger", "Fries", "Coke"],
                    },
                    {
                      id: "ORD-123455",
                      restaurant: "Pizza Heaven",
                      date: "Yesterday, 7:30 PM",
                      status: "Delivered",
                      total: "$35.50",
                      items: ["Pepperoni Pizza", "Garlic Bread"],
                    },
                    {
                      id: "ORD-123454",
                      restaurant: "Sushi World",
                      date: "2 days ago",
                      status: "Delivered",
                      total: "$42.80",
                      items: ["California Roll", "Miso Soup", "Green Tea"],
                    },
                  ].map((order) => (
                    <Card key={order.id}>
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-base">
                              {order.restaurant}
                            </CardTitle>
                            <CardDescription>{order.date}</CardDescription>
                          </div>
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-700 hover:bg-green-100"
                          >
                            {order.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                          <div className="text-sm font-medium">
                            Order #{order.id}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {order.items.join(", ")}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">
                            Total: {order.total}
                          </div>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Package className="h-4 w-4" />
                            Track Order
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              {/* Addresses Tab */}
              <TabsContent value="addresses" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    {
                      type: "Home",
                      address: "123 Main St, Apt 4B",
                      city: "New York, NY 10001",
                      isDefault: true,
                    },
                    {
                      type: "Work",
                      address: "456 Office Ave",
                      city: "New York, NY 10002",
                      isDefault: false,
                    },
                  ].map((address, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <Home className="h-4 w-4" />
                            <CardTitle className="text-base">
                              {address.type}
                            </CardTitle>
                          </div>
                          {address.isDefault && (
                            <Badge variant="secondary">Default</Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="grid gap-2">
                        <div className="text-sm">{address.address}</div>
                        <div className="text-sm text-muted-foreground">
                          {address.city}
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Card className="flex flex-col items-center justify-center p-6">
                    <Button
                      variant="outline"
                      className="h-auto flex flex-col gap-2 p-6"
                    >
                      <MapPin className="h-6 w-6" />
                      <span>Add New Address</span>
                    </Button>
                  </Card>
                </div>
              </TabsContent>
              {/* Payments Tab */}
              <TabsContent value="payments" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    {
                      type: "Visa",
                      number: "**** **** **** 1234",
                      expiry: "12/24",
                      isDefault: true,
                    },
                    {
                      type: "Mastercard",
                      number: "**** **** **** 5678",
                      expiry: "06/25",
                      isDefault: false,
                    },
                  ].map((card, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            <CardTitle className="text-base">
                              {card.type}
                            </CardTitle>
                          </div>
                          {card.isDefault && (
                            <Badge variant="secondary">Default</Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="grid gap-2">
                        <div className="text-sm font-medium">
                          {card.number}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Expires {card.expiry}
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Card className="flex flex-col items-center justify-center p-6">
                    <Button
                      variant="outline"
                      className="h-auto flex flex-col gap-2 p-6"
                    >
                      <CreditCard className="h-6 w-6" />
                      <span>Add New Card</span>
                    </Button>
                  </Card>
                </div>
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
