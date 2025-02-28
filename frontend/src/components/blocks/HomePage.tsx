import { useState, useRef, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/supabaseClient";
import axios from "axios";
import {
  Search,
  ShoppingBag,
  User,
  ChevronRight,
  Star,
  Clock,
  MapPin,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define a type for Restaurant objects
interface Restaurant {
  id: string;
  name: string;
  rating?: number;
  deliveryTime?: string;
  deliveryFee?: string;
  tags?: string[];
  photos?: string[];
  distance?: string;
  logo_url?: string[];
}

export default function HomePage() {
  const { isLoggedIn, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // State for featured restaurants with proper type
  const [featuredRestaurants, setFeaturedRestaurants] = useState<Restaurant[]>([]);
  const [restaurantsLoading, setRestaurantsLoading] = useState(true);
  // New state for tracking how many restaurants to display
  const [displayCount, setDisplayCount] = useState(8);

  // Fetch featured restaurants using axios
  useEffect(() => {
    async function fetchFeaturedRestaurants() {
      try {
        // Adjust the URL as needed (production URL or environment variable)
        const res = await axios.get("http://172.20.10.3:5001/all");
        const data = res.data;
        // Convert the returned object into an array of restaurants
        const restaurantsArray: Restaurant[] = Object.entries(data).map(
          ([id, restaurant]) => {
            // Remove the "id" property from the restaurant object if it exists
            const { id: _, ...restaurantData } = restaurant as Restaurant;
            return { id, ...restaurantData };
          }
        );
        console.log(restaurantsArray);
        setFeaturedRestaurants(restaurantsArray);
      } catch (error) {
        console.error("Error fetching featured restaurants:", error);
      } finally {
        setRestaurantsLoading(false);
      }
    }
    fetchFeaturedRestaurants();
  }, []);

  useEffect(() => {
    if (!isLoggedIn || loading) return;

    const checkAndInsertProfile = async () => {
      const { data: userData, error: authError } = await supabase.auth.getUser();
      if (authError) {
        console.error("Error fetching user:", authError);
        return;
      }
      const user = userData?.user;
      if (!user) {
        console.log("No user is logged in.");
        return;
      }
      const { data: profileData, error: profileError } = await supabase
        .from("User")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();
      if (profileError) {
        console.error("Error fetching profile:", profileError);
        return;
      }
      if (!profileData) {
        const { error: insertError } = await supabase.from("User").insert({
          id: user.id,
          email: user.email,
          name: user.user_metadata?.name,
        });
        if (insertError) {
          console.error("Error inserting profile:", insertError);
        } else {
          console.log("Profile created successfully");
        }
      } else {
        console.log("Profile already exists:", profileData);
      }
    };
    checkAndInsertProfile();
  }, [isLoggedIn, loading]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
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

  // Handler to load more restaurants
  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 8);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500" />
            <span className="text-xl font-bold">FindMyFood</span>
          </div>
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-center md:px-20">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for restaurants or dishes..."
                className="w-full rounded-full bg-muted pl-8 md:w-[300px] lg:w-[400px]"
              />
            </div>
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
      <main className="flex-1">
        {/* Other sections remain unchanged */}
        <section className="w-full py-6 md:py-12 lg:py-16 xl:py-20">
          <div className="container px-4 md:px-6">
            <div className="relative rounded-xl bg-gradient-to-r from-blue-600 via-blue-400 to-purple-500 p-6 text-white shadow-lg md:p-8 lg:p-10">
              <div className="grid gap-4 md:grid-cols-2 md:gap-8">
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Delicious Food All Around School Campus
                  </h1>
                  <p className="max-w-[600px] text-white/90 md:text-xl">
                    Order from your favorite restaurants and pickup your food by the time you reach.
                  </p>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Button
                      size="lg"
                      className="bg-white font-semibold text-blue-600 hover:bg-white/90 transition-colors"
                    >
                      Order Now
                    </Button>
                    <Button
                      size="lg"
                      className="bg-transparent border-2 border-white text-white font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                    >
                      View Restaurants
                    </Button>
                  </div>
                </div>
                <div className="hidden md:block">
                  <img
                    src="/TestImage.jpg"
                    width="400"
                    height="300"
                    alt="Food delivery"
                    className="rounded-lg object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Food Categories</h2>
              <Link
                to="#"
                className="flex items-center text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 hover:underline"
              >
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {[
                { name: "Pizza", icon: "🍕" },
                { name: "Burgers", icon: "🍔" },
                { name: "Sushi", icon: "🍣" },
                { name: "Pasta", icon: "🍝" },
                { name: "Desserts", icon: "🍰" },
                { name: "Healthy", icon: "🥗" },
              ].map((category) => (
                <Link
                  key={category.name}
                  to="#"
                  className="flex flex-col items-center justify-center rounded-lg border bg-card p-4 text-card-foreground shadow-sm transition-colors hover:bg-muted/50"
                >
                  <span className="text-3xl">{category.icon}</span>
                  <span className="mt-2 font-medium">{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="featured" className="w-full">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Restaurants Near You</h2>
                <TabsList>
                  <TabsTrigger value="featured">Featured</TabsTrigger>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                  <TabsTrigger value="new">New</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="featured" className="mt-6 space-y-8">
                {restaurantsLoading ? (
                  <div>Loading restaurants...</div>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {featuredRestaurants.slice(0, displayCount).map((restaurant) => (
                      <Card key={restaurant.id} className="overflow-hidden">
                        <div className="relative">
                          <img
                            src={restaurant.logo_url?.[0] || "/placeholder.svg"}
                            alt={restaurant.name}
                            width="300"
                            height="200"
                            className="aspect-video w-full object-cover"
                          />
                          <div className="absolute right-2 top-2">
                            <Badge className="bg-white text-black hover:bg-white/90">
                              <Star className="mr-1 h-3 w-3 fill-purple-500 text-purple-500" />
                              {restaurant.rating || "N/A"}
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <h3 className="font-bold">{restaurant.name}</h3>
                            <div className="flex flex-wrap gap-1">
                              {(restaurant.tags || []).map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <Clock className="mr-1 h-3 w-3" />
                                {restaurant.deliveryTime || "N/A"}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="mr-1 h-3 w-3" />
                                {restaurant.distance || "1.2 km"}
                              </div>
                              <div>{restaurant.deliveryFee || "$0.00"}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
                {/* Show Load More button only if there are more restaurants to load */}
                {displayCount < featuredRestaurants.length && (
                  <div className="flex justify-center">
                    <Button variant="outline" className="gap-1" onClick={handleLoadMore}>
                      Load More
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="popular" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {/* Populate popular restaurants similarly */}
                </div>
              </TabsContent>
              <TabsContent value="new" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {/* Populate new restaurants similarly */}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        <section className="w-full bg-muted/50 py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tight">Today's Special Offers</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "50% OFF First Order",
                  description: "Use code WELCOME50 at checkout",
                  image: "/placeholder.svg?height=150&width=300",
                  color: "from-blue-600 via-indigo-500 to-purple-500",
                },
                {
                  title: "Free Delivery",
                  description: "On orders above $15",
                  image: "/placeholder.svg?height=150&width=300",
                  color: "from-purple-600 via-purple-400 to-blue-500",
                },
                {
                  title: "20% OFF for Pickup",
                  description: "Save more when you pick up",
                  image: "/placeholder.svg?height=150&width=300",
                  color: "from-blue-500 via-indigo-500 to-purple-400",
                },
              ].map((offer, index) => (
                <div
                  key={index}
                  className={`relative overflow-hidden rounded-lg bg-gradient-to-r ${offer.color} p-6 text-white shadow-md`}
                >
                  <div className="relative z-10 space-y-2">
                    <h3 className="text-xl font-bold">{offer.title}</h3>
                    <p>{offer.description}</p>
                    <Button size="sm" className="bg-white text-black hover:bg-white/90">
                      Claim Offer
                    </Button>
                  </div>
                  <div className="absolute right-0 top-0 h-full w-1/3 opacity-20">
                    <img
                      src={offer.image || "/placeholder.svg"}
                      alt=""
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Easy Ordering",
                  description: "Browse through hundreds of restaurants and dishes",
                  icon: "🍽️",
                },
                {
                  title: "Live Queue Viewer",
                  description: "Know exactly when your order is ready",
                  icon: "📍",
                },
                {
                  title: "Secure Payment",
                  description: "Multiple online payment options for your convenience",
                  icon: "💳",
                },
              ].map((feature, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="mb-4 text-4xl">{feature.icon}</div>
                  <h3 className="mb-2 text-lg font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Other sections remain unchanged */}
      </main>
      <footer className="w-full border-t bg-background py-6">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-6 w-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500" />
                <span className="text-xl font-bold">FindMyFood</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Delicious food delivered to your door. Order from your favorite restaurants.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-medium">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Partner With Us
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-medium">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-medium">Follow Us</h3>
              <div className="flex space-x-4">
                <Link to="#" className="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link to="#" className="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link to="#" className="text-muted-foreground hover:text-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                  <span className="sr-only">Twitter</span>
                </Link>
              </div>
              <div className="mt-4">
                <h4 className="mb-2 text-sm font-medium">Subscribe to our newsletter</h4>
                <div className="flex gap-2">
                  <Input type="email" placeholder="Enter your email" className="max-w-[220px]" />
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  >
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} FoodExpress. All rights reserved.
          </div>
        </div>
        {/* Footer code remains unchanged */}
      </footer>
    </div>
  );
}
