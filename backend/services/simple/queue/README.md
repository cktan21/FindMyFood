## Instructions
```bash
curl -fsSL https://deno.land/x/install/install.sh | sh #install deno
cd backend/services/simple/queue
deno add jsr:@hono/hono

deno run -A main.ts
```

To deactivate server:
```bash
deactivate
```

<h1>Expected input</h1>

<h4>Adding Queue (MF buy the food)</h4>

```json
{
    "food" : "Grilled_Teriyaki_Chicken_Donburi",
    "restraunt" : "Bricklane",
    "id": "Kendrick",
    "role": "Personal"
}
```

<h4>Deleting Queue (mf finsih the food)</h4>

```json
{
    "food" : "Grilled_Teriyaki_Chicken_Donburi",
    "restraunt" : "Bricklane",
    "qid": "1",
    "role": "Chef"
}
```

<h1>How to Use</h1>

>To call all restraunts + photo of menu
>/all

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
    }
}
```

<br>
<br>

>To call one restraunt
>/restraunt_name

<h3>Sample Output (/Bricklane)</h3>

```json
{
    "Fusion_Bowls": { //category of the item 
        "Grilled_Teriyaki_Chicken_Donburi": { // item itself
            "desc": "Rice bowl featuring grilled teriyaki chicken slices.", // description of the item
            "photo": "https://storage.googleapis.com/menu-b8c1f.firebasestorage.app/Bricklane/items/Grilled_Teriyaki_Chicken_Donburi.jpg", // photo url of the item
            "price": 6.9
        },
        "Kimchi_Carbonara": {
            "desc": "Spicy kimchi + creamy pasta.",
            "photo": "https://storage.googleapis.com/menu-b8c1f.firebasestorage.app/Bricklane/items/Kimchi_Carbonara.jpg",
            "price": 9.5
        },
        "Torched_NZ_Ribeye_Beef_Cubes_Donburi": {
            "desc": "Rice bowl topped with torched New Zealand ribeye beef cubes.",
            "photo": "https://storage.googleapis.com/menu-b8c1f.firebasestorage.app/Bricklane/items/Torched_NZ_Ribeye_Beef_Cubes_Donburi.jpg",
            "price": 10.9
        }
    },
    "Snacks": {
        "Bulgogi_Tacos": {
            "desc": "Korean beef in crispy tacos.",
            "photo": "https://storage.googleapis.com/menu-b8c1f.firebasestorage.app/Bricklane/items/Bulgogi_Tacos.jpg",
            "price": 8.0
        },
        "Korean_Fried_Chicken": {
            "desc": "Crispy fried chicken with spicy gochujang glaze.",
            "photo": "https://storage.googleapis.com/menu-b8c1f.firebasestorage.app/Bricklane/items/Korean_Fried_Chicken.jpg",
            "price": 7.5
        },
        "Torched_Mentaiko_Fries": {
            "desc": "Fries topped with torched mentaiko sauce, ideal for sharing.",
            "photo": "https://storage.googleapis.com/menu-b8c1f.firebasestorage.app/Bricklane/items/Torched_Mentaiko_Fries.jpg",
            "price": 8.9
        }
    },
    "logo_url": [
        "https://storage.googleapis.com/menu-b8c1f.firebasestorage.app/Bricklane/logo/BricklaneLOGO.jpg" // logo url to be used on the clickable icon
    ],
    "menu_url": [
        "https://storage.googleapis.com/menu-b8c1f.firebasestorage.app/Bricklane/menu/Bricklane1.png", // menu picture url to be used to display picture of the menu
        "https://storage.googleapis.com/menu-b8c1f.firebasestorage.app/Bricklane/menu/Bricklane2.png",
        "https://storage.googleapis.com/menu-b8c1f.firebasestorage.app/Bricklane/menu/Bricklane3.png"
    ]
}
```

<br>
<br>
<h2>NOTE to self</h2> 
consider just compiling it to binary and dockerising that
"deno run -A --watch main.ts"  //-A bypass manual authorisations --watch allows for automatic restarts