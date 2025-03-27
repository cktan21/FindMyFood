## Instructions

```bash
npm install -g bun
bun i
bun --watch index.ts
```

<h1>How to Use</h1>

<h2>Get All Orders</h2>

<b><u>GET Request</u></b>

<h4>URL</h4>

> http://localhost:6369/orders

<h4>Returns</h4>

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

<h3>Get Order by Order ID</h3>

> http://localhost:6369/orders?oid=oid

<h4>URL</h4>
Search by order id

> http://localhost:6369/orders?oid=909fff87-e51c-4ecf-aa18-0dba89e0c54f

<h4>Returns</h4>

```json
[
    {
        "order_id": "909fff87-e51c-4ecf-aa18-0dba89e0c54f",
        "user_id": "Ewan",
        "info": {
        "items": [
            {
                "qty": 1,
                "dish": "Ayam_Penyet",
                "price": 7
            }
        ]
        },
        "status": "cancelled",
        "restaurant": "Nasi_Lemak_Ayam_Taliwang",
        "total": 7
    }
]
```

<h3>Get Order by User ID</h3>

> http://localhost:6369/orders?uid=uid

<h4>URL</h4>
Search by order id

> http://localhost:6369/orders?uid=Kendrick

<h4>Returns</h4>

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

<h3>Get Order by restaurant ID</h3>

> http://localhost:6369/orders?restaurant=restaurant

<h4>URL</h4>
Search by order id

> http://localhost:6369/orders?restaurant=Bricklane

<h4>Returns</h4>

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

### Combined Filters

You can combine any of the three parameters (`uid`, `oid`, and `restaurant`) in any combination to retrieve specific orders. For example:

- To filter orders by user ID (`uid`), include `uid=Subrah`.
- To filter orders by order ID (`oid`), include `oid=f2057454-490b-4c72-abc3-85d759a29a68`.
- To filter orders by restaurant name, include `restaurant=Bricklane`.

These parameters can be stacked together in any combination to refine your query. For instance:

- `uid=Subrah&oid=f2057454-490b-4c72-abc3-85d759a29a68` retrieves a specific order for a particular user.
- `uid=Subrah&restaurant=Bricklane` retrieves all orders placed by a specific user at a specific restaurant.

<h3>Get Order by User ID and by Order ID</h3>

> http://localhost:6369/orders?uid=uid&oid=oid

<h4>URL</h4>
Search by order id

> http://localhost:6369/orders?uid=Subrah&oid=f2057454-490b-4c72-abc3-85d759a29a68

<h4>Returns</h4>

```json
[
    {
        "order_id": "f2057454-490b-4c72-abc3-85d759a29a68",
        "user_id": "Subrah",
        "info": {
        "Bricklane": [
            {
                "qty": 2,
                "dish": "Grilled_Teriyaki_Chicken_Donburi",
                "price": 6.9
            }
        ]
        },
        "status": "completed",
        "total": 6.9
    }
]
```

<h2>Change Order Status</h2>
<b><u>PUT Request</u></b>

> http://localhost:6369/update/orderid/status

<h4>URL</h4>

> http://localhost:6369/update/4631fe98-2fa6-4da5-b695-7eeb6328715a/cancelled


<h4>Returns</h4>

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

<h2>Add Order</h2>
<b><u>POST Request</u></b>

> http://localhost:6369/add

<h4>URL</h4>

> http://localhost:6369/add

<h4>Payload</h4>

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

<h4>Returns</h4>

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

### Debugging

```bash

```
