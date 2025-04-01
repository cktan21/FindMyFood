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


Data passed to Stripe Checkout Session
```json
{
  "cartItems": [
    {
      "item": "Grilled Teriyaki Chicken Donburi",
      "quantity": 2,
      "details": {
        "price": 6.9,
        "desc": "Delicious grilled chicken served with teriyaki sauce.",
        "photo": "https://example.com/images/chicken.jpg"
      },
      "restaurant": "Bricklane"
    }
  ],
  "serviceFee": 1.50,
  "total": 25.30,
  "customerEmail": "ewan_30@hotmail.com",
  "domain": "http://localhost:5173"
}
```

Data Passed to OrderFood Microservice
```json
{
    "orderContent": [
        {
            "user_id": "<USER_ID_FROM_SUPABASE>",
            "info": {
                "items": [
                    {
                        "qty": 2,
                        "dish": "Grilled_Teriyaki_Chicken_Donburi",
                        "price": 6.9
                    }
                ]
            },
            "restaurant": "Bricklane",
            "total": 13.8
        }
    ],
    creditsContent: {}
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
  "customer_email": "ewan_30@hotmail.com",
  "amount_total": 25.49
}
```
