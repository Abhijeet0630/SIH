-- ====================================================================
-- SAFE SEED SCRIPT (DESIGN ONLY — DO NOT EXECUTE WITHOUT REVIEW)
-- Targets: Current Remote Supabase Schema & Frozen Backend State IDs
-- Preserves: Existing States ('mh','rj','gj','kl','as','tn') and Categories
-- ====================================================================

-- ── 1. ADD MISSING CATEGORIES (ADDITIVE ONLY, DO NOT OVERWRITE EXISTING) ────
INSERT INTO categories (id, name, description, icon) VALUES
    ('crafts', 'Arts & Crafts', 'Warli tribal paintings, bamboo weaving, bell metal craft, and lacquer art.', 'Palette'),
    ('architecture', 'Architecture & Engineering', 'Stepwells, living root bridges, monolithic excavations, and vernacular masonry.', 'Building2'),
    ('tribal', 'Tribal Culture & Lore', 'Sacred groves, indigenous knowledge systems, folklore, and harmonious forest traditions.', 'Trees'),
    ('culture', 'Cultural Heritage & Living Traditions', 'Sacred pilgrimages, community rituals, and living heritage.', 'Compass'),
    ('monuments', 'Monuments & Wonders', 'World Heritage landmarks, grand arches, and archaeological marvels.', 'Castle'),
    ('all', 'All Heritage', 'Explore all living traditions, sacred sites, culinary arts, and monuments.', 'Compass')
ON CONFLICT (id) DO NOTHING;

