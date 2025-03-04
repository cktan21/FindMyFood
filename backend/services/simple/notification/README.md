## Instructions
```bash
cd backend/services/simple/notification/rabbitmq
docker compose up -d
cd backend/services/simple/notification
npm i
node socket.io/server.js
# node sender.js if you want to test if it's working
node router.js #receives the message sent to rabbit mq and sends it directlty to socket.io
```

To deactivate server:
```bash
ctlr 'c' 
```

