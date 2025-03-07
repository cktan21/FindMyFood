// export function add(a: number, b: number): number {
//   return a + b;
// }

// // Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
// if (import.meta.main) {
//   console.log("Add 2 + 3 =", add(2, 3));
// }

import { io } from "socket.io-client";
import { Hono } from "@hono/hono";

const socket = io("http://localhost:3300");
const app = new Hono();

app.get("/", (c) => {
    return c.text('Alive')
})

Deno.serve({ port: 8888 }, app.fetch);