-- ── 2. CULTURAL ITEMS (26 ROWS ADAPTED TO AUTHORITATIVE STATE IDs) ─────────
-- Note: 'vada-pav' is also populated alongside 'mumbai-vada-pav' for backward compatibility.
INSERT INTO cultural_items (id, slug, title, state_id, category, short_description, description, history, cultural_significance, location_name, images, primary_image, tags, recipe_info) VALUES
    (
        'pune-misal-pav', 'pune-misal-pav', 'Puneri Misal Pav', 'mh', 'food',
        'Sprouted moth bean curry spiced with indigenous Goda masala, layered with crisp farsan, chopped onions, and lemon, served with pav.',
        'Puneri Misal is renowned for its balanced sweet, tangy, and pungent notes derived from roasted coconut, coriander seeds, and traditional Maharashtrian Goda Masala.',
        'Originated in the late 19th and early 20th centuries as a wholesome, protein-rich morning breakfast for agrarian workers and students in Pune’s historic peths.',
        'An emblem of Pune’s culinary identity, representing the Maharashtrian ethos of transforming simple sprouted pulses into a regal gastronomic experience.',
        '{"name":"Pune Peths","district":"Pune","state":"Maharashtra","coordinates":{"lat":18.5204,"lng":73.8567}}',
        '[{"url":"https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=80","alt":"Authentic Puneri Misal Pav served with spicy tarri and fresh lemons"}]'::jsonb,
        'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=80',
        '{"Misal","Pune","Goda Masala","Street Food","Breakfast","Vegetarian"}',
        '{"prepTime":"20 mins (+ overnight sprouting)","cookTime":"30 mins","difficulty":"Medium","ingredientsSummary":["1.5 cups sprouted Moth Beans (Matki)","2 tbsp authentic Maharashtrian Goda Masala","1 cup crunchy Mixed Farsan","1 large Onion, finely chopped","1 tsp Mustard seeds, Cumin seeds, and Curry leaves","Fresh Coriander, Lemon wedges, and Ladi Pav"],"recipeUrl":"https://recipes.timesofindia.com/recipes/puneri-misal/rs54332822.cms"}'::jsonb
    ),
    (
        'mumbai-vada-pav', 'mumbai-vada-pav', 'Mumbai Vada Pav', 'mh', 'food',
        'Deep-fried spiced potato fritter (batata vada) encased in a soft ladi pav with fiery garlic chutney, fried green chilies, and mint chutney.',
        'Often dubbed the "Indian Burger", Vada Pav is Mumbai’s ultimate democratic street food. It features a spiced mashed potato patty infused with mustard seeds, turmeric, ginger, garlic, and curry leaves.',
        'Created in 1966 by Ashok Vaidya outside Dadar railway station for thousands of textile mill workers commuting along the central railway line.',
        'A cornerstone of Mumbai’s working-class heritage and urban identity, crossing all socio-economic barriers.',
        '{"name":"Dadar, Mumbai","district":"Mumbai","state":"Maharashtra","coordinates":{"lat":19.0178,"lng":72.8478}}',
        '[{"url":"https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80","alt":"Classic Mumbai Vada Pav with dry garlic chutney and fried chilies"}]'::jsonb,
        'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80',
        '{"Street Food","Mumbai","Vada Pav","Quick Meal","Working Class Heritage"}',
        '{"prepTime":"25 mins","cookTime":"20 mins","difficulty":"Easy","ingredientsSummary":["4 large boiled & mashed Potatoes","1 cup Besan (Gram Flour)","1 tbsp Ginger-Garlic-Green Chili crushed paste","1 tsp Mustard seeds, Turmeric, Asafoetida","1 cup Dry Red Garlic Coconut Chutney","6 fresh Ladi Pav buns & Fried salted Green Chilies"],"recipeUrl":"https://hebbarskitchen.com/mumbai-vada-pav-recipe/"}'::jsonb
    ),
    (
        'vada-pav', 'vada-pav', 'Mumbai Vada Pav', 'mh', 'food',
        'Deep-fried spiced potato fritter (batata vada) encased in a soft ladi pav with fiery garlic chutney, fried green chilies, and mint chutney.',
        'Often dubbed the "Indian Burger", Vada Pav is Mumbai’s ultimate democratic street food.',
        'Created in 1966 by Ashok Vaidya outside Dadar railway station.',
        'A cornerstone of Mumbai’s working-class heritage and urban identity.',
        '{"name":"Dadar, Mumbai","district":"Mumbai","state":"Maharashtra","coordinates":{"lat":19.0178,"lng":72.8478}}',
        '[{"url":"https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80","alt":"Classic Mumbai Vada Pav"}]'::jsonb,
        'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80',
        '{"Street Food","Mumbai","Vada Pav","Quick Meal"}',
        '{"prepTime":"25 mins","cookTime":"20 mins","difficulty":"Easy","ingredientsSummary":["4 large boiled & mashed Potatoes","1 cup Besan","Garlic chutney","Ladi Pav buns"],"recipeUrl":"https://hebbarskitchen.com/mumbai-vada-pav-recipe/"}'::jsonb
    ),
    (
        'kolhapur-tambada-rassa', 'kolhapur-tambada-rassa', 'Kolhapuri Tambada & Pandhra Rassa', 'mh', 'food',
        'Legendary dual broths from Kolhapur — the fiery red broth infused with Lavangi chilies and the delicate white coconut-poppy seed broth.',
        'Kolhapur’s royal culinary signature consists of two complementary broths: Tambada Rassa and Pandhra Rassa.',
        'Perfected in the royal kitchens of the Chhatrapati rulers of Kolhapur for royal hunting traditions.',
        'Represents the pinnacle of royal Maratha hospitality and meat preparation in southern Maharashtra.',
        '{"name":"Kolhapur City","district":"Kolhapur","state":"Maharashtra","coordinates":{"lat":16.705,"lng":74.2433}}',
        '[{"url":"https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=80","alt":"Kolhapuri Tambada and Pandhra Rassa"}]'::jsonb,
        'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=80',
        '{"Kolhapur","Tambada Rassa","Pandhra Rassa","Royal Cuisine"}',
        '{"prepTime":"30 mins","cookTime":"45 mins","difficulty":"Advanced","ingredientsSummary":["500g mutton","2 tbsp Kolhapuri masala","1 cup coconut milk"],"recipeUrl":"https://food.ndtv.com/recipe-kolhapuri-tambda-rassa-953330"}'::jsonb
    ),
    (
        'ukadiche-modak', 'ukadiche-modak', 'Ukadiche Modak', 'mh', 'food',
        'Steamed fragrant rice flour dumplings shaped like lotus buds, encasing a sweet filling of freshly grated coconut, jaggery, nutmeg, and cardamom, drizzled with pure ghee.',
        'Ukadiche Modak is the spiritual crown jewel of Maharashtrian confectionery. Prepared by kneading freshly ground fragrant rice flour into a delicate dough, hand-pleated with coconut-jaggery filling.',
        'Rooted in ancient Vedic and Puranic literature where Lord Ganesha is described as Modakpriya.',
        'The supreme sacred offering during Ganeshotsav, embodying motherly devotion and auspiciousness.',
        '{"name":"Konkan Coast & Mumbai-Pune","district":"Ratnagiri","state":"Maharashtra","coordinates":{"lat":16.9902,"lng":73.312}}',
        '[{"url":"https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?auto=format&fit=crop&w=1000&q=80","alt":"Steamed Ukadiche Modak"}]'::jsonb,
        'https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?auto=format&fit=crop&w=1000&q=80',
        '{"Modak","Sweet","Ganesh Chaturthi","Steamed","Coconut"}',
        '{"prepTime":"40 mins","cookTime":"20 mins","difficulty":"Advanced","ingredientsSummary":["2 cups Rice Flour","2 cups grated Coconut","1.5 cups Jaggery","Cardamom & Nutmeg","Desi Ghee"],"recipeUrl":"https://www.vegrecipesofindia.com/ukadiche-modak-recipe/"}'::jsonb
    ),
    (
        'paithani-saree', 'paithani-saree', 'Paithani Silk Saree', 'mh', 'fashion',
        'The "Queen of Silks" hand-woven in Paithan with pure mulberry silk and real silver-gold zari, renowned for its peacock and parrot motifs.',
        'Paithani is characterized by its kaleidoscope-like oblique square borders and a heavy gold zari pallu adorned with peacocks, lotuses, and parrots.',
        'Dates back to the 2nd century BCE Satavahana dynasty in Paithan. Patronized by the Peshwas of Pune in the 18th century.',
        'Regarded as a treasured family heirloom passed down through generations in Maharashtrian weddings.',
        '{"name":"Paithan & Yeola","district":"Chhatrapati Sambhajinagar","state":"Maharashtra","coordinates":{"lat":19.4795,"lng":75.3854}}',
        '[{"url":"https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80","alt":"Authentic royal Paithani saree"}]'::jsonb,
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
        '{"Paithani","Saree","Handloom","Silk","Zari","Yeola"}',
        NULL
    ),
    (
        'kolhapuri-chappal', 'kolhapuri-chappal', 'Kolhapuri Chappal', 'mh', 'fashion',
        'GI-tagged handcrafted open-toed leather footwear cured with vegetable dyes and stitched entirely with leather cords without iron nails.',
        'Hand-braided leather sandals produced in Kolhapur using vegetable dyes from babul bark and harida seeds.',
        'Dating back to the 13th century under the Shilahara rulers and promoted by Chhatrapati Shahu Maharaj.',
        'Granted Geographical Indication (GI) status in 2019, celebrating centuries of artisanal leather tanning.',
        '{"name":"Kolhapur Artisanal Hub","district":"Kolhapur","state":"Maharashtra","coordinates":{"lat":16.6956,"lng":74.2317}}',
        '[{"url":"https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80","alt":"Authentic Kolhapuri Chappal"}]'::jsonb,
        'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80',
        '{"Kolhapuri","Footwear","Leather","Handcrafted","GI Tag"}',
        NULL
    ),
    (
        'raigad-fort', 'raigad-fort', 'Raigad Fort — Capital of the Maratha Empire', 'mh', 'forts',
        'Gibraltar of the East — impregnable hill fortress perched 820 meters high in the Sahyadri mountains, capital of Chhatrapati Shivaji Maharaj.',
        'Featuring massive sheer cliffs, Maha Darwaja, the royal court (Raj Sabha) with acoustic design, and the revered Samadhi of Shivaji Maharaj.',
        'Rebuilt and fortified in 1656 by Hiroji Indulkar under the visionary leadership of Chhatrapati Shivaji Maharaj.',
        'The political, emotional, and spiritual epicenter of Maratha sovereignty and Hindavi Swarajya.',
        '{"name":"Raigad Fort Plateau","district":"Raigad","state":"Maharashtra","coordinates":{"lat":18.2346,"lng":73.441}}',
        '[{"url":"https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80","alt":"Raigad Fort bastion"}]'::jsonb,
        'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80',
        '{"Fort","Raigad","Shivaji Maharaj","Sahyadri","Maratha"}',
        NULL
    ),
    (
        'sinhagad-fort', 'sinhagad-fort', 'Sinhagad Fort — The Lion’s Fortress', 'mh', 'forts',
        'Strategic Sahyadri mountain fortress guarding Pune, famous for the heroic 1670 battle led by Tanaji Malusare.',
        'Situated on a steep cliff in the Bhuleshwar mountain range, renowned for Kalyan Darwaza, Tanaji Samadhi, and Kanda Bhaji with Pithla Bhakri.',
        'Originally Kondhana, captured by Subedar Tanaji Malusare scaling vertical cliffs using a monitor lizard (Ghorpad).',
        'Symbol of supreme sacrifice and Maratha martial valor, immortalized in ballads.',
        '{"name":"Sinhagad Hilltop","district":"Pune","state":"Maharashtra","coordinates":{"lat":18.3664,"lng":73.7558}}',
        '[{"url":"https://images.unsplash.com/photo-1627894006066-b45786537123?auto=format&fit=crop&w=1000&q=80","alt":"Sinhagad Fort cliff bastion"}]'::jsonb,
        'https://images.unsplash.com/photo-1627894006066-b45786537123?auto=format&fit=crop&w=1000&q=80',
        '{"Fort","Sinhagad","Tanaji Malusare","Pune","Trekking"}',
        NULL
    ),
    (
        'trimbakeshwar-temple', 'trimbakeshwar-temple', 'Trimbakeshwar Shiva Jyotirlinga', 'mh', 'temples',
        'Ancient black basalt Jyotirlinga shrine at the origin of the sacred Godavari River, featuring a unique three-faced lingam.',
        'One of the 12 sacred Jyotirlingas, built in classic Hemadpanthi architectural style.',
        'Constructed by the third Peshwa, Balaji Baji Rao (Nanasaheb) between 1755 and 1786.',
        'Major pilgrimage center for Kumbh Mela and origin point of Dakshin Ganga (Godavari).',
        '{"name":"Trimbak Town","district":"Nashik","state":"Maharashtra","coordinates":{"lat":19.9322,"lng":73.5308}}',
        '[{"url":"https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80","alt":"Trimbakeshwar Temple black stone shikhara"}]'::jsonb,
        'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80',
        '{"Temple","Jyotirlinga","Shiva","Nashik","Godavari"}',
        NULL
    ),
    (
        'lavani-dance', 'lavani-dance', 'Lavani — Vibrant Folk Dance & Rhythm', 'mh', 'dance',
        'High-energy traditional folk dance of Maharashtra combining powerful dholki rhythms, theatrical facial expressions, and nine-yard Nauvari sarees.',
        'Characterized by rapid footwork, rhythmic Ghungroo sounds, and expressive theatrical sangeet.',
        'Flourished during the Peshwa period in the 18th and 19th centuries to boost the morale of Maratha soldiers.',
        'Maharashtra’s preeminent folk performing art celebrating rhythm, expression, and feminine energy.',
        '{"name":"Western Maharashtra & Marathwada","district":"Pune & Solapur","state":"Maharashtra","coordinates":{"lat":17.6599,"lng":75.9064}}',
        '[{"url":"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80","alt":"Lavani dancer in traditional Nauvari saree"}]'::jsonb,
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
        '{"Lavani","Dance","Folk","Dholki","Nauvari"}',
        NULL
    ),
    (
        'powada-ballads', 'powada-ballads', 'Powada — Maratha Heroic Balladry', 'mh', 'music',
        'Dramatic narrative ballad sung by Shahirs using Daf and Tuntune to recount historical Maratha military campaigns.',
        'High-tempo rhythmic storytelling accompanied by the daf tambourine.',
        'Originated during the mid-17th century with Shahir Agnidas’s epic ballad on the death of Afzal Khan at Pratapgad.',
        'Invaluable oral historical record and inspirational musical heritage of Maharashtra.',
        '{"name":"Maharashtra Statewide","district":"Pune, Satara, Kolhapur","state":"Maharashtra","coordinates":{"lat":17.6805,"lng":74.0183}}',
        '[{"url":"https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1000&q=80","alt":"Traditional Shahir performing Powada"}]'::jsonb,
        'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1000&q=80',
        '{"Powada","Music","Ballad","Shahir","Maratha"}',
        NULL
    ),
    (
        'warli-painting', 'warli-painting', 'Warli Tribal Painting', 'mh', 'crafts',
        'Ancient indigenous tribal art using white rice paste on red-ochre earthen walls to depict rhythmic circular dances, harvest, and nature.',
        'Geometric visual language composed of circles, triangles, and squares symbolizing the sun, moon, mountains, and sacred earth.',
        'Dates back to at least the 10th century CE, preserved by the Warli tribe in the northern Sahyadri hills.',
        'Celebrates animistic communion with nature, mother earth (Palghat), and community harmony.',
        '{"name":"Dahanu & Jawhar","district":"Palghar","state":"Maharashtra","coordinates":{"lat":19.9723,"lng":72.7317}}',
        '[{"url":"https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80","alt":"Warli tribal painting depicting circular Tarpa dance"}]'::jsonb,
        'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80',
        '{"Warli","Art","Tribal","Painting","GI Tag"}',
        NULL
    ),
    (
        'ajanta-caves-murals', 'ajanta-caves-murals', 'Ajanta Caves — Ancient Rock Murals', 'mh', 'temples',
        'UNESCO World Heritage rock-cut Buddhist caves carved into a horseshoe cliff, adorned with the pinnacle of ancient Indian fresco mural art.',
        '30 rock-cut cave monuments containing narrative tempera murals portraying Jataka tales.',
        'Excavated in two phases: the 2nd century BCE (Satavahana) and the 5th century CE (Vakataka dynasty under Harishena).',
        'The foundational benchmark of classical Asian painting and rock-cut Buddhist architecture.',
        '{"name":"Waghur River Gorge","district":"Chhatrapati Sambhajinagar","state":"Maharashtra","coordinates":{"lat":20.5519,"lng":75.7033}}',
        '[{"url":"https://images.unsplash.com/photo-1600100397608-f010e42f9b17?auto=format&fit=crop&w=1000&q=80","alt":"Padmapani mural inside Cave 1, Ajanta"}]'::jsonb,
        'https://images.unsplash.com/photo-1600100397608-f010e42f9b17?auto=format&fit=crop&w=1000&q=80',
        '{"Ajanta","UNESCO","Caves","Murals","Buddhism"}',
        NULL
    ),
    (
        'nagpur-tarri-poha', 'nagpur-tarri-poha', 'Nagpur Tarri Poha', 'mh', 'food',
        'Fiery Vidarbha breakfast staple — flattened rice served submerged in spicy chana tarri gravy, topped with onions and sev.',
        'Nagpur’s iconic breakfast dish balancing light flattened rice with spicy chickpea gravy.',
        'Evolved in the bustling market squares of Nagpur as hearty sustenance for industrial and cotton mill workers.',
        'The definitive culinary ambassador of Vidarbha’s fiery, spice-forward gastronomy.',
        '{"name":"Nagpur City Centers","district":"Nagpur","state":"Maharashtra","coordinates":{"lat":21.1458,"lng":79.0882}}',
        '[{"url":"https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1000&q=80","alt":"Nagpur Tarri Poha topped with spicy gravy and sev"}]'::jsonb,
        'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1000&q=80',
        '{"Poha","Tarri Poha","Nagpur","Vidarbha","Street Food"}',
        '{"prepTime":"15 mins","cookTime":"25 mins","difficulty":"Easy","ingredientsSummary":["2 cups flattened rice (Poha)","1 cup black chickpeas (Kala Chana)","2 tbsp Saoji Masala","Mustard seeds, Onions, Sev"],"recipeUrl":"https://www.tarladalal.com/tarri-poha-42027r"}'::jsonb
    ),
    (
        'pandharpur-wari-pilgrimage', 'pandharpur-wari-pilgrimage', 'Pandharpur Wari — Sacred Walking Pilgrimage', 'mh', 'culture',
        'Centuries-old annual 21-day walking pilgrimage of hundreds of thousands of Warkaris carrying the padukas of Sant Dnyaneshwar and Sant Tukaram to Pandharpur.',
        'Mass devotional journey characterized by chanting, Taal and Chipli rhythms, and egalitarian devotion.',
        'Instituted in its modern form in the 17th century by Sant Tukaram’s son, continuing ancient Varkari traditions from the 13th century.',
        'The spiritual heartbeat of Maharashtra, uniting all social strata in selfless devotion to Lord Vitthala.',
        '{"name":"Alandi/Dehu to Pandharpur","district":"Pune & Solapur","state":"Maharashtra","coordinates":{"lat":17.6775,"lng":75.3278}}',
        '[{"url":"https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=80","alt":"Warkari pilgrims carrying saffron flags"}]'::jsonb,
        'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=80',
        '{"Wari","Pandharpur","Warkari","Vithoba","Pilgrimage"}',
        NULL
    ),
    (
        'ellora-kailasa-caves', 'ellora-kailasa-caves', 'Kailasa Temple — Monolithic Rock Excavation', 'mh', 'temples',
        'World’s largest monolithic rock excavation (Cave 16), carved top-down from a single basalt cliff without scaffolding.',
        'Over 200,000 tons of rock excavated to create a multi-story Shiva temple complex adorned with dramatic mythological reliefs.',
        'Commissioned in the 8th century CE by Rashtrakuta King Krishna I (756–773 CE).',
        'Regarded as the single greatest rock-cut architectural and engineering feat in human history.',
        '{"name":"Ellora Caves Complex","district":"Chhatrapati Sambhajinagar","state":"Maharashtra","coordinates":{"lat":20.0238,"lng":75.179}}',
        '[{"url":"https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80","alt":"Kailasa Temple monolithic excavation at Ellora"}]'::jsonb,
        'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80',
        '{"Kailasa","Ellora","Monolith","UNESCO","Rashtrakuta"}',
        NULL
    ),
    (
        'assam-muga-silk', 'assam-muga-silk', 'Assam Muga Golden Silk', 'as', 'fashion',
        'Naturally golden, ultra-durable wild silk exclusive to the Brahmaputra Valley, which increases in luster with every wash.',
        'Produced from the endemic silkworm Antheraea assamensis feeding on Som and Soalu leaves.',
        'Patronized by the Ahom kings who decreed that Muga silk garments be reserved exclusively for royalty.',
        'Assam’s crown jewel of handloom heritage, holding a Geographical Indication (GI) tag.',
        '{"name":"Sualkuchi Silk Village","district":"Kamrup","state":"Assam","coordinates":{"lat":26.1705,"lng":91.5724}}',
        '[{"url":"https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80","alt":"Golden Muga silk fabric with traditional motifs"}]'::jsonb,
        'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80',
        '{"Muga Silk","Assam","Handloom","Golden Silk","GI Tag"}',
        NULL
    ),
    (
        'bihu-dance', 'bihu-dance', 'Rongali Bihu Dance & Pepa Rhythms', 'as', 'dance',
        'Joyous spring folk dance celebrating the Assamese New Year, featuring rapid hand movements, rhythmic hip sways, and the Buffalo-horn Pepa.',
        'Performed by young men and women in traditional Muga silk attire.',
        'Rooted in agrarian fertility rituals celebrating the onset of spring and the sowing season.',
        'The definitive cultural symbol of Assamese identity and community unity.',
        '{"name":"Assam Statewide","district":"Guwahati, Jorhat, Dibrugarh","state":"Assam","coordinates":{"lat":26.2006,"lng":92.9376}}',
        '[{"url":"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80","alt":"Bihu dancers performing with Pepa instruments"}]'::jsonb,
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
        '{"Bihu","Assam","Dance","Spring","Pepa"}',
        NULL
    ),
    (
        'majuli-mukha-masks', 'majuli-mukha-masks', 'Majuli Island Mukha Mask Craft', 'as', 'crafts',
        'Traditional bamboo, clay, and cow dung theatrical masks crafted in the Vaishnavite Satras of Majuli island for Bhaona folk theater.',
        'Organic masks depicting characters from the Ramayana, Mahabharata, and Puranas.',
        'Pioneered in the 16th century by Saint Srimanta Sankardev as a visual medium for religious plays.',
        'GI-tagged intangible cultural heritage embodying Assam’s unique Vaishnavite monastic tradition.',
        '{"name":"Samaguri Satra, Majuli","district":"Majuli","state":"Assam","coordinates":{"lat":26.9536,"lng":94.2152}}',
        '[{"url":"https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80","alt":"Handcrafted Mukha mask of Majuli Island"}]'::jsonb,
        'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80',
        '{"Majuli","Mask","Satra","Assam","Craft","GI Tag"}',
        NULL
    ),
    (
        'rang-ghar', 'rang-ghar', 'Rang Ghar — Ahom Royal Amphitheater', 'as', 'architecture',
        'Asia’s oldest surviving royal sports pavilion and amphitheater, constructed with indigenous rice-lime mortar and inverted-boat roof.',
        'Two-story red brick pavilion built for Ahom monarchs to witness buffalo fights and Bihu dances.',
        'Commissioned in 1746 CE by Ahom King Pramatta Singha in the royal capital of Rangpur.',
        'Architectural masterpiece of medieval brick masonry in Northeast India.',
        '{"name":"Rongpur Historical Site","district":"Sivasagar","state":"Assam","coordinates":{"lat":26.9644,"lng":94.6231}}',
        '[{"url":"https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=80","alt":"Rang Ghar royal pavilion in Sivasagar"}]'::jsonb,
        'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=80',
        '{"Rang Ghar","Assam","Ahom","Architecture","Sivasagar"}',
        NULL
    ),
    (
        'assam-masor-tenga', 'assam-masor-tenga', 'Assamese Masor Tenga (Sour Fish Curry)', 'as', 'food',
        'Refreshing light sour fish curry prepared with fresh river fish, tomatoes, elephant apple (Ou Tenga), or lemon juice.',
        'Light, aromatic gravy combining sour flavors with fresh cilantro and mustard oil.',
        'Centuries-old culinary tradition adapted to the humid riverine climate of the Brahmaputra valley.',
        'The quintessential comfort food of Assamese households, cooling the body in summer.',
        '{"name":"Brahmaputra Valley","district":"Guwahati, Jorhat","state":"Assam","coordinates":{"lat":26.1445,"lng":91.7362}}',
        '[{"url":"https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=80","alt":"Assamese Masor Tenga sour fish curry"}]'::jsonb,
        'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=80',
        '{"Masor Tenga","Assam","Fish Curry","Traditional","Brahmaputra"}',
        '{"prepTime":"15 mins","cookTime":"25 mins","difficulty":"Easy","ingredientsSummary":["500g fresh river Rohu or Catla fish","2 ripe tomatoes","Juice of 1 Kaji Nemu (Assam lemon)","Panch Phoron, Mustard oil, Turmeric"],"recipeUrl":"https://www.slurrp.com/recipes/masor-tenga-1612781442"}'::jsonb
    ),
    (
        'rajasthan-kathputli', 'rajasthan-kathputli', 'Kathputli String Puppetry', 'rj', 'crafts',
        'Vibrant wooden string puppetry tradition of the Bhatt community of Rajasthan, accompanied by dholak rhythms and the shrill whistle (Boli).',
        'Hand-carved wooden puppets dressed in shimmering Rajasthani textiles.',
        'Dating back over a thousand years to the patronage of King Vikramaditya of Ujjain.',
        'Traditional vehicle for folklore, royal histories, and moral education across Rajasthan.',
        '{"name":"Nagaur & Jaipur Hubs","district":"Jaipur & Nagaur","state":"Rajasthan","coordinates":{"lat":26.9124,"lng":75.7873}}',
        '[{"url":"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80","alt":"Rajasthani Kathputli string puppets"}]'::jsonb,
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
        '{"Kathputli","Puppetry","Rajasthan","Folk Art","GI Tag"}',
        NULL
    )
