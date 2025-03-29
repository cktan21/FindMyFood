## Instructions
```bash
npm i
npm run start
```

>Health Check

GET http://localhost:8090

Ouput:
```bash
ok
```


> Get all order

GET http://localhost:8090/order/all

Sample Output:
```json
[
    {
        "order_id": "f2057454-490b-4c72-abc3-85d759a29a68",
        "user_id": "Subrah",
        "info": {
            "items": [
                { 
                    "qty": 2, 
                    "dish": "Grilled_Teriyaki_Chicken_Donburi", 
                    "price": 6.9 
                }
            ]
        },
        "status": "completed",
        "restaurant": "Bricklane",
        "total": 6.9
    },
    {
        "order_id": "c9ba07bb-7b45-40e3-9643-2a276d331e26",
        "user_id": "Kendrick",
        "info": { "items": [{ "qty": 1, "dish": "Ayam_Penyet", "price": 7 }] },
        "status": "processing",
        "restaurant": "Nasi_Lemak_Ayam_Taliwang",
        "total": 49
    },
    {
        "order_id": "909fff87-e51c-4ecf-aa18-0dba89e0c54f",
        "user_id": "Ewan",
        "info": { "items": [{ "qty": 1, "dish": "Ayam_Penyet", "price": 7 }] },
        "status": "cancelled",
        "restaurant": "Nasi_Lemak_Ayam_Taliwang",
        "total": 7
    },
    {
        "order_id": "6b0404ec-0602-4479-877e-262b4199a97a",
        "user_id": "Ryan",
        "info": { "items": [{ "qty": 200, "dish": "Bulgogi_Tacos", "price": 16 }] },
        "status": "processing",
        "restaurant": "Bricklane",
        "total": 16
    },
    {
        "order_id": "4631fe98-2fa6-4da5-b695-7eeb6328715a",
        "user_id": "Kendrick",
        "info": {
        "items": [
            { "qty": 2, "dish": "Grilled_Teriyaki_Chicken_Donburi", "price": 13.8 },
            { "qty": 200, "dish": "Bulgogi_Tacos", "price": 1600 }
        ]
        },
        "status": "processing",
        "restaurant": "Bricklane",
        "total": 1613.8
    },
    {
        "order_id": "20cc894b-62a3-48e9-8d0c-65238f227b8e",
        "user_id": "Kendrick",
        "info": {
        "items": [
            { "qty": 10, "dish": "Black_Angus_Shortribs_Curry", "price": 16.9 }
        ]
        },
        "status": "processing",
        "restaurant": "Kuro_Kare",
        "total": 169
    }
]
```

> Get order by user

GET http://localhost:8090/order/user/uid=uid

where uid is user id

Sample Output:
```json
[
    {
        "order_id": "4631fe98-2fa6-4da5-b695-7eeb6328715a",
        "user_id": "Kendrick",
        "info": {
        "items": [
            {
            "qty": 2,
            "dish": "Grilled_Teriyaki_Chicken_Donburi",
            "price": 13.8
            },
            {
            "qty": 200,
            "dish": "Bulgogi_Tacos",
            "price": 1600
            }
        ]
        },
        "status": "processing",
        "restaurant": "Bricklane",
        "total": 1613.8
    },
    {
        "order_id": "c9ba07bb-7b45-40e3-9643-2a276d331e26",
        "user_id": "Kendrick",
        "info": {
        "items": [
            {
            "qty": 1,
            "dish": "Ayam_Penyet",
            "price": 7
            }
        ]
        },
        "status": "processing",
        "restaurant": "Nasi_Lemak_Ayam_Taliwang",
        "total": 49
    }
]
```

> Get orders by restaurants

GET http://localhost:8090/order/restaurant=restaurant

where restaurant is restaurant name

Sample Output:
```json
[
    {
        "order_id": "4631fe98-2fa6-4da5-b695-7eeb6328715a",
        "user_id": "Kendrick",
        "info": {
        "items": [
            {
            "qty": 2,
            "dish": "Grilled_Teriyaki_Chicken_Donburi",
            "price": 13.8
            },
            {
            "qty": 200,
            "dish": "Bulgogi_Tacos",
            "price": 1600
            }
        ]
        },
        "status": "processing",
        "restaurant": "Bricklane",
        "total": 1613.8
    },
    {
        "order_id": "f2057454-490b-4c72-abc3-85d759a29a68",
        "user_id": "Subrah",
        "info": {
        "items": [
            {
            "qty": 2,
            "dish": "Grilled_Teriyaki_Chicken_Donburi",
            "price": 6.9
            }
        ]
        },
        "status": "completed",
        "restaurant": "Bricklane",
        "total": 6.9
    }
]
```

> Get orders by receipt

GET http://localhost:8090/order/oid=oid

where oid is id of receipt

Sample Output:
```json
[
    {
        "order_id": "4631fe98-2fa6-4da5-b695-7eeb6328715a",
        "user_id": "Kendrick",
        "info": {
        "items": [
            {
            "qty": 2,
            "dish": "Grilled_Teriyaki_Chicken_Donburi",
            "price": 13.8
            },
            {
            "qty": 200,
            "dish": "Bulgogi_Tacos",
            "price": 1600
            }
        ]
        },
        "status": "processing",
        "restaurant": "Bricklane",
        "total": 1613.8
    },
    {
        "order_id": "c9ba07bb-7b45-40e3-9643-2a276d331e26",
        "user_id": "Kendrick",
        "info": {
        "items": [
            {
            "qty": 1,
            "dish": "Ayam_Penyet",
            "price": 7
            }
        ]
        },
        "status": "processing",
        "restaurant": "Nasi_Lemak_Ayam_Taliwang",
        "total": 49
    }
]
```

> Update status of order

PUT http://localhost:8090/order/updatestatus

Required body JSON is oid, status

Sample Output:
```json
{
    "order_id": "4631fe98-2fa6-4da5-b695-7eeb6328715a",
    "user_id": "Kendrick",
    "info": {
        "Bricklane": [
            {
                "qty": 2,
                "dish": "Grilled_Teriyaki_Chicken_Donburi",
                "price": 13.8
            },
            {
                "qty": 200,
                "dish": "Bulgogi_Tacos",
                "price": 1600
            }
        ],
        "Ayam Taliwang": [
            {
                "qty": 1,
                "dish": "Ayam_Penyet",
                "price": 7
            }
        ]
    },
    "status": "cancelled",
    "total": 1620.8
}
```

> Add order

POST http://localhost:8090/order/addorder

Required body JSON is orderContent

Sample JSON for orderContent:
```json
{
    "user_id": "Kendrick",
    "info": {
        "items": [
            {
                "qty": 10,
                "dish": "Black_Angus_Shortribs_Curry",
                "price": 16.9
            }
        ]
    },
    "status": "processing",
    "restaurant": "Kuro_Kare",
    "total": 169
}
```

Sample Output:
```json
{
    "order_id": "20cc894b-62a3-48e9-8d0c-65238f227b8e",
    "user_id": "Kendrick",
    "info": {
        "items": [
            {
                "qty": 10,
                "dish": "Black_Angus_Shortribs_Curry",
                "price": 16.9
            }
        ]
    },
    "status": "processing",
    "restaurant": "Kuro_Kare",
    "total": 169
}
```