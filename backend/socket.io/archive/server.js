import { Server } from "socket.io";
import http from "http";

const server = http.createServer();
const io = new Server(server, {
    cors: { origin: "*" } // Allow all origins (for testing)
});

// Handle client connections
io.on("connection", (socket) => {
    console.log("⚡ Client connected:", socket.id);

    // Receive data from RabbitMQ about the notifications
    socket.on("sendNotif", (data) => {
        console.log("📩 Message received:", data);

        //Do smth with the data add to kong or smth

        // Send data back to RabbitMQ that data has been received
        io.emit("receivedNotif", data);
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

    // Handle client disconnection
    socket.on("disconnect", () => {
        console.log("❌ Client disconnected:", socket.id);
    });
});

// Start the server on port 3300
server.listen(3300, () => {
    console.log("🚀 Socket.IO server running on port 3300");
});
