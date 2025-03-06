## Instructions
```bash
cd backend/services/simple/notification/rabbitmq
docker compose up -d
python amqp_setup.py
cd backend/services/simple/notification
npm i
node socket.io/server.js #starts the socket.io server
# node test_sender.js #sends dummy HelloMQ! in intervals of 1 second to router.js
node router.js #receives the message sent by rabbit mq and sends it directlty to socket.io
```

To deactivate server:
```bash
ctlr 'c' 
```

<br>
<br>
<h2>NOTE</h2> 
Ensure that you start <pre>node socket.io/server.js</pre>, <pre>node router.js</pre> and <!-- <pre>node test_sender.js</pre> OPTIONAL --> on different cmds