ON CONFLICT (id) DO NOTHING;

-- ── 3. MONUMENTS (POPULATING APPROVED STATE IDs) ───────────────────────────
INSERT INTO monuments (id, slug, name, state_id, region, district_or_city, category, short_description, description, detailed_history, cultural_importance, location_name, year_built, architectural_style, image, banner_image, model_url, model_available, latitude, longitude) VALUES
    (
        'gateway-of-india', 'gateway-of-india', 'Gateway of India', 'mh', 'Western India', 'Mumbai', 'Monuments',
        'Iconic basalt arch monument overlooking the Arabian Sea, blending Indo-Saracenic and Gujarati architectural styles.',
        'The Gateway of India is an iconic 26-meter-tall arch constructed from yellow basalt stone. Designed by architect George Wittet, it commemorates the 1911 royal visit of King George V and Queen Mary.',
        'Erected between 1914 and 1924. Historically significant as the departure point for the last British military regiment (1st Battalion of the Somerset Light Infantry) on February 28, 1948, marking the symbolic end of British rule in India.',
        'Mumbai’s most recognizable maritime symbol and a historic monument of India’s journey from colonial rule to independence.',
        'Apollo Bunder, Colaba, Mumbai', '1924', 'Indo-Saracenic Revival with Gujarati 16th-century elements',
        'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
        'https://models.readyplayer.me/64b5f88412e847c2b53f47c3.glb', TRUE, 18.9220, 72.8347
    ),
    (
        'ellora-caves', 'ellora-caves', 'Kailasa Temple, Ellora Caves', 'mh', 'Western India', 'Chhatrapati Sambhajinagar', 'Sacred Temples',
        'World’s largest monolithic rock excavation (Cave 16), carved top-down from a single basalt mountain cliff.',
        'Cave 16 of the UNESCO World Heritage Ellora Caves complex is a complete multi-story temple complex carved out of a single vertical basalt rock cliff.',
        'Commissioned in the 8th century CE under Rashtrakuta King Krishna I (reigned 756–773 CE).',
        'A supreme triumph of ancient Indian architecture, geometry, and stone carving.',
        'Ellora Caves Complex, Verul', '756–773 CE', 'Rashtrakuta Dravidian Monolithic Rock-Cut Architecture',
        'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
        NULL, FALSE, 20.0238, 75.1790
    ),
    (
        'raigad-fort-shivaji-statue', 'raigad-fort-shivaji-statue', 'Chhatrapati Shivaji Maharaj Statue & Samadhi, Raigad Fort', 'mh', 'Western India', 'Raigad', 'Forts & Fortresses',
        'Sacred memorial complex on the Raigad hill fortress commemorating the founder of the Maratha Empire.',
        'Perched 820 meters high, the Samadhi monument and statue complex commemorates the coronation and life of Chhatrapati Shivaji Maharaj.',
        'Designed by master architect Hiroji Indulkar in the late 17th century.',
        'A pilgrimage site of national historical significance and Maratha pride.',
        'Raigad Fort Plateau, Mahad', '1674', 'Maratha Fort Architecture',
        'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
        NULL, FALSE, 18.2346, 73.4410
    ),
    (
        'rang-ghar', 'rang-ghar', 'Rang Ghar, Sivasagar', 'as', 'Northeastern India', 'Sivasagar', 'Architecture & Engineering',
        'Asia’s oldest surviving royal amphitheater, built with red brick and rice-lime mortar by Ahom monarchs.',
        'Two-story pavilion with an iconic roof shaped like an inverted Ahom royal boat.',
        'Constructed by Ahom King Pramatta Singha in 1746 CE.',
        'Emblematic landmark of Ahom royal sporting culture and architecture.',
        'Rongpur, Sivasagar', '1746', 'Ahom Brick Masonry',
        'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
        NULL, FALSE, 26.9644, 94.6231
    )
ON CONFLICT (id) DO NOTHING;

-- ── 4. MONUMENT HOTSPOTS (12 ROWS FOR VALIDATED MONUMENTS) ──────────────────
INSERT INTO monument_hotspots (id, monument_id, title, short_description, detailed_text, position_x, position_y, position_z, architectural_note) VALUES
    ('central-arch', 'gateway-of-india', 'Central Triumphal Arch', 'The 26-meter grand triumphal archway', 'Built from yellow basalt stone quarried locally from Kharodi near Mumbai.', 0.0, 2.5, 1.2, 'Indo-Saracenic arch with Gujarati jaali lattice work.'),
    ('central-dome', 'gateway-of-india', 'Central Ribbed Dome', 'Magnificent central dome spanning 15 meters', 'The central dome rises to 25 meters above the ground, echoing Sultanate architecture.', 0.0, 4.8, 0.0, 'Ribbed dome construction in basalt.'),
    ('latticed-screens', 'gateway-of-india', 'Gujarati Jali Screen Windows', 'Intricate stone jaali windows along the side halls', 'Derived from the 16th-century architectural traditions of Muslim Gujarat.', -2.1, 1.8, 0.5, 'Hand-carved basalt jali panels.'),
    ('seafront-promenade', 'gateway-of-india', 'Arabian Sea Anchorage Steps', 'Wide stone steps leading to the Mumbai harbor', 'Historically used as the formal landing jetty for British dignitaries and vice-regal arrivals.', 0.0, -0.5, 3.2, 'Granite waterfront jetty.'),
    ('vimana-shikhara', 'ellora-caves', 'Dravidian Shikhara', 'Main temple spire rising 32 meters', 'Carved top-down from living basalt rock.', 0.0, 5.2, -1.0, 'Octagonal Dravidian dome shikhara.'),
    ('dhwajasthambha', 'ellora-caves', 'Monolithic Victory Pillar', 'Free-standing 15-meter carved pillar', 'Chiseled directly from the courtyard bedrock without separate foundation.', -3.5, 2.0, 2.0, 'Rashtrakuta monolithic column.'),
    ('elephant-plinth', 'ellora-caves', 'Life-Sized Elephant Plinth', 'Monolithic elephants bearing the temple weight', 'Realistic life-sized elephant carvings supporting the main sanctum.', 0.0, 0.5, 0.0, 'Basalt sculpture plinth.'),
    ('meghadambari-canopy', 'raigad-fort-shivaji-statue', 'Stone Meghadambari Canopy', 'Carved stone canopy over the royal memorial', 'Traditional Maratha stone canopy with ornate pillars.', 0.0, 2.0, 0.0, 'Maratha architectural canopy.'),
    ('samadhi-plinth', 'raigad-fort-shivaji-statue', 'Sacred Samadhi Memorial Plinth', 'Basalt stone plinth marking the Samadhi', 'Revered site where the final rites of Shivaji Maharaj were performed in 1680.', 0.0, 0.3, 0.0, 'Basalt masonry plinth.'),
    ('nagarkhana-view', 'raigad-fort-shivaji-statue', 'Nagarkhana & Acoustic Royal Court', 'The royal drum house with extraordinary acoustics', 'Designed so that whisper from the gate could be heard at the royal throne.', 4.0, 3.0, 2.0, 'Maratha acoustic masonry.'),
    ('inverted-boat-roof', 'rang-ghar', 'Inverted-Boat Vaulted Roof', 'Iconic vaulted roof of Rang Ghar', 'Inspired by traditional Ahom river boat hulls.', 0.0, 3.5, 0.0, 'Ahom vaulted brick roof.'),
    ('royal-viewing-pavilion', 'rang-ghar', 'Royal Upper Gallery', 'Second floor gallery for Ahom kings', 'Designed with arched openings to view buffalo fights in the courtyard below.', 0.0, 1.8, 1.0, 'Brick and terracotta gallery.')
