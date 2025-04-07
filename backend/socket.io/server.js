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
        // // prefetch how many messages before acknowledging them
        // const PREFETCH_COUNT = 10; // Adjust as needed
        // channel.prefetch(PREFETCH_COUNT);
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
    let connection; // Store the connection globally to close it later
    try {
        connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue("notifications");
        console.log("✅ Connected to RabbitMQ");

        io.on("connection", (socket) => {
            console.log("⚡ Client connected:", socket.id);

            // Consume messages from RabbitMQ queue
            channel.consume("notifications", (msg) => {
                if (msg !== null) {
                    let messageData;
                    try {
                        messageData = JSON.parse(msg.content.toString());
                    } catch (error) {
                        console.error("❌ Failed to parse JSON:", error.message);
                        channel.ack(msg); // Acknowledge the message even if parsing fails
                        return;
                    }

                    console.log("📥 Received from RabbitMQ:", messageData);
                    io.emit("notification", messageData);
                    channel.ack(msg); // Acknowledge the message
                }
            });

            // Handle "allQueue" event
            socket.on("allQueue", (message) => {
                console.log("📩 allQueue Message received:", message);
                sendToKong("/queue/all", message);
                io.emit("receivedAllQueue", message);
            });

            // Handle "addQueue" event
            socket.on("addQueue", (message) => {
                console.log("📩 addQueue Message received:", message);
                sendToKong("/queue/add", message);
                io.emit("QAdded", message);
            });

            // Handle "deleteQueue" event
            socket.on("deleteQueue", (message) => {
                console.log("📩 deleteQueue Message received:", message);
                sendToKong("/queue/delete", message);
                io.emit("Qdeleted", message);
            });

            // Handle client disconnection
            socket.on("disconnect", () => {
                console.log("🔌 Client disconnected:", socket.id);
            });
        });

        server.listen(3300, () => {
            console.log("🚀 Socket.IO server running on port 3300");
        });
    } catch (error) {
        console.error("❌ Failed to connect to RabbitMQ:", error);
    }

    // Gracefully close the connection when the process exits
    process.on("SIGINT", async () => {
        try {
            if (connection) {
                console.log("⏳ Closing RabbitMQ connection...");
                await connection.close(); // Close the connection
                console.log("✅ RabbitMQ connection closed.");
            }
        } catch (error) {
            console.error("❌ Error while closing RabbitMQ connection:", error);
        } finally {
            process.exit(0); // Exit the process
        }
    });
}

startServer();
