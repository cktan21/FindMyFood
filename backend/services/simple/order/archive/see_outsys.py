from flask import Flask, request, jsonify
from flask_cors import CORS

# Initialize Firestore using credentials
app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

# check if alive
@app.route('/', methods=['GET'])
def test():
    return 'alive (AW yeah 😎😎)'

# Get all order from outsystems
# @app.route("/outsys", methods=['GET'])
# def get_menus():
#     holder = {}
#     users_ref = db.collection("Menu").stream()
#     for doc in users_ref:
#         holder[doc.id] = doc.to_dict()
#     # users_list = [{doc.id: doc.to_dict()} for doc in users_ref]
#     return jsonify(holder)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=2100)