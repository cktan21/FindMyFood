import { useState, useRef, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/supabaseClient";
import { Minus, Plus, ShoppingBag, Trash2, ChevronLeft, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/useCart";

export default function CartPage() {
  const { isLoggedIn, loading } = useAuth();
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
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

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const handleSignOut = async () => await supabase.auth.signOut();

  // Calculate subtotal and total
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.details.price * item.quantity,
    0
  );
  const deliveryFee = 2.99;
  const serviceFee = 1.50;
  const total = subtotal + deliveryFee + serviceFee;

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
        <div className="container grid gap-8 py-8 md:grid-cols-[1fr_380px] px-4">
          <div className="space-y-6">
            {cartItems.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                  <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                  <h3 className="mt-2 font-medium">Your cart is empty</h3>
                  <p className="text-sm text-muted-foreground">
                    Browse our menu and add some delicious meals to your cart.
                  </p>
                  <Link to="/restaurants">
                    <Button className="mt-4" variant="outline">
                      Browse Menu
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <>
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                      <ShoppingBag className="h-5 w-5 text-blue-500" />
                      Your Items
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {cartItems.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="h-24 w-24 overflow-hidden rounded-lg border">
                          <img
                            src={item.details.photo || "/placeholder.svg"}
                            alt={item.item.replace(/_/g, " ")}
                            width="100"
                            height="100"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="space-y-1">
                            <h3 className="font-medium">
                              {item.item.replace(/_/g, " ")}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {item.details.desc}
                            </p>
                            <div className="text-sm font-medium">
                              ${item.details.price.toFixed(2)}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 rounded-lg border">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-none"
                                onClick={() =>
                                  updateQuantity(
                                    item.restaurant,
                                    item.category,
                                    item.item,
                                    item.quantity - 1
                                  )
                                }
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                                <span className="sr-only">Decrease quantity</span>
                              </Button>
                              <Input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => {
                                  const newQty = parseInt(e.target.value);
                                  if (!isNaN(newQty) && newQty >= 1) {
                                    updateQuantity(
                                      item.restaurant,
                                      item.category,
                                      item.item,
                                      newQty
                                    );
                                  }
                                }}
                                className="h-8 w-12 border-0 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-none"
                                onClick={() =>
                                  updateQuantity(
                                    item.restaurant,
                                    item.category,
                                    item.item,
                                    item.quantity + 1
                                  )
                                }
                              >
                                <Plus className="h-3 w-3" />
                                <span className="sr-only">Increase quantity</span>
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-red-500"
                              onClick={() =>
                                removeFromCart(
                                  item.restaurant,
                                  item.category,
                                  item.item
                                )
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remove item</span>
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-start justify-end font-medium">
                          ${(item.details.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <Separator className="my-4" />
                  <CardFooter className="justify-between">
                    <div className="text-sm text-muted-foreground">
                      Subtotal (
                      {cartItems.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                      items)
                    </div>
                    <div className="font-medium">${subtotal.toFixed(2)}</div>
                  </CardFooter>
                </Card>
                <div className="flex justify-end">
                  <Button variant="outline" onClick={clearCart}>
                    Clear Cart
                  </Button>
                </div>
              </>
            )}
          </div>
          {cartItems.length > 0 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
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
                    <span>${total.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to="/checkout">
                    <Button
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                      size="lg"
                    >
                      Proceed to Checkout
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
