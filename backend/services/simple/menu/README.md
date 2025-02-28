## Instructions
```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python api.py
```

To deactivate server:
```bash
deactivate
```

<h1>How to use</h1>

>To call all restraunts + photo of menu
>/all

<h3>Sample Output</h3>

```json
{
    "Khoons": {
        "Spagetti": {
            "Cabonara": 5,
            "Tomato ": 6
        },
        "Waffles": {
            "Caramel ": 3,
            "Chocolate": 2,
            "Peanut": 2
        },
        "photos": [
            "https://firebasestorage.googleapis.com/v0/b/menu-b8c1f.firebasestorage.app/o/Khoons%2FKhoons1.png?alt=media",
            "https://firebasestorage.googleapis.com/v0/b/menu-b8c1f.firebasestorage.app/o/Khoons%2FKhoons2.png?alt=media"
        ]
    },
    "KingKongCurry": {
        "Curry": {
            "CheeseMayo": 6,
            "SpicyMayo": 5,
            "TruffleMayo": 8,
            "WasabiMayo": 6
        },
        "photos": [
            "https://firebasestorage.googleapis.com/v0/b/menu-b8c1f.firebasestorage.app/o/KingKongCurry%2Fkkc.png?alt=media"
        ]
    }
}
```

<br>
<br>

>To call one restraunt
>/restraunt_name

<h3>Sample Output (/BigBangCurry)</h3>

```json
{
    "Curry": {
        "CheeseMayo": 6,
        "SpicyMayo": 5,
        "TruffleMayo": 8,
        "WasabiMayo": 6
    },
    "photos": [
        "https://firebasestorage.googleapis.com/v0/b/menu-b8c1f.firebasestorage.app/o/KingKongCurry%2Fkkc.png?alt=media"
    ]
}
```

<br>
<br>
<h2>NOTE</h2> 
Ensure that any names should NOT have any spacings