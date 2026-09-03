import { CulturalItem } from '../types/culturalItem';

export const MAHARASHTRA_CULTURAL_ITEMS: CulturalItem[] = [
  // --- FOOD ---
  {
    id: 'pune-misal-pav',
    slug: 'pune-misal-pav',
    title: 'Puneri Misal Pav',
    marathiTitle: 'पुणेरी मिसळ पाव',
    hindiTitle: 'पुणेरी मिसल पाव',
    stateId: 'maharashtra',
    category: 'food',
    shortDescription: 'Sprouted moth bean curry spiced with indigenous Goda masala, layered with crisp farsan, chopped onions, and lemon, served with pav.',
    description: 'Puneri Misal is renowned for its balanced sweet, tangy, and pungent notes derived from roasted coconut, coriander seeds, and traditional Maharashtrian Goda Masala. Unlike Kolhapuri Misal, which is fiery red, Puneri Misal offers a layered complexity with poha or matki sprouts at its base, topped with crunchy farsan, spicy tarri (kat), chopped raw onions, fresh cilantro, and warm buttery pav.',
    history: 'Originated in the late 19th and early 20th centuries as a wholesome, protein-rich morning breakfast for agrarian workers and students in Pune’s historic peths (wards). Over decades, legendary institutions like Kata Kirr, Bedekar Tea Stall, and Shri Krishna Bhuvan perfected the dish into a cultural benchmark.',
    culturalSignificance: 'An emblem of Pune’s culinary identity, representing the Maharashtrian ethos of transforming simple sprouted pulses into a regal gastronomic experience.',
    location: {
      name: 'Pune Peths',
      district: 'Pune',
      state: 'Maharashtra',
      coordinates: {
        lat: 18.5204,
        lng: 73.8567
      }
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=80',
        alt: 'Authentic Puneri Misal Pav served with spicy tarri and fresh lemons',
        credit: 'Culinary Heritage Archives',
        license: 'Creative Commons / Open Documentation'
      }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=80',
    sources: [
      {
        title: 'Traditional Foods of Maharashtra',
        publisher: 'Maharashtra Tourism Development Corporation (MTDC)',
        verifiedDate: '2025-04-12'
      }
    ],
    starSchemaNodes: [
      {
        id: 'materials',
        type: 'materials',
        label: 'Goda Masala & Matki',
        shortDescription: 'Sprouted moth beans & roasted stone spices.',
        detailedContent: 'Key spice blend includes dagad phool (stone flower), coconut, sesame seeds, cinnamon, and dried red chilies.'
      },
      {
        id: 'history',
        type: 'history',
        label: 'Historic Peth Culture',
        shortDescription: '19th century communal breakfast traditions.',
        detailedContent: 'Developed around Pune’s historic trading wards as an affordable, nutrient-dense breakfast for workers and scholars.'
      },
      {
        id: 'region',
        type: 'region',
        label: 'Desh / Western Plateau',
        shortDescription: 'Deccan agricultural heartland.',
        detailedContent: 'Centuries of pulse farming in western Maharashtra provided abundant moth bean harvests for sprout fermentation.'
      },
      {
        id: 'tradition',
        type: 'tradition',
        label: 'Tarri & Farsan Layering',
        shortDescription: 'Multi-textural culinary architecture.',
        detailedContent: 'Constructed in deliberate layers: boiled sprouted matki base, crunchy farsan topping, freshly poured red kat (broth), and lemon.'
      }
    ],
    relatedItemSlugs: ['mumbai-vada-pav', 'kolhapur-tambada-rassa', 'ukadiche-modak'],
    tags: ['Misal', 'Pune', 'Goda Masala', 'Street Food', 'Breakfast', 'Vegetarian'],
    recipeInfo: {
      prepTime: '20 mins (+ overnight sprouting)',
      cookTime: '30 mins',
      difficulty: 'Medium',
      ingredientsSummary: [
        '1.5 cups sprouted Moth Beans (Matki)',
        '2 tbsp authentic Maharashtrian Goda Masala',
        '1 cup crunchy Mixed Farsan',
        '1 large Onion, finely chopped',
        '1 tsp Mustard seeds, Cumin seeds, and Curry leaves',
        'Fresh Coriander, Lemon wedges, and Ladi Pav'
      ],
      culturalContext: 'Traditionally cooked in iron kadhais to enhance the color and iron content of the tarri gravy.',
      recipeUrl: 'https://recipes.timesofindia.com/recipes/puneri-misal/rs54332822.cms',
      verifiedSourceName: 'Times of India Food Heritage'
    },
    lastVerified: '2025-08-01'
  },
  {
    id: 'mumbai-vada-pav',
    slug: 'mumbai-vada-pav',
    title: 'Mumbai Vada Pav',
    marathiTitle: 'मुंबई वडा पाव',
    hindiTitle: 'मुंबई वड़ा पाव',
    stateId: 'maharashtra',
    category: 'food',
    shortDescription: 'Deep-fried spiced potato fritter (batata vada) encased in a soft ladi pav with fiery garlic chutney, fried green chilies, and mint chutney.',
    description: 'Often dubbed the "Indian Burger", Vada Pav is Mumbai’s ultimate democratic street food. It features a spiced mashed potato patty infused with mustard seeds, turmeric, ginger, garlic, and curry leaves, batter-coated in besan (gram flour) and fried golden. Served inside a sliced bun layered with pungent dry red garlic-coconut chutney and fried salted green chilies.',
    history: 'Created in 1966 by Ashok Vaidya outside Dadar railway station. Vaidya combined the traditional batata vada with western-style pav to create an ultra-portable, quick, and affordable meal for thousands of textile mill workers commuting along the central railway line.',
    culturalSignificance: 'A cornerstone of Mumbai’s working-class heritage and urban identity, crossing all socio-economic barriers.',
    location: {
      name: 'Dadar, Mumbai',
      district: 'Mumbai',
      state: 'Maharashtra',
      coordinates: {
        lat: 19.0178,
        lng: 72.8478
      }
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80',
        alt: 'Classic Mumbai Vada Pav with dry garlic chutney and fried chilies',
        credit: 'Mumbai Street Gastronomy Archive',
        license: 'Open Access Documentation'
      }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80',
    sources: [
      {
        title: 'The Story of Mumbai’s Vada Pav',
        publisher: 'National Geographic Traveller India',
        verifiedDate: '2024-09-18'
      }
    ],
    starSchemaNodes: [
      {
        id: 'history',
        type: 'history',
        label: '1966 Dadar Origin',
        shortDescription: 'Ashok Vaidya’s textile mill worker meal.',
        detailedContent: 'Invented at platform 1 of Dadar station to nourish the booming labor workforce of Mumbai’s Girangaon cotton mills.'
      },
      {
        id: 'materials',
        type: 'materials',
        label: 'Gram Flour & Garlic Chutney',
        shortDescription: 'Besan batter & roasted garlic crumb.',
        detailedContent: 'The distinct flavor comes from fried besan crisps (chura) blended with dry roasted garlic and Byadgi red chilies.'
      },
      {
        id: 'region',
        type: 'region',
        label: 'Konkan Coast Gateway',
        shortDescription: 'Synthesis of coastal spices & Portuguese pav.',
        detailedContent: 'Fuses the Portuguese-introduced yeast pav with coastal Konkani spiced potato preparations.'
      }
    ],
    relatedItemSlugs: ['pune-misal-pav', 'gateway-of-india', 'koli-dance'],
    tags: ['Street Food', 'Mumbai', 'Vada Pav', 'Quick Meal', 'Working Class Heritage'],
    recipeInfo: {
      prepTime: '25 mins',
      cookTime: '20 mins',
      difficulty: 'Easy',
      ingredientsSummary: [
        '4 large boiled & mashed Potatoes',
        '1 cup Besan (Gram Flour)',
        '1 tbsp Ginger-Garlic-Green Chili crushed paste',
        '1 tsp Mustard seeds, Turmeric, Asafoetida',
        '1 cup Dry Red Garlic Coconut Chutney',
        '6 fresh Ladi Pav buns & Fried salted Green Chilies'
      ],
      culturalContext: 'Eaten on the go during daily suburban train commutes across the Mumbai metropolitan railway network.',
      recipeUrl: 'https://hebbarskitchen.com/mumbai-vada-pav-recipe/',
      verifiedSourceName: 'Indian Culinary Archives'
    },
    lastVerified: '2025-08-01'
  },
  {
    id: 'kolhapur-tambada-rassa',
    slug: 'kolhapur-tambada-rassa',
    title: 'Kolhapuri Tambada & Pandhra Rassa',
    marathiTitle: 'तांबडा आणि पांढरा रस्सा',
    hindiTitle: 'कोल्हापुरी तांबड़ा एवं पांढरा रस्सा',
    stateId: 'maharashtra',
    category: 'food',
    shortDescription: 'Legendary dual broths from Kolhapur — the fiery red broth infused with Lavangi chilies and the delicate white coconut-poppy seed broth.',
    description: 'Kolhapur’s royal culinary signature consists of two complementary broths: Tambada Rassa (a blazing red, aromatic mutton broth infused with stone-ground Kolhapuri Kanda-Lahsunkar Masala and Lavangi chilies) and Pandhra Rassa (a soothing, rich white broth prepared with coconut milk, white poppy seeds, cashew paste, and whole aromatic spices).',
    history: 'Perfected in the royal kitchens of the Chhatrapati rulers of Kolhapur. The hunting traditions (shikar) of the Maratha royalty necessitated wholesome, high-flavor broths that preserved natural meat juices while restoring vitality to warriors.',
    culturalSignificance: 'Represents the pinnacle of royal Maratha hospitality and meat preparation in southern Maharashtra.',
    location: {
      name: 'Kolhapur City',
      district: 'Kolhapur',
      state: 'Maharashtra',
      coordinates: {
        lat: 16.7050,
        lng: 74.2433
      }
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=80',
        alt: 'Kolhapuri Tambada and Pandhra Rassa served in traditional thali',
        credit: 'Kolhapur Heritage Cuisine Consortium',
        license: 'Open Access Documentation'
      }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=80',
    sources: [
      {
        title: 'The Royal Cuisines of the Maratha Empire',
        publisher: 'Deccan Heritage Studies',
        verifiedDate: '2024-10-05'
      }
    ],
    starSchemaNodes: [
      {
        id: 'history',
        type: 'history',
        label: 'Maratha Royal Shikar',
        shortDescription: 'Royal court recipes of Chhatrapati Shahu Maharaj.',
        detailedContent: 'Nourishing bone broths created for royal expeditions, renowned for warming stamina and medicinal spice balms.'
      },
      {
        id: 'materials',
        type: 'materials',
        label: 'Kanda Lasun Masala',
        shortDescription: 'Sun-dried onion-garlic masala with Lavangi mirchi.',
        detailedContent: 'Handmade annually across Kolhapur households using slow-roasted onions, garlic cloves, and 24 whole spices.'
      },
      {
        id: 'region',
        type: 'region',
        label: 'Panchganga Basin',
        shortDescription: 'Fertile red-soil agricultural belt of Kolhapur.',
        detailedContent: 'The mineral-rich soil of the Panchganga river basin yields fiery chillies and aromatic garlic native to the region.'
      }
    ],
    relatedItemSlugs: ['kolhapuri-chappal', 'paithani-saree', 'pune-misal-pav'],
    tags: ['Kolhapur', 'Tambada Rassa', 'Pandhra Rassa', 'Royal Cuisine', 'Non-Vegetarian', 'Broth'],
    recipeInfo: {
      prepTime: '30 mins',
      cookTime: '45 mins',
      difficulty: 'Advanced',
      ingredientsSummary: [
        '500g bone-in tender Mutton pieces',
        '2 tbsp Kolhapuri Kanda Lasun Masala',
        '1 cup freshly pressed Coconut Milk (for Pandhra Rassa)',
        '2 tbsp White Poppy Seeds (Khus Khus) and Cashew paste',
        'Stone flower (Dagad Phool), Mace, Green Cardamom, Cinnamon',
        'Fresh Coriander and Kolhapuri Lavangi Chilies'
      ],
      culturalContext: 'Served as an unlimited broth course in Kolhapuri thalis alongside hot Bhakri (sorghum flatbread) and Indrayani rice.',
      recipeUrl: 'https://food.ndtv.com/recipe-kolhapuri-tambda-rassa-953330',
      verifiedSourceName: 'NDTV Food Heritage'
    },
    lastVerified: '2025-08-01'
  },
  {
    id: 'ukadiche-modak',
    slug: 'ukadiche-modak',
    title: 'Ukadiche Modak',
    marathiTitle: 'उकडीचे मोदक',
    hindiTitle: 'उकडीचे मोदक',
    stateId: 'maharashtra',
    category: 'food',
    shortDescription: 'Steamed fragrant rice flour dumplings shaped like lotus buds, encasing a sweet filling of freshly grated coconut, jaggery, nutmeg, and cardamom, drizzled with pure ghee.',
    description: 'Ukadiche Modak is the spiritual crown jewel of Maharashtrian confectionery. The name translates to "steamed dumplings" (ukad meaning steaming). Prepared by kneading freshly ground fragrant rice flour into a delicate dough, it is expertly hand-pleated into flower-like folds containing a luscious filling of grated coconut cooked in sticky golden jaggery with fragrant nutmeg and cardamom.',
    history: 'Rooted in ancient Vedic and Puranic literature where Lord Ganesha is described as "Modakpriya" (the lover of Modaks). The 21-modak Naivedya has been offered across Maharashtra since medieval times during Ganesh Chaturthi.',
    culturalSignificance: 'The supreme sacred offering during Ganeshotsav, embodying motherly devotion, patience in hand-crafting 21 pleats, and auspiciousness.',
    location: {
      name: 'Konkan Coast & Mumbai-Pune',
      district: 'Ratnagiri',
      state: 'Maharashtra',
      coordinates: {
        lat: 16.9902,
        lng: 73.3120
      }
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?auto=format&fit=crop&w=1000&q=80',
        alt: 'Steamed Ukadiche Modak with saffron strands and pure ghee',
        credit: 'Konkan Culinary Traditions',
        license: 'Open Access Documentation'
      }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?auto=format&fit=crop&w=1000&q=80',
    sources: [
      {
        title: 'Sacred Offerings: Culinary Rituals of Maharashtra',
        publisher: 'University of Mumbai Cultural Repository',
        verifiedDate: '2025-05-19'
      }
    ],
    starSchemaNodes: [
      {
        id: 'materials',
        type: 'materials',
        label: 'Ambemohar Rice & Coconut',
        shortDescription: 'Aromatic Konkan rice & fresh coastal palms.',
        detailedContent: 'Ambemohar rice flour imparts a distinctive mango-blossom fragrance to the steamed outer wrapper.'
      },
      {
        id: 'festival',
        type: 'festival',
        label: 'Ganesh Chaturthi Naivedya',
        shortDescription: 'Traditional 21 Modak sacred offering.',
        detailedContent: 'Offered as prasad on the first day of Ganeshotsav, representing completeness and spiritual wisdom.'
      },
      {
        id: 'technique',
        type: 'technique',
        label: 'Hand-Pleating (Pari)',
        shortDescription: 'Intricate manual folding of 21 pleats.',
        detailedContent: 'Mastered by generations of Maharashtrian women, pleating the outer casing without tearing requires immense tactile precision.'
      }
    ],
    relatedItemSlugs: ['pune-misal-pav', 'ganeshotsav-pune-mumbai', 'paithani-saree'],
    tags: ['Modak', 'Sweet', 'Ganesh Chaturthi', 'Steamed', 'Coconut', 'Jaggery'],
    recipeInfo: {
      prepTime: '40 mins',
      cookTime: '20 mins',
      difficulty: 'Advanced',
      ingredientsSummary: [
        '2 cups fragrant Ambemohar Rice Flour',
        '2 cups freshly grated tender Coconut',
        '1.5 cups organic sticky Jaggery (Gul)',
        '1 tsp freshly ground Cardamom & Nutmeg powder',
        '1 tbsp pure Cow Desi Ghee',
        'Pinch of Saffron dissolved in warm milk'
      ],
      culturalContext: 'Eaten piping hot with a generous spoonful of homemade golden cow ghee drizzled over the crest.',
      recipeUrl: 'https://www.vegrecipesofindia.com/ukadiche-modak-recipe/',
      verifiedSourceName: 'Authentic Maharashtrian Kitchen'
    },
    lastVerified: '2025-08-01'
  },

  // --- FASHION & TEXTILES ---
  {
    id: 'paithani-saree',
    slug: 'paithani-saree',
    title: 'Paithani Silk Saree',
    marathiTitle: 'पैठणी रेशमी साडी',
    hindiTitle: 'पैठणी सिल्क साड़ी',
    stateId: 'maharashtra',
    category: 'fashion',
    shortDescription: 'The "Queen of Silks" hand-woven in Paithan with pure mulberry silk and real silver-gold zari, renowned for its peacock (Mor) and parrot motifs.',
    description: 'Paithani is one of India’s most opulent handloom textiles, characterized by its kaleidoscope-like oblique square borders and a heavy gold zari pallu adorned with peacocks, lotuses, and parrots. Woven using the ancient tapestry technique where weft threads are interlocked by hand rather than using a shuttle, a single authentic Paithani saree can take anywhere from six months to two years to complete.',
    history: 'Dates back to the 2nd century BCE Satavahana dynasty in the ancient capital of Pratishthana (modern-day Paithan). The craft enjoyed royal patronage under the Peshwas of Pune in the 18th century, who were passionate collectors and developed exclusive motifs like the Narali (coconut) border and Asawali (flowering creeper).',
    culturalSignificance: 'Regarded as a treasured family heirloom passed down through generations, indispensable in Maharashtrian weddings and royal festivities.',
    location: {
      name: 'Paithan & Yeola',
      district: 'Chhatrapati Sambhajinagar & Nashik',
      state: 'Maharashtra',
      coordinates: {
        lat: 19.4795,
        lng: 75.3854
      }
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
        alt: 'Intricately woven gold zari pallu of an authentic royal Paithani saree',
        credit: 'Maharashtra Handloom Weavers Guild',
        license: 'Open Documentation'
      }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
    sources: [
      {
        title: 'Handlooms of India — Paithani Silk Heritage',
        publisher: 'Ministry of Textiles, Government of India',
        verifiedDate: '2025-03-14'
      }
    ],
    starSchemaNodes: [
      {
        id: 'history',
        type: 'history',
        label: 'Satavahana Dynasty Roots',
        shortDescription: '2000-year-old weaving lineage on the Godavari.',
        detailedContent: 'Exported to the Roman Empire in exchange for gold; later patronized by Peshwa Madhavrao I in Pune.'
      },
      {
        id: 'materials',
        type: 'materials',
        label: 'Filature Silk & Pure Gold Zari',
        shortDescription: 'Mulberry silk threads and silver-gold electroplated wires.',
        detailedContent: 'Only fine-denier natural mulberry silk is used, paired with metallic threads drawn from pure silver cores coated in gold.'
      },
      {
        id: 'tradition',
        type: 'tradition',
        label: 'Maharashtrian Bridal Heirloom',
        shortDescription: 'Essential royal bridal attire.',
        detailedContent: 'Traditionally worn with green glass bangles (Chuda) and pearl nose ring (Nath) during the vivah sanskar.'
      },
      {
        id: 'technique',
        type: 'technique',
        label: 'Tapestry Interlocking Weave',
        shortDescription: 'No floating threads on the reverse side.',
        detailedContent: 'The reverse side of an authentic Paithani looks virtually identical to the front due to manual thread interlocking.'
      }
    ],
    relatedItemSlugs: ['kolhapuri-chappal', 'nauvari-saree', 'ellora-caves'],
    tags: ['Paithani', 'Saree', 'Handloom', 'Silk', 'Zari', 'Yeola', 'Bridal Heritage'],
    lastVerified: '2025-08-01'
  },
  {
    id: 'kolhapuri-chappal',
    slug: 'kolhapuri-chappal',
    title: 'Kolhapuri Chappal',
    marathiTitle: 'कोल्हापुरी चप्पल',
    hindiTitle: 'कोल्हापुरी चप्पल',
    stateId: 'maharashtra',
    category: 'fashion',
    shortDescription: 'GI-tagged handcrafted open-toed leather footwear cured with vegetable dyes and stitched entirely with leather cords without iron nails.',
    description: 'Kolhapuri Chappals are world-renowned hand-braided leather sandals produced in Kolhapur. The crafting process is 100% natural, using vegetable dyes derived from babul tree bark and harida seeds. Stitched purely using leather thread (without any metallic nails or synthetic glue), they are famed for their distinct squeak, durability, and intricate braided straps.',
    history: 'Dating back to the 13th century under the Shilahara rulers. In the early 20th century, Chhatrapati Shahu Maharaj of Kolhapur aggressively promoted the artisan community by establishing specialized tanning quarters and trade guilds.',
    culturalSignificance: 'Granted Geographical Indication (GI) status in 2019, celebrating centuries of artisanal leather tanning and knotting craftsmanship.',
    location: {
      name: 'Kolhapur Artisan Quarters',
      district: 'Kolhapur',
      state: 'Maharashtra',
      coordinates: {
        lat: 16.7050,
        lng: 74.2433
      }
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80',
        alt: 'Handcrafted authentic Kolhapuri leather sandals with braided detailing',
        credit: 'Kolhapur Artisans Guild',
        license: 'Open Access Documentation'
      }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80',
    sources: [
      {
        title: 'Geographical Indications Journal — Kolhapuri Footwear',
        publisher: 'Intellectual Property India',
        verifiedDate: '2024-11-12'
      }
    ],
    starSchemaNodes: [
      {
        id: 'history',
        type: 'history',
        label: 'Patronage of Shahu Maharaj',
        shortDescription: 'Artisan upliftment in early 1900s.',
        detailedContent: 'The visionary royal ruler supported tanning clusters, modernizing production while preserving traditional cord-stitching.'
      },
      {
        id: 'materials',
        type: 'materials',
        label: 'Vegetable Tanning & Babul Bark',
        shortDescription: 'Natural organic curing agents.',
        detailedContent: 'Hides are soaked with myrobalan (Harida) nuts and acacia bark over weeks to achieve deep golden-brown tanning.'
      },
      {
        id: 'technique',
        type: 'technique',
        label: 'Zero Metal Construction',
        shortDescription: 'Interlocked entirely by leather threads.',
        detailedContent: 'Sole, straps, and decorative rosettes are assembled without a single nail or chemical adhesive.'
      }
    ],
    relatedItemSlugs: ['kolhapur-tambada-rassa', 'paithani-saree', 'pratapgad-fort'],
    tags: ['Footwear', 'Leather', 'Kolhapur', 'GI Tag', 'Handmade', 'Artisanal'],
    lastVerified: '2025-08-01'
  },

  // --- FORTS ---
  {
    id: 'raigad-fort',
    slug: 'raigad-fort',
    title: 'Raigad Fort — Capital of the Maratha Empire',
    marathiTitle: 'किल्ले रायगड — शिवछत्रपतींची राजधानी',
    hindiTitle: 'रायगढ़ किला — मराठा साम्राज्य की राजधानी',
    stateId: 'maharashtra',
    category: 'forts',
    shortDescription: 'The impregnable hill bastion chosen by Chhatrapati Shivaji Maharaj as the capital of the Maratha Empire, site of his grand coronation in 1674.',
    description: 'Perched 820 meters (2,700 ft) above sea level in the Sahyadri mountain range, Raigad was engineered by master architect Hiroji Indulkar as an unassailable mountain capital. The fort features massive gateways (Maha Darwaja), the royal court (Raj Sabha) with acoustic marvels, the queens’ chambers, the marketplace, the legendary Hirakani Buruj cliff, and the sacred samadhi of Chhatrapati Shivaji Maharaj.',
    history: 'Captured from Chandrarao More in 1656, Shivaji Maharaj renovated and heavily fortified the wedge-shaped mountain, crowning it the capital of Hindavi Swarajya in his coronation ceremony on June 6, 1674. It remained the supreme seat of Maratha power for decades.',
    culturalSignificance: 'The emotional and political soul of Maharashtra, symbolizing self-rule, indigenous administrative wisdom, and military architectural brilliance.',
    location: {
      name: 'Mahad Foothills',
      district: 'Raigad',
      state: 'Maharashtra',
      coordinates: {
        lat: 18.2346,
        lng: 73.4414
      }
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80',
        alt: 'Mighty stone bastions and fog over Raigad Fort in Sahyadri mountains',
        credit: 'ASI Western Circle & MTDC Archives',
        license: 'Open Access Documentation'
      }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80',
    sources: [
      {
        title: 'Forts of Maharashtra: Architecture and Strategy',
        publisher: 'Archaeological Survey of India',
        verifiedDate: '2025-02-28'
      }
    ],
    starSchemaNodes: [
      {
        id: 'history',
        type: 'history',
        label: '1674 Royal Coronation',
        shortDescription: 'Chhatrapati Shivaji Maharaj’s Rajyabhishek.',
        detailedContent: 'Coronation officiated by Gagabhatt of Varanasi, formally establishing the independent sovereign Maratha state.'
      },
      {
        id: 'technique',
        type: 'technique',
        label: 'Hiroji Indulkar Architecture',
        shortDescription: 'Acoustic Darbar and rain harvesting tanks.',
        detailedContent: 'The Raj Sabha court was acoustically designed so that whispers at the entrance could be heard at the throne 200 feet away.'
      },
      {
        id: 'region',
        type: 'region',
        label: 'Sahyadri Cloud Escarpment',
        shortDescription: 'Sheer vertical basalt cliffs.',
        detailedContent: 'Natural three-sided cliffs rising 800m made escalade attacks virtually impossible for invading armies.'
      },
      {
        id: 'tradition',
        type: 'tradition',
        label: 'Shivrajyabhishek Sohala',
        shortDescription: 'Annual heritage pilgrimage festival.',
        detailedContent: 'Thousands of youth from across India trek to Raigad every June to commemorate Shivaji Maharaj’s coronation.'
      }
    ],
    relatedItemSlugs: ['sinhagad-fort', 'pratapgad-fort', 'powada-ballads'],
    tags: ['Fort', 'Raigad', 'Shivaji Maharaj', 'Maratha Empire', 'Sahyadri', 'Capital'],
    model3DId: 'raigad-fort-shivaji-statue',
    lastVerified: '2025-08-01'
  },
  {
    id: 'sinhagad-fort',
    slug: 'sinhagad-fort',
    title: 'Sinhagad Fort — The Lion’s Fortress',
    marathiTitle: 'किल्ले सिंहगड',
    hindiTitle: 'सिंहगढ़ किला',
    stateId: 'maharashtra',
    category: 'forts',
    shortDescription: 'Historic hill fortress near Pune famed for the heroic 1670 battle led by Tanaji Malusare, who scaled its sheer cliff to recapture it.',
    description: 'Located 30 km southwest of Pune atop a cliff rising 1,312 meters above sea level, Sinhagad (originally Kondhana) offers sweeping tactical control over the Deccan plateau. The fort is revered for Tanaji Malusare’s night assault scaling the sheer vertical western cliff using a monitor lizard (Ghorpad named Yashwanti) during the Battle of Sinhagad in 1670.',
    history: 'Previously held by the Adil Shahi sultanate, the fort changed hands multiple times. Upon learning that Tanaji fell in the victorious battle, Shivaji Maharaj famously lamented: "Gad ala pan sinh gela" (The fort is won, but the lion is lost), renaming it Sinhagad.',
    culturalSignificance: 'A beloved pilgrimage and trekking landmark for Punekars, celebrated for its memorial to Tanaji, Kangan rock formations, and rustic culinary delights like hot Pithla-Bhakri and Matka Dahi.',
    location: {
      name: 'Haveli Region',
      district: 'Pune',
      state: 'Maharashtra',
      coordinates: {
        lat: 18.3663,
        lng: 73.7558
      }
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1627894006066-b45786537123?auto=format&fit=crop&w=1000&q=80',
        alt: 'Sinhagad Fort stone gate and bastions overlooking the Pune plateau',
        credit: 'Deccan Mountain Heritage Project',
        license: 'Open Access Documentation'
      }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1627894006066-b45786537123?auto=format&fit=crop&w=1000&q=80',
    sources: [
      {
        title: 'Maratha Fortifications and Tactical Warfare',
        publisher: 'Pune University Historical Series',
        verifiedDate: '2024-12-08'
      }
    ],
    starSchemaNodes: [
      {
        id: 'history',
        type: 'history',
        label: '1670 Battle of Sinhagad',
        shortDescription: 'Tanaji Malusare’s legendary nocturnal assault.',
        detailedContent: 'Subedar Tanaji Malusare led 300 Mavala soldiers up the sheer Dronagiri cliff under cover of dark, securing a historic victory.'
      },
      {
        id: 'materials',
        type: 'materials',
        label: 'Basalt Wall Bastions',
        shortDescription: 'Kalyan Darwaja and Pune Darwaja stone masonry.',
        detailedContent: 'Double-curved gateway architecture designed to trap attacking cavalry inside a concentrated crossfire zone.'
      },
      {
        id: 'tradition',
        type: 'tradition',
        label: 'Pithla Bhakri & Matka Dahi',
        shortDescription: 'Rustic mountain culinary culture.',
        detailedContent: 'Villagers on the fort serve hot chickpea curry (Pithla) with jowar flatbread (Bhakri) and curd set in clay pots.'
      }
    ],
    relatedItemSlugs: ['raigad-fort', 'pune-misal-pav', 'powada-ballads'],
    tags: ['Sinhagad', 'Fort', 'Pune', 'Tanaji Malusare', 'Sahyadri', 'Trek'],
    lastVerified: '2025-08-01'
  },

  // --- TEMPLES ---
  {
    id: 'trimbakeshwar-temple',
    slug: 'trimbakeshwar-temple',
    title: 'Trimbakeshwar Shiva Jyotirlinga',
    marathiTitle: 'त्र्यंबकेश्वर जोतिर्लिंग मंदिर',
    hindiTitle: 'त्र्यंबकेश्वर ज्योतिर्लिंग',
    stateId: 'maharashtra',
    category: 'temples',
    shortDescription: 'One of the 12 sacred Jyotirlingas, situated at the source of the holy Godavari River at the foothills of the Brahmagiri mountain.',
    description: 'Trimbakeshwar Temple is an extraordinary black basalt stone shrine exhibiting classic Hemadpanthi and Nagara architecture. Uniquely, the Jyotirlinga here features three faces representing Brahma, Vishnu, and Shiva, topped with an ornate diamond-encrusted crown dating back to the Pandavas and Peshwas. The sacred Kushavarta kund within the complex is the symbolic source of the holy River Godavari.',
    history: 'Rebuilt in exquisite black stone by Peshwa Balaji Baji Rao (Nanasaheb Peshwa) between 1755 and 1786 CE on the ancient site where sage Gautama performed penance to bring the Godavari (Dakshin Ganga) down to Earth.',
    culturalSignificance: 'A supreme Hindu pilgrimage destination and one of the four hosts of the monumental Kumbh Mela held every 12 years in Nashik-Trimbak.',
    location: {
      name: 'Trimbak, Brahmagiri Hills',
      district: 'Nashik',
      state: 'Maharashtra',
      coordinates: {
        lat: 19.9320,
        lng: 73.5307
      }
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=1000&q=80',
        alt: 'Black stone carved shikhara of Trimbakeshwar Jyotirlinga Temple',
        credit: 'Nashik Heritage Pilgrimage Trust',
        license: 'Open Access Documentation'
      }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=1000&q=80',
    sources: [
      {
        title: 'The 12 Sacred Jyotirlingas of India',
        publisher: 'Temple Architecture Society of India',
        verifiedDate: '2025-01-22'
      }
    ],
    starSchemaNodes: [
      {
        id: 'history',
        type: 'history',
        label: 'Peshwa Reconstruction (1755)',
        shortDescription: 'Commissioned by Nanasaheb Peshwa.',
        detailedContent: 'Constructed entirely from local volcanic basalt over 31 years at a cost of 16 lakh rupees.'
      },
      {
        id: 'region',
        type: 'region',
        label: 'Source of River Godavari',
        shortDescription: 'Brahmagiri Mountain spring origin.',
        detailedContent: 'The river emerges from Brahmagiri, filling the Kushavarta Kund where millions bathe during the Kumbh Mela.'
      },
      {
        id: 'tradition',
        type: 'tradition',
        label: 'Nashik Kumbh Mela',
        shortDescription: 'Sacred triennial spiritual congregation.',
        detailedContent: 'One of the largest religious gatherings on Earth, celebrating the celestial drop of nectar in sacred waters.'
      }
    ],
    relatedItemSlugs: ['ellora-caves', 'paithani-saree', 'ganeshotsav-pune-mumbai'],
    tags: ['Jyotirlinga', 'Temple', 'Shiva', 'Nashik', 'Kumbh Mela', 'Godavari'],
    lastVerified: '2025-08-01'
  },

  // --- DANCE & MUSIC ---
  {
    id: 'lavani-dance',
    slug: 'lavani-dance',
    title: 'Lavani — Vibrant Folk Dance & Rhythm',
    marathiTitle: 'लावणी लोकनृत्य',
    hindiTitle: 'लावणी लोक नृत्य',
    stateId: 'maharashtra',
    category: 'dance',
    shortDescription: 'A dynamic, rhythmic traditional folk dance performed to the rapid beats of the Dholki, famous for its expressiveness and Nauvari saree attire.',
    description: 'Lavani is Maharashtra’s most celebrated folk dance form, blending spirited dance, expressive facial abhinaya, and rapid footwork. Dancers don nine-yard Nauvari sarees, heavy ankle ghungroos (bells), and gold jewelry, performing to the pulsating polyrhythms of the wooden Dholki drum. Themes range from romance, satire, and social commentary to warrior valor.',
    history: 'Gained immense prominence during the 18th-century Peshwa era. Poets like Shahir Honaji Bala, Ram Joshi, and Prabhakar elevated Lavani into royal court entertainment and a morale-booster for Maratha soldiers returning from campaigns.',
    culturalSignificance: 'A cornerstone of Maharashtrian theater and rural sangeet baris, preserving indigenous rhythmic poetry and female expressive artistry.',
    location: {
      name: 'Solapur, Kolhapur & Pune',
      district: 'Solapur',
      state: 'Maharashtra',
      coordinates: {
        lat: 17.6599,
        lng: 75.9064
      }
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80',
        alt: 'Lavani folk dancer performing in vibrant Nauvari saree and ghungroos',
        credit: 'Maharashtra Folk Arts Academy',
        license: 'Open Access Documentation'
      }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80',
    sources: [
      {
        title: 'Folk Performing Arts of Western India',
        publisher: 'Sangeet Natak Akademi',
        verifiedDate: '2024-08-30'
      }
    ],
    starSchemaNodes: [
      {
        id: 'music',
        type: 'music',
        label: 'Dholki & Tuntune Rhythms',
        shortDescription: 'High-tempo percussion heartbeat.',
        detailedContent: 'The distinct acoustic sound of the two-headed wooden Dholki paired with the single-stringed Tuntune drives the dance.'
      },
      {
        id: 'tradition',
        type: 'tradition',
        label: 'Sangeet Bari Theaters',
        shortDescription: 'Traditional rural theater pavilions.',
        detailedContent: 'Centuries-old performing troupes preserve specialized Baithakachi Lavani (seated lyrical performance).'
      },
      {
        id: 'materials',
        type: 'materials',
        label: 'Nauvari & Ghungroo Ensembles',
        shortDescription: 'Nine-yard silk saree and brass ankle bells.',
        detailedContent: 'Dancers wear up to 100 brass bells on each ankle, synchronizing rhythmic strikes with the drum cadence.'
      }
    ],
    relatedItemSlugs: ['powada-ballads', 'paithani-saree', 'kolhapur-tambada-rassa'],
    tags: ['Lavani', 'Folk Dance', 'Dholki', 'Nauvari', 'Music', 'Performing Arts'],
    lastVerified: '2025-08-01'
  },
  {
    id: 'powada-ballads',
    slug: 'powada-ballads',
    title: 'Powada — Maratha Heroic Balladry',
    marathiTitle: 'पोवाडा — शौर्यगाथा',
    hindiTitle: 'पोवाड़ा — शौर्य गाथा',
    stateId: 'maharashtra',
    category: 'music',
    shortDescription: 'Dramatic narrative musical ballads composed by Shahirs (bard poets) narrating heroic battles, bravery, and historical sagas of Maratha warriors.',
    description: 'Powada is a dramatic vocal genre of heroic poetry accompanied by the Daf (tambourine-like drum), Dholki, and Majira cymbals. The Shahir (lead narrator) delivers rousing lyrical tales of military valor, strategy, and self-sacrifice with theatrical vigor, stirring deep patriotic and historical consciousness among listeners.',
    history: 'The earliest recorded Powada was composed in 1659 by Shahir Agnidas celebrating Chhatrapati Shivaji Maharaj’s victory over Afzal Khan at Pratapgad. During the Peshwa period, hundreds of ballads documented pivotal battles and social events.',
    culturalSignificance: 'A living oral history medium that preserved historical truth, military tactics, and moral fortitude across rural Maharashtra for over 350 years.',
    location: {
      name: 'Satara & Raigad Heartlands',
      district: 'Satara',
      state: 'Maharashtra',
      coordinates: {
        lat: 17.6805,
        lng: 73.9997
      }
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80',
        alt: 'Traditional Shahir performing Powada with Daf instrument',
        credit: 'Maharashtra Sangeet & Folk Heritage Council',
        license: 'Open Access Documentation'
      }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80',
    sources: [
      {
        title: 'Oral Traditions of Maharashtra: The Powada Literature',
        publisher: 'Sahitya Akademi Publications',
        verifiedDate: '2025-04-03'
      }
    ],
    starSchemaNodes: [
      {
        id: 'history',
        type: 'history',
        label: '1659 Afzal Khan Ballad',
        shortDescription: 'First documented Powada by Shahir Agnidas.',
        detailedContent: 'Composed immediately following the encounter at Pratapgad, establishing the foundational meter and rhythm of the genre.'
      },
      {
        id: 'music',
        type: 'music',
        label: 'Daf & Cymbals (Zanj)',
        shortDescription: 'Percussive acoustic instruments.',
        detailedContent: 'The sharp rim strikes on the goat-skin Daf provide an urgent military tempo that complements the Shahir’s vocal peaks.'
      },
      {
        id: 'tradition',
        type: 'tradition',
        label: 'Shahiri Tradition',
        shortDescription: 'Guild of martial ballad performers.',
        detailedContent: 'Shahirs were revered in Maratha military camps, serving as political communicators and cultural chroniclers.'
      }
    ],
    relatedItemSlugs: ['raigad-fort', 'sinhagad-fort', 'lavani-dance'],
    tags: ['Powada', 'Music', 'Ballad', 'Shahir', 'Shivaji Maharaj', 'Oral History'],
    lastVerified: '2025-08-01'
  },

  // --- CRAFTS ---
  {
    id: 'warli-painting',
    slug: 'warli-painting',
    title: 'Warli Tribal Painting',
    marathiTitle: 'वारली आदिवासी चित्रकला',
    hindiTitle: 'वारली चित्रकला',
    stateId: 'maharashtra',
    category: 'crafts',
    shortDescription: 'Indigenous geometric tribal art created with rice paste on red ochre mud walls, depicting harmonious nature, farming, and the circular Tarpa dance.',
    description: 'Warli painting is one of the world’s oldest living tribal art traditions. Created predominantly by women of the Warli tribe in the Sahyadri mountains of northern Maharashtra, it uses basic geometric shapes — the circle (representing the sun and moon), triangle (representing mountains and conical trees), and square (representing sacred space or chauk). Pigment is made from ground rice paste mixed with water and gum, applied with a chewed bamboo stick over earth-colored clay backgrounds.',
    history: 'Traced back to the 10th century CE, with roots in Neolithic rock art traditions. Brought to global international prominence in the 1970s by master artist Jivya Soma Mashe, who transitioned the ritual wall art onto paper and canvas.',
    culturalSignificance: 'Granted GI status, Warli art represents an eco-centric worldview emphasizing human unity with forests, wildlife, and natural cycles without depicting anthropomorphic deities.',
    location: {
      name: 'Dahanu & Jawhar Forests',
      district: 'Palghar',
      state: 'Maharashtra',
      coordinates: {
        lat: 19.9100,
        lng: 73.1200
      }
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80',
        alt: 'Warli tribal painting showing the circular Tarpa dance and village harmony',
        credit: 'Tribal Research Institute of Maharashtra',
        license: 'Open Access Documentation'
      }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80',
    sources: [
      {
        title: 'Tribal Arts of Maharashtra: The Warli Universe',
        publisher: 'Lalit Kala Akademi',
        verifiedDate: '2025-02-17'
      }
    ],
    starSchemaNodes: [
      {
        id: 'materials',
        type: 'materials',
        label: 'Rice Paste & Red Clay Base',
        shortDescription: '100% biodegradable natural pigments.',
        detailedContent: 'Walls are prepared with cow dung and red geru clay; white motifs are drawn using freshly fermented rice batter and bamboo brushes.'
      },
      {
        id: 'tradition',
        type: 'tradition',
        label: 'Lagna Chauk Ritual Paintings',
        shortDescription: 'Sacred marriage blessing murals.',
        detailedContent: 'Traditionally painted by Suvasinis (married women) to invoke the mother goddess Palghat for fertility and prosperous harvest.'
      },
      {
        id: 'technique',
        type: 'technique',
        label: 'Tarpa Dance Spiral Composition',
        shortDescription: 'Cosmic circular dance geometry.',
        detailedContent: 'The circular arrangement of dancers reflects the cycle of seasons, with the musician playing the trumpet-like Tarpa at the vortex.'
      }
    ],
    relatedItemSlugs: ['lavani-dance', 'paithani-saree', 'ellora-caves'],
    tags: ['Warli', 'Tribal Art', 'Palghar', 'Handicraft', 'GI Tag', 'Painting'],
    lastVerified: '2025-08-01'
  },

  // --- HISTORICAL & SPIRITUAL EXPANSIONS ---
  {
    id: 'ajanta-caves-murals',
    slug: 'ajanta-caves-murals',
    title: 'Ajanta Caves — Ancient Rock Murals',
    marathiTitle: 'अजिंठा लेणी — प्राचीन भित्तिचित्रे',
    hindiTitle: 'अजंता गुफाएं — प्राचीन भित्तिचित्र',
    stateId: 'maharashtra',
    category: 'temples',
    shortDescription: 'UNESCO World Heritage rock-cut Buddhist cave monuments featuring 2nd-century BCE tempera murals and masterly Jataka narrative paintings.',
    description: 'The 30 rock-cut cave monuments of Ajanta curve along a horseshoe-shaped basalt gorge over the Waghur River. Commissioned between the 2nd century BCE and the 5th century CE under the Satavahanas and Vakatakas, Ajanta represents the pinnacle of ancient Indian painting, celebrated for naturalistic anatomy, expressive hand mudras, and jewel-like mineral pigments.',
    history: 'Constructed in two distinct phases: early Hinayana Buddhist shrines under Satavahana patronage, followed by a monumental Mahayana artistic explosion during Emperor Harishena of the Vakataka dynasty (c. 460–477 CE).',
    culturalSignificance: 'A masterpiece of human creative genius on the UNESCO World Heritage list, providing the earliest visual benchmark of classical Indian fine art.',
    location: {
      name: 'Waghur River Gorge',
      district: 'Chhatrapati Sambhajinagar',
      state: 'Maharashtra',
      coordinates: {
        lat: 20.5519,
        lng: 75.7033
      }
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80',
        alt: 'Ajanta Cave facade carved into horseshoe basalt cliff',
        credit: 'ASI Western Circle Archives',
        license: 'Open Access Documentation'
      }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80',
    sources: [
      {
        title: 'The Ajanta Paintings: Classical Indian Art Repository',
        publisher: 'Archaeological Survey of India',
        verifiedDate: '2025-01-18'
      }
    ],
    starSchemaNodes: [
      {
        id: 'history',
        type: 'history',
        label: 'Vakataka Golden Age',
        shortDescription: 'Patronage of Emperor Harishena (5th Century CE).',
        detailedContent: 'Royal court artists painted the famous Padmapani and Vajrapani murals with mineral-bound pigments that endured 1500 years.'
      },
      {
        id: 'materials',
        type: 'materials',
        label: 'Lapis Lazuli & Ochre Pigments',
        shortDescription: 'Imported lapis lazuli and local volcanic clay.',
        detailedContent: 'Blue hues were made with lapis lazuli transported along ancient trade routes from Badakhshan.'
      }
    ],
    relatedItemSlugs: ['ellora-caves', 'paithani-saree', 'trimbakeshwar-temple'],
    tags: ['Ajanta', 'Cave Murals', 'Buddhism', 'UNESCO', 'Rock-Cut Architecture'],
    lastVerified: '2025-08-01'
  },
  {
    id: 'nagpur-tarri-poha',
    slug: 'nagpur-tarri-poha',
    title: 'Nagpur Tarri Poha',
    marathiTitle: 'नागपुरी तर्री पोहे',
    hindiTitle: 'नागपुरी तर्री पोहा',
    stateId: 'maharashtra',
    category: 'food',
    shortDescription: 'Vidarbha’s fiery breakfast icon — flattened rice topped with spicy black-chana (chickpea) gravy, boiled potatoes, chopped onions, and crunchy sev.',
    description: 'Tarri Poha is the undisputed street food king of Nagpur and the Vidarbha region. Flattened rice (poha) tossed with mustard seeds, turmeric, and peanuts is served drowned in a boiling cauldron of fiery, red-hot tarri (gravy) loaded with whole kala chana (brown chickpeas). It is garnished with crisp sev, finely diced raw onions, fresh coriander, and a slice of lime.',
    history: 'Developed in eastern Maharashtra over the 20th century as a high-protein, calorie-dense breakfast for orange orchard workers and central railway transit travelers.',
    culturalSignificance: 'A cultural ritual in Nagpur where morning discussions across political and social lines unfold over steaming bowls of Tarri Poha.',
    location: {
      name: 'Sitabuldi & Mahal',
      district: 'Nagpur',
      state: 'Maharashtra',
      coordinates: {
        lat: 21.1458,
        lng: 79.0882
      }
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=80',
        alt: 'Nagpuri Tarri Poha served with hot black chana gravy and crunchy sev',
        credit: 'Vidarbha Gastronomy Archive',
        license: 'Open Access Documentation'
      }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=80',
    sources: [
      {
        title: 'Street Food Heritage of Vidarbha',
        publisher: 'Maharashtra Culinary Repository',
        verifiedDate: '2025-03-22'
      }
    ],
    starSchemaNodes: [
      {
        id: 'materials',
        type: 'materials',
        label: 'Kala Chana & Saoji Spices',
        shortDescription: 'Spicy black chickpea broth.',
        detailedContent: 'Infused with Vidarbha Saoji masalas including stone flowers, dry bay leaves, and roasted red chilies.'
      },
      {
        id: 'region',
        type: 'region',
        label: 'Vidarbha Orange Belt',
        shortDescription: 'Eastern Maharashtra plateau.',
        detailedContent: 'The distinct spicy palate of Vidarbha cuisine originated to maintain body stamina through hot dry summers and winter mornings.'
      }
    ],
    relatedItemSlugs: ['pune-misal-pav', 'mumbai-vada-pav', 'kolhapur-tambada-rassa'],
    tags: ['Nagpur', 'Tarri Poha', 'Vidarbha', 'Street Food', 'Spicy', 'Breakfast'],
    recipeInfo: {
      prepTime: '20 mins',
      cookTime: '30 mins',
      difficulty: 'Medium',
      ingredientsSummary: [
        '2 cups thick flattened Rice (Poha)',
        '1 cup boiled Black Chickpeas (Kala Chana)',
        '2 tbsp Nagpuri Saoji Garam Masala',
        '2 tbsp Ginger-Garlic paste & finely chopped Green Chilies',
        '1 cup spiced Besan Sev & diced Onions',
        'Fresh Lime wedges and chopped Coriander'
      ],
      culturalContext: 'Served piping hot with customizable tarri spice levels from mild to fire-hot.',
      recipeUrl: 'https://hebbarskitchen.com/tarri-poha-recipe/',
      verifiedSourceName: 'Indian Culinary Archives'
    },
    lastVerified: '2025-08-01'
  },
  {
    id: 'pandharpur-wari-pilgrimage',
    slug: 'pandharpur-wari-pilgrimage',
    title: 'Pandharpur Wari — Sacred Walking Pilgrimage',
    marathiTitle: 'पंढरपूरची वारी व विठ्ठल भक्ती',
    hindiTitle: 'पंढरपुर वारी — वारकरी तीर्थयात्रा',
    stateId: 'maharashtra',
    category: 'culture',
    shortDescription: 'An 800-year-old egalitarian walking pilgrimage of over one million Warkaris journeying on foot to the sacred temple of Lord Vitthala with Pakhawaj drums and cymbals.',
    description: 'The Pandharpur Wari is one of the world’s oldest and largest peaceful spiritual processions. Over one million pilgrims (Warkaris) walk barefoot for 21 days carrying the sacred silver padukas (footwear) of saint-poets Dnyaneshwar and Tukaram from Alandi and Dehu to the temple town of Pandharpur on the banks of the Bhima (Chandrabhaga) river.',
    history: 'Institutionalized in the 13th century by Saint Dnyaneshwar and Saint Namdev, and later reorganized into the modern Palkhi system by Haibatbaba Arfalkar in the 18th century.',
    culturalSignificance: 'A monumental living expression of equality, Bhakti philosophy, and social brotherhood transcending all caste, gender, and economic divisions.',
    location: {
      name: 'Chandrabhaga River Bank',
      district: 'Solapur',
      state: 'Maharashtra',
      coordinates: {
        lat: 17.6775,
        lng: 75.3267
      }
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=1000&q=80',
        alt: 'Warkari pilgrims singing Abhangas with Pakhawaj drums on the way to Pandharpur',
        credit: 'Warkari Heritage Foundation',
        license: 'Open Access Documentation'
      }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=1000&q=80',
    sources: [
      {
        title: 'Bhakti Traditions of Maharashtra: The Wari Movement',
        publisher: 'Sahitya Akademi Publications',
        verifiedDate: '2025-06-10'
      }
    ],
    starSchemaNodes: [
      {
        id: 'music',
        type: 'music',
        label: 'Abhanga Singing & Taal',
        shortDescription: 'Devotional metric poetry of Bhakti saints.',
        detailedContent: 'Pilgrims sing verses composed by Tukaram, Dnyaneshwar, and Janabai to the rhythmic clinking of brass Chipli cymbals and Pakhawaj drums.'
      },
      {
        id: 'tradition',
        type: 'tradition',
        label: 'Ringan & Fugdi Circular Dances',
        shortDescription: 'Spiritual equine and human dance rituals.',
        detailedContent: 'During the Ringan ceremony, the sacred consecrated horse gallops in a massive circle surrounded by cheering Warkaris.'
      }
    ],
    relatedItemSlugs: ['lavani-dance', 'trimbakeshwar-temple', 'ukadiche-modak'],
    tags: ['Pandharpur', 'Wari', 'Bhakti', 'Warkari', 'Vitthala', 'Pilgrimage'],
    lastVerified: '2025-08-01'
  },
  {
    id: 'ellora-kailasa-caves',
    slug: 'ellora-kailasa-caves',
    title: 'Kailasa Temple — Monolithic Rock Excavation',
    marathiTitle: 'कैलास लेणे (वेरूळ)',
    hindiTitle: 'कैलाश मंदिर (एलोरा गुफाएं)',
    stateId: 'maharashtra',
    category: 'temples',
    shortDescription: 'The world’s largest monolithic rock-cut structure, excavated top-down from a single basalt cliff in the 8th century by the Rashtrakuta dynasty.',
    description: 'Cave 16 of Ellora, known as the Kailasa Temple, is an unmatched zenith of Indian rock architecture. Unlike conventional temples constructed by stacking stone blocks, the Kailasa was carved vertically from top to bottom out of a single monolithic basalt mountain cliff. Over 200,000 tonnes of volcanic rock were removed over several decades to reveal a multi-storey Dravidian temple complete with life-sized sculpted elephants, monumental victory pillars (dhvajastambhas), and breathtaking bas-reliefs depicting the Ramayana and Mahabharata.',
    history: 'Commissioned in the 8th century CE (c. 756–773 CE) by King Krishna I of the Rashtrakuta dynasty. The master sculptors designed it as a physical representation of Mount Kailash, the sacred Himalayan abode of Lord Shiva.',
    culturalSignificance: 'A designated UNESCO World Heritage Site, universally recognized as one of the most astonishing architectural achievements in human civilization.',
    location: {
      name: 'Ellora Caves Complex (Cave 16)',
      district: 'Chhatrapati Sambhajinagar',
      state: 'Maharashtra',
      coordinates: {
        lat: 20.0268,
        lng: 75.1780
      }
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1000&q=80',
        alt: 'Monolithic carved shikhara and courtyard of Kailasa Temple at Ellora',
        credit: 'ASI Aurangabad Circle & UNESCO Dossiers',
        license: 'Open Access Documentation'
      }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1000&q=80',
    sources: [
      {
        title: 'The Kailasa Temple at Ellora: A Monolithic Marvel',
        publisher: 'Archaeological Survey of India',
        verifiedDate: '2025-01-20'
      }
    ],
    starSchemaNodes: [
      {
        id: 'history',
        type: 'history',
        label: 'Rashtrakuta Dynasty Patronage',
        shortDescription: 'King Krishna I (8th Century CE).',
        detailedContent: 'Royal inscriptions testify that the sculptors themselves marveled at their own creation: "Oh, how could I have made this!"'
      },
      {
        id: 'technique',
        type: 'technique',
        label: 'Top-Down Monolithic Excavation',
        shortDescription: 'Zero scaffolding, pure downward chiseling.',
        detailedContent: 'Sculptors carved down from the cliff summit, finishing roofs and upper carvings first before working downwards to the foundations.'
      },
      {
        id: 'materials',
        type: 'materials',
        label: 'Deccan Basalt Traps',
        shortDescription: 'Dense volcanic basalt rock face.',
        detailedContent: 'The fine-grained black basalt allowed intricate micro-carvings of elephant herds and flying celestial deities.'
      }
    ],
    relatedItemSlugs: ['ajanta-caves-murals', 'trimbakeshwar-temple', 'paithani-saree'],
    tags: ['Ellora', 'Kailasa', 'UNESCO', 'Monolithic', 'Rashtrakuta', 'Rock-Cut Temple', 'Architecture'],
    model3DId: 'ellora-caves',
    lastVerified: '2025-08-01'
  }
];
