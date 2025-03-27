## Instructions
```bash
npm i
npm run start
```

> Health Check

> GET http://localhost:3000

```bash
ok
```

> POST http://localhost:3000/reccomend

Required Body JSON are { foodHistory, menulisting, reccomendationHistory }

Sample Output
```bash

{
    "foodReccomendation": {
        "suggestion1": {
            "category": "Chicken Dishes",
            "desc": "Smashed fried chicken with sambal and rice.",
            "food_item": "Ayam Penyet",
            "price": "$7.00",
            "restaurant": "Nasi Lemak Ayam Taliwang"
        },
        "suggestion2": {
            "category": "Noodles_and_Rice",
            "desc": "Indonesian fried noodles with egg and vegetables.",
            "food_item": "Mie Goreng",
            "price": "$5.80",
            "restaurant": "Nasi Lemak Ayam Taliwang"
        },
        "suggestion3": {
            "category": "Noodles_and_Rice",
            "desc": "Beef meatball soup with noodles.",
            "food_item": "Bakso",
            "price": "$6.00",
            "restaurant": "Nasi Lemak Ayam Taliwang"
        },
        "suggestion4": {
            "category": "Noodles_and_Rice",
            "desc": "Fried rice with shrimp paste and chili.",
            "food_item": "Nasi Goreng",
            "price": "$6.30",
            "restaurant": "Nasi Lemak Ayam Taliwang"
        },
        "suggestion5": {
            "category": "Chicken Dishes",
            "desc": "Signature nasi lemak featuring grilled chicken marinated in traditional Ayam Taliwang spices, served with fragrant coconut rice and accompaniments.",
            "food_item": "Nasi Lemak Ayam Taliwang",
            "price": "$6.50",
            "restaurant": "Nasi Lemak Ayam Taliwang"
        }
    },
    "message": "Food Reccomendation given successfully!"
}

```
