import { Server } from "socket.io";
import http from "http";
import amqp from "amqplib";

const server = http.createServer();
const io = new Server(server, {
    cors: { origin: "*" }
});

// // for local testing
// const RABBITMQ_URL = "amqp://localhost:5672"; 

// RabbitMQ hostname from Docker Compose
const RABBITMQ_URL = "amqp://rabbitmq"; 

async function connectRabbitMQ() {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue("notifications");
        console.log("✅ Connected to RabbitMQ");
        return channel;
    } catch (error) {
        console.error("❌ Failed to connect to RabbitMQ:", error);
    }
}

async function startServer() {
    const channel = await connectRabbitMQ();
    if (!channel) return;

    // Consume messages from RabbitMQ
    channel.consume("Data", (msg) => {
        console.log("⏳ Checking messages array...");
        if (msg !== null) {

            // Takes in message assumed to be a string
            const messageData = msg.content.toString();

            //Show what you received
            console.log("📥 Received from RabbitMQ:", messageData);

            // Emit the received message to all clients listening on 
            io.emit("notification", messageData);

            // Acknowledge the message
            channel.ack(msg);
        }
    });

    io.on("connection", (socket) => {
        console.log("⚡ Client connected:", socket.id);

        // Receive data from RabbitMQ about the notifications
        socket.on("sendNotif", (data) => {
            console.log("📩 Message received:", data);

            //Do smth with the data add to kong or smth

            // // Send data back to RabbitMQ that data has been received
            // io.emit("receivedNotif", data);
        });

        // Receive data from added Queue
        socket.on("addQueue", (message) => {
            console.log("📩 addQueue Message received:", message);

            //Do smth with this data connect to kong or smth

            // Send data back to Queue MS to comfirm message added
            io.emit("QAdded", message);
        })

        // Receive data from what to delete Queue
        socket.on("deleteQueue", (message) => {
            console.log("📩 Message received:", message);

            //Do smth with this data connect to kong or smth

            // Send data back to Queue MS to comfirm message added
            io.emit("Qdeleted", message);
        })
    });

    server.listen(3300, () => {
        console.log("🚀 Socket.IO server running on port 3300");
    });
}

startServer();

