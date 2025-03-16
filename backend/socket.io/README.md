## Instructions
```bash
npm i
node run socket.js
```

<h2>How it Works</h2>
- socket.io listen on rabbitMQ Queue
- When data enter Queue, Data is sent to all those listening on notif

```json
{
    "data": "Your order 1 has been successfully completed!", //pls note to future self don't make it so lame
    "type": "notification",
    "user_id" : "Kendrick"
}
```