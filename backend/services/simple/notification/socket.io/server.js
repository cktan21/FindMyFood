import { Server } from "socket.io";
import http from "http";

const server = http.createServer();
const io = new Server(server, {
    cors: { origin: "*" } // Allow all origins (for testing)
});

// Handle client connections
io.on("connection", (socket) => {
    console.log("⚡ Client connected:", socket.id);

    // Receive data from clients
    socket.on("sendMessage", (data) => {
        console.log("📩 Message received:", data);

        // Send data back to all clients
        io.emit("receiveMessage", data);
    });

    // Handle client disconnection
    socket.on("disconnect", () => {
        console.log("❌ Client disconnected:", socket.id);
    });
});

// Start the server on port 3300
server.listen(3300, () => {
    console.log("🚀 Socket.IO server running on port 3300");
});
