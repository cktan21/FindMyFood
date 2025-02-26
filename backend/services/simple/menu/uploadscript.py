import json
import firebase_admin
from firebase_admin import credentials, firestore

# Step 1: Initialize Firebase Admin SDK
# Replace 'path/to/serviceAccountKey.json' with the path to your Service Account Key JSON file
cred = credentials.Certificate('path/to/serviceAccountKey.json')
firebase_admin.initialize_app(cred)

# Initialize Firestore client
db = firestore.client()

# Step 2: Load JSON file
# Replace 'path/to/your-data.json' with the path to your JSON file
with open('sample.json', 'r') as file:
    data = json.load(file)

# Step 3: Upload data to Firestore
def upload_to_firestore(collection_name, document_name, document_data):
    doc_ref = db.collection(collection_name).document(document_name)
    doc_ref.set(document_data)
    print(f"Uploaded {document_name} to {collection_name}")

# Iterate through the JSON data and upload to Firestore
for collection_name, documents in data.items():
    for document_name, document_data in documents.items():
        upload_to_firestore(collection_name, document_name, document_data)

print("Upload complete!")