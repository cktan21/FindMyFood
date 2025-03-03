import { useState, useRef, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/supabaseClient";
import { ChevronLeft, Minus, Plus, Star, Clock, User, ShoppingBag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function ProductPage() {
    const { isLoggedIn, loading } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

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
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/restaurants"
              className="flex items-center gap-2 text-sm font-medium hover:text-blue-600 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              View Restaurants
            </Link>
          </div>
          <div className="flex items-center gap-4">
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
        <div className="container grid gap-8 py-8 md:grid-cols-2 px-4">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-lg border">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Classic Cheeseburger"
                width="600"
                height="400"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <button
                  key={i}
                  className="overflow-hidden rounded-lg border hover:border-blue-500 transition-colors"
                >
                  <img
                    src="/placeholder.svg?height=100&width=100"
                    alt={`Burger image ${i + 1}`}
                    width="100"
                    height="100"
                    className="aspect-square w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Classic Cheeseburger</h1>
              <div className="mt-2 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <span className="font-medium">4.8</span>
                  <span className="text-muted-foreground">(2.5k reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>15-20 mins</span>
                </div>
              </div>
              <p className="mt-4 text-muted-foreground">
                Our signature burger with a juicy beef patty, melted cheese, fresh lettuce, tomatoes,
                and our special sauce, all served on a toasted brioche bun.
              </p>
            </div>
            <Separator />
            <div className="space-y-4">
              <h3 className="font-medium">Choose your size</h3>
              <RadioGroup defaultValue="regular" className="grid gap-2">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="regular" id="regular" />
                    <Label htmlFor="regular">Regular</Label>
                  </div>
                  <span className="font-medium">$12.99</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="large" id="large" />
                    <Label htmlFor="large">Large</Label>
                  </div>
                  <span className="font-medium">$14.99</span>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium">Add extras</h3>
              <div className="grid gap-2">
                {[
                  { id: "extra-cheese", label: "Extra Cheese", price: 1.5 },
                  { id: "bacon", label: "Bacon", price: 2.0 },
                  { id: "avocado", label: "Avocado", price: 1.5 },
                  { id: "egg", label: "Fried Egg", price: 1.0 },
                ].map((extra) => (
                  <div
                    key={extra.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox id={extra.id} />
                      <Label htmlFor={extra.id}>{extra.label}</Label>
                    </div>
                    <span className="text-muted-foreground">+${extra.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium">Special instructions</h3>
              <textarea
                className="w-full rounded-lg border p-3 text-sm"
                rows={3}
                placeholder="Add any special requests (optional)"
              />
            </div>
            <Separator />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">$12.99</span>
                  <Badge variant="secondary" className="text-sm">
                    Best seller
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon">
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Decrease quantity</span>
                  </Button>
                  <span className="w-12 text-center">1</span>
                  <Button variant="outline" size="icon">
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Increase quantity</span>
                  </Button>
                </div>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                size="lg"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
        <div className="border-t">
          <div className="container py-8 px-4">
            <Tabs defaultValue="nutrition">
              <TabsList>
                <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="nutrition" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Nutritional Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {[
                        { label: "Calories", value: "650 kcal" },
                        { label: "Total Fat", value: "35g" },
                        { label: "Saturated Fat", value: "15g" },
                        { label: "Protein", value: "38g" },
                        { label: "Carbohydrates", value: "45g" },
                        { label: "Dietary Fiber", value: "3g" },
                        { label: "Sugars", value: "8g" },
                        { label: "Sodium", value: "980mg" },
                      ].map((item) => (
                        <div key={item.label} className="flex justify-between border-b py-2">
                          <span className="text-muted-foreground">{item.label}</span>
                          <span className="font-medium">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reviews" className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">4.8</div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">2,543 reviews</div>
                  </div>
                  <div className="flex-1">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-2">
                        <div className="text-sm text-muted-foreground w-6">
                          {rating}★
                        </div>
                        <div className="h-2 flex-1 rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                            style={{
                              width:
                                rating === 5
                                  ? "70%"
                                  : rating === 4
                                  ? "20%"
                                  : rating === 3
                                  ? "7%"
                                  : rating === 2
                                  ? "2%"
                                  : "1%",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      name: "John D.",
                      rating: 5,
                      date: "2 days ago",
                      comment:
                        "Best burger I've had in a while! The patty was juicy and the cheese was perfectly melted.",
                    },
                    {
                      name: "Sarah M.",
                      rating: 4,
                      date: "1 week ago",
                      comment:
                        "Really good burger, but I wish they had more sauce options. Still, would order again!",
                    },
                    {
                      name: "Mike R.",
                      rating: 5,
                      date: "2 weeks ago",
                      comment:
                        "The brioche bun makes all the difference. Absolutely delicious!",
                    },
                  ].map((review, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{review.name}</div>
                          <div className="text-sm text-muted-foreground">{review.date}</div>
                        </div>
                        <div className="mt-1 flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "fill-primary text-primary"
                                  : "fill-muted text-muted"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="mt-2 text-muted-foreground">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="border-t">
          <div className="container py-8 px-4">
            <h2 className="text-2xl font-bold mb-6">You might also like</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  name: "Double Cheeseburger",
                  price: 14.99,
                  image: "/placeholder.svg?height=200&width=300",
                  rating: 4.7,
                },
                {
                  name: "Bacon Burger",
                  price: 13.99,
                  image: "/placeholder.svg?height=200&width=300",
                  rating: 4.6,
                },
                {
                  name: "Mushroom Swiss Burger",
                  price: 13.99,
                  image: "/placeholder.svg?height=200&width=300",
                  rating: 4.8,
                },
                {
                  name: "Veggie Burger",
                  price: 11.99,
                  image: "/placeholder.svg?height=200&width=300",
                  rating: 4.5,
                },
              ].map((item) => (
                <Card key={item.name} className="overflow-hidden">
                  <CardHeader className="p-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width="300"
                      height="200"
                      className="aspect-[3/2] w-full object-cover"
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <div className="mt-1 text-sm font-medium">${item.price}</div>
                      </div>
                      <Badge variant="secondary" className="flex gap-1">
                        <Star className="h-3 w-3 fill-primary text-primary" />
                        {item.rating}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
