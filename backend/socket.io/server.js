import axios from "axios";
import { Server } from "socket.io";
import http from "http";
import amqp from "amqplib";

const server = http.createServer();
const io = new Server(server, {
    cors: { origin: "*" }
});

// Uses env variable from docker if available, otherwise use localhost with guest credentials
const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://guest:guest@localhost:5672";

async function connectRabbitMQ() {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue("notifications");
        // prefetch how many messages before acknowledging them
        const PREFETCH_COUNT = 10; // Adjust as needed
        channel.prefetch(PREFETCH_COUNT);
        console.log("✅ Connected to RabbitMQ");
        return channel;
    } catch (error) {
        console.error("❌ Failed to connect to RabbitMQ:", error);
    }
}

const KONG_URL = process.env.KONG_URL || "http://localhost:8000"; // Kong API Gateway URL

async function sendToKong(endpoint, payload) {
    try {
        const response = await axios.post(`${KONG_URL}${endpoint}`, payload, {
            headers: { "Content-Type": "application/json" }
        });
        console.log(`✅ Sent to Kong: ${endpoint}`, response.data);
    } catch (error) {
        console.error(`❌ Failed to send to Kong: ${endpoint}`, error.response?.data || error.message);
    }
}

async function startServer() {
    const channel = await connectRabbitMQ();
    if (!channel) return;

    io.on("connection", (socket) => {
        console.log("⚡ Client connected:", socket.id);

        // // Receive data from RabbitMQ about the notifications
        // socket.on("notification", (data) => {
        //     console.log("📩 Message received:", data);

        //     //Do smth with the data add to kong or smth
        //     sendToKong("/notifications", data); // Forward to Kong
        //     // // Send data back to RabbitMQ that data has been received
        //     io.emit("receivedNotif", data);
        // });

        // Consume messages from RabbitMQ queue, notifcations
        channel.consume("notifications", (msg) => {
            console.log("Waiting ⏳ for Notifications...");
            if (msg !== null) {

                // Parse the message content as JSON
                let messageData;
                try {
                    messageData = JSON.parse(msg.content.toString());
                } catch (error) {
                    console.error("❌ Failed to parse JSON:", error.message);
                    channel.ack(msg); // Acknowledge the message even if parsing fails
                    return;
                }

                //Show what you received
                console.log("📥 Received from RabbitMQ:", messageData);

                // Emit the received message to all clients listening on notifcation
                io.emit("notification", messageData);

                // sendToKong("/notifications", {data: messageData, type: 'notification'}); // Forward to Kong

                // Acknowledge the message
                channel.ack(msg);
            }
        });


        // Receive data of all the queuen
        socket.on("allQueue", (message) => {
            console.log("📩 aLLQueue Message received:", message);

            //Do smth with this data connect to kong or smth
            sendToKong("/queue/all", message); // Forward to Kong

            // Send data back to Queue MS to comfirm message added
            io.emit("receivedAllQueue", message);
        })

        // Receive data from added Queue
        socket.on("addQueue", (message) => {
            console.log("📩 addQueue Message received:", message);

            //Do smth with this data connect to kong or smth
            sendToKong("/queue/add", message); // Forward to Kong

            // Send data back to Queue MS to comfirm message added
            io.emit("QAdded", message);
        })

        // Receive data from what to delete Queue
        socket.on("deleteQueue", (message) => {
            console.log("📩 deleteQueue Message received:", message);

            //Do smth with this data connect to kong or smth
            sendToKong("/queue/delete", message); // Forward to Kong

            // Send data back to Queue MS to comfirm message added
            io.emit("Qdeleted", message);
        })
    });

    server.listen(3300, () => {
        console.log("🚀 Socket.IO server running on port 3300");
    });
}

startServer();

