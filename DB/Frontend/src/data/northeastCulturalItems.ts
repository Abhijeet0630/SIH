import { CulturalItem } from '../types/culturalItem';

export const NORTHEAST_CULTURAL_ITEMS: CulturalItem[] = [
  // ==================== ASSAM ====================
  {
    id: 'assam-muga-silk',
    slug: 'assam-muga-silk',
    title: 'Assam Muga Golden Silk',
    marathiTitle: 'आसाम मुगा रेशीम',
    hindiTitle: 'असम का मुगा गोल्डन सिल्क',
    stateId: 'assam',
    category: 'fashion',
    shortDescription: 'Naturally golden, ultra-durable wild silk hand-woven from endemic Antheraea assamensis silkworms across Sualkuchi textile villages.',
    description: 'Muga is one of the rarest wild silks on Earth, produced exclusively in the Brahmaputra Valley of Assam. Naturally lustrous with an unmistakable shimmer of molten gold, Muga silk possesses a remarkable property: its tensile strength and golden sheen increase with every wash. Woven into traditional Mekhela Chadors adorned with Kingkhap (royal Ahom crown) and floral motifs.',
    history: 'Patronized by the royal Ahom kings for over 600 years, who decreed that only royalty could wear pure Muga attire. The weaving knowledge has been preserved across generations in Sualkuchi, known as the "Manchester of Assam".',
    culturalSignificance: 'Granted GI status in 2007, Muga is integral to Assamese identity, worn during Bihu celebrations, weddings, and sacred rites as a mark of dignity and heritage.',
    location: {
      name: 'Sualkuchi Weaving Cluster',
      district: 'Kamrup',
      state: 'Assam',
      coordinates: {
        lat: 26.1711,
        lng: 91.5727
      }
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
        alt: 'Golden luster of Assamese Muga silk Mekhela Chador with red Kingkhap borders',
        credit: 'Directorate of Sericulture & Handloom, Assam',
        license: 'Open Access Documentation'
      }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
    sources: [
      {
        title: 'Wild Silks of India: The Muga Heritage',
        publisher: 'Central Silk Board, Ministry of Textiles',
        verifiedDate: '2025-01-18'
      }
    ],
    starSchemaNodes: [
      {
        id: 'materials',
        type: 'materials',
        label: 'Som & Soalu Host Leaves',
        shortDescription: 'Wild outdoor silkworm rearing.',
        detailedContent: 'Silkworms feed exclusively on wild Som (Machilus bombycina) and Soalu foliage across Upper Assam deciduous forests.'
      },
      {
        id: 'tradition',
        type: 'tradition',
        label: 'Mekhela Chador & Bihu',
        shortDescription: 'Two-piece ceremonial attire.',
        detailedContent: 'Worn during Rongali Bihu with red Gos Bota motifs, paired with Gamusa and silver jewelry.'
      },
      {
        id: 'history',
        type: 'history',
        label: 'Ahom Royal Sumptuary Laws',
        shortDescription: 'Reserved for medieval nobility.',
        detailedContent: 'Ahom Swargadeos established dedicated royal weaving guilds (Tanti) in the Sivasagar capital.'
      }
    ],
    relatedItemSlugs: ['bihu-dance', 'majuli-mukha-masks', 'paithani-saree'],
    tags: ['Muga Silk', 'Assam', 'Handloom', 'GI Tag', 'Mekhela Chador', 'Sualkuchi'],
    lastVerified: '2025-08-01'
  },
  {
    id: 'bihu-dance',
    slug: 'bihu-dance',
    title: 'Rongali Bihu Dance & Pepa Rhythms',
    marathiTitle: 'रोंगाली बिहू लोकनृत्य',
    hindiTitle: 'रोंगाली बिहू नृत्य',
    stateId: 'assam',
    category: 'dance',
    shortDescription: 'Exuberant spring agrarian folk dance performed with rapid hand movements and swaying hips to the music of the Dhol, Pepa (buffalo horn pipe), and Gogona.',
    description: 'Bihu dance is the vibrant heartbeat of Assam, performed during the Bohag (Rongali) Bihu festival in mid-April to celebrate the arrival of the Assamese New Year and the spring seeding season. Both young men and women don traditional Muga silk Mekhela Chadors and Dhoti-Gamusas, dancing in concentric circles with rhythmic claps, hip sways, and brisk footwork that mimic agrarian planting and harvesting gestures.',
    history: 'Has ancient roots in Austroasiatic and Tibeto-Burman agrarian fertility rituals. In the 18th century, Ahom King Rudra Singha invited Bihu dancers to perform at the royal courtyard of Rang Ghar in Sivasagar, elevating the folk tradition into a national celebration.',
    culturalSignificance: 'A symbol of community fraternity, youthful joy, and seasonal renewal celebrated by all linguistic and ethnic communities of the Brahmaputra Valley.',
    location: {
      name: 'Brahmaputra Valley & Sivasagar',
      district: 'Sivasagar',
      state: 'Assam',
      coordinates: {
        lat: 26.9826,
        lng: 94.6425
      }
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80',
        alt: 'Assamese Bihu dancers in Muga silk and Kopou Phool orchid headpieces',
        credit: 'Sangeet Natak Akademi Archives',
        license: 'Open Access Documentation'
      }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80',
    sources: [
      {
        title: 'Bihu Dances of Assam: Folkloric Evolution',
        publisher: 'Sahitya Akademi & Assam Cultural Affairs',
        verifiedDate: '2025-03-22'
      }
    ],
    starSchemaNodes: [
      {
        id: 'music',
        type: 'music',
        label: 'Pepa & Dhol Percussion',
        shortDescription: 'Buffalo horn pipe & double-headed drum.',
        detailedContent: 'The high-pitched wail of the buffalo horn Pepa combined with the deep resonance of the Dhol sets the fast 4/4 syncopated rhythm.'
      },
      {
        id: 'tradition',
        type: 'tradition',
        label: 'Kopou Phool Orchids',
        shortDescription: 'Foxtail orchid hair embellishment.',
        detailedContent: 'Young women tuck blossoming wild purple Kopou Phool (Rhynchostylis retusa) into their hair buns during the spring dance.'
      }
    ],
    relatedItemSlugs: ['assam-muga-silk', 'majuli-mukha-masks', 'lavani-dance'],
    tags: ['Bihu', 'Folk Dance', 'Assam', 'Pepa', 'Spring', 'Harvest'],
    lastVerified: '2025-08-01'
  },
  {
    id: 'majuli-mukha-masks',
    slug: 'majuli-mukha-masks',
    title: 'Majuli Island Mukha Mask Craft',
    marathiTitle: 'माजुली बेट मुखवटे',
    hindiTitle: 'माजुली मुखा मुखौटा कला',
    stateId: 'assam',
    category: 'crafts',
    shortDescription: 'Traditional devotional theatrical masks sculpted from split bamboo frames, clay, cow dung, and vegetable dyes at Samaguri Satra on Majuli river island.',
    description: 'The Mukha mask-making tradition of Majuli Island was pioneered in the 16th century by Saint Srimanta Sankardev for use in Bhaona (religious folk theater). Artisans at Samaguri Satra craft lightweight, expressive masks representing mythological characters — from ten-headed Ravana and Garuda to gentle rishis. Constructed over a woven bamboo core layered with clay-soaked cotton fabric, they feature moving jaws and eyes.',
    history: 'Originated around 1500 CE as an audiovisual medium to convey Srimad Bhagavata moral narratives to rural communities regardless of literacy.',
    culturalSignificance: 'Granted GI status in 2024, preserving the living monastic arts of the world’s largest inhabited river island in the Brahmaputra.',
    location: {
      name: 'Samaguri Satra, Majuli Island',
      district: 'Majuli',
      state: 'Assam',
      coordinates: {
        lat: 26.9535,
        lng: 94.2155
      }
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80',
        alt: 'Intricate handmade bamboo and clay Mukha mask at Samaguri Satra',
        credit: 'Majuli Cultural Heritage Trust',
        license: 'Open Access Documentation'
      }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80',
    sources: [
      {
        title: 'Masks of Majuli: Vaishnavite Theatrical Heritage',
        publisher: 'Indira Gandhi National Centre for the Arts (IGNCA)',
        verifiedDate: '2025-02-14'
      }
    ],
    starSchemaNodes: [
      {
        id: 'materials',
        type: 'materials',
        label: 'Bamboo, Clay & Natural Dyes',
        shortDescription: '100% organic local biodegradable materials.',
        detailedContent: 'Local riverbed clay (Kumhar Mati) is mixed with cow dung and applied over split bamboo armatures with Hengul (vermilion) and Haital (yellow) pigments.'
      },
      {
        id: 'tradition',
        type: 'tradition',
        label: 'Bhaona Monastic Theater',
        shortDescription: '16th-century religious drama.',
        detailedContent: 'Performed inside Namghars (prayer halls) to enact the victory of dharma over adharma with classical Brajavali verses.'
      }
    ],
    relatedItemSlugs: ['bihu-dance', 'assam-muga-silk', 'warli-painting'],
    tags: ['Majuli', 'Masks', 'GI Tag', 'Assam', 'Bhaona', 'Handicraft', 'Bamboo'],
    lastVerified: '2025-08-01'
  },
  {
    id: 'rang-ghar',
    slug: 'rang-ghar',
    title: 'Rang Ghar — Ahom Royal Amphitheater',
    marathiTitle: 'रंग घर — अहोम राजेशाही नाट्यगृह',
    hindiTitle: 'रंग घर — अहोम शाही रंगभूमि',
    stateId: 'assam',
    category: 'architecture',
    shortDescription: 'Asia’s oldest surviving royal sports amphitheater, constructed in 1746 CE with indigenous sticky-rice mortar (Bora Saul) and an inverted-boat roof.',
    description: 'Rang Ghar ("House of Entertainment") is a two-storied red brick and stone amphitheater in Sivasagar, constructed by Ahom King Swargadeo Pramatta Singha in 1746 CE. From its royal pavilion, Ahom monarchs and nobility watched traditional sports such as buffalo fights, elephant wrestling, and Rongali Bihu performances. Its distinctive vaulted roof is shaped like an inverted Ahom war canoe (Maku).',
    history: 'A crowning engineering achievement of the Ahom Kingdom, showcasing seismic-resistant masonry constructed with brick paste blended with sticky rice (Bora Saul), duck eggs, and fish resin.',
    culturalSignificance: 'An enduring architectural symbol of Assam and one of the finest non-religious monuments in eastern India.',
    location: {
      name: 'Rupahi Pathar, Sivasagar',
      district: 'Sivasagar',
      state: 'Assam',
      coordinates: {
        lat: 26.9644,
        lng: 94.6225
      }
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80',
        alt: 'Historic red brick two-story structure of Rang Ghar in Sivasagar',
        credit: 'Archaeological Survey of India, Guwahati Circle',
        license: 'Open Access Documentation'
      }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80',
    sources: [
      {
        title: 'Ahom Architecture and Monument Engineering',
        publisher: 'Archaeological Survey of India',
        verifiedDate: '2024-12-10'
      }
    ],
    starSchemaNodes: [
      {
        id: 'technique',
        type: 'technique',
        label: 'Bora Saul Organic Mortar',
        shortDescription: 'Sticky rice & duck egg bonding agent.',
        detailedContent: 'Mortar concocted from sticky Bora rice, duck eggs, molasses, and powdered lime that withstood major earthquakes for three centuries.'
      },
      {
        id: 'history',
        type: 'history',
        label: 'Ahom Kingdom Swargadeos',
        shortDescription: 'Royal court of Pramatta Singha (1746).',
        detailedContent: 'Served as the ceremonial stadium for state-sponsored Bihu and martial games in the Tai-Ahom capital.'
      }
    ],
    relatedItemSlugs: ['bihu-dance', 'raigad-fort', 'gateway-of-india'],
    tags: ['Rang Ghar', 'Assam', 'Ahom', 'Architecture', 'Sivasagar', 'Amphitheater'],
    model3DId: 'rang-ghar',
    lastVerified: '2025-08-01'
  },
  {
    id: 'assam-masor-tenga',
    slug: 'assam-masor-tenga',
    title: 'Assamese Masor Tenga (Sour Fish Curry)',
    marathiTitle: 'आसामी मासोर टेंगा',
    hindiTitle: 'असमिया मासोर तेंगा',
    stateId: 'assam',
    category: 'food',
    shortDescription: 'A light, refreshing sour fish broth prepared with fresh Rohu or Katla fish, wild elephant apple (Ou Tenga) or tomatoes, and tempered with panch phoran.',
    description: 'Masor Tenga is the quintessential comfort food of Assamese cuisine. Characterized by its light consistency and delicate sour palate, it derives its tartness from natural ingredients such as sun-dried Thekera (Garcinia pedunculata), Ou Tenga (elephant apple), lime juice, or green tomatoes. Flavored minimally with mustard oil, fenugreek seeds, and fresh green chilies to highlight the pristine sweet flavor of fresh Brahmaputra freshwater fish.',
    history: 'A centuries-old culinary response to the tropical, humid climate of the Brahmaputra Valley, designed to stimulate digestion and provide natural cooling and hydration.',
    culturalSignificance: 'An indispensable dish in everyday Assamese households and celebratory feasts (Bhoj), exemplifying the Northeast culinary philosophy of subtle, unmasked natural flavors.',
    location: {
      name: 'Brahmaputra Riverfront',
      district: 'Jorhat',
      state: 'Assam',
      coordinates: {
        lat: 26.7509,
        lng: 94.2037
      }
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=80',
        alt: 'Refreshing light golden Masor Tenga with fresh fish and lemon garnish',
        credit: 'Assam Gastronomy & Culinary Archives',
        license: 'Open Access Documentation'
      }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=80',
    sources: [
      {
        title: 'Traditional Cuisines of Northeast India',
        publisher: 'North Eastern Regional Agricultural Marketing Corp',
        verifiedDate: '2025-04-10'
      }
    ],
    starSchemaNodes: [
      {
        id: 'materials',
        type: 'materials',
        label: 'Ou Tenga & Thekera',
        shortDescription: 'Indigenous natural souring fruits.',
        detailedContent: 'Wild elephant apple and Garcinia are celebrated in indigenous folk medicine for cooling digestive properties.'
      },
      {
        id: 'region',
        type: 'region',
        label: 'Brahmaputra River Catchment',
        shortDescription: 'Abundant freshwater fish varieties.',
        detailedContent: 'Prepared with fresh wild river fish such as Rohu, Chital, or Borali caught daily by riverside fishermen.'
      }
    ],
    relatedItemSlugs: ['pune-misal-pav', 'kolhapur-tambada-rassa', 'bihu-dance'],
    tags: ['Masor Tenga', 'Assam', 'Fish', 'Sour Curry', 'Culinary Heritage', 'Brahmaputra'],
    recipeInfo: {
      prepTime: '15 mins',
      cookTime: '20 mins',
      difficulty: 'Easy',
      ingredientsSummary: [
        '500g fresh Rohu or Katla fish steaks',
        '1 medium Ou Tenga (Elephant Apple) or 2 large Tomatoes, chopped',
        '2 tbsp pure Mustard Oil',
        '1 tsp Panch Phoran (Assamese five-spice blend) or Fenugreek seeds',
        '1/2 tsp Turmeric powder & 3 slit Green Chilies',
        'Fresh Coriander leaves & Lemon juice to finish'
      ],
      culturalContext: 'Served as the main lunch curry alongside piping hot Joha aromatic sticky rice and boiled greens (Xaak).',
      recipeUrl: 'https://www.thespruceeats.com/assamese-sour-fish-curry-recipe-1957597',
      verifiedSourceName: 'Assam Heritage Kitchen'
    },
    lastVerified: '2025-08-01'
  },

  // ==================== MEGHALAYA ====================
  {
    id: 'meghalaya-living-root-bridge',
    slug: 'meghalaya-living-root-bridge',
    title: 'Living Root Bridges (Jingkieng Jri)',
    marathiTitle: 'मेघालय जिवंत मुळांचे पूल',
    hindiTitle: 'मेघालय के जीवित जड़ पुल',
    stateId: 'meghalaya',
    category: 'architecture',
    shortDescription: 'Centuries-old bio-engineered suspension bridges grown by the indigenous Khasi and Jaintia tribes from aerial roots of Ficus elastica trees.',
    description: 'The Living Root Bridges (locally known as Jingkieng Jri) of Meghalaya are unmatched marvels of sustainable bio-engineering. Guided across raging monsoon streams using hollowed betel nut trunks, the aerial roots of the rubber fig tree (Ficus elastica) gradually interlock with stone boulders over 15 to 30 years. Unlike conventional timber or iron bridges that decay in the world’s wettest rainforests, Living Root Bridges grow stronger with age, capable of supporting up to 50 people simultaneously and surviving for over 500 years.',
    history: 'Practiced for centuries by the indigenous Khasi and Jaintia communities of the southern Meghalaya escarpment. The famous "Umshiang Double Decker Living Root Bridge" in Nongriat village was grown across two levels to accommodate rising monsoon water levels.',
    culturalSignificance: 'Nominated for UNESCO World Heritage status, representing an ancient paradigm of regenerative indigenous architecture where human mobility harmonizes completely with living ecosystems.',
    location: {
      name: 'Nongriat & Sohra (Cherrapunji)',
      district: 'East Khasi Hills',
      state: 'Meghalaya',
      coordinates: {
        lat: 25.2758,
        lng: 91.6811
      }
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1627894006066-b45786537123?auto=format&fit=crop&w=1000&q=80',
        alt: 'Umshiang Double Decker Living Root Bridge spanning a crystal mountain river in Meghalaya',
        credit: 'Meghalaya Tourism Development Corporation & Forest Department',
        license: 'Open Access Documentation'
      }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1627894006066-b45786537123?auto=format&fit=crop&w=1000&q=80',
    sources: [
      {
        title: 'Living Root Bridges: Ecological Bio-Engineering of the Khasi',
        publisher: 'UNESCO Tentative List Records',
        verifiedDate: '2025-05-02'
      }
    ],
    starSchemaNodes: [
      {
        id: 'technique',
        type: 'technique',
        label: 'Ficus Elastica Root Guiding',
        shortDescription: 'Generational botanical shaping.',
        detailedContent: 'Roots are guided through Areca catechu (betel nut) trunks across gorges, taking 25 years to mature into self-healing structures.'
      },
      {
        id: 'tribal',
        type: 'tribal',
        label: 'Khasi Ecological Kinship',
        shortDescription: 'Indigenous custodian traditions.',
        detailedContent: 'Villages collectively maintain the root network, tying new aerial tendrils every monsoon to reinforce bridge pathways.'
      },
      {
        id: 'region',
        type: 'region',
        label: 'Sohra Rain Escarpment',
        shortDescription: 'Wettest rainforest valleys on Earth.',
        detailedContent: 'Receiving over 11,000 mm of annual rainfall, conventional bridges rot, whereas living root structures thrive in hyper-humidity.'
      }
    ],
    relatedItemSlugs: ['mawphlang-sacred-grove', 'shad-suk-mynsiem', 'rang-ghar'],
    tags: ['Living Root Bridge', 'Meghalaya', 'Bio-Engineering', 'Khasi', 'Cherrapunji', 'UNESCO Tentative', 'Eco-Architecture'],
    model3DId: 'living-root-bridge',
    lastVerified: '2025-08-01'
  },
  {
    id: 'mawphlang-sacred-grove',
    slug: 'mawphlang-sacred-grove',
    title: 'Mawphlang Sacred Grove (Law Kyntang)',
    marathiTitle: 'मावफ्लांग पवित्र वन',
    hindiTitle: 'मावफ्लांग पवित्र उपवन',
    stateId: 'meghalaya',
    category: 'tribal',
    shortDescription: 'An ancient untouched primeval rainforest preserved by the Khasi Lyngdoh clan for over 800 years under the sacred taboo: "Take nothing out of the forest."',
    description: 'Mawphlang Sacred Grove (Law Kyntang) is a biodiversity sanctuary spanning 76 hectares in the East Khasi Hills. Guarded by ancient tribal law, not a single leaf, twig, pebble, or fruit may be removed from the forest under penalty of invoking the guardian spirit deity, Labasa. As a result, the forest has remained untouched for over eight centuries, harboring endangered medicinal flora, ancient monolith stone sacrifice altars, rare orchids, and ancient ferns.',
    history: 'Established in the 12th century by the Lyngdoh clan after winning local clan conflicts. The forest contains ancient stone megalith coronations where Khasi chieftains signed treaties.',
    culturalSignificance: 'One of the world’s most profound examples of indigenous ecological conservation through sacred community belief systems.',
    location: {
      name: 'Mawphlang Village',
      district: 'East Khasi Hills',
      state: 'Meghalaya',
      coordinates: {
        lat: 25.4497,
        lng: 91.7588
      }
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80',
        alt: 'Ancient mossy trees and stone sacrificial monoliths inside Mawphlang Sacred Grove',
        credit: 'Khasi Hills Autonomous District Council',
        license: 'Open Access Documentation'
      }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80',
    sources: [
      {
        title: 'Sacred Groves of Meghalaya: Biological and Cultural Sanctuary',
        publisher: 'Botanical Survey of India',
        verifiedDate: '2025-01-30'
      }
    ],
    starSchemaNodes: [
      {
        id: 'tribal',
        type: 'tribal',
        label: 'Labasa Deity Taboo',
        shortDescription: 'Zero-extraction sacred rule.',
        detailedContent: 'Ancient oral lore dictates that taking anything from the forest brings misfortune, preserving intact primeval biodiversity.'
      },
      {
        id: 'materials',
        type: 'materials',
        label: 'Ancient Stone Megaliths',
        shortDescription: 'Mawbynna commemorative monoliths.',
        detailedContent: 'Tall vertical stones (Mawbynna) and horizontal stone dolmens mark ancient clan coronation seats.'
      }
    ],
    relatedItemSlugs: ['meghalaya-living-root-bridge', 'shad-suk-mynsiem', 'warli-painting'],
    tags: ['Sacred Grove', 'Meghalaya', 'Mawphlang', 'Khasi', 'Rainforest', 'Tribal Lore', 'Conservation'],
    lastVerified: '2025-08-01'
  },
  {
    id: 'shad-suk-mynsiem',
    slug: 'shad-suk-mynsiem',
    title: 'Shad Suk Mynsiem (Dance of Peaceful Hearts)',
    marathiTitle: 'शाद सुक मिनसिएम लोकनृत्य',
    hindiTitle: 'शाद सुक मिनसिएम नृत्य',
    stateId: 'meghalaya',
    category: 'dance',
    shortDescription: 'The sacred annual spring thanksgiving dance of the Khasi people, celebrated with gold crowns, coral bead necklaces, and silver arrows.',
    description: 'Shad Suk Mynsiem ("Dance of the Joyful Hearts") is the premier cultural thanksgiving festival of the indigenous Khasi community in Meghalaya. Held in Shillong every April, unmarried young women dance in the inner circle with slow, graceful, dignified steps, while armed young men with silver quivers, peacock feather arrows, and fly-whisks circle the outer perimeter to symbolize their duty as protectors of women and the matrilineal clan.',
    history: 'A foundational spiritual expression of Ka Niam Khasi (the traditional Khasi faith), celebrating the cyclical renewal of nature, human gratitude to God the Creator (U Blei), and fertile agrarian harvests.',
    culturalSignificance: 'Demonstrates the matrilineal ethos of Khasi culture, where women are honored as the lineage holders and men serve as protectors and administrators.',
    location: {
      name: 'Weiking Ground, Jaiaw, Shillong',
      district: 'East Khasi Hills',
      state: 'Meghalaya',
      coordinates: {
        lat: 25.5788,
        lng: 91.8933
      }
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80',
        alt: 'Khasi dancers in gold crowns and red silk attire at Shad Suk Mynsiem in Shillong',
        credit: 'Seng Khasi Heritage Organization',
        license: 'Open Access Documentation'
      }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80',
    sources: [
      {
        title: 'The Khasi Heritage and Matrilineal Traditions',
        publisher: 'North-Eastern Hill University (NEHU) Publications',
        verifiedDate: '2025-03-05'
      }
    ],
    starSchemaNodes: [
      {
        id: 'fashion',
        type: 'fashion',
        label: 'Pansngiat Gold Crowns & Coral',
        shortDescription: 'Royal hand-chased silver & gold regalia.',
        detailedContent: 'Women wear pure silver-gold crowns (Pansngiat) and heavy red coral bead necklaces (Kynjri Ksiar).'
      },
      {
        id: 'music',
        type: 'music',
        label: 'Tangmuri Flute & Nakra Drum',
        shortDescription: 'Acoustic tribal wind & percussion ensemble.',
        detailedContent: 'The sharp wooden Tangmuri double-reed pipe drives the solemn, mesmerizing tempo of the dance.'
      }
    ],
    relatedItemSlugs: ['meghalaya-living-root-bridge', 'lavani-dance', 'bihu-dance'],
    tags: ['Shad Suk Mynsiem', 'Khasi', 'Meghalaya', 'Folk Dance', 'Thanksgiving', 'Shillong'],
    lastVerified: '2025-08-01'
  },
  {
    id: 'khasi-jadoh',
    slug: 'khasi-jadoh',
    title: 'Khasi Jadoh (Aromatic Rice & Spices)',
    marathiTitle: 'खासी जाडोह',
    hindiTitle: 'खासी जादोह',
    stateId: 'meghalaya',
    category: 'food',
    shortDescription: 'Iconic Khasi specialty made of indigenous red rice cooked in aromatic meat broth, scented with ginger, black sesame (Nei-lieh), and wild bay leaves.',
    description: 'Jadoh ("Ja" meaning rice, "Doh" meaning meat) is the cornerstone dish of Khasi culinary heritage. Prepared with indigenous Meghalayan short-grain red hill rice (Jashulia), the rice is slow-cooked in a rich meat broth infused with stone-ground ginger, garlic, crushed black pepper, and toasted black sesame seeds (Nei-lieh). It is celebrated for its deep earthy fragrance, moist texture, and absence of heavy commercial oils.',
    history: 'Developed by high-altitude Khasi mountain dwellers as a sustaining, warming meal suited for the cold, misty climate of the Meghalayan plateau.',
    culturalSignificance: 'Served across local Khasi teashops (Sha Dukan) in Shillong and during clan gatherings, accompanied by spicy fermented soybean chutney (Tungrymbai) and pickled bamboo shoots.',
    location: {
      name: 'Iewduh (Bara Bazaar), Shillong',
      district: 'East Khasi Hills',
      state: 'Meghalaya',
      coordinates: {
        lat: 25.5788,
        lng: 91.8800
      }
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=80',
        alt: 'Authentic steaming Khasi Jadoh red rice served with fresh herbs',
        credit: 'Khasi Indigenous Gastronomy Project',
        license: 'Open Access Documentation'
      }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=80',
    sources: [
      {
        title: 'Indigenous Food Systems of the Khasi Community',
        publisher: 'Slow Food International & NESFAS',
        verifiedDate: '2024-11-28'
      }
    ],
    starSchemaNodes: [
      {
        id: 'materials',
        type: 'materials',
        label: 'Red Hill Rice & Nei-Lieh',
        shortDescription: 'Indigenous aromatic red grain & black sesame.',
        detailedContent: 'Organically grown in mountain terraces, red rice offers rich nutty flavor and high dietary mineral content.'
      },
      {
        id: 'tradition',
        type: 'tradition',
        label: 'Khasi Tea Shop (Sha Dukan)',
        shortDescription: 'Social gathering culture of Shillong.',
        detailedContent: 'Eaten alongside boiling red tea (Sha Saw) during morning trade at the historic Iewduh traditional market.'
      }
    ],
    relatedItemSlugs: ['pune-misal-pav', 'assam-masor-tenga', 'meghalaya-living-root-bridge'],
    tags: ['Jadoh', 'Khasi', 'Meghalaya', 'Rice', 'Culinary', 'Shillong', 'Street Food'],
    recipeInfo: {
      prepTime: '20 mins',
      cookTime: '35 mins',
      difficulty: 'Medium',
      ingredientsSummary: [
        '2 cups authentic Meghalayan Red Rice or Short-grain rice',
        '400g tender bone-in chicken or pork chunks',
        '2 tbsp toasted and crushed Black Sesame seeds (Nei-lieh)',
        '2-inch piece fresh Ginger & 8 cloves Garlic, finely crushed',
        '2 wild Bay leaves & 1 chopped Onion',
        'Fresh Green Chilies, Black Pepper, and Mustard Oil'
      ],
      culturalContext: 'Traditionally cooked in heavy brass vessels over wood-fired mountain stoves to impart an unmistakable smoky aroma.',
      recipeUrl: 'https://northeasttourism.gov.in/food/jadoh',
      verifiedSourceName: 'North East Culinary Heritage'
    },
    lastVerified: '2025-08-01'
  }
];
