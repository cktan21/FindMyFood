import { useState, useRef, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/supabaseClient";
import { Minus, Plus, ShoppingBag, Trash2, ChevronLeft, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

export default function CartPage() {
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
              to="/home"
              className="flex items-center gap-2 text-sm font-medium hover:text-blue-600 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Your Cart</h1>
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
        <div className="container grid gap-8 py-8 md:grid-cols-[1fr_380px] px-4">
          <div className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  <ShoppingBag className="h-5 w-5 text-blue-500" />
                  Burger Palace
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    name: "Classic Cheeseburger",
                    price: 12.99,
                    image: "/placeholder.svg?height=100&width=100",
                    quantity: 2,
                    description: "Beef patty, cheese, lettuce, tomato, special sauce",
                  },
                  {
                    name: "French Fries",
                    price: 4.99,
                    image: "/placeholder.svg?height=100&width=100",
                    quantity: 1,
                    description: "Crispy golden fries with sea salt",
                  },
                  {
                    name: "Chocolate Milkshake",
                    price: 5.99,
                    image: "/placeholder.svg?height=100&width=100",
                    quantity: 1,
                    description: "Rich and creamy chocolate shake",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="h-24 w-24 overflow-hidden rounded-lg border">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width="100"
                        height="100"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="space-y-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                        <div className="text-sm font-medium">${item.price.toFixed(2)}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 rounded-lg border">
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none">
                            <Minus className="h-3 w-3" />
                            <span className="sr-only">Decrease quantity</span>
                          </Button>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            className="h-8 w-12 border-0 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                          />
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none">
                            <Plus className="h-3 w-3" />
                            <span className="sr-only">Increase quantity</span>
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove item</span>
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-start justify-end font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </CardContent>
              <Separator className="my-4" />
              <CardFooter className="justify-between">
                <div className="text-sm text-muted-foreground">Subtotal (3 items)</div>
                <div className="font-medium">$36.96</div>
              </CardFooter>
            </Card>
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                <h3 className="mt-2 font-medium">Add more items</h3>
                <p className="text-sm text-muted-foreground">Browse our menu and discover more delicious meals</p>
                <Button className="mt-4" variant="outline">
                  Browse Menu
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">$36.96</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span className="font-medium">$2.99</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Service Fee</span>
                  <span className="font-medium">$1.50</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>$41.45</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  size="lg"
                >
                  Proceed to Checkout
                </Button>
              </CardFooter>
            </Card>
            {/* <Card>
              <CardHeader>
                <CardTitle>Delivery Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Delivery Address</div>
                  <div className="rounded-lg border p-3">
                    <div className="font-medium">Home</div>
                    <div className="text-sm text-muted-foreground">123 Main Street, Apt 4B</div>
                    <div className="text-sm text-muted-foreground">New York, NY 10001</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Estimated Delivery Time</div>
                  <div className="rounded-lg border p-3">
                    <div className="font-medium">25-35 minutes</div>
                    <div className="text-sm text-muted-foreground">Your order will arrive by 3:45 PM</div>
                  </div>
                </div>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </main>
    </div>
  )
}
