## Instructions
```bash
go run main.go
```

<h1>How to Use</h1>

<h2>Order Completed</h2>

>http://localhost:7070// OR http://127.0.0.1:7070/qStatus
>POST Request

>console

```bash 
Queue Data Succesfully Sent 🚀🚀🚀🚀
```

<h3>Expected Payload</h3>


```json
{

    "food" : "Grilled_Teriyaki_Chicken_Donburi",
    "restaurant" : "Bricklane",
    "id": "1", //this refers to queue id btw pls don't confuse
    "role": "Client"
}
```

<h3>Sample Input</h3>

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



### Debugging 
```bash
go mod download #gets all the required modules
```