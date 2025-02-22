To call all restraunts + photo of menu
/all

Sample Output
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
            "https://storage.googleapis.com/menu-b8c1f.firebasestorage.app/Khoons/Khoons1.png",
            "https://storage.googleapis.com/menu-b8c1f.firebasestorage.app/Khoons/Khoons2.png"
        ]
    },
    "King Kong Curry": {
        "Curry": {
            "Cheese Mayo": 6,
            "Mayo Chicken": 6,
            "Truffle Mayo": 7,
            "Wasabi Chicken": 6
        },
        "photos": [
            "https://storage.googleapis.com/menu-b8c1f.firebasestorage.app/King%20Kong%20Curry/kkc.png"
        ]
    }
}


To call one restraunt
/restraunt_name

Sample Output (/Khoons)
{
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
        "https://storage.googleapis.com/menu-b8c1f.firebasestorage.app/Khoons/Khoons1.png",
        "https://storage.googleapis.com/menu-b8c1f.firebasestorage.app/Khoons/Khoons2.png"
    ]
}