import { Hono } from "hono";

import { createClient } from '@supabase/supabase-js';

// Intialise supabase cred
const supabaseUrl = Bun.env.SUPABASE_URL;
const supabaseKey = Bun.env.SUPABASE_KEY;

// Error Handling
if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing required environment variables: SUPABASE_URL or SUPABASE_KEY");
}

// Initialize the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Intiliase Hono Instance
const app = new Hono()

//Check service is alive 
app.get("/", (c) => {
    return c.text('alive (AW yeah 😎😎)');
});


// get order based on all
app.get("/orders", async (ctx) => {
    // Extract optional query parameters
    const uid = ctx.req.query('uid'); // Query parameter for user ID
    const oid = ctx.req.query('oid'); // Query parameter for order ID

    // Start building the query
    let query = supabase.from('orders').select('*');

    // Add filters conditionally
    if (uid) {
        query = query.eq('userid', uid); // Filter by user ID if provided
    }
    if (oid) {
        query = query.eq('orderid', oid); // Filter by order ID if provided
    }

    // Execute the query
    const { data, error } = await query;

    // Handle errors
    if (error) {
        return ctx.json({ message: 'Error fetching orders', error }, 500);
    }

    // Return the results
    return ctx.json(data);
});




// sum cute console stuff to show when request are being made
Bun.serve({
    fetch: async (request) => {
        console.log(`Incoming request: ${request.url}`);
        try {
            return await app.fetch(request); // Pass the request to Hono
        } catch (error) {
            console.error('Error handling request:', error);
            return new Response('Internal Server Error', { status: 500 });
        }
    },
    port: 6369,
});