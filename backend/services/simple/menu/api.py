import os
from google.cloud import firestore
from flask import Flask, request, jsonify
from photo import get_photo_by_id
from flask_cors import CORS

# Initialize Firestore using credentials
db = firestore.Client.from_service_account_json("firebase_credentials.json")
app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

# check if alive
@app.route('/', methods=['GET'])
def test():
    return 'alive'

# Get all the menues
@app.route("/all", methods=['GET'])
def get_menus():
    holder = {}
    users_ref = db.collection("Menu").stream()
    for doc in users_ref:
        holder[doc.id] = doc.to_dict()
        holder[doc.id]['photos'] = get_photo_by_id(doc.id)
    # users_list = [{doc.id: doc.to_dict()} for doc in users_ref]
    return jsonify(holder)

#get a specific menue
@app.route("/<restraunt>")
def get_menu(restraunt):
    doc_ref = db.collection("Menu").document(restraunt)
    doc = doc_ref.get()
    if doc.exists:
        tbr = doc.to_dict()
        tbr['photos'] = get_photo_by_id(restraunt)
        return jsonify(tbr)
    else:
        return jsonify({"error": "Restraunt not found"}), 404

if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=int(os.getenv("PORT", 5001)))