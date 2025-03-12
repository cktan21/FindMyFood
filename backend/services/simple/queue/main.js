import "https://deno.land/std@0.128.0/dotenv/load.ts";

// Import the Supabase client from esm.sh
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

//Import Socket.io from CDN
// import { io } from "https://esm.sh/socket.io-client@4.7.2";
// if got error 
import { io } from "https://esm.sh/socket.io-client@4.7.2";

import { Hono } from "@hono/hono";

// intialise suppbase cred
const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseKey = Deno.env.get("SUPABASE_KEY");
const supabase = createClient(supabaseUrl, supabaseKey);

//connecting to socket.io on port 3300
const socket = io("http://localhost:3300", {
    reconnection: true, // Enable automatic reconnection
});

//Create API framework
const app = new Hono();

//Check service is alive 
app.get("/", (c) => {
    return c.text('alive (AW yeah 😎😎)');
});

// Manually gets the data from the file upon being called (consider just sending to a websocket directly)
app.get("/qStatus", async (c) => {
    const holder = {};

    try {
        const { data, error } = await supabase.rpc('get_all_tables');

        if (error) {
            throw new Error(`Supabase error: ${error.message}`); // Handle query errors <button class="citation-flag" data-index="2"><button class="citation-flag" data-index="4">
        }

        // Step 2: Fetch Supabase data for each key
        for (let entry of data) {
            var key = entry['name']
            const { data: tableData, error } = await supabase
                .from(key)
                .select("*");
            if (error) throw new Error(`Supabase error [${key}]: ${error.message}`);
            holder[key] = tableData;
        }
        // Make sure the data has been successfully sent
        console.log('Queue Data Succesfully Sent 🚀🚀🚀🚀')
        // Return success response
        return c.json(holder, 200);
    } catch (error) {
        // Return error response
        console.error("Request failed:", error);
        return c.json({ error: error.message }, 500);
    }

});


app.post("/dump", async (c) => {
    const { food, restaurant, id, role } = await c.req.json();
    // if data is recceived from the 
    if (role == "Personal") {

        // Insert data into Supabase
        const { data: insertedData, error } = await supabase
            .from(restaurant.toLowerCase())
            .insert([
                {
                    food: food,
                    user_id: id,
                },
            ])
            .select();

        if (error) {
            return c.json({ error: error.message }, 500);
        }

        // Sends dagta to Socket.IO clients
        socket.emit("addQueue", { restaurant, data: insertedData, type: 'queue'});

        // Comfirms that the queue has been added => order comfirmation basically
        return c.json({ message: `Added (➕) Queue to ${restaurant}`, data: insertedData });
    }

    console.log(role)
    // if data is received from the client => order is doner => gotta delete the order from db
    if (role == "Store") {
        // Delete data from Supabase
        const { data: deletedData, error } = await supabase
            .from(restaurant.toLowerCase())
            .delete()
            .eq("id", id)
            .select();

        if (error) {
            return c.json({ error: error.message }, 500);
        }

        // Notify Socket.IO clients
        socket.emit("deleteQueue", { restaurant, data: deletedData, type: 'queue'});
        return c.json({ message: `Deleted (➖) Queue from ${restaurant}` , data: deletedData });
    }

    return c.json({ error: "Invalid action" }, 400);
});

// receive comfirmation from socket.io that add order has received
socket.on("QAdded", (a) => {
    console.log("📩 Sever has Received Added Data:", a);
});

// receive comfirmation from socket.io delete order has been received
socket.on("Qdeleted", (d) => {
    console.log("📩 Sever has Received Deleted Data:", d);
});

// changed from 8008 -> 5000 in order to serve in docker properly 
Deno.serve({ hostname: "0.0.0.0", port: 8008 }, app.fetch);