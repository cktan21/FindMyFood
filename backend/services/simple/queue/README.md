## Instructions
```bash
#Installation
curl -fsSL https://deno.land/x/install/install.sh | sh #install deno for mac 
#OR
iwr https://deno.land/x/install/install.ps1 -useb | iex #install deno for windows(open on powershell)

#Optionally
cd 
node server.js

cd backend/services/simple/queue
deno add jsr:@hono/hono

#Running the Thing 
deno run -A --watch main.js #-A allows for all perms | --watch watches for any changes and restarts the server accordingly 
```

To deactivate server:
```bash
ctlr c
```

Compiled with 
```bash
deno compile -A -o runme main.js #very surpised it worked so well LOL
```

<h1>How to Use</h1>

<h2>Get All Queues</h2>

>http://localhost:8008/qStatus OR http://127.0.0.1:8008/qStatus
>GET Request

>console

```bash 
Queue Data Succesfully Sent 🚀🚀🚀🚀
```

<h3>Sample Output</h3>

```json
{
    "data": {
        "khoon_coffeehouse_express": [],
        "bricklane": [
            {
                "id": 8,
                "user_id": "Kendrick",
                "time": "2025-03-09T16:12:29.471876",
                "order_id": "098243"
            },
            {
                "id": 16,
                "user_id": "Kendrick",
                "time": "2025-03-09T16:35:46.943265",
                "order_id": "23890"
            },
            {
                "id": 3,
                "user_id": "Dorothy",
                "time": "2025-03-08T16:29:22.992916",
                "order_id": "2786"
            },
            {
                "id": 2,
                "user_id": "Jun Wei",
                "time": "2025-03-08T15:30:22.992916",
                "order_id": "31092"
            },
            {
                "id": 9,
                "user_id": "Kendrick",
                "time": "2025-03-09T16:13:09.902114",
                "order_id": "78132"
            },
            {
                "id": 15,
                "user_id": "Kendrick",
                "time": "2025-03-09T16:21:54.112761",
                "order_id": "974852"
            },
            {
                "id": 4,
                "user_id": "Jason",
                "time": "2025-03-08T16:38:22.992916",
                "order_id": "987243"
            },
            {
                "id": 18,
                "user_id": "Kendrick",
                "time": "2025-03-16T06:19:58.119566",
                "order_id": "9874"
            }
        ],
        "chops": [
            {
                "id": 2,
                "user_id": "Lay Foo",
                "time": "2025-03-08T13:35:10.992916",
                "order_id": "32809"
            },
            {
                "id": 3,
                "user_id": "Dory",
                "time": "2025-03-08T13:35:18.992916",
                "order_id": "92483"
            },
            {
                "id": 1,
                "user_id": "Sweetha",
                "time": "2025-03-08T13:34:22.992916",
                "order_id": "984173"
            }
        ],
        "daijoubu": [],
        "onalu_bagel_haus": [],
        "park_s_kitchen": [],
        "kuro_kare": [],
        "nasi_lemak_ayam_taliwang": [
            {
                "id": 7,
                "user_id": "Kendrick",
                "time": "2025-03-20T16:42:48.643179",
                "order_id": "c9ba07bb-7b45-40e3-9643-2a276d331e26"
            }
        ],
        "pasta_express": [],
        "turks_kebab": [],
        "supergreen": [],
        "ima_sushi": [],
        "king_kong_curry": []
    },
    "type": "queue"
}
```
<h4>NOTE</h4> 
<!-- - Queue will send the above output automatically to queue every 20000ms or 0.33min -->
- Can also be manually called using get /qStatus

<h2>Adding Queue (User bought the food)</h2>

> http://localhost:8008/add

<h3>Expected Payload</h3>

```json
{
    "restaurant" : "Nasi_Lemak_Ayam_Taliwang",
    "user_id": "Ewan",
    "order_id" : "909fff87-e51c-4ecf-aa18-0dba89e0c54f"
}
```

<h3>Expected Output</h3>

>console print

```bash
Change detected in a table:
Added (➕) Queue to Nasi_Lemak_Ayam_Taliwang
```

```json
{
    "message": "Added (➕) Queue to Bricklane",
    "data": [
        {
            "queue_no": 9, //queue position
            "user_id": "Ewan",
            "time": "2025-03-20T16:43:56.440132",
            "order_id": "909fff87-e51c-4ecf-aa18-0dba89e0c54f"
        }
    ]
}
```

- This will also send an update to socket.io

>socket.io(server.js) data received

```json
{
    "restaurant": "Nasi_Lemak_Ayam_Taliwang",
    "data": [
        {
            "queue_no": 9,
            "user_id": "Ewan",
            "time": "2025-03-20T16:43:56.440132",
            "order_id": "909fff87-e51c-4ecf-aa18-0dba89e0c54f"
        }
    ],
    "type": "queue"
}
```

<h2>Deleting Queue (Store finished cooking)</h2>

>http://localhost:8008/delete OR http://127.0.0.1:8008/delete
>POST Request

<h3>Expected Payload</h3>

```json
{
    "restaurant" : "Nasi_Lemak_Ayam_Taliwang",
    "order_id" : "909fff87-e51c-4ecf-aa18-0dba89e0c54f"
}
```

<h3>Expected Output</h3>

>console print

```bash
Change detected in a table:
A record was deleted from the "nasi_lemak_ayam_taliwang" table.
```

```json
{
    "message": "Deleted (➖) Queue from Nasi_Lemak_Ayam_Taliwang",
    "data": [
        {
            "queue_no": 9,
            "user_id": "Ewan",
            "time": "2025-03-20T16:43:56.440132",
            "order_id": "909fff87-e51c-4ecf-aa18-0dba89e0c54f"
        }
    ]
}
```

- This will also send an update to socket.io

>socket.io(server.js) data received

```json
{
    "restaurant": "Nasi_Lemak_Ayam_Taliwang",
    "data": [
        {
            "queue_no": 9,
            "user_id": "Ewan",
            "time": "2025-03-20T16:43:56.440132",
            "order_id": "909fff87-e51c-4ecf-aa18-0dba89e0c54f"
        }
    ],
    "type": "queue"
}
```
<br>
<br>
<h2></h2>
- Add/Deletion of queue will result in the qStatus being sent automatically