ON CONFLICT (id) DO NOTHING;

-- ── 5. FESTIVALS (8 ROWS MATCHING POPULATED STATES) ─────────────────────────
INSERT INTO festivals (id, name, state_id, month_index, date_or_season, category, short_description, cultural_significance, traditional_practices, image) VALUES
    ('gudi-padwa', 'Gudi Padwa', 'mh', 2, 'Chaitra Shukla Pratipada (Mar–Apr)', 'new-year',
     'Marathi New Year celebrating the arrival of spring and agricultural harvest.',
     'Marks the beginning of the Hindu lunisolar calendar and symbolizes victory and auspicious beginnings.',
     '{"Hoisting the Gudi cloth and neem leaves","Feasting on Shrikhand and Puran Poli","Rangoli art at entrance"}',
     'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80'),
    ('ganeshotsav', 'Ganeshotsav (Ganesh Chaturthi)', 'mh', 7, 'Bhadrapada Shukla Chaturthi (Aug–Sep)', 'religious',
     'Grand 10-day cultural festival celebrating Lord Ganesha with domestic shrines and massive community pandals.',
     'Pioneered as a public festival by Lokmanya Tilak in 1893 to unite people during the independence struggle.',
     '{"Pranapratishtha ritual","Offering 21 Ukadiche Modaks","Visarjan immersion procession with Dhol-Tasha"}',
     'https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?auto=format&fit=crop&w=1000&q=80'),
    ('makar-sankranti', 'Makar Sankranti & Magh Bihu', 'mh', 0, 'January 14–15 (Solar Transition)', 'harvest',
     'Harvest festival celebrating the sun’s northern journey (Uttarayan) with kite flying and sesame sweets.',
     'Celebrates community harmony with the exchange of Tilgul and the greeting Tilgul ghya, god god bola.',
     '{"Exchanging Tilgul sesame-jaggery sweets","Kite flying battles","Haldi Kunku ceremonies"}',
     'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80'),
    ('pola-festival', 'Bail Pola (Bullock Thanksgiving)', 'mh', 7, 'Shravan/Bhadrapada Purnima (August)', 'agricultural',
     'Thanksgiving festival honoring farm bullocks and cattle for their vital agricultural partnership.',
     'Celebrates the bond between agrarian families and working farm animals.',
     '{"Bathing and decorating bullocks with turmeric and shawls","Procession through village gates","Offering sweet Puran Poli"}',
     'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=80'),
    ('bihu', 'Rongali (Bohag) Bihu', 'as', 3, 'Bohag Month (Mid-April)', 'harvest',
     'The chief harvest and spring festival of Assam, marking the Assamese New Year.',
     'Celebrates agricultural fertility, joy, and the Assamese New Year.',
     '{"Performing Bihu dance with Pepa horns","Feasting on Pitha rice cakes","Seeking blessings from elders"}',
     'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80'),
    ('onam', 'Onam Harvest Festival', 'kl', 7, 'Chingam Month (Aug–Sep)', 'harvest',
     'Grand harvest festival of Kerala celebrating the annual return of the mythical King Mahabali.',
     'Celebrates prosperity, egalitarian joy, and cultural homecoming across Kerala.',
     '{"Creating floral Pookkalam carpets","Onasadya 26-dish grand feast","Vallam Kali snake boat races"}',
     'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&w=1000&q=80'),
    ('pushkar-fair', 'Pushkar Camel Fair', 'rj', 9, 'Kartik Purnima (Oct–Nov)', 'cultural',
     'World-famous livestock and cultural fair held on the edge of the Thar Desert in Pushkar.',
     'Combines vibrant livestock trading with sacred bathing in Pushkar Sarovar lake.',
     '{"Trading decorated camels and horses","Folk music and Ghoomar performances","Sacred lake dip at Kartik Purnima"}',
     'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80')
ON CONFLICT (id) DO NOTHING;
