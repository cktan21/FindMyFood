## Instructions

### Get Order History
```bash
https://personal-3mms7vqv.outsystemscloud.com/OrderMicroservice/rest/OrderService/orderhistory?userId={userId}
```

where userId is Users table UUID, this returns array of jsons with status of the reciept number

Sample Output:
```bash
[{"OrderHist":{"OrderHistId":13,"User":"saurabh","CancelledId":13}}]
```

### Get Order
```bash

https://personal-3mms7vqv.outsystemscloud.com/OrderMicroservice/rest/OrderService/order?RecieptNo={RecieptNo}
```

where RecieptNo = GetOrderHistory("CancelledId") or GetOrderHistory("InProgressId") or GetOrderHistory("FinishedId"), this returns json

Sample Output:
```bash
[{
    "OrderId": 13,
    "Restaurant": "Ayam Taliwang",
    "Dish": "Chicken Rice",
    "Quantity": 1
}]

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
  "Quantity": 0,
  "RecieptNo" : "ORD123"

}
```

where userId is Users table UUID

-this needs to be run n times, where n is the number of restaurant-dishes pairs in any given reciept

### Put Cancel Order
```bash
https://personal-3mms7vqv.outsystemscloud.com/OrderMicroservice/rest/OrderService/order/cancel?RecieptNo={RecieptNo}
```

where RecieptNo = GetOrderHistory("InProgressId")
-this needs to be run n times, where n is the number of restaurant-dishes pairs in any given reciept

### Put Complete Order
```bash
https://personal-3mms7vqv.outsystemscloud.com/OrderMicroservice/rest/OrderService/order/complete?RecieptNo={RecieptNo}
```

where  RecieptNo = GetOrderHistory("InProgressId")
-this needs to be run n times, where n is the number of restaurant-dishes pairs in any given reciept





