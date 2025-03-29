import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import stripe
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure Stripe
stripe.api_key = os.getenv('STRIPE_SECRET_KEY')

@app.route('/', methods=['GET'])
def test():
    return 'alive (AW yeah 😎😎)'

@app.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    try:
        data = json.loads(request.data)
        cart_items = data.get('cartItems', [])
        
        if not cart_items:
            return jsonify({"error": "No items in cart"}), 400
        
        # Format line items for Stripe
        line_items = []
        for item in cart_items:
            line_items.append({
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': item['item'].replace('_', ' '),
                        'description': item['details']['desc'],
                        'images': [item['details']['photo']] if item['details']['photo'].startswith('http') else [],
                    },
                    'unit_amount': int(item['details']['price'] * 100),  # Convert to cents
                },
                'quantity': item['quantity'],
            })
        
        # Add delivery and service fees as line items
        if data.get('deliveryFee'):
            line_items.append({
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': 'Delivery Fee',
                    },
                    'unit_amount': int(data.get('deliveryFee') * 100),
                },
                'quantity': 1,
            })
        
        if data.get('serviceFee'):
            line_items.append({
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': 'Service Fee',
                    },
                    'unit_amount': int(data.get('serviceFee') * 100),
                },
                'quantity': 1,
            })
        
        # Create the checkout session
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=line_items,
            mode='payment',
            success_url=f"{data.get('domain', 'http://localhost:3000')}/confirmation?session_id={{CHECKOUT_SESSION_ID}}",
            cancel_url=f"{data.get('domain', 'http://localhost:3000')}/cart",
            metadata={
                # 'order_id': data.get('orderId', f"ORDER-{str(int(time.time()))}"),
                'customer_email': data.get('customerEmail', '')
            }
        )
        
        return jsonify({'sessionId': checkout_session.id, 'url': checkout_session.url})
    
    except Exception as e:
        return jsonify(error=str(e)), 400

@app.route('/session-status', methods=['GET'])
def session_status():
    try:
        session_id = request.args.get('session_id')
        if not session_id:
            return jsonify({"error": "No session ID provided"}), 400
            
        checkout_session = stripe.checkout.Session.retrieve(session_id)
        return jsonify({
            'status': checkout_session.status,
            'payment_status': checkout_session.payment_status,
            'customer_email': checkout_session.customer_details.email if checkout_session.customer_details else None,
            'amount_total': checkout_session.amount_total / 100 if checkout_session.amount_total else 0
        })
    
    except Exception as e:
        return jsonify(error=str(e)), 400

if __name__ == '__main__':
    import time  # Add this import at the top
    app.run(host='0.0.0.0', port=5002, debug=True)
