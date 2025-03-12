## Instructions
```bash
#Install All Dependencie
npm i

#Rabbit MQ Initialisation
cd /backend/utils/rabbitmq
docker compose up -d
python amqp_setup.py

#Socket.io Initialisation
cd backend/utils/socket.io
node socket.io/server.js

# sends dummy HelloMQ! in intervals of 1 second to router.js ONLY FOR TESTING
# node test_sender.js 

# Consumes Messages stored in RabbitMQ and sends it directlty to Socket.io
node router.js 
```

To deactivate server:
```bash
ctlr 'c' 
```

<br>
<br>
<h2>NOTE</h2> 
Ensure that you start <pre>node socket.io/server.js</pre>, <pre>node router.js</pre> and <!-- <pre>node test_sender.js</pre> OPTIONAL --> on different cmds
