## Instructions

### Get Order History
```bash
https://personal-3mms7vqv.outsystemscloud.com/OrderMicroservice/rest/OrderService/orderhistory?userId={userId}
```
where userId is Users table UUID, this returns array of jsons

Sample Output:
```bash
[{"OrderHist":{"OrderHistId":13,"User":"saurabh","CancelledId":13}}]
```

### Get Order
```bash
https://personal-3mms7vqv.outsystemscloud.com/OrderMicroservice/rest/OrderService/order?OrderId={OrderId}
```

where OrderId = GetOrderHistory(CancelledId), this returns json

Sample Output:
```bash
{
    "OrderId": 13,
    "Restaurant": "Ayam Taliwang",
    "Dish": "Chicken Rice",
    "Quantity": 1
}
```

### Post Order
```bash
https://personal-3mms7vqv.outsystemscloud.com/OrderMicroservice/rest/OrderService/order?userId={userId}
```

Body JSON:
```bash
{
  "Restaurant": "Ayam Taliwang",
  "Dish": "Chicken Rice",
  "Quantity": 0
}
```

where userId is Users table UUID

### Put Cancel Order
```bash
https://personal-3mms7vqv.outsystemscloud.com/OrderMicroservice/rest/OrderService/order/cancel?orderId={orderId}
```

where orderId = GetOrderHistory(CancelledId)

### Put Complete Order
```bash
https://personal-3mms7vqv.outsystemscloud.com/OrderMicroservice/rest/OrderService/order/complete?orderId={orderId}
```

where orderId = GetOrderHistory(CancelledId)



