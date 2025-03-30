## Instructions
```bash
npm i
npm run start
```

## Health Check

GET http://localhost:8090

Ouput:
```bash
ok
```


## Get all order

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

## Get order by user

GET http://localhost:8090/graborder/user/uid=uid

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

## Get orders by restaurants

GET http://localhost:8090/graborder/restaurant=restaurant

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

## Get orders by receipt

GET http://localhost:8090/graborder/oid=oid

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
## Combined Filters

You can combine any of the three parameters (`uid`, `oid`, and `restaurant`) in any combination to retrieve specific orders. For example:

- To filter orders by user ID (`uid`), include `uid=Subrah`.
- To filter orders by order ID (`oid`), include `oid=f2057454-490b-4c72-abc3-85d759a29a68`.
- To filter orders by (`restaurant name`), include `restaurant=Bricklane`.

These parameters can be stacked together in any combination to refine your query. For instance:

- `uid=Subrah&oid=f2057454-490b-4c72-abc3-85d759a29a68` retrieves a specific order for a particular user.
- `uid=Subrah&restaurant=Bricklane` retrieves all orders placed by a specific user at a specific restaurant.

## Get User Credits

GET http://localhost:8090/credits/uid

Required params is uid

Sample Output:
http://localhost:8090/credits/Ewan

```json
{
    "message": {
        "message": "successful",
        "statuscode": "200",
        "currentcredits": 46
    }
}
```

### User Cancel Order

PUT http://localhost:8090/order/cancel/oid/resteraunt

Required params is oid, resteraunt

Sample Output:
http://localhost:8090/order/cancel/a74a2f3b-5d7d-45f2-ae08-5f2cc63815bc/Kuro_Kare

```json
{
    "order": {
        "order_id": "a74a2f3b-5d7d-45f2-ae08-5f2cc63815bc",
        "user_id": "Kevin",
        "info": {
            "items": [
                {
                    "qty": 10,
                    "dish": "Black_Angus_Shortribs_Curry",
                    "price": 16.9
                }
            ]
        },
        "status": "cancelled",
        "restaurant": "Kuro_Kare",
        "total": 16.9
    },
    "queue": {
        "message": "Deleted (➖) Queue from Kuro_Kare",
        "data": [
            {
                "queue_no": 2,
                "user_id": "Kevin",
                "time": "2025-03-30T04:19:34.080078",
                "order_id": "a74a2f3b-5d7d-45f2-ae08-5f2cc63815bc"
            }
        ]
    }
}
```

### Add order

POST http://localhost:8090/order/addorder

Required body JSON is orderContent, creditContent

Sample JSON for orderContent, creditContent:
```json
{
    "orderContent": {
    "user_id": "Kevin",
    "info": {
        "items": [
            {
                "qty": 10,
                "dish": "Black_Angus_Shortribs_Curry",
                "price": 16.9
            }
        ]
    },
    "restaurant": "Kuro_Kare",
    "total": 16.9
},
    // User doesn't need to necessarily use credits 
    "creditsContent": { 
        // "uid" : "Kevin",
        // "credit": "5"
    }
}
```

Sample Output:
```json
{
    "order": {
        "order_id": "a74a2f3b-5d7d-45f2-ae08-5f2cc63815bc",
        "user_id": "Kevin",
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
        "total": 16.9
    },
    "credit": "No Credits Deducted", // Default message if user doesn't use credits otherwise will return the message that
    "queue": {
        "message": "Added (➕) Queue to Kuro_Kare",
        "data": [
            {
                "queue_no": 2,
                "user_id": "Kevin",
                "time": "2025-03-30T04:19:34.080078",
                "order_id": "a74a2f3b-5d7d-45f2-ae08-5f2cc63815bc"
            }
        ]
    },
    "rabbitMQ": {
        "message": "Your Order a74a2f3b-5d7d-45f2-ae08-5f2cc63815bc from Kuro_Kare has been successfully sent to the Kitchen!",
        "order_id": "a74a2f3b-5d7d-45f2-ae08-5f2cc63815bc",
        "type": "notification",
        "user_id": "Kevin"
    }
}
```