// STILL BORKEN BRAH 

import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Payment, orderFood } from "../../services/api";
import { useCart } from "@/hooks/useCart";
import { supabase } from "@/supabaseClient";

// Define interfaces for type safety
interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  orderNumber: string;
  orderDate: string;
  paymentMethod: string;
  paymentId: string;
  total: number;
  items: OrderItem[];
  subtotal: number;
  serviceFee: number;
}

export default function ConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { state } = location;
  const { clearCart } = useCart();

  useEffect(() => {
    // Check if we have order data from state
    if (state?.order) {
      setOrder(state.order);
      return;
    }

    // Otherwise, check for session_id in URL
    const sessionId = new URLSearchParams(location.search).get('session_id');
    if (sessionId) {
      const fetchSessionDetails = async () => {
        setLoading(true);
        try {
          // Get stored order details from localStorage
          const pendingOrder = JSON.parse(localStorage.getItem('pendingOrder') || '{}');
        //   console.log(`raw order: ${pendingOrder}`)
          const response = await Payment.sessionStatus(sessionId);

          if (response.data.status === 'complete' && response.data.payment_status === 'paid') {
            // i have strong reaon to suspect it send PER ORDER ITEM but whatever la it's not a bug it's a feature 
            try {
              // Group items by restaurant for the orderFood API
              const itemsByRestaurant: Record<string, any[]> = {};
              if (Array.isArray(pendingOrder.items)) {
                pendingOrder.items.forEach((item: any) => {
                  const restaurantName = item.restaurant || item.restaurantName || 'Unknown';
                  if (!itemsByRestaurant[restaurantName]) {
                    itemsByRestaurant[restaurantName] = [];
                  }
                  itemsByRestaurant[restaurantName].push({
                    qty: item.quantity,
                    dish: item.name.replace(/ /g, '_'),
                    price: item.price,
                  });
                });
                // console.log(`item map: ${itemsByRestaurant}`)
              }

              const { data: userData, error: authError } = await supabase.auth.getUser();
              if (authError) {
                console.error("Error fetching user:", authError);
                return;
              }
              const user = userData?.user;

              // Create orderContent array for the API
              const orderContent = Object.keys(itemsByRestaurant).map((restaurant) => ({
                user_id: user.id,
                info: {
                  items: itemsByRestaurant[restaurant],
                },
                restaurant: restaurant,
                total: parseFloat(
                  itemsByRestaurant[restaurant].reduce(
                    (sum, item) => sum + item.qty * item.price,
                    0
                  ).toFixed(2)
                ),
              }));
            //   console.log(`Content map: ${orderContent}`)

              // Only make API call if there are items to process
              if (orderContent.length > 0) {
                const orderData = {
                  orderContent: orderContent,
                  creditsContent: {}, // No credits used in this example
                };

                console.log('Sending order data:', orderData);
                const orderResponse = await orderFood.addOrder(orderData);
                console.log('Order created:', orderResponse.data);

                // Extract order IDs grouped by restaurant
                const orderIdsByRestaurant = orderResponse.data.order.map((orderItem: any) => ({
                  restaurant: orderItem.restaurant,
                  orderId: orderItem.order_id,
                }));

                // Log the extracted order IDs
                console.log('Extracted order IDs:', orderIdsByRestaurant);

                // Set the order state with grouped order IDs
                setOrder({
                  orderNumber: orderIdsByRestaurant
                    .map((o: any) => `${o.restaurant}: ${o.orderId}`)
                    .join(', ') || 'N/A',
                  orderDate: new Date().toLocaleString(),
                  paymentMethod: 'Credit Card',
                  paymentId: sessionId,
                  items: Array.isArray(pendingOrder.items) ? pendingOrder.items : [],
                  subtotal: pendingOrder.subtotal || 0,
                  serviceFee: pendingOrder.serviceFee || 1.5,
                  total: response.data.amount_total || 0,
                });

                // Clear the pending order from localStorage
                localStorage.removeItem('pendingOrder');
                clearCart();
              } else {
                console.log('No items to process, skipping API call');
                setError('No items found to process the order.');
                setTimeout(() => navigate('/cart'), 3000);
              }
            } catch (orderErr: any) {
              console.error('Error creating order:', orderErr);
              setError('Failed to create order. Please try again.');
              setTimeout(() => navigate('/cart'), 3000);
            }
          } else {
            setError('Payment was not completed successfully.');
            setTimeout(() => navigate('/cart'), 3000);
          }
        } catch (err) {
          console.error('Error fetching session details:', err);
          setError('Failed to verify payment details.');
          setTimeout(() => navigate('/cart'), 3000);
        } finally {
          setLoading(false);
        }
      };

      fetchSessionDetails();
    }
  }, [location, navigate, state]);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading order details...</div>;
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p className="text-xl font-semibold text-red-500">{error}</p>
        <p>Redirecting to cart...</p>
      </div>
    );
  }

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
                <span>Order Number(s)</span>
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
              {order.items && order.items.length > 0 ? (
                order.items.map((item: OrderItem, index: number) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>
                      {item.name || `Item ${index + 1}`} x {item.quantity}
                    </span>
                    <span>${typeof item.price === 'number' ? (item.price * item.quantity).toFixed(2) : '0.00'}</span>
                  </div>
                ))
              ) : (
                <div className="flex justify-between text-sm">
                  <span>Items</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${(order.subtotal || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Service Fee</span>
                <span>${(order.serviceFee || 0).toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${(order.total || 0).toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Link to="/home">
                <Button
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  size="lg"
                >
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