"""
Mock data for festivals.
"""

MOCK_FESTIVALS: list[dict] = [
    {
        "id": "ganesh-chaturthi",
        "name": "Ganesh Chaturthi",
        "state_id": "mh",
        "states": ["mh", "gj", "tn", "kl"],
        "month": "August/September",
        "duration_days": 10,
        "short_description": "The grand 10-day festival celebrating Lord Ganesha's birthday.",
        "description": (
            "Ganesh Chaturthi is the most celebrated festival in Maharashtra. "
            "For 10 days, large clay idols of Lord Ganesha are installed in homes and "
            "community pandals across the state. The celebrations include prayers, music, "
            "cultural performances, and end with the immersion (visarjan) of the idol in "
            "a water body. Mumbai's Lalbaugcha Raja pandal attracts millions of visitors. "
            "The festival was revived by freedom fighter Bal Gangadhar Tilak in 1893 "
            "as a way to unite Indians against British rule."
        ),
        "rituals": [
            "Idol installation (Prana Pratishtha)",
            "Daily puja and aarti",
            "Modak offering to Ganesha",
            "Cultural performances (Lavani, music)",
            "Procession and immersion (Visarjan) on day 10",
        ],
        "foods": ["Modak", "Puran Poli", "Karanji"],
        "significance": (
            "Beyond religious significance, the festival has deep political roots — "
            "it was used by freedom fighters to hold public gatherings during colonial rule. "
            "Today it is Maharashtra's biggest community celebration."
        ),
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Ganesh_Chaturthi_Mumbai.jpg/320px-Ganesh_Chaturthi_Mumbai.jpg",
        "gallery_urls": [],
    },
    {
        "id": "gudi-padwa",
        "name": "Gudi Padwa",
        "state_id": "mh",
        "states": ["mh"],
        "month": "March/April",
        "duration_days": 1,
        "short_description": "Maharashtrian New Year celebrated with colourful gudis hoisted at doorsteps.",
        "description": (
            "Gudi Padwa marks the Maharashtrian and Konkani New Year on the first day "
            "of the Hindu month of Chaitra (usually March-April). A gudi — a bamboo stick "
            "adorned with a bright silk cloth, neem leaves, mango leaves, and an upturned "
            "copper or silver pot — is hoisted outside homes as a symbol of victory and "
            "prosperity. Women draw elaborate rangoli patterns and families feast on "
            "traditional food including Puran Poli and the traditional bitter-sweet "
            "prasad of neem, gul (jaggery), and tamarind."
        ),
        "rituals": ["Hoisting the Gudi", "Oil bath", "Wearing new clothes", "Rangoli", "Puja"],
        "foods": ["Puran Poli", "Shrikhand", "Soonth (neem-jaggery mix)", "Shira"],
        "significance": "Celebrates the beginning of a new year and commemorates Shivaji's victory.",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Gudi_Padwa.jpg/320px-Gudi_Padwa.jpg",
        "gallery_urls": [],
    },
    {
        "id": "diwali-mh",
        "name": "Diwali",
        "state_id": None,
        "states": ["mh", "rj", "gj", "tn", "kl", "as"],
        "month": "October/November",
        "duration_days": 5,
        "short_description": "The pan-Indian Festival of Lights — five days of diyas, fireworks, and sweets.",
        "description": (
            "Diwali, the Festival of Lights, is India's most widely celebrated festival. "
            "Over five days, homes are illuminated with earthen oil lamps (diyas), "
            "rangoli patterns are drawn at doorsteps, sweets are exchanged, and fireworks "
            "light up the night sky. The festival celebrates the victory of light over darkness, "
            "good over evil, and knowledge over ignorance. "
            "In Maharashtra, Diwali also includes the unique celebration of Abhyanga Snan "
            "(ritual oil bath) and Faral — a spread of homemade fried and sweet delicacies."
        ),
        "rituals": ["Diya lighting", "Lakshmi Puja", "Rangoli", "Firecrackers", "Sweet exchange"],
        "foods": ["Faral (fried snacks)", "Karanji", "Chakli", "Laddoo", "Barfi"],
        "significance": "Celebrates the return of Lord Rama to Ayodhya, and Goddess Lakshmi's blessings.",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Diwali_Fireworks_2.jpg/320px-Diwali_Fireworks_2.jpg",
        "gallery_urls": [],
    },
    {
        "id": "navratri-gj",
        "name": "Navratri",
        "state_id": "gj",
        "states": ["gj", "mh", "rj"],
        "month": "October",
        "duration_days": 9,
        "short_description": "Nine nights of Garba and Dandiya Raas dance in Gujarat.",
        "description": (
            "Navratri in Gujarat is a nine-night extravaganza of Garba and Dandiya Raas — "
            "folk dance forms performed in circles around images of the Goddess Durga. "
            "Participants wear traditional Chaniya Choli (women) and Kediya (men) "
            "in vibrant mirrored embroidery. The celebrations begin at dusk and "
            "continue until dawn. The Vadodara and Ahmedabad Navratri festivities "
            "have been recognised by the UNESCO for their cultural significance."
        ),
        "rituals": ["Aarti of Goddess Durga", "Garba dance", "Dandiya Raas", "Nine-day fast"],
        "foods": ["Farafari", "Sabudana Khichdi", "Farali Patties", "Rajgira Laddoo"],
        "significance": "Celebrates the victory of Goddess Durga over demon Mahishasura.",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Garba_dance.jpg/320px-Garba_dance.jpg",
        "gallery_urls": [],
    },
    {
        "id": "onam",
        "name": "Onam",
        "state_id": "kl",
        "states": ["kl"],
        "month": "August/September",
        "duration_days": 10,
        "short_description": "Kerala's harvest festival with Pookalam flower carpets, snake boat races, and a grand feast.",
        "description": (
            "Onam is Kerala's most important festival, celebrating the homecoming of the "
            "mythical King Mahabali. For 10 days, Keralites celebrate with Pookalam "
            "(elaborate flower carpets), Vallam Kali (traditional snake boat races), "
            "Thiruvathira dance, and the grand Onam Sadhya — a feast of 26 or more "
            "vegetarian dishes served on a banana leaf."
        ),
        "rituals": ["Pookalam (flower carpet)", "Onam Sadhya", "Vallam Kali (boat race)", "Thiruvathira dance"],
        "foods": ["Avial", "Thoran", "Sambar", "Rasam", "Payasam", "Pappadom", "Pickle"],
        "significance": "Celebrates the legendary just rule of King Mahabali and the harvest season.",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Onam_festival_pookalam.jpg/320px-Onam_festival_pookalam.jpg",
        "gallery_urls": [],
    },
    {
        "id": "bihu-as",
        "name": "Bihu",
        "state_id": "as",
        "states": ["as"],
        "month": "April (Rongali), October (Kongali), January (Bhogali)",
        "duration_days": 7,
        "short_description": "Assam's three-season harvest festival with Bihu dance and music.",
        "description": (
            "Bihu is celebrated three times a year in Assam, each marking an important "
            "agricultural season. Rongali Bihu (April) is the most vibrant, marking "
            "the Assamese New Year with energetic Bihu dance performed by young men and "
            "women in open fields. Kongali Bihu (October) is a quiet harvest-time prayer. "
            "Bhogali Bihu (January) celebrates the end of the harvest with community "
            "feasts and bonfires (meji)."
        ),
        "rituals": ["Bihu dance", "Husori (door-to-door performance)", "Meji bonfire", "Cattle worship"],
        "foods": ["Pitha (rice cakes)", "Laru (coconut sweets)", "Til (sesame sweets)"],
        "significance": "Celebrates the agricultural seasons and Assamese New Year.",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Bihu_dance.jpg/320px-Bihu_dance.jpg",
        "gallery_urls": [],
    },
]
