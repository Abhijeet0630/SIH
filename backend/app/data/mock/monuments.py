"""
Mock data for monuments and heritage sites.
Primary: Gateway of India, Raigad Fort, Ellora Caves.
"""

MOCK_MONUMENTS: list[dict] = [
    {
        "id": "gateway-of-india",
        "name": "Gateway of India",
        "state_id": "mh",
        "location": "Apollo Bunder, Mumbai, Maharashtra",
        "coordinates": {"lat": 18.9220, "lng": 72.8347},
        "short_description": "Iconic arch-monument on Mumbai's waterfront built in 1924 to commemorate the visit of King George V.",
        "description": (
            "The Gateway of India is an arch-monument that stands majestically on the "
            "waterfront of Mumbai (then Bombay) overlooking the Arabian Sea. Built of basalt "
            "in the Indo-Saracenic style blending Hindu and Muslim architectural elements, "
            "it served as a ceremonial gateway for British viceroys arriving by sea. "
            "It is now the launching point for ferries to Elephanta Island and is "
            "Mumbai's most recognisable landmark."
        ),
        "history": (
            "Construction began in 1911 to commemorate the visit of King George V and "
            "Queen Mary to Mumbai. The foundation stone was laid in 1913 and the full "
            "structure was completed in 1924. In a significant historical moment, the "
            "last British troops to leave independent India marched through the Gateway "
            "in February 1948."
        ),
        "architecture": (
            "Designed by British architect George Wittet, the Gateway stands 26 metres tall "
            "and is built in yellow basalt and reinforced concrete. The arch is based on "
            "16th-century Gujarat Saracenic style with intricate perforated screens and "
            "four turrets. The central dome is 15 metres in diameter."
        ),
        "built_by": "British Indian Government (architect: George Wittet)",
        "built_year": "1924",
        "materials": ["Basalt stone", "Reinforced concrete", "Perforated Kharvi lattice screens"],
        "cultural_significance": (
            "The Gateway of India witnessed the departure of the last British soldiers "
            "from independent India — a deeply symbolic moment of liberation. "
            "Today it stands as a symbol of Mumbai's spirit and India's journey from "
            "colonial rule to independence."
        ),
        "timeline": [
            {"year": "1911", "event": "Foundation stone laid by Governor Sir George Clarke"},
            {"year": "1913", "event": "George Wittet's final design approved"},
            {"year": "1924", "event": "Gateway of India officially opened"},
            {"year": "1948", "event": "Last British regiment, Somerset Light Infantry, departs through the Gateway"},
        ],
        "has_3d_model": True,
        "model_url": None,     # To be provided by 3D teammate
        "thumbnail_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Gateway_of_India.jpg/320px-Gateway_of_India.jpg",
        "gallery_urls": [],
        "related_heritage_ids": ["elephanta-caves", "taj-mahal-palace"],
        "tags": ["colonial", "arch", "mumbai", "waterfront", "landmark", "3d"],
        "hotspots": [
            {
                "id": "central-arch",
                "name": "Central Arch",
                "description": "The magnificent 26-metre central archway through which British troops once marched. Based on 16th-century Gujarati architecture.",
                "position": {"x": 0.0, "y": 2.0, "z": 0.0},
                "annotation": "Height: 26m. Style: Indo-Saracenic.",
                "image_url": None,
            },
            {
                "id": "north-turret",
                "name": "North Turret",
                "description": "One of four octagonal turrets flanking the main arch. Each turret is crowned with an ornate cupola.",
                "position": {"x": -3.5, "y": 4.0, "z": 0.5},
                "annotation": "Four turrets frame the central arch.",
                "image_url": None,
            },
            {
                "id": "main-dome",
                "name": "Central Dome",
                "description": "The 15-metre diameter central dome sits atop the arch, perforated with ornate jali (lattice) screens that filter light beautifully.",
                "position": {"x": 0.0, "y": 5.5, "z": 0.0},
                "annotation": "Diameter: 15m. Inspired by Gujarati temple domes.",
                "image_url": None,
            },
            {
                "id": "waterfront-steps",
                "name": "Waterfront Steps",
                "description": "The wide stone steps leading down to the Arabian Sea from which ferry boats depart to Elephanta Island.",
                "position": {"x": 0.0, "y": 0.2, "z": 3.0},
                "annotation": "Ferries to Elephanta Island depart from here.",
                "image_url": None,
            },
            {
                "id": "lattice-screens",
                "name": "Jali Lattice Screens",
                "description": "Intricate perforated stone screens (jali work) on the side halls — a hallmark of Saracenic architecture that allows light and breeze.",
                "position": {"x": 2.0, "y": 2.5, "z": 0.0},
                "annotation": "Traditional Gujarati jali (lattice) stonework.",
                "image_url": None,
            },
        ],
    },
    {
        "id": "raigad-fort",
        "name": "Raigad Fort",
        "state_id": "mh",
        "location": "Mahad, Raigad District, Maharashtra",
        "coordinates": {"lat": 18.2330, "lng": 73.4446},
        "short_description": "The majestic 17th-century capital fort of the Maratha Empire under Chhatrapati Shivaji Maharaj.",
        "description": (
            "Raigad Fort is a massive hill fort situated at an elevation of 820 metres above "
            "sea level in the Sahyadri mountain range. It served as the capital of the Maratha "
            "Empire under Chhatrapati Shivaji Maharaj, who was crowned here in 1674. "
            "The fort is accessible via a ropeway or a trek through dense forest. "
            "The ruins of the royal palace, market streets, water tanks, and Shivaji's tomb "
            "still stand, transporting visitors to the height of Maratha glory."
        ),
        "history": (
            "Originally called Rairi Fort, it was captured and redesigned by Chhatrapati "
            "Shivaji Maharaj in 1656. In 1674, it became the site of Shivaji's historic "
            "coronation (rajyabhishek) — the formal establishment of the Maratha Swarajya. "
            "The fort fell to the Mughals in 1689 and was later held by the British. "
            "Today it is a protected monument and a pilgrimage site for Maratha heritage."
        ),
        "architecture": (
            "Raigad Fort is an example of Deccan military architecture. The main gate "
            "(Maha Darwaja) stands 20 metres tall. Inside are ruins of the royal palace "
            "(Raj Sabha), Jagdishwar Temple, a 30-metre deep water cistern, market streets "
            "once lined with 300 shops (Peth), and Shivaji's tomb (Samadhi)."
        ),
        "built_by": "Chhatrapati Shivaji Maharaj",
        "built_year": "1656 (expanded)",
        "materials": ["Local basalt", "Stone masonry"],
        "cultural_significance": (
            "Raigad is one of the holiest sites for followers of Shivaji Maharaj and Maratha "
            "culture. The coronation of Shivaji at Raigad in 1674 was a watershed moment "
            "in Indian history — a Hindu king asserting independence during Mughal dominance."
        ),
        "timeline": [
            {"year": "1030", "event": "Fort first mentioned in historical records"},
            {"year": "1656", "event": "Shivaji Maharaj captures and rebuilds the fort"},
            {"year": "1674", "event": "Shivaji Maharaj crowned Chhatrapati at Raigad"},
            {"year": "1689", "event": "Fort captured by Aurangzeb's Mughal forces"},
            {"year": "1818", "event": "Falls to British East India Company"},
            {"year": "1956", "event": "Declared a protected monument by Archaeological Survey of India"},
        ],
        "has_3d_model": False,
        "model_url": None,
        "thumbnail_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Raigad_Fort.jpg/320px-Raigad_Fort.jpg",
        "gallery_urls": [],
        "related_heritage_ids": ["gateway-of-india", "ellora-caves"],
        "tags": ["fort", "maratha", "shivaji", "hill-fort", "heritage", "history"],
        "hotspots": [
            {
                "id": "maha-darwaja",
                "name": "Maha Darwaja (Main Gate)",
                "description": "The massive main entrance gate standing 20 metres tall. Its sheer height was designed to intimidate approaching enemies.",
                "position": {"x": 0.0, "y": 0.0, "z": -10.0},
                "annotation": "Height: 20m. Gateway to the Maratha capital.",
                "image_url": None,
            },
            {
                "id": "raj-sabha",
                "name": "Raj Sabha (Royal Court)",
                "description": "The ruins of Shivaji's royal assembly hall where he held court. The coronation throne (sinhasana) was located here.",
                "position": {"x": 5.0, "y": 1.0, "z": 0.0},
                "annotation": "Site of the historic 1674 coronation.",
                "image_url": None,
            },
            {
                "id": "shivaji-samadhi",
                "name": "Shivaji's Samadhi (Tomb)",
                "description": "The tomb of Chhatrapati Shivaji Maharaj, a revered pilgrimage site for millions of Maharashtrians.",
                "position": {"x": -2.0, "y": 0.5, "z": 3.0},
                "annotation": "Sacred tomb. Visited by millions of pilgrims.",
                "image_url": None,
            },
            {
                "id": "jagdishwar-temple",
                "name": "Jagdishwar Temple",
                "description": "The personal temple of Shivaji Maharaj within the fort, dedicated to Lord Shiva and still intact.",
                "position": {"x": 3.0, "y": 0.5, "z": -2.0},
                "annotation": "Shivaji's personal temple. Still structurally intact.",
                "image_url": None,
            },
        ],
    },
    {
        "id": "ellora-caves",
        "name": "Ellora Caves",
        "state_id": "mh",
        "location": "Ellora, Aurangabad District, Maharashtra",
        "coordinates": {"lat": 20.0258, "lng": 75.1794},
        "short_description": "UNESCO World Heritage Site — 34 rock-cut monasteries and temples spanning Hindu, Buddhist, and Jain traditions.",
        "description": (
            "The Ellora Caves are a UNESCO World Heritage Site comprising 34 monasteries and "
            "temples carved into the Charanandri Hills between the 5th and 11th centuries CE. "
            "They represent the pinnacle of Indian rock-cut architecture and a remarkable "
            "coexistence of Hindu, Buddhist, and Jain religious traditions. "
            "Cave 16, the Kailasa Temple, is the world's largest rock-cut structure — "
            "carved from a single basalt cliff."
        ),
        "history": (
            "The caves were built over six centuries by successive dynasties including the "
            "Rashtrakutas, Chalukyas, and Yadavas. The Buddhist caves (1-12) are the oldest, "
            "followed by Hindu caves (13-29), and Jain caves (30-34). "
            "The Kailasa Temple (Cave 16) was commissioned by Rashtrakuta king Krishna I "
            "around 760 CE and took over 100 years to complete."
        ),
        "architecture": (
            "The Ellora caves feature viharas (monasteries), chaityas (prayer halls), and "
            "mandapas (pillared halls) cut directly from living rock. The Kailasa Temple is "
            "200 feet long, 100 feet wide, and 100 feet high — carved downward from the "
            "cliff-top with over 400,000 tons of rock removed by hand."
        ),
        "built_by": "Rashtrakuta Dynasty (primarily), Chalukyas, Yadavas",
        "built_year": "600–1000 CE",
        "materials": ["Basalt (carved, not built)"],
        "cultural_significance": (
            "Ellora demonstrates the religious harmony of ancient India. Three major "
            "religions peacefully built their greatest monuments side by side. "
            "The Kailasa Temple remains one of humanity's greatest architectural achievements."
        ),
        "timeline": [
            {"year": "600 CE", "event": "Buddhist caves constructed by Vakataka and early Chalukya rulers"},
            {"year": "760 CE", "event": "Kailasa Temple (Cave 16) commissioned by Rashtrakuta king Krishna I"},
            {"year": "900 CE", "event": "Jain caves constructed"},
            {"year": "1983", "event": "Declared a UNESCO World Heritage Site"},
        ],
        "has_3d_model": True,
        "model_url": None,
        "thumbnail_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Ellora_cave16_Kailash_temple.jpg/320px-Ellora_cave16_Kailash_temple.jpg",
        "gallery_urls": [],
        "related_heritage_ids": ["raigad-fort", "ajanta-caves"],
        "tags": ["UNESCO", "cave", "rock-cut", "hindu", "buddhist", "jain", "3d", "heritage"],
        "hotspots": [
            {
                "id": "kailasa-temple",
                "name": "Kailasa Temple (Cave 16)",
                "description": "The crown jewel of Ellora — the world's largest rock-cut structure, dedicated to Lord Shiva. Carved top-down from a single cliff.",
                "position": {"x": 0.0, "y": 0.0, "z": 0.0},
                "annotation": "World's largest monolithic rock excavation.",
                "image_url": None,
            },
            {
                "id": "ravana-lifting-kailash",
                "name": "Ravana Lifting Kailash",
                "description": "A spectacular bas-relief panel showing the demon king Ravana attempting to lift Mount Kailash, with Shiva pressing it down with his toe.",
                "position": {"x": -5.0, "y": 2.0, "z": 2.0},
                "annotation": "Masterpiece of Rashtrakuta sculpture.",
                "image_url": None,
            },
            {
                "id": "elephants-frieze",
                "name": "Elephants Frieze",
                "description": "The base of the Kailasa Temple features a continuous frieze of elephants that appear to carry the entire temple on their backs.",
                "position": {"x": 3.0, "y": -0.5, "z": 1.0},
                "annotation": "Hundreds of life-sized elephants carved in stone.",
                "image_url": None,
            },
        ],
    },
    {
        "id": "elephanta-caves",
        "name": "Elephanta Caves",
        "state_id": "mh",
        "location": "Elephanta Island, Mumbai Harbour, Maharashtra",
        "coordinates": {"lat": 18.9633, "lng": 72.9315},
        "short_description": "UNESCO World Heritage rock-cut cave temples on Elephanta Island dedicated to Lord Shiva.",
        "description": (
            "The Elephanta Caves are a collection of cave temples predominantly dedicated to the Hindu "
            "god Shiva, located on Elephanta Island in Mumbai Harbour, 10 kilometres east of Mumbai. "
            "The rock-cut stone sculptures show a syncretism of Hindu and Buddhist ideas. The centerpiece "
            "is the monumental 6-metre tall Trimurti sculpture of Shiva representing creator, preserver, "
            "and destroyer."
        ),
        "history": (
            "Dating back to between the 5th and 8th centuries CE, the caves were commissioned during the "
            "reign of the Kalachuri and Rashtrakuta dynasties. Ferries have connected Mumbai waterfront "
            "at the Gateway of India to the island for over a century."
        ),
        "architecture": (
            "Rock-cut basalt architecture featuring mandapas, carved pillars, and relief panels. "
            "Cave 1 (the Grand Cave) is the most elaborate, spanning 39 metres."
        ),
        "built_by": "Kalachuri and Rashtrakuta Dynasties",
        "built_year": "5th–8th Century CE",
        "materials": ["Solid basalt rock"],
        "cultural_significance": "One of India's foremost representations of medieval Shaivite rock art and sculpture.",
        "timeline": [
            {"year": "500–750 CE", "event": "Excavation and carving of the main cave temples"},
            {"year": "1987", "event": "Designated a UNESCO World Heritage Site"},
        ],
        "has_3d_model": False,
        "model_url": None,
        "thumbnail_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Elephanta_Caves_Trimurti.jpg/320px-Elephanta_Caves_Trimurti.jpg",
        "gallery_urls": [],
        "related_heritage_ids": ["gateway-of-india", "ellora-caves"],
        "tags": ["UNESCO", "cave", "shiva", "mumbai", "island", "heritage"],
        "hotspots": [
            {
                "id": "trimurti-shiva",
                "name": "Trimurti Shiva Panel",
                "description": "The 6-metre high colossal three-headed bust of Shiva representing Aghora (destroyer), Tatpurusha (preserver), and Vamadeva (creator).",
                "position": {"x": 0.0, "y": 1.5, "z": 0.0},
                "annotation": "Masterpiece of early medieval rock-cut sculpture.",
                "image_url": None,
            },
        ],
    },
]

