// import { useState } from "react";
// import { Link, Navigate, useNavigate } from "react-router-dom";
// import { useAuth } from "@/context/AuthContext";
// import { ChevronLeft } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { Input } from "@/components/ui/input";
// import { useCart } from "@/hooks/useCart";

// export default function PaymentPage() {
//   const { isLoggedIn, loading } = useAuth();
//   const { cartItems } = useCart();
//   const navigate = useNavigate();

//   const subtotal = cartItems.reduce(
//     (acc, item) => acc + item.details.price * item.quantity,
//     0
//   );
//   const deliveryFee = 2.99;
//   const serviceFee = 1.50;
//   const taxRate = 0.09;
//   const tax = parseFloat((subtotal * taxRate).toFixed(2));
//   const total = parseFloat((subtotal + deliveryFee + serviceFee + tax).toFixed(2));

//   const [cardHolder, setCardHolder] = useState("");
//   const [cardNumber, setCardNumber] = useState("");
//   const [cardExpiry, setCardExpiry] = useState("");
//   const [cardCVC, setCardCVC] = useState("");

//   if (loading) {
//     return <div>Loading...</div>;
//   }
//   if (!isLoggedIn) {
//     return <Navigate to="/login" />;
//   }
//   if (cartItems.length === 0) {
//     return (
//       <div className="flex min-h-screen flex-col items-center justify-center">
//         <p className="text-xl font-semibold">Your cart is empty</p>
//         <Link to="/cart">
//           <Button className="mt-4">Back to Cart</Button>
//         </Link>
//       </div>
//     );
//   }

//   const handlePlaceOrder = () => {
//     const orderData = {
//       orderNumber: "FE-5678",
//       orderDate: new Date().toLocaleString(),
//       paymentMethod: `Card ending in ${cardNumber.slice(-4)}`,
//       items: cartItems.map((item) => ({
//         name: item.item.replace(/_/g, " "),
//         quantity: item.quantity,
//         price: item.details.price,
//       })),
//       subtotal,
//       deliveryFee,
//       serviceFee,
//       tax,
//       total,
//     };

//     console.log({
//       cardHolder,
//       cardNumber,
//       cardExpiry,
//       cardCVC,
//       ...orderData,
//       cartItems,
//     });

//     navigate("/confirmation", { state: { order: orderData } });
//   };

//   return (
//     <div className="flex min-h-screen flex-col">
//       <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//         <div className="container flex h-16 items-center justify-between">
//           <Link
//             to="/cart"
//             className="flex items-center gap-2 text-sm font-medium hover:text-blue-600 transition-colors"
//           >
//             <ChevronLeft className="h-4 w-4" />
//             Back to Cart
//           </Link>
//           <h1 className="text-xl font-semibold">Payment</h1>
//         </div>
//       </header>
//       <main className="flex-1">
//         <div className="container grid gap-8 py-8 md:grid-cols-[1fr_380px] px-4">
//           {/* Payment Information Form */}
//           <div className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Payment Information</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium">Cardholder Name</label>
//                   <Input
//                     value={cardHolder}
//                     onChange={(e) => setCardHolder(e.target.value)}
//                     placeholder="John Doe"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium">Card Number</label>
//                   <Input
//                     value={cardNumber}
//                     onChange={(e) => setCardNumber(e.target.value)}
//                     placeholder="1234 5678 9012 3456"
//                   />
//                 </div>
//                 <div className="flex space-x-4">
//                   <div className="flex-1 space-y-2">
//                     <label className="block text-sm font-medium">Expiry Date</label>
//                     <Input
//                       value={cardExpiry}
//                       onChange={(e) => setCardExpiry(e.target.value)}
//                       placeholder="MM/YY"
//                     />
//                   </div>
//                   <div className="w-24 space-y-2">
//                     <label className="block text-sm font-medium">CVC</label>
//                     <Input
//                       value={cardCVC}
//                       onChange={(e) => setCardCVC(e.target.value)}
//                       placeholder="123"
//                     />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//           {/* Order Summary */}
//           <div className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Order Summary</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-muted-foreground">Subtotal</span>
//                   <span>${subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-muted-foreground">Delivery Fee</span>
//                   <span>${deliveryFee.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-muted-foreground">Service Fee</span>
//                   <span>${serviceFee.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-muted-foreground">Tax</span>
//                   <span>${tax.toFixed(2)}</span>
//                 </div>
//                 <Separator />
//                 <div className="flex justify-between font-medium">
//                   <span>Total</span>
//                   <span>${total.toFixed(2)}</span>
//                 </div>
//               </CardContent>
//               <CardFooter>
//                 <Button
//                   onClick={handlePlaceOrder}
//                   className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
//                   size="lg"
//                 >
//                   Place Order
//                 </Button>
//               </CardFooter>
//             </Card>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
