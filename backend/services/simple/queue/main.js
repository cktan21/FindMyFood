import "https://deno.land/std@0.128.0/dotenv/load.ts";

// Import the Supabase client from esm.sh
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

//Import Socket.io from CDN
// import { io } from "https://esm.sh/socket.io-client@4.7.2";
// if got error 
import { io } from "https://esm.sh/socket.io-client@4.7.2?no-deps";

import { Hono } from "@hono/hono";

// intialise suppbase cred
const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseKey = Deno.env.get("SUPABASE_KEY");
const supabase = createClient(supabaseUrl, supabaseKey);

//connecting to socket.io on port 3300
const socket = io("http://localhost:3300");

//Create API framework
const app = new Hono();

//Check service is alive 
app.get("/", (c) => {
    return c.text('alive (AW yeah 😎😎)');
});

app.get("/qStatus", async (c) => {
    const holder = {};

    try {
        // Step 1: Fetch microservice data
        const response = await fetch("http://127.0.0.1:5001/all");
        if (!response.ok) throw new Error(`Microservice error: ${response.status}`);
        const data = await response.json();

        // Validate data structure (ensure it's an object)
        if (Array.isArray(data)) {
            throw new Error("Microservice data must be an object, not an array");
        }

        // Step 2: Fetch Supabase data for each key
        for (let key of Object.keys(data)) {
            const { data: tableData, error } = await supabase
                .from(key.toLowerCase())
                .select("*");
            if (error) throw new Error(`Supabase error [${key}]: ${error.message}`);
            holder[key] = tableData;
        }

        // Return success response
        return c.json({ data: holder }, 200);
    } catch (error) {
        // Return error response
        console.error("Request failed:", error);
        return c.json({ error: error.message }, 500);
    }
});


app.post("/dump", async (c) => {
    const { food, restraunt, id, role } = await c.req.json();

    // if data is recceived from the 
    if (role === "Personal") {
        // Insert data into Supabase
        const { data: insertedData, error } = await supabase
            .from(restraunt)
            .insert([
                {
                    food: food,
                    user_id: id,
                },
            ]);

        if (error) {
            return c.json({ error: error.message }, 500);
        }

        // Sends dagta to Socket.IO clients
        io.emit("addQueue", { restraunt, data: insertedData });

        // Comfirms that the queue has been added => order comfirmation basically
        return c.json({ message: "queue added", data: insertedData });
    }


    // if data is received from the client => order is doner => gotta delete the order from db
    if (role === "Client ") {
        // Delete data from Supabase
        const { data: deletedData, error } = await supabase
            .from(restraunt)
            .delete()
            .eq("id", id);

        if (error) {
            return c.json({ error: error.message }, 500);
        }

        // Notify Socket.IO clients
        io.emit("deleteQueue", { table, data: deletedData });
        return c.json({ message: "Data deleted", data: deletedData });
    }

    return c.json({ error: "Invalid action" }, 400);
});

// receive comfirmation from socket.io that add order has received
socket.on("QAdded", (a) => {
    console.log("📩 Sever has Received Add Message:", a);
});

// receive comfirmation from socket.io delete order has been received
socket.on("Qdeleted", (d) => {
    console.log("📩 Sever has Received Delete Message:", d);
});

Deno.serve({ port: 8888 }, app.fetch);