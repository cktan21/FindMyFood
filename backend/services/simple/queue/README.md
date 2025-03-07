## Instructions
```bash
npm install -g deno #install deno
deno add jsr:@hono/hono


python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python api.py
```

To deactivate server:
```bash
deactivate
```

<h1>Expected input</h1>

```json
{
    "food" : "Grilled_Teriyaki_Chicken_Donburi",
    "restraunt" : "Bricklane",
    "user_id": "Kendrick",
    "time" : "2025-01-10T08:15:16"
}
```

<h1>How to Use</h1>

>To call all restraunts + photo of menu
>/all

<h3>Sample Output</h3>

```json
{
    "Bricklane": [
        {
            "food" : "Grilled_Teriyaki_Chicken_Donburi",
            "user_id": "Kendrick",
            "time" : "2025-01-10T08:15:16" //YYYY-MM-DDTHH:MM:SS
        },
        {
            "food" : "Torched_Mentaiko_Fries",
            "user_id": "Jun Wei",
            "time" : "2025-01-10T09:10:01"
        },
        {
            "food" : "Kimchi_Carbonara",
            "user_id": "Dorothy",
            "time" : "2025-01-10T09:15:10"
        },
        {
            "food" : "Korean_Fried_Chicken",
            "user_id": "Jason",
            "time" : "2025-01-10T10:00:30"
        }
    ],
    "Chops": [
        {
            "food" : "Grilled_Meats",
            "user_id": "Sweetha",
            "time" : "2025-01-10T08:10:00"
        },
        {
            "food" : "Grilled_Lamb_Chop",
            "user_id": "Lay Foo",
            "time" : "2025-01-10T11:18:08"
        },
        {
            "food" : "Truffle_Fries",
            "user_id": "Dory",
            "time" : "2025-01-10T11:18:58"
        }
    ],
    // continued ...
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