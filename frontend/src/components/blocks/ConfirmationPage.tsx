import { Link, useLocation } from "react-router-dom";
import { Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ConfirmationPage() {
  const { state } = useLocation();
  // The order data should be passed via location.state from PaymentPage
  const order = state?.order;

  if (!order) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p className="text-xl font-semibold">No order data found.</p>
        <Link to="/">
          <Button className="mt-4">Back to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-center">
          <h1 className="text-xl font-semibold">Order Confirmation</h1>
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-1">
        <div className="container max-w-2xl py-8 px-4">
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
              <Check className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold">Order Confirmed!</h1>
            <p className="mt-2 text-muted-foreground">
              Thank you for your purchase! Your order has been placed successfully.
            </p>
          </div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Order Number</span>
                <span className="font-medium">{order.orderNumber}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Order Date</span>
                <span>{order.orderDate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Payment Method</span>
                <span>{order.paymentMethod}</span>
              </div>
              <Separator />
              {order.items.map((item: any, index: number) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivery Fee</span>
                <span>${order.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Service Fee</span>
                <span>${order.serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Link to="/home">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600" size="lg">
                  Continue Shopping
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
