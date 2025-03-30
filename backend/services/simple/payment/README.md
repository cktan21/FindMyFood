## Instructions

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

To deactivate server:

```bash
deactivate
```

<h1>Payment</h1>

Step 1: Paste the STRIPE API (from the excel) into /frontend/.env file and /services/simple/payment/.env

Step 2: Install packages

```bash
npm install @stripe/react-stripe-js @stripe/stripe-js
```

Step 3: In order for the Stripe Payment to work, you will need to run Main.tsx and app.py at the same time

```bash
cd backend/services/simple/payment
python app.py
```

Step 4: For the stripe payment credit card number use

<p>Credit Card Number: 4242 4242 4242 4242</p>
<p>Any Expiry Date & CSV</p>

Request to Backend

```json
{
  "cartItems": [
    {
      "restaurant": "japanese_restaurant",
      "category": "Curry",
      "item": "Chicken_Katsu_Don",
      "details": {
        "photo": "https://example.com/chicken_katsu.jpg",
        "desc": "Crispy chicken cutlet over rice.",
        "price": 10.5
      },
      "quantity": 2
    }
  ],
  "deliveryFee": 2.99,
  "serviceFee": 1.5,
  "total": 25.49,
  "orderId": "ORDER-1648452789",
  "customerEmail": "customer@example.com",
  "domain": "http://localhost:3000"
}
```

Response from Backend with Stripe Session

```json
{
  "sessionId": "cs_test_a1b2c3d4e5f6g7h8i9j0",
  "url": "https://checkout.stripe.com/pay/cs_test_a1b2c3d4e5f6g7h8i9j0"
}
```

Session Status Response After Payment

```json
{
  "status": "complete",
  "payment_status": "paid",
  "customer_email": "customer@example.com",
  "amount_total": 25.49
}
```
