//Sender sends a message 'Hello RabbitMQ' to rabbitmq every 1 second
//NOTE ONLY USE FOR TESTING NOT FOR ACTUAL PRODUCT

import amqp from 'amqplib';

// optional load index that customise payload amount eg load=10 will send 10 messages every second
async function sendMessage(load=1) { //sends a message directltly to the queue 'Data '
    try {
        // Step 1: Connect to RabbitMQ
        const connection = await amqp.connect('amqp://localhost:5672');

        // Step 2: Create a channel
        const channel = await connection.createChannel();

        // Step 3: Define the queue 
        const queue = 'Data';
        await channel.assertQueue(queue, { durable: true });

        // Step 4: Send a message
        const msg = 'Hello RabbitMQ!';

        for (let index = 0; index <load; index++) {
            channel.sendToQueue(queue, Buffer.from(msg));
            console.log(` [x] Sent '${msg}'`);
        }
        // Step 5: Close the connection
        // setTimeout(() => {
        //     connection.close();
        //     process.exit(0);
        // }, 500);
    } 
    catch (error) {
        console.error('Error:', error);
    }
}

// message sets to be sent every 1 second can be changed accordingly
setInterval(sendMessage, 1000);
