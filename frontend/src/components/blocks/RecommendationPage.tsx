import { useState, useRef, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/supabaseClient";
import {
  ChevronRight,
  Filter,
  Heart,
  Plus,
  Star,
  Clock,
  MapPin,
  Flame,
  Award,
  ThumbsUp,
  Sparkles,
  ChevronLeft,
  ShoppingBag,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Credits } from "../../services/api";

export default function RecommendationPage() {
  const { isLoggedIn, loading } = useAuth();
  const [credits, setCredits] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getUserCredits = async () => {
      try {
        const { data: authData } = await supabase.auth.getUser();
        const user = authData?.user;
        if (user) {
          const data = await Credits.getUserCredits(user.id); // Assuming this returns a number
          setCredits(data.message.currentcredits);
        }
      } catch (error) {
        console.error("Error fetching credits:", error);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    getUserCredits();
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const handleSignOut = async () => await supabase.auth.signOut();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex min-h-screen flex-col">
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
            <h1 className="text-xl font-semibold">Recommended For You</h1>
          </div>
          <div className="flex items-center gap-4">
            <div>
              Credits: {credits !== null ? credits : "Loading..."}
            </div>
            <Link to="/cart">
              <Button className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Cart
              </Button>
            </Link>
            <div className="relative" ref={menuRef}>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={toggleMenu}
              >
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
        <div className="container py-6 px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Recommended For You</h1>
            <p className="mt-2 text-muted-foreground">
              Discover dishes tailored to your taste preferences and order history
            </p>
          </div>
          <div className="mb-8">
            <Tabs defaultValue="all">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                  <TabsTrigger value="top-rated">Top Rated</TabsTrigger>
                  <TabsTrigger value="new">New Arrivals</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                  <Select defaultValue="relevance">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="rating">Highest Rating</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                    <span className="sr-only">Filter</span>
                  </Button>
                </div>
              </div>
              <TabsContent value="all" className="mt-6">
                <div className="space-y-8">
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Flame className="h-5 w-5 text-orange-500" />
                        Based on Your Recent Orders
                      </h2>
                      <Button variant="link" className="gap-1 text-blue-500">
                        View All
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                      {[
                        {
                          name: "Double Bacon Burger",
                          restaurant: "Burger Palace",
                          price: 15.99,
                          rating: 4.8,
                          image: "/placeholder.svg?height=200&width=300",
                          reason: "You ordered similar items",
                        },
                        {
                          name: "Truffle Mushroom Burger",
                          restaurant: "Gourmet Burgers",
                          price: 18.99,
                          rating: 4.7,
                          image: "/placeholder.svg?height=200&width=300",
                          reason: "You might like this",
                        },
                        {
                          name: "Loaded Cheese Fries",
                          restaurant: "Burger Palace",
                          price: 8.99,
                          rating: 4.6,
                          image: "/placeholder.svg?height=200&width=300",
                          reason: "Frequently ordered together",
                        },
                        {
                          name: "BBQ Bacon Burger",
                          restaurant: "Smokehouse Grill",
                          price: 16.99,
                          rating: 4.9,
                          image: "/placeholder.svg?height=200&width=300",
                          reason: "Similar to your favorites",
                        },
                      ].map((item, index) => (
                        <Card key={index} className="overflow-hidden">
                          <CardHeader className="p-0">
                            <div className="relative">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                width="300"
                                height="200"
                                className="aspect-[3/2] w-full object-cover"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm"
                              >
                                <Heart className="h-4 w-4" />
                                <span className="sr-only">Add to favorites</span>
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="p-4">
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between">
                                <h3 className="font-semibold">{item.name}</h3>
                                <Badge variant="secondary" className="flex gap-1">
                                  <Star className="h-3 w-3 fill-primary text-primary" />
                                  {item.rating}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{item.restaurant}</p>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <ThumbsUp className="h-3 w-3" />
                                <span>{item.reason}</span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex items-center justify-between p-4 pt-0">
                            <div className="font-semibold">${item.price}</div>
                            <Button
                              size="sm"
                              className="gap-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                            >
                              <Plus className="h-4 w-4" />
                              Add to Cart
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Award className="h-5 w-5 text-yellow-500" />
                        Top Rated Near You
                      </h2>
                      <Button variant="link" className="gap-1 text-blue-500">
                        View All
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                      {[
                        {
                          name: "Signature Ramen Bowl",
                          restaurant: "Noodle House",
                          price: 16.99,
                          rating: 4.9,
                          image: "/placeholder.svg?height=200&width=300",
                          distance: "1.2 km",
                        },
                        {
                          name: "Margherita Pizza",
                          restaurant: "Authentic Pizzeria",
                          price: 14.99,
                          rating: 4.8,
                          image: "/placeholder.svg?height=200&width=300",
                          distance: "0.8 km",
                        },
                        {
                          name: "Butter Chicken",
                          restaurant: "Spice Garden",
                          price: 17.99,
                          rating: 4.9,
                          image: "/placeholder.svg?height=200&width=300",
                          distance: "1.5 km",
                        },
                        {
                          name: "Sushi Deluxe Platter",
                          restaurant: "Sushi World",
                          price: 24.99,
                          rating: 4.9,
                          image: "/placeholder.svg?height=200&width=300",
                          distance: "2.0 km",
                        },
                      ].map((item, index) => (
                        <Card key={index} className="overflow-hidden">
                          <CardHeader className="p-0">
                            <div className="relative">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                width="300"
                                height="200"
                                className="aspect-[3/2] w-full object-cover"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm"
                              >
                                <Heart className="h-4 w-4" />
                                <span className="sr-only">Add to favorites</span>
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="p-4">
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between">
                                <h3 className="font-semibold">{item.name}</h3>
                                <Badge variant="secondary" className="flex gap-1">
                                  <Star className="h-3 w-3 fill-primary text-primary" />
                                  {item.rating}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{item.restaurant}</p>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <MapPin className="h-3 w-3" />
                                <span>{item.distance}</span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex items-center justify-between p-4 pt-0">
                            <div className="font-semibold">${item.price}</div>
                            <Button
                              size="sm"
                              className="gap-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                            >
                              <Plus className="h-4 w-4" />
                              Add to Cart
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-purple-500" />
                        New Dishes to Try
                      </h2>
                      <Button variant="link" className="gap-1 text-blue-500">
                        View All
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                      {[
                        {
                          name: "Plant-Based Burger",
                          restaurant: "Green Eats",
                          price: 13.99,
                          rating: 4.7,
                          image: "/placeholder.svg?height=200&width=300",
                          time: "New this week",
                        },
                        {
                          name: "Korean Fried Chicken",
                          restaurant: "Seoul Food",
                          price: 15.99,
                          rating: 4.8,
                          image: "/placeholder.svg?height=200&width=300",
                          time: "New this week",
                        },
                        {
                          name: "Truffle Mac & Cheese",
                          restaurant: "Comfort Kitchen",
                          price: 12.99,
                          rating: 4.6,
                          image: "/placeholder.svg?height=200&width=300",
                          time: "New this month",
                        },
                        {
                          name: "Mediterranean Bowl",
                          restaurant: "Fresh & Healthy",
                          price: 14.99,
                          rating: 4.7,
                          image: "/placeholder.svg?height=200&width=300",
                          time: "New this month",
                        },
                      ].map((item, index) => (
                        <Card key={index} className="overflow-hidden">
                          <CardHeader className="p-0">
                            <div className="relative">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                width="300"
                                height="200"
                                className="aspect-[3/2] w-full object-cover"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm"
                              >
                                <Heart className="h-4 w-4" />
                                <span className="sr-only">Add to favorites</span>
                              </Button>
                              <Badge className="absolute left-2 top-2 bg-gradient-to-r from-blue-500 to-purple-500">
                                New
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="p-4">
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between">
                                <h3 className="font-semibold">{item.name}</h3>
                                <Badge variant="secondary" className="flex gap-1">
                                  <Star className="h-3 w-3 fill-primary text-primary" />
                                  {item.rating}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{item.restaurant}</p>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>{item.time}</span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex items-center justify-between p-4 pt-0">
                            <div className="font-semibold">${item.price}</div>
                            <Button
                              size="sm"
                              className="gap-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                            >
                              <Plus className="h-4 w-4" />
                              Add to Cart
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="trending" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{/* Trending items would go here */}</div>
              </TabsContent>
              <TabsContent value="top-rated" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{/* Top rated items would go here */}</div>
              </TabsContent>
              <TabsContent value="new" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{/* New items would go here */}</div>
              </TabsContent>
            </Tabs>
          </div>
          <div className="rounded-xl bg-gradient-to-r from-blue-600 via-blue-400 to-purple-500 p-6 text-white shadow-lg md:p-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Personalized Recommendations</h2>
                <p className="text-white/90">
                  We analyze your order history and preferences to suggest dishes you'll love.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-white/20 hover:bg-white/30">Burgers</Badge>
                  <Badge className="bg-white/20 hover:bg-white/30">Asian Fusion</Badge>
                  <Badge className="bg-white/20 hover:bg-white/30">Italian</Badge>
                  <Badge className="bg-white/20 hover:bg-white/30">Vegetarian</Badge>
                  <Badge className="bg-white/20 hover:bg-white/30">Desserts</Badge>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="link" className="text-white underline">
                        Update your preferences
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Customize your taste profile for better recommendations</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="hidden md:block">
                <img
                  src="/placeholder.svg?height=200&width=300"
                  width="300"
                  height="200"
                  alt="Personalized recommendations"
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
