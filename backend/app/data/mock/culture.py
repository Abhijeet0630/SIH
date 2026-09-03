"""
Mock cultural items data.
Primary focus: Maharashtra (food, dance, art, forts).
Also includes sample items from other states.
"""

MOCK_CULTURE_ITEMS: list[dict] = [
    # ──────────────────────────────────────────────────────────────
    #  MAHARASHTRA — FOOD
    # ──────────────────────────────────────────────────────────────
    {
        "id": "vada-pav",
        "name": "Vada Pav",
        "type": "food",
        "state_id": "mh",
        "region": "Mumbai",
        "short_description": "Mumbai's beloved street food — spiced potato fritter in a bun.",
        "description": (
            "Vada Pav is often called 'Mumbai's burger'. It consists of a deep-fried "
            "potato patty (vada) spiced with green chillies, ginger, garlic, mustard "
            "seeds, and turmeric, served inside a soft bread roll (pav) with layers of "
            "dry garlic chutney, green coriander chutney, and a sweet tamarind chutney. "
            "Simple yet explosively flavourful, it has sustained generations of Mumbaikars "
            "on the go since the 1960s."
        ),
        "origin": "Mumbai, Maharashtra",
        "history": (
            "Vada Pav was reportedly invented in the 1960s by Ashok Vaidya near Dadar "
            "railway station in Mumbai. As the city's mill workers flooded out of factories "
            "needing a quick, affordable meal, this combination became their staple. "
            "Today it is the most consumed street food in Maharashtra and a cultural icon."
        ),
        "cultural_significance": (
            "More than just food, Vada Pav represents the spirit of Mumbai — democratic, "
            "fast-paced, and available to everyone regardless of economic background. "
            "No Mumbai experience is complete without one."
        ),
        "recipe": {
            "recipe_url": "https://www.vegrecipesofindia.com/vada-pav-recipe/",
            "ingredients": [
                "Potatoes", "Green chillies", "Ginger", "Garlic", "Mustard seeds",
                "Turmeric", "Gram flour (besan)", "Pav (bread rolls)",
                "Dry garlic chutney", "Green coriander chutney", "Tamarind chutney",
            ],
            "preparation_time": "30 minutes",
            "difficulty": "Easy",
        },
        "timeline": [
            {"year": "1966", "event": "Vada Pav invented near Dadar Station, Mumbai"},
            {"year": "1980s", "event": "Becomes the go-to food for Mumbai's mill workers"},
            {"year": "2000s", "event": "Franchised chains spread Vada Pav across India"},
        ],
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Vada_pav.jpg/320px-Vada_pav.jpg",
        "gallery_urls": [],
        "tags": ["street-food", "vegetarian", "mumbai", "iconic", "budget"],
        "related_item_ids": ["misal-pav", "puran-poli", "gateway-of-india"],
    },
    {
        "id": "misal-pav",
        "name": "Misal Pav",
        "type": "food",
        "state_id": "mh",
        "region": "Pune / Nashik",
        "short_description": "Spicy sprouted moth bean curry topped with farsan, served with pav.",
        "description": (
            "Misal Pav is a fiery Maharashtrian breakfast dish made of sprouted moth beans "
            "cooked in a spiced gravy (usal), topped with crunchy farsan (savoury mix), "
            "raw onions, coriander, and a squeeze of lemon, served alongside soft pav. "
            "Each city in Maharashtra has its own spice level — Kolhapuri misal is "
            "notoriously the hottest."
        ),
        "origin": "Pune, Maharashtra",
        "history": (
            "Misal is believed to have originated in the temples of Pandharpur as prasad "
            "food prepared from sprouted legumes — cheap, nutritious, and abundant. "
            "Over time it evolved into the street-food staple beloved across Maharashtra."
        ),
        "cultural_significance": (
            "Misal Pav is an important part of Maharashtrian breakfast culture and is "
            "served at religious gatherings (waris) and family mornings alike."
        ),
        "recipe": {
            "recipe_url": "https://www.vegrecipesofindia.com/misal-pav/",
            "ingredients": [
                "Sprouted moth beans", "Onions", "Tomatoes", "Goda masala",
                "Coconut", "Farsan", "Pav", "Lemon", "Coriander",
            ],
            "preparation_time": "45 minutes",
            "difficulty": "Medium",
        },
        "timeline": [
            {"year": "1800s", "event": "Temple prasad origins in Pandharpur"},
            {"year": "1950s", "event": "Becomes popular Pune street breakfast"},
            {"year": "2009", "event": "CNN-IBN recognises it as one of India's greatest dishes"},
        ],
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Misal_pav.jpg/320px-Misal_pav.jpg",
        "gallery_urls": [],
        "tags": ["breakfast", "spicy", "vegetarian", "pune", "street-food"],
        "related_item_ids": ["vada-pav", "puran-poli"],
    },
    {
        "id": "puran-poli",
        "name": "Puran Poli",
        "type": "food",
        "state_id": "mh",
        "region": "Maharashtra",
        "short_description": "Sweet flatbread stuffed with jaggery and lentil filling.",
        "description": (
            "Puran Poli is a traditional Maharashtrian sweet flatbread (roti) stuffed with "
            "a smooth filling of cooked chana dal (split Bengal gram) sweetened with jaggery "
            "and flavoured with cardamom and nutmeg. It is served warm with a generous pour "
            "of ghee or a bowl of katachi aamti (the leftover spiced lentil broth)."
        ),
        "origin": "Maharashtra",
        "history": (
            "Puran Poli has been prepared in Maharashtra for over 1,000 years. "
            "Ancient Sanskrit texts reference a similar sweet stuffed bread. "
            "It is an essential part of Holi, Gudi Padwa, and other Maharashtrian festivals."
        ),
        "cultural_significance": (
            "No Maharashtrian festival is complete without Puran Poli. It is an offering "
            "to deities and a symbol of abundance, warmth, and celebration."
        ),
        "recipe": {
            "recipe_url": "https://www.vegrecipesofindia.com/puran-poli/",
            "ingredients": [
                "Whole wheat flour", "Chana dal", "Jaggery", "Cardamom",
                "Nutmeg", "Ghee", "Salt",
            ],
            "preparation_time": "60 minutes",
            "difficulty": "Medium",
        },
        "timeline": [
            {"year": "1000 CE", "event": "First textual references in Sanskrit literature"},
            {"year": "1600s", "event": "Part of Maratha royal feast traditions"},
        ],
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Puran_poli.jpg/320px-Puran_poli.jpg",
        "gallery_urls": [],
        "tags": ["festival-food", "sweet", "vegetarian", "traditional"],
        "related_item_ids": ["modak", "vada-pav"],
    },
    {
        "id": "modak",
        "name": "Modak",
        "type": "food",
        "state_id": "mh",
        "region": "Maharashtra",
        "short_description": "Sacred steamed dumpling — Lord Ganesha's favourite sweet.",
        "description": (
            "Modak is a steamed sweet dumpling made from a thin rice flour shell "
            "filled with freshly grated coconut sweetened with jaggery and flavoured "
            "with cardamom. The outer shell is pinched into intricate pleated folds "
            "that rise to a topknot — an art form passed down through generations. "
            "It is prepared in vast quantities during Ganesh Chaturthi."
        ),
        "origin": "Maharashtra",
        "cultural_significance": (
            "Modak is inseparable from Ganesh Chaturthi — the biggest festival in "
            "Maharashtra. According to mythology, Lord Ganesha's favourite food is "
            "the modak, making it a sacred and auspicious offering."
        ),
        "recipe": {
            "recipe_url": "https://www.vegrecipesofindia.com/modak-recipe/",
            "ingredients": ["Rice flour", "Coconut", "Jaggery", "Cardamom", "Salt"],
            "preparation_time": "50 minutes",
            "difficulty": "Hard",
        },
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Modak.jpg/320px-Modak.jpg",
        "gallery_urls": [],
        "tags": ["festival-food", "sweet", "sacred", "ganesh-chaturthi"],
        "related_item_ids": ["puran-poli", "ganesh-chaturthi"],
    },
    {
        "id": "thalipeeth",
        "name": "Thalipeeth",
        "type": "food",
        "state_id": "mh",
        "region": "Maharashtra",
        "short_description": "Multi-grain spiced flatbread — a rustic Maharashtrian staple.",
        "description": (
            "Thalipeeth is a thick, multi-grain flatbread made from a special flour blend "
            "called bhajani — a roasted mix of rice, wheat, jowar, bajra, chana dal, "
            "and various lentils — seasoned with onions, green chillies, coriander, "
            "and cumin. It is cooked on a griddle with oil and is particularly nutritious."
        ),
        "origin": "Rural Maharashtra",
        "cultural_significance": "A wholesome peasant food that nourishes farmers and rural families.",
        "recipe": {
            "recipe_url": "https://www.vegrecipesofindia.com/thalipeeth-recipe/",
            "ingredients": ["Bhajani flour", "Onion", "Green chillies", "Coriander", "Cumin", "Oil"],
            "preparation_time": "20 minutes",
            "difficulty": "Easy",
        },
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Thalipeeth.jpg/320px-Thalipeeth.jpg",
        "gallery_urls": [],
        "tags": ["breakfast", "multi-grain", "rural", "healthy"],
        "related_item_ids": ["vada-pav", "misal-pav"],
    },

    # ──────────────────────────────────────────────────────────────
    #  MAHARASHTRA — DANCE / ART
    # ──────────────────────────────────────────────────────────────
    {
        "id": "lavani",
        "name": "Lavani",
        "type": "dance",
        "state_id": "mh",
        "region": "Maharashtra",
        "short_description": "Maharashtra's vibrant folk dance performed to the beat of the dholki.",
        "description": (
            "Lavani is a genre of music and dance popular in Maharashtra that combines "
            "powerful rhythm with expressive performance. The word 'Lavani' comes from "
            "'Lavanya' meaning beauty. Traditionally performed by women dressed in nine-yard "
            "sarees (nauvari), Lavani is characterised by fast-paced footwork, rapid eye "
            "movements, and bold, often romantic or satirical lyrical content. It is performed "
            "to the energetic beat of the dholki drum."
        ),
        "origin": "Maharashtra",
        "history": (
            "Lavani has roots in the 16th century, gaining prominence during the Peshwa era "
            "(18th century) as entertainment for soldiers and court members. It served both as "
            "recreation and as a tool of social commentary, often addressing love, war, and society."
        ),
        "cultural_significance": (
            "Lavani is Maharashtra's most iconic folk performance. It is performed at cultural "
            "festivals, weddings, and Tamasha theatre. In 2020, several Lavani artists received "
            "the Padma Shri award, recognising the form's cultural importance."
        ),
        "materials": ["Nauvari saree (9-yard saree)", "Ghunghroo (ankle bells)", "Bindis", "Nath (nose ring)"],
        "techniques": ["Rapid footwork", "Facial expressions (abhinaya)", "Dholki synchronisation"],
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Lavani_dance.jpg/320px-Lavani_dance.jpg",
        "gallery_urls": [],
        "tags": ["folk-dance", "performance", "marathi-culture", "nauvari"],
        "related_item_ids": ["vada-pav", "raigad-fort"],
    },

    # ──────────────────────────────────────────────────────────────
    #  OTHER STATES — SAMPLE ITEMS
    # ──────────────────────────────────────────────────────────────
    {
        "id": "dal-baati-churma",
        "name": "Dal Baati Churma",
        "type": "food",
        "state_id": "rj",
        "region": "Rajasthan",
        "short_description": "Rajasthan's iconic three-part meal of lentils, baked wheat balls, and sweet crumble.",
        "description": (
            "Dal Baati Churma is the quintessential Rajasthani meal. Baati are round unleavened "
            "wheat rolls baked in a tandoor or traditionally in desert sand, served with panchmel "
            "dal (five-lentil curry) and churma (sweetened coarsely ground wheat). The combination "
            "of savoury, spicy, and sweet in one sitting is a Rajasthani hallmark."
        ),
        "origin": "Rajasthan",
        "recipe": {
            "recipe_url": "https://www.vegrecipesofindia.com/dal-baati-churma/",
            "ingredients": ["Wheat flour", "Ghee", "Panchmel dal", "Jaggery", "Cardamom"],
            "preparation_time": "90 minutes",
            "difficulty": "Hard",
        },
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Dal_Baati_Churma.jpg/320px-Dal_Baati_Churma.jpg",
        "gallery_urls": [],
        "tags": ["traditional", "rajasthani", "hearty", "desert-cuisine"],
        "related_item_ids": [],
    },
    {
        "id": "kathakali",
        "name": "Kathakali",
        "type": "dance",
        "state_id": "kl",
        "region": "Kerala",
        "short_description": "Kerala's classical dance-drama with elaborate makeup and costume.",
        "description": (
            "Kathakali is one of India's oldest and most elaborate classical dance forms, "
            "originating in Kerala around the 17th century. It is a highly stylised "
            "ritual art form with actors wearing towering headgear and elaborate face "
            "makeup (chutti) that takes hours to apply. Stories from the Mahabharata "
            "and Ramayana are enacted through precise hand gestures (mudras) and "
            "expressive eye movements."
        ),
        "origin": "Kerala",
        "techniques": ["Navarasas (nine emotions)", "Mudras (hand gestures)", "Chutti (face makeup)"],
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Kathakali_Kerala.jpg/320px-Kathakali_Kerala.jpg",
        "gallery_urls": [],
        "tags": ["classical-dance", "drama", "ritual", "kerala"],
        "related_item_ids": [],
    },
    {
        "id": "bihu-dance",
        "name": "Bihu Dance",
        "type": "dance",
        "state_id": "as",
        "region": "Assam",
        "short_description": "Assam's energetic harvest festival dance performed during Bihu.",
        "description": (
            "Bihu is the most important festival of Assam, celebrated three times a year. "
            "The Bihu dance performed during Rongali Bihu (spring harvest) is characterised "
            "by brisk steps, swift movements of the hips, rapid hand gestures, and the "
            "thumping beat of the dhol and the melodic pepa (buffalo-horn flute). "
            "Young men and women dance together in open fields."
        ),
        "origin": "Assam",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Bihu_dance.jpg/320px-Bihu_dance.jpg",
        "gallery_urls": [],
        "tags": ["folk-dance", "harvest", "festival", "assam"],
        "related_item_ids": [],
    },
    {
        "id": "bharatanatyam",
        "name": "Bharatanatyam",
        "type": "dance",
        "state_id": "tn",
        "region": "Tamil Nadu",
        "short_description": "The mother of Indian classical dance, originating in Tamil Nadu temples.",
        "description": (
            "Bharatanatyam is one of the oldest and most widely practised classical dance "
            "forms of India, rooted in the Natya Shastra, the ancient Sanskrit treatise on "
            "performing arts. Originating as a temple dance (Devadasi tradition) in Tamil Nadu, "
            "it is characterised by bent-knee positions (aramandi), intricate footwork (nritta), "
            "expressive storytelling (abhinaya), and Carnatic music accompaniment."
        ),
        "origin": "Tamil Nadu",
        "techniques": ["Aramandi (half-sitting posture)", "Nritta (pure dance)", "Abhinaya (expression)", "Mudras"],
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Bharatanatyam_collage.jpg/320px-Bharatanatyam_collage.jpg",
        "gallery_urls": [],
        "tags": ["classical-dance", "temple", "tradition", "tamil-culture"],
        "related_item_ids": [],
    },
]
