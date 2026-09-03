"""
Mock data for cultural categories.
"""

MOCK_CATEGORIES: list[dict] = [
    {
        "id": "food",
        "name": "Food",
        "description": "Traditional cuisines, street food, sweets, and recipes from across India.",
        "icon": "utensils",
    },
    {
        "id": "fashion",
        "name": "Fashion",
        "description": "Traditional textiles, weaves, jewellery, and clothing styles.",
        "icon": "shirt",
    },
    {
        "id": "forts",
        "name": "Forts",
        "description": "Historic forts, palaces, and fortified heritage structures.",
        "icon": "castle",
    },
    {
        "id": "temples",
        "name": "Temples",
        "description": "Ancient temples, shrines, and places of worship.",
        "icon": "landmark",
    },
    {
        "id": "dance",
        "name": "Dance",
        "description": "Classical and folk dance forms of India.",
        "icon": "music",
    },
    {
        "id": "music",
        "name": "Music",
        "description": "Classical, folk, and devotional music traditions.",
        "icon": "headphones",
    },
    {
        "id": "art",
        "name": "Art & Crafts",
        "description": "Paintings, sculptures, handicrafts, and artisan traditions.",
        "icon": "palette",
    },
    {
        "id": "festivals",
        "name": "Festivals",
        "description": "Colorful festivals and cultural celebrations.",
        "icon": "sparkles",
    },
    {
        "id": "languages",
        "name": "Languages",
        "description": "India's linguistic heritage and scripts.",
        "icon": "languages",
    },
]

# Categories available per state — extends base set
STATE_CATEGORY_MAP: dict[str, list[str]] = {
    "mh": ["food", "forts", "temples", "dance", "music", "art", "festivals", "fashion"],
    "rj": ["food", "forts", "temples", "dance", "music", "art", "festivals", "fashion"],
    "gj": ["food", "temples", "dance", "festivals", "art", "fashion"],
    "kl": ["food", "temples", "dance", "art", "festivals", "fashion"],
    "as": ["food", "dance", "art", "festivals", "fashion", "music"],
    "tn": ["food", "temples", "dance", "music", "art", "festivals", "fashion"],
}
