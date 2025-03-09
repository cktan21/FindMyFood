from flask import Flask, render_template, request, redirect, url_for, session, flash
import stripe
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = 'STRIPE_SECRET_KEY'  
stripe.api_key = os.getenv('STRIPE_SECRET_KEY')

# Load food data from JSON file
with open('food_data.json', 'r') as f:
    food_data = json.load(f)

# Helper function to parse price strings
def parse_price(price_str):
    price_str = price_str.replace('$', '').replace('++', '').replace('_each', '')
    try:
        return float(price_str)
    except ValueError:
        return 0.0

# Inject cart count into all templates
@app.context_processor
def inject_cart_count():
    cart = session.get('cart', [])
    cart_count = sum(item['quantity'] for item in cart)
    return {'cart_count': cart_count}

# Routes
@app.route('/')
def menu():
    # Create a dictionary with display names (spaces) and original names (underscores)
    restaurants = {restaurant.replace('_', ' '): restaurant for restaurant in food_data.keys()}
    return render_template('menu.html', restaurants=restaurants)

@app.route('/add_to_cart', methods=['POST'])
def add_to_cart():
    restaurant = request.form['restaurant']
    category = request.form['category']
    item_name = request.form['item_name']
    price_str = food_data[restaurant][category][item_name]['price']
    price = parse_price(price_str)
    
    cart = session.get('cart', [])
    for item in cart:
        if item['restaurant'] == restaurant and item['category'] == category and item['item_name'] == item_name:
            item['quantity'] += 1
            break
    else:
        cart.append({
            'restaurant': restaurant,
            'category': category,
            'item_name': item_name,
            'price': price,
            'quantity': 1
        })
    session['cart'] = cart
    flash(f'{item_name.replace("_", " ")} added to cart!', 'success')
    return redirect(url_for('restaurant_details', restaurant_name=restaurant))

@app.route('/cart')
def cart():
    cart = session.get('cart', [])
    total = sum(item['price'] * item['quantity'] for item in cart)
    return render_template('cart.html', cart=cart, total=total)

@app.route('/remove_from_cart', methods=['POST'])
def remove_from_cart():
    item_key = request.form['item_key']
    restaurant, category, item_name = item_key.split('|')
    cart = session.get('cart', [])
    for item in cart:
        if item['restaurant'] == restaurant and item['category'] == category and item['item_name'] == item_name:
            cart.remove(item)
            break
    session['cart'] = cart
    flash('Item removed from cart.', 'success')
    return redirect(url_for('cart'))

@app.route('/checkout', methods=['POST'])
def checkout():
    cart = session.get('cart', [])
    if not cart:
        flash('Your cart is empty.', 'danger')
        return redirect(url_for('cart'))
    
    line_items = []
    for item in cart:
        line_items.append({
            'price_data': {
                'currency': 'usd',
                'product_data': {
                    'name': f"{item['restaurant']} - {item['item_name']}",
                },
                'unit_amount': int(item['price'] * 100),
            },
            'quantity': item['quantity'],
        })
    
    try:
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=line_items,
            mode='payment',
            success_url=url_for('success', _external=True),
            cancel_url=url_for('cancel', _external=True),
        )
        return redirect(checkout_session.url, code=303)
    except stripe.error.StripeError as e:
        flash('There was an error processing your payment. Please try again.', 'danger')
        return redirect(url_for('cart'))

@app.route('/success')
def success():
    session.pop('cart', None)
    flash('Thank you! Your order has been successfully placed.', 'success')
    return render_template('success.html')

@app.route('/cancel')
def cancel():
    flash('Payment was cancelled.', 'warning')
    return render_template('cancel.html')

@app.route('/restaurant/<restaurant_name>')
def restaurant_details(restaurant_name):
    # Logic to display restaurant details
    categories = food_data[restaurant_name]
    return render_template('restaurant_details.html', restaurant=restaurant_name, categories=categories)

if __name__ == '__main__':
    app.run(debug=True)
