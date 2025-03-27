## Instructions
```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8002
```

To deactivate server:
```bash
deactivate
```

> Health Check

GET http://localhost:4000

Output:
```bash
"message": "Recommendation Service is running 🚀"
```


>Store Reccomendation

POST http://localhost:4000/recommendation

Required Body JSON is Reccomendation

Sample JSON:
```bash
{
  "food": {
    "Restaurant": "Ayam Taliwang",
    "Dish": "Chicken Rice"
  }
}
```

>Retrieve Reccomendation

GET http://localhost:4000/recommendation/{id}

where id is User's uuid for eg bb80ba9c-7ea9-4141-a916-870f88b000b7

Sample Output:
```bash
{
  "food": {
    "Restaurant": "Ayam Taliwang",
    "Dish": "Chicken Rice"
  }
}
```