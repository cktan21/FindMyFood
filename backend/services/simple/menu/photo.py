import firebase_admin
from firebase_admin import credentials, storage

cred = credentials.Certificate("firebase_credentials.json")
firebase_admin.initialize_app(cred, {
    "storageBucket": "menu-b8c1f.firebasestorage.app" 
})

bucket = storage.bucket()

def get_photo_by_id(name):
    listie = []
    blob = bucket.list_blobs(prefix=name)
    for photo in blob:
        url = photo.public_url
        listie+=[url]
    return listie[1:]

# print(get_photo_by_id('King Kong Curry'))