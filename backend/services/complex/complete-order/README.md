## Instructions
```bash
go run main.go
```

<h1>How to Use</h1>

<h2>Order Completed</h2>

>http://localhost:7070/uid OR http://127.0.0.1:7070/uid
>POST Request

>uid is whatever the user's id is eg 'Kendrick'

<h3>Example</h3>

<h4>URL</h4>

>http://127.0.0.1:7070/bulk/cancel/Kendrick #Store Cancel Order 
>http://127.0.0.1:7070/single/complete/Kendrick #Store Complete Order

<h4>Expected Payload</h4>

```json
{
    "food" : "Grilled_Teriyaki_Chicken_Donburi",
    "restaurant" : "Bricklane",
    "id": "18", //this refers to queue id btw pls don't confuse
    "price": 6.9
}
```

<h4>Console Output</h4>

```bash
Calling QueueAPI: http://queue:8008/dump
Notification published to RabbitMQ successfully.
Queue data processed successfully.
```

<h4>What it sends to Queue MicroService</h4>

```json
{
    "food" : "Grilled_Teriyaki_Chicken_Donburi",
    "restaurant" : "Bricklane",
    "id": "18", //this refers to queue id btw pls don't confuse
    "action": "delete"
}
```

<h4>What it send to RabbitMQ</h4>

```json
{
    "message": "Your order of Grilled_Teriyaki_Chicken_Donburi from Bricklane has been successfully completed and is ready for pickup!",
    "order_id": "18",
    "user_id": "Kendrick",
    "type": "notification" 
}
```

<h4>How it Works</h4> 
- Sends a Delete Order to Update Queue Microservice DB
- Sends a Notification to RabbitMQ
- Sends a PUT Request to Outsystems //Coming Soon


### Debugging 
```bash
go mod download #gets all the required modules
```