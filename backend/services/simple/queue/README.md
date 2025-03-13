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

>http://localhost:8008//qStatus OR http://127.0.0.1:8008/qStatus
>GET Request

>console

```bash 
Queue Data Succesfully Sent 🚀🚀🚀🚀
```

<h3>Sample Output</h3>

```json
{
    "data": {
        "Bricklane": [
            {
                "id": 2,
                "food": "Torched_Mentaiko_Fries",
                "user_id": "Jun Wei",
                "time": "2025-03-08T15:30:22.992916"
            },
            {
                "id": 3,
                "food": "Kimchi_Carbonara",
                "user_id": "Dorothy",
                "time": "2025-03-08T16:29:22.992916"
            },
            {
                "id": 4,
                "food": "Korean_Fried_Chicken",
                "user_id": "Jason",
                "time": "2025-03-08T16:38:22.992916"
            }
        ],
        "Chops": [
            {
                "id": 1,
                "food": "Grilled_Meats",
                "user_id": "Sweetha",
                "time": "2025-03-08T13:34:22.992916"
            },
            {
                "id": 2,
                "food": "Grilled_Lamb_Chop",
                "user_id": "Lay Foo",
                "time": "2025-03-08T13:35:10.992916"
            },
            {
                "id": 3,
                "food": "Truffle_Fries",
                "user_id": "Dory",
                "time": "2025-03-08T13:35:18.992916"
            }
        ],
        "Daijoubu": [],
        "Ima_Sushi": [],
        "Khoon_Coffeehouse_Express": [],
        "King_Kong_Curry": [],
        "Kuro_Kare": [],
        "Nasi_Lemak_Ayam_Taliwang": [],
        "ONALU_Bagel_Haus": [],
        "Park_s_Kitchen": [],
        "Pasta_Express": [],
        "Supergreen": [],
        "Turks_Kebab": []
    },
    "type": "queue"
}
```
<h4>NOTE</h4> 
- Queue will send the above output automatically to queue every 20000ms or 0.33min
- Add/Deletion of queue will result in 

<h2>Adding Queue (User bought the food)</h2>

>http://localhost:8008/dump OR http://127.0.0.1:8008/dump
>POST Request

<h3>Expected Payload</h3>

```json
{
    "food" : "Grilled_Teriyaki_Chicken_Donburi",
    "restaurant" : "Bricklane",
    "id": "Kendrick", // this refer to user id 
    "action": "add"
}
```

<h3>Expected Output</h3>

>console print

```json
{
    "message": "Added (➕) Queue to Bricklane",
    "data": [
        {
            "id": 16,
            "food": "Grilled_Teriyaki_Chicken_Donburi",
            "user_id": "Kendrick",
            "time": "2025-03-09T16:35:46.943265"
        }
    ]
}
```

>socket.io(server.js) data received

```json
{
    "restaurant": "Bricklane",
    "data": [
        {
            "id": 16,
            "food": "Grilled_Teriyaki_Chicken_Donburi",
            "user_id": "Kendrick",
            "time": "2025-03-09T16:35:46.943265"
        }
    ],
    "type": "queue"
}
```


<h2>Deleting Queue (Store finished cooking)</h2>

>http://localhost:8008/dump OR http://127.0.0.1:8008/dump
>POST Request

<h3>Expected Payload</h3>

```json
{
    "food" : "Grilled_Teriyaki_Chicken_Donburi",
    "restaurant" : "Bricklane",
    "id": "1", //this refers to queue id btw pls don't confuse
    "action": "delete"
}
```

<h3>Expected Output</h3>

>console print

```json
{
    "message": "Deleted (➖) Queue from Bricklane",
    "data": [
        {
            "id": 8,
            "food": "Grilled_Teriyaki_Chicken_Donburi",
            "user_id": "Kendrick",
            "time": "2025-03-09T16:08:09.483586"
        }
    ]
}
```

>socket.io(server.js) data received

```json
{
    "restaurant": "Bricklane",
    "data": [
        {
            "id": 8,
            "food": "Grilled_Teriyaki_Chicken_Donburi",
            "user_id": "Kendrick",
            "time": "2025-03-09T16:08:09.483586"
        }
    ],
    "type": "queue"
}
```


<br>
<br>
<h2>NOTE to self</h2> 
- See for restraunt if want to send it with the first word captialised or not