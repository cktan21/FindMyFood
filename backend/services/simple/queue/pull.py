import requests

r = requests.get('http://127.0.0.1:5001/all')

print(r.json().keys())