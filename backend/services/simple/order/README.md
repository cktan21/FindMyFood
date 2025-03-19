## Instructions
```bash
npm install -g bun
bun --watch index.ts
```

<h1>How to Use</h1>

<h2>Get All Orders</h2>

<b><u>Get Request</u></b>
<h4>URL</h4>
>http://localhost:6369/orders

<h4>Returns</h4>

```json
[
    {
        "orderid": "4631fe98-2fa6-4da5-b695-7eeb6328715a",
        "userid": "Kendrick",
        "info": {
            "total": 1620.8,
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
        "status": "processing"
    },
    {
        "orderid": "6b0404ec-0602-4479-877e-262b4199a97a",
        "userid": "Ryan",
        "info": {
            "total": 16,
            "Bricklane": [
                {
                    "qty": 200,
                    "dish": "Bulgogi_Tacos",
                    "price": 16
                }
            ]
        },
        "status": "processing"
    },
    {
        "orderid": "909fff87-e51c-4ecf-aa18-0dba89e0c54f",
        "userid": "Ewan",
        "info": {
            "total": 7,
            "Ayam Taliwang": [
                {
                    "qty": 1,
                    "dish": "Ayam_Penyet",
                    "price": 7
                }
            ]
        },
        "status": "cancelled"
    },
    {
        "orderid": "f2057454-490b-4c72-abc3-85d759a29a68",
        "userid": "Subrah",
        "info": {
            "total": 6.9,
            "Bricklane": [
                {
                    "qty": 2,
                    "dish": "Grilled_Teriyaki_Chicken_Donburi",
                    "price": 6.9
                }
            ]
        },
        "status": "completed"
    }
]
```

<h3>Get Order by Order ID</h3>
>http://localhost:6369/orders?oid=oid

<h4>URL</h4>
Search by order id
>http://localhost:6369/orders?oid=909fff87-e51c-4ecf-aa18-0dba89e0c54f

<h4>Returns</h4>

```json
[
    {
        "orderid": "909fff87-e51c-4ecf-aa18-0dba89e0c54f",
        "userid": "Ewan",
        "info": {
            "total": 7,
            "Ayam Taliwang": [
                {
                    "qty": 1,
                    "dish": "Ayam_Penyet",
                    "price": 7
                }
            ]
        },
        "status": "cancelled"
    }
]
```

<h3>Get Order by User ID</h3>
>http://localhost:6369/orders?uid=uid

<h4>URL</h4>
Search by order id
>http://localhost:6369/orders?uid=Kendrick

<h4>Returns</h4>

```json
[
    {
        "orderid": "4631fe98-2fa6-4da5-b695-7eeb6328715a",
        "userid": "Kendrick",
        "info": {
            "total": 1620.8,
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
        "status": "processing"
    }
]
```

<h3>Get Order by User ID and by Order ID</h3>
>http://localhost:6369/orders?uid=uid&oid=oid

<h4>URL</h4>
Search by order id
>http://localhost:6369/orders?uid=Subrah&oid=f2057454-490b-4c72-abc3-85d759a29a68

<h4>Returns</h4>

```json
[
    {
        "orderid": "f2057454-490b-4c72-abc3-85d759a29a68",
        "userid": "Subrah",
        "info": {
            "total": 6.9,
            "Bricklane": [
                {
                    "qty": 2,
                    "dish": "Grilled_Teriyaki_Chicken_Donburi",
                    "price": 6.9
                }
            ]
        },
        "status": "completed"
    }
]
```

<h4>How it Works</h4> 

### Debugging 
```bash

```
