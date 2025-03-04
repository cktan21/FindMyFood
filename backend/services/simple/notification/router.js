import amqp from 'amqplib';
import { io } from "socket.io-client";

//Intialise Socket Connection on port 3300
const socket = io("http://localhost:3300");

//Intialise an array to store received messages
var messages_arr = [];

//Connect to RabbitMQ
amqp.connect('amqp://localhost:5672')
    .then((connection) => {
        return connection.createChannel();
    })
    .then((channel) => {
        //Connects to queue (Define the queue if not queue doesn't exisit)
        const queue = 'Data';
        return channel.assertQueue(queue, { durable: true }).then(() => channel);
    })
    .then((channel) => {

        // console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", 'myQueue');

        //Consume messages
        channel.consume(
            'Data', //Queue name
            (msg) => {
                if (msg !== null) {
                    // Extract the message content
                    const messageContent = msg.content.toString(); // message content is directly converted to a string can consider toJSON once payload format is finalised

                    // Push the message content into the array
                    messages_arr.push(messageContent);

                    // Log the received message and the current state of the array
                    console.log(" [x] Received '%s'", messageContent);

                    // Acknowledge the message
                    channel.ack(msg);
                }
            },
            { noAck: false } // Ensure manual acknowledgment ie Message must be acknowledged
        );

    })
    .catch((error) => {
        console.error('Error:', error);
    });

//Check if a message has been sent from rabbit MQ every 2 seconds
setInterval(
    function () {
        console.log("⏳ Checking messages array...");
        if (messages_arr.length>0){
            console.log("Current messages:", messages_arr); // Always log array elements

            // Send data to socket.io
            socket.emit(
                "sendMessage", 
                { 
                    user: "Notification", message: messages_arr
                }
            );
            
            // receive message comfirmation
            socket.on("receiveMessage", (data) => {
                console.log("📩 Sever has Received Message:", data);
            });
        }
        messages_arr = []
    }, 2000
)






