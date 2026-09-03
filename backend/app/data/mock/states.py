"""
Mock data for Indian states.
Covers Maharashtra + 5 additional states so the India map is not empty.
"""

MOCK_STATES: list[dict] = [
    {
        "id": "mh",
        "name": "Maharashtra",
        "code": "MH",
        "capital": "Mumbai",
        "region": "Western India",
        "description": (
            "Maharashtra is India's second-most populous state and the country's "
            "economic powerhouse. Stretching from the Western Ghats to the Deccan "
            "Plateau, it is home to ancient cave temples, mighty sea forts, and a "
            "vibrant street-food culture that has captured the world's imagination."
        ),
        "cultural_summary": (
            "A land where Maratha warrior culture, Warkari devotional traditions, "
            "Lavani folk dance, and the cosmopolitan energy of Mumbai coexist. "
            "Maharashtrian cuisine, from Vada Pav to Puran Poli, tells the story "
            "of a people rooted in the land yet open to the world."
        ),
        "languages": ["Marathi", "Hindi", "English"],
        "theme": {
            "primary_color": "#FF6B00",
            "accent_color": "#FFCC00",
            "banner_keyword": "gateway-of-india",
        },
        "thumbnail_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Gateway_of_India.jpg/320px-Gateway_of_India.jpg",
    },
    {
        "id": "rj",
        "name": "Rajasthan",
        "code": "RJ",
        "capital": "Jaipur",
        "region": "North-Western India",
        "description": (
            "Rajasthan, the 'Land of Kings', is India's largest state by area. "
            "Its golden deserts, majestic forts, and vibrant folk traditions "
            "make it one of the most recognisable faces of India to the world."
        ),
        "cultural_summary": (
            "From the pink city of Jaipur to the blue city of Jodhpur, Rajasthan "
            "dazzles with its Rajput architecture, intricate miniature paintings, "
            "Ghoomar dance, and the soulful Manganiyar music of the desert."
        ),
        "languages": ["Rajasthani", "Hindi"],
        "theme": {
            "primary_color": "#E05C00",
            "accent_color": "#FFD700",
            "banner_keyword": "amber-fort",
        },
        "thumbnail_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Hawa_Mahal_Jaipur_2010.jpg/320px-Hawa_Mahal_Jaipur_2010.jpg",
    },
    {
        "id": "gj",
        "name": "Gujarat",
        "code": "GJ",
        "capital": "Gandhinagar",
        "region": "Western India",
        "description": (
            "Gujarat is India's westernmost state, home to the Indus Valley "
            "heritage site of Dholavira, the Gir lion sanctuary, and the birthplace "
            "of Mahatma Gandhi. Its coast has been a centre of trade for millennia."
        ),
        "cultural_summary": (
            "Gujaratis are renowned for their entrepreneurial spirit, vegetarian "
            "cuisine, Garba and Dandiya Raas dance at Navratri, and elaborate "
            "Bandhani tie-dye textiles that are exported across the globe."
        ),
        "languages": ["Gujarati", "Hindi"],
        "theme": {
            "primary_color": "#009B77",
            "accent_color": "#FFBC00",
            "banner_keyword": "rann-of-kutch",
        },
        "thumbnail_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Somnath_temple_Gujarat.jpg/320px-Somnath_temple_Gujarat.jpg",
    },
    {
        "id": "kl",
        "name": "Kerala",
        "code": "KL",
        "capital": "Thiruvananthapuram",
        "region": "South India",
        "description": (
            "Kerala, 'God's Own Country', is nestled between the Western Ghats and "
            "the Arabian Sea. Its backwaters, spice plantations, and 100% literacy "
            "rate make it one of India's most progressive and picturesque states."
        ),
        "cultural_summary": (
            "Kerala's cultural life revolves around Kathakali dance-drama, "
            "Mohiniyattam, the martial art Kalaripayattu, the elaborate Onam "
            "festival, and a seafood-rich cuisine fragrant with coconut and curry."
        ),
        "languages": ["Malayalam", "English"],
        "theme": {
            "primary_color": "#2E8B57",
            "accent_color": "#FFD700",
            "banner_keyword": "alleppey-backwaters",
        },
        "thumbnail_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Kerala_backwaters.jpg/320px-Kerala_backwaters.jpg",
    },
    {
        "id": "as",
        "name": "Assam",
        "code": "AS",
        "capital": "Dispur",
        "region": "North-East India",
        "description": (
            "Assam is the gateway to India's North-East, famous for its one-horned "
            "rhinoceros, Brahmaputra river, and the world's finest tea gardens. "
            "Its silk weaving tradition is among the oldest in Asia."
        ),
        "cultural_summary": (
            "The Bihu festival is Assam's heartbeat — celebrated three times a year "
            "with the energetic Bihu dance and music. Assamese silk, especially "
            "Muga and Pat silk, is celebrated worldwide for its golden sheen."
        ),
        "languages": ["Assamese", "Bengali", "Bodo"],
        "theme": {
            "primary_color": "#228B22",
            "accent_color": "#FFA500",
            "banner_keyword": "kaziranga",
        },
        "thumbnail_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Sivasagar_Sivadol.jpg/320px-Sivasagar_Sivadol.jpg",
    },
    {
        "id": "tn",
        "name": "Tamil Nadu",
        "code": "TN",
        "capital": "Chennai",
        "region": "South India",
        "description": (
            "Tamil Nadu is the cradle of one of the world's oldest living "
            "civilisations. Its Dravidian temple architecture, classical Tamil "
            "literature dating back 2,000 years, and Carnatic music tradition "
            "continue to thrive today."
        ),
        "cultural_summary": (
            "Home to Bharatanatyam, the mother of Indian classical dance, Tamil "
            "Nadu's culture is expressed through grand Gopuram temple towers, the "
            "Pongal harvest festival, filter coffee culture, and silk sarees woven "
            "in Kanchipuram that are heirlooms passed down generations."
        ),
        "languages": ["Tamil", "English"],
        "theme": {
            "primary_color": "#8B0000",
            "accent_color": "#FFD700",
            "banner_keyword": "meenakshi-temple",
        },
        "thumbnail_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Meenakshi_Amman_Temple.jpg/320px-Meenakshi_Amman_Temple.jpg",
    },
]
