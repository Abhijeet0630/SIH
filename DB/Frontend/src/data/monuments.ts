import { MonumentData } from '../types/monument';

export const MONUMENTS_DATA: Record<string, MonumentData> = {
  'ellora-caves': {
    id: 'ellora-caves',
    slug: 'ellora-caves',
    name: 'Kailasa Temple, Ellora Caves',
    nativeName: 'कैलास मंदिर, वेरुळ लेणी',
    marathiName: 'कैलास मंदिर, वेरुळ लेणी',
    hindiName: 'कैलाश मंदिर, एलोरा गुफाएं',
    state: 'Maharashtra',
    stateId: 'maharashtra',
    region: 'Marathwada',
    district_or_city: 'Chhatrapati Sambhajinagar',
    category: 'Monolithic Rock-Cut Architecture',
    shortDescription: 'The world’s largest monolithic rock-cut structure, carved top-down from a single volcanic basalt mountain cliff.',
    description: 'Commissioned under Rashtrakuta King Krishna I in the 8th century CE, Cave 16 (Kailasa Temple) was excavated vertically downward from a basalt cliff without scaffolding or structural joints. Over 200,000 tonnes of volcanic rock were removed by hand to reveal a multistory Dravidian temple sanctuary adorned with sculpted elephants and epic Ramayana bas-reliefs.',
    detailedHistory: 'Commissioned under Rashtrakuta King Krishna I (c. 756–773 CE), Cave 16 (Kailasa Temple) was excavated vertically downward from a basalt escarpment. An estimated 200,000 tonnes of volcanic rock were removed by hand chiseling over several decades, leaving a monumental multi-story temple complex with sanctuary, mandapa, life-size elephant sculptures, and mythological relief panels without the use of masonry joints or external support columns.',
    culturalImportance: 'A UNESCO World Heritage Site exemplifying harmony across Hindu, Buddhist, and Jain cave art in close geographic proximity.',
    culturalSignificance: 'The supreme architectural marvel of the Rashtrakuta Empire, celebrated globally for its top-down monolithic rock carving technique.',
    locationName: 'Verul, Chhatrapati Sambhajinagar (Aurangabad)',
    yearBuilt: '8th Century CE (c. 756–773 CE)',
    architecturalStyle: 'Monolithic Dravidian Rock-Cut',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1600&q=80',
    
    // Backend 3D Integration Contract
    modelAvailable: true,
    modelUrl: null,

    coordinates: {
      lat: 20.0268,
      lng: 75.1780
    },
    modelConfig: {
      modelType: 'gltf',
      defaultCameraPosition: [0, 8, 18],
      lookAtTarget: [0, 3, 0],
      lightingPreset: 'golden-hour',
      minDistance: 4,
      maxDistance: 32,
      autoRotateSpeed: 0.6
    },
    hotspots: [
      {
        id: 'vimana-shikhara',
        title: 'Dravidian Shikhara (Main Spire)',
        shortDescription: '30-meter high monolithic pyramidal spire carved top-down.',
        detailedText: 'The main sanctuary tower (Vimana) rises nearly 30 meters high. It was carved first from the crest of the cliff downward before the surrounding courtyards were cleared.',
        position: [0, 6, -2],
        cameraPosition: [0, 9, 10],
        cameraTarget: [0, 6, -2],
        architecturalNote: 'Solid carved basalt stone with octagonal dome crowning'
      },
      {
        id: 'dhwajasthambha',
        title: 'Monolithic Victory Pillar (Dhwajastambha)',
        shortDescription: 'Pair of freestanding 15-meter ceremonial columns.',
        detailedText: 'Two gigantic freestanding victory pillars stand in the main courtyard, carved directly in-situ from the solid volcanic rock bed with trident crests.',
        position: [-3.5, 2.5, 2],
        cameraPosition: [-6, 4, 8],
        cameraTarget: [-3.5, 2.5, 2],
        architecturalNote: 'In-situ monolithic basalt column with Trishula finial'
      },
      {
        id: 'elephant-plinth',
        title: 'Life-Sized Elephant Plinth',
        shortDescription: 'Colossal elephant frieze creating the illusion of carrying the entire temple.',
        detailedText: 'The entire temple plinth is supported by a continuous relief of life-sized elephants, lions, and mythical beasts carved into the lower terrace bedrock.',
        position: [2.5, 0.8, 1.2],
        cameraPosition: [5, 2, 6],
        cameraTarget: [2.5, 0.8, 1.2],
        architecturalNote: 'High-relief volcanic basalt stone carving'
      }
    ],
    starSchemaNodes: [
      {
        id: 'history',
        type: 'history',
        label: 'Rashtrakuta Dynasty',
        shortDescription: 'Engineered during 8th-century golden age under King Krishna I.',
        detailedContent: 'Represents the pinnacle of Rashtrakuta patronage, displaying top-down engineering sophistication unparalleled in the ancient rock-cut world.'
      },
      {
        id: 'materials',
        type: 'materials',
        label: 'Deccan Trap Basalt',
        shortDescription: 'Carved directly from Cretaceous volcanic basalt bedrock.',
        detailedContent: 'The Deccan Traps provided homogeneous, fine-grained volcanic rock capable of holding intricate sculptural detail across millennia without crumbling.'
      },
      {
        id: 'region',
        type: 'region',
        label: 'Marathwada Basin',
        shortDescription: 'Historic cultural crossroads along ancient trade routes.',
        detailedContent: 'Situated on the ancient trade route connecting the Deccan Plateau with northern river valleys, fostering synthesis across faiths.'
      },
      {
        id: 'architecture',
        type: 'architecture',
        label: 'Top-Down Monolithic Excavation',
        shortDescription: 'Zero scaffolding, zero stone joins.',
        detailedContent: 'Unlike conventional masonry where blocks are built upward, Kailasa was carved from the mountain crest downward, requiring zero architectural margin of error.'
      }
    ],
    sources: [
      {
        title: 'UNESCO World Heritage Centre — Ellora Caves Records',
        publisher: 'UNESCO World Heritage Bureau',
        verifiedDate: '2025-01-10'
      },
      {
        title: 'Archaeological Survey of India — Cave Temple Monograph',
        publisher: 'ASI Western Circle',
        verifiedDate: '2024-10-15'
      }
    ]
  },

  'gateway-of-india': {
    id: 'gateway-of-india',
    slug: 'gateway-of-india',
    name: 'Gateway of India',
    nativeName: 'गेटवे ऑफ इंडिया, मुंबई',
    marathiName: 'गेटवे ऑफ इंडिया',
    hindiName: 'गेटवे ऑफ इंडिया',
    state: 'Maharashtra',
    stateId: 'maharashtra',
    region: 'Konkan',
    district_or_city: 'Mumbai',
    category: 'Indo-Saracenic Triumphal Arch',
    shortDescription: 'Monumental yellow basalt archway on the Arabian Sea waterfront, fusing 16th-century Gujarati architecture with classical European triumphal design.',
    description: 'Designed by Scottish architect George Wittet, the Gateway of India stands on the historic Apollo Bunder waterfront facing Mumbai Harbour. Constructed from indigenous yellow basalt and reinforced concrete, it combines Gujarati jali lattices with classical Roman triumphal arches. Historically the ceremonial landing port of India, it was also the ceremonial departure point of the last British troops in 1948.',
    detailedHistory: 'Designed by George Wittet, the Gateway of India was constructed to commemorate the visit of King George V and Queen Mary in 1911. The monument stands on Apollo Bunder facing the Arabian Sea and historically served as the ceremonial entrance to India. Paradoxically, it was also the point through which the last British regiment (First Battalion of the Somerset Light Infantry) departed India on February 28, 1948, marking the end of colonial rule.',
    culturalImportance: 'An enduring civic symbol of Mumbai, uniting coastal basalt masonry, intricate jali lattice work, and Indo-Islamic domes.',
    culturalSignificance: 'The ceremonial maritime entrance to modern India and the physical site marking the completion of Indian independence in 1948.',
    locationName: 'Apollo Bunder, Colaba, Waterfront Mumbai',
    yearBuilt: '1911–1924',
    architecturalStyle: 'Indo-Saracenic Revival',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1600&q=80',

    // Backend 3D Integration Contract
    modelAvailable: true,
    modelUrl: null,

    coordinates: {
      lat: 18.9220,
      lng: 72.8347
    },
    modelConfig: {
      modelType: 'gltf',
      defaultCameraPosition: [0, 5, 14],
      lookAtTarget: [0, 2.2, 0],
      lightingPreset: 'golden-hour',
      minDistance: 3,
      maxDistance: 28,
      autoRotateSpeed: 0.5
    },
    hotspots: [
      {
        id: 'central-arch',
        title: 'Central Triumphal Arch',
        shortDescription: 'Grand 26-meter basalt archway with Gujarati vaulting.',
        detailedText: 'The main arch rises 26 meters (85 feet) above the waterfront plaza. Constructed from yellow basalt quarried in Thane, its proportions echo classical Roman triumphal designs with Islamic arched contours.',
        position: [0, 2.5, 1.2],
        cameraPosition: [0, 3, 8],
        cameraTarget: [0, 2.5, 1.2],
        architecturalNote: 'Yellow basalt masonry with perforated screen accents'
      },
      {
        id: 'central-dome',
        title: 'Central Ribbed Dome',
        shortDescription: 'Indo-Islamic dome spanning 15 meters in diameter with ornamental spires.',
        detailedText: 'The central dome features an internal diameter of 15 meters and is crowned by four decorative side turrets. The structural load is distributed across massive stone buttresses.',
        position: [0, 5.2, 0],
        cameraPosition: [0, 7, 10],
        cameraTarget: [0, 5.2, 0],
        architecturalNote: 'Reinforced concrete shell with stone cladding'
      },
      {
        id: 'latticed-screens',
        title: 'Gujarati Jali Screen Windows',
        shortDescription: 'Intricate basalt jaali lattice panels carved in 16th-century Sultanate style.',
        detailedText: 'The lateral arches feature delicately carved pierced stonework screens (jalis), providing structural ventilation and shade while referencing the architectural lineage of Champaner and Ahmedabad.',
        position: [-2.8, 1.8, 0.8],
        cameraPosition: [-5, 2.5, 5],
        cameraTarget: [-2.8, 1.8, 0.8],
        architecturalNote: 'Fine-grain basalt pierced filigree'
      },
      {
        id: 'seafront-promenade',
        title: 'Arabian Sea Anchorage Steps',
        shortDescription: 'Ceremonial stone steps descending to the historic Apollo Bunder jetty.',
        detailedText: 'The seaward approach once welcomed maritime dignitaries arriving by steamer and today connects citizens with historic ferry routes to Elephanta Caves.',
        position: [0, 0.2, 3.5],
        cameraPosition: [0, 1.5, 7],
        cameraTarget: [0, 0.2, 3.5],
        architecturalNote: 'Tide-resistant granite foundations'
      }
    ],
    starSchemaNodes: [
      {
        id: 'history',
        type: 'history',
        label: '1948 British Departure',
        shortDescription: 'Departure of the Somerset Light Infantry.',
        detailedContent: 'On February 28, 1948, the Gateway witnessed the final troop departure of the British military presence in independent India, cementing its role as an emblem of freedom.'
      },
      {
        id: 'materials',
        type: 'materials',
        label: 'Kharodi Basalt Quarry',
        shortDescription: 'Sourced from local Maharashtra quarries.',
        detailedContent: 'Built from indigenous yellow basalt quarried in Kharodi (Thane district) and reinforced with modern concrete engineering for marine durability.'
      },
      {
        id: 'region',
        type: 'region',
        label: 'Apollo Bunder, Mumbai',
        shortDescription: 'Historical natural harbor basin.',
        detailedContent: 'Originally an ancient jetty used by Koli indigenous fishing communities, developed in the late 19th century into Mumbai’s primary maritime gateway.'
      },
      {
        id: 'tradition',
        type: 'tradition',
        label: 'Elephanta Ferry Link',
        shortDescription: 'Gateway to ancient 6th-century rock-cut caves.',
        detailedContent: 'The Gateway serves as the traditional boarding point for historic harbor ferries journeying to Elephanta Caves UNESCO World Heritage site.'
      }
    ],
    sources: [
      {
        title: 'Archaeological Survey of India — Monument Records',
        publisher: 'ASI Western Circle',
        verifiedDate: '2025-06-15'
      },
      {
        title: 'Architecture of the British Raj in India',
        publisher: 'Oxford University Press',
        verifiedDate: '2024-11-20'
      }
    ]
  },

  'raigad-fort-shivaji-statue': {
    id: 'raigad-fort-shivaji-statue',
    slug: 'raigad-fort-shivaji-statue',
    name: 'Chhatrapati Shivaji Maharaj Statue & Samadhi, Raigad Fort',
    nativeName: 'छत्रपती शिवाजी महाराज समाधी व मेघडंबरी, रायगड',
    marathiName: 'छत्रपती शिवाजी महाराज समाधी व मेघडंबरी, रायगड किल्ला',
    hindiName: 'छत्रपति शिवाजी महाराज समाधि, रायगढ़ किला',
    state: 'Maharashtra',
    stateId: 'maharashtra',
    region: 'Konkan (Sahyadris)',
    district_or_city: 'Raigad District',
    category: 'Maratha Imperial Architecture & Memorial',
    shortDescription: 'The solemn royal memorial canopy (Meghadambari) and equestrian bronze statue commemorating Chhatrapati Shivaji Maharaj at his coronation capital atop Raigad.',
    description: 'Perched 820 meters high atop the wedge-shaped Gibraltar of the East in the Sahyadri mountains, the Samadhi of Chhatrapati Shivaji Maharaj and the ceremonial Meghadambari canopy represent the spiritual heart of the Maratha Empire. Designed originally with acoustic precision by royal architect Hiroji Indulkar, the complex overlooks the grand Rajsabha (Coronation Throne Room) and the historic Nagarkhana gateway.',
    detailedHistory: 'Raigad Fort was selected by Chhatrapati Shivaji Maharaj as the capital of the sovereign Swarajya and was the site of his grand coronation (Rajyabhisheka) on June 6, 1674. Following his passing in 1680, his Samadhi was consecrated adjacent to the Jagadishwar Temple. In the 20th century, the historic memorial was restored under the guidance of Lokmanya Tilak and Maharashtra heritage preservation societies with an imposing seated bronze statue sheltered by the traditional stone Meghadambari canopy.',
    culturalImportance: 'The spiritual beacon of Swarajya (Self-Rule), democratic decentralization, and mountain fortress engineering in western India.',
    culturalSignificance: 'The ultimate symbol of Maratha sovereignty and self-determination in the Sahyadri hill fortress chain.',
    locationName: 'Raigad Fort Plateau, Mahad Taluka, Raigad',
    yearBuilt: '1674 CE (Coronation) / 1680 CE (Samadhi)',
    architecturalStyle: 'Maratha Fortified Basalt & Meghadambari Canopy',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1600&q=80',

    // Backend 3D Integration Contract
    modelAvailable: true,
    modelUrl: null,

    coordinates: {
      lat: 18.2347,
      lng: 73.4414
    },
    modelConfig: {
      modelType: 'gltf',
      defaultCameraPosition: [0, 6, 15],
      lookAtTarget: [0, 2.5, 0],
      lightingPreset: 'warm-heritage',
      minDistance: 3,
      maxDistance: 30,
      autoRotateSpeed: 0.5
    },
    hotspots: [
      {
        id: 'meghadambari-canopy',
        title: 'Stone Meghadambari Canopy',
        shortDescription: 'Carved stone umbrella canopy sheltering the royal statue.',
        detailedText: 'The Meghadambari is a four-pillared ornamental basalt pavilion crowning the seated statue, adorned with traditional Maratha floral carvings and Kalash finials.',
        position: [0, 3.2, 0],
        cameraPosition: [0, 4.5, 8],
        cameraTarget: [0, 3.2, 0],
        architecturalNote: 'Chiseled Sahyadri basalt with traditional chhatri pavilion vaulting'
      },
      {
        id: 'samadhi-plinth',
        title: 'Sacred Samadhi Memorial Plinth',
        shortDescription: 'Octagonal stone foundation of the Maharaja’s final resting place.',
        detailedText: 'Positioned in the quiet northern terrace of the hill fort beside the Jagadishwar Temple, with floral offerings maintained daily according to Vedic rituals.',
        position: [0, 0.8, -1.5],
        cameraPosition: [0, 2.5, 5],
        cameraTarget: [0, 0.8, -1.5],
        architecturalNote: 'Octagonal dressed basalt stone masonry plinth'
      },
      {
        id: 'nagarkhana-view',
        title: 'Nagarkhana & Acoustic Royal Court',
        shortDescription: 'Grand ceremonial entrance with acoustic parabolic amplification.',
        detailedText: 'Engineered by Hiroji Indulkar so that a whisper at the entrance arch could be heard clearly 75 meters away at the royal throne, without electronic amplification.',
        position: [-3.5, 2.0, 3.0],
        cameraPosition: [-6, 3.5, 7],
        cameraTarget: [-3.5, 2.0, 3.0],
        architecturalNote: 'Basalt acoustic vaulted archway'
      }
    ],
    starSchemaNodes: [
      {
        id: 'history',
        type: 'history',
        label: '1674 Sovereign Coronation',
        shortDescription: 'Rajyabhisheka ceremony founding the Maratha Empire.',
        detailedContent: 'Attended by over 50,000 delegates from across the subcontinent, affirming an egalitarian, tax-reformed, and naval-protected sovereign state.'
      },
      {
        id: 'architecture',
        type: 'architecture',
        label: 'Hiroji Indulkar Engineering',
        shortDescription: 'Acoustic courtrooms, rainwater harvesting tanks & cliff bastions.',
        detailedContent: 'Constructed over 300 stone structures including the Ganga Sagar lake, Rani Mahals, and Maha Darwaja.'
      },
      {
        id: 'materials',
        type: 'materials',
        label: 'Sahyadri Trap Basalt',
        shortDescription: 'Quarried on-site to simultaneously create massive water cisterns.',
        detailedContent: 'Rock excavated for building bastions doubled as deep rainwater reservoirs, allowing the fort to withstand multi-year sieges.'
      }
    ],
    sources: [
      {
        title: 'Archaeological Survey of India — Raigad Fort Conservation Dossier',
        publisher: 'ASI Mumbai Circle',
        verifiedDate: '2025-03-01'
      },
      {
        title: 'Maratha Architecture and Fortifications',
        publisher: 'Maharashtra State Directorate of Archaeology',
        verifiedDate: '2024-08-20'
      }
    ]
  },

  'living-root-bridge': {
    id: 'living-root-bridge',
    slug: 'living-root-bridge',
    name: 'Double Decker Living Root Bridge (Jingkieng Jri)',
    nativeName: 'Jingkieng Jri (Double Decker)',
    marathiName: 'डबल डेकर जिवant मुळांचा पूल',
    hindiName: 'डबल डेकर जीवित जड़ पुल, मेघालय',
    state: 'Meghalaya',
    stateId: 'meghalaya',
    region: 'Khasi Hills',
    district_or_city: 'Nongriat, East Khasi Hills',
    category: 'Khasi Botanical Bio-Engineering',
    shortDescription: 'Two-tier regenerative pedestrian bridge guided across torrential mountain waters from the living aerial roots of Ficus elastica trees.',
    description: 'Grown over multiple generations by the indigenous Khasi people of Nongriat village in the subtropical rainforests of Meghalaya, the Double Decker Living Root Bridge (Jingkieng Jri) is a self-strengthening botanical marvel. Aerial roots of the Indian Rubber Tree are guided across hollowed betel nut trunks. Unlike steel or concrete bridges that rot in extreme monsoon humidity, living root bridges become stronger and thicker every decade.',
    detailedHistory: 'Grown over generations by the Khasi people of Nongriat. The second upper tier was grown when extreme monsoon river swelling threatened the lower pathway. Unlike concrete or iron structures that disintegrate in the hyper-humid climate of Cherrapunji, living root bridges become stronger and more secure every decade as roots intertwine and thicken.',
    culturalImportance: 'A global masterpiece of regenerative indigenous engineering on the UNESCO World Heritage tentative list.',
    culturalSignificance: 'Living testament to sustainable symbiosis between indigenous tribal engineering and rainforest biodiversity.',
    locationName: 'Nongriat Village, Sohra (Cherrapunji) Valley',
    yearBuilt: 'Over 250+ Years (Living Adaptive Structure)',
    architecturalStyle: 'Indigenous Khasi Botanical Bio-Engineering',
    image: 'https://images.unsplash.com/photo-1627894006066-b45786537123?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1627894006066-b45786537123?auto=format&fit=crop&w=1600&q=80',

    // Backend 3D Integration Contract
    modelAvailable: true,
    modelUrl: null,

    coordinates: {
      lat: 25.2758,
      lng: 91.6811
    },
    modelConfig: {
      modelType: 'gltf',
      defaultCameraPosition: [0, 5, 14],
      lookAtTarget: [0, 2, 0],
      lightingPreset: 'museum-daylight',
      minDistance: 3,
      maxDistance: 25,
      autoRotateSpeed: 0.4
    },
    hotspots: [
      {
        id: 'upper-tier-deck',
        title: 'Upper Living Root Deck',
        shortDescription: 'Secondary elevated span grown for high monsoon flood surges.',
        detailedText: 'Added approximately 100 years after the primary bridge to ensure uninterrupted village connectivity when torrential monsoon waters submerged the lower pathway.',
        position: [0, 3.8, 0],
        cameraPosition: [0, 5, 8],
        cameraTarget: [0, 3.8, 0],
        architecturalNote: 'Interwoven living secondary aerial roots with stone deck infill'
      },
      {
        id: 'lower-span',
        title: 'Primary Lower Bridge Span',
        shortDescription: 'Original 250-year-old walking platform over the Umshiang River.',
        detailedText: 'Spanning over 20 meters across the roaring torrent, capable of supporting over 50 pedestrians simultaneously through root anastomosing.',
        position: [0, 1.8, 0],
        cameraPosition: [0, 3, 7],
        cameraTarget: [0, 1.8, 0],
        architecturalNote: 'Fused Ficus elastica root network'
      },
      {
        id: 'anchor-boulders',
        title: 'Basalt Boulder Anchors',
        shortDescription: 'Riverbed stone monoliths entwined by living root tendrils.',
        detailedText: 'Roots wrap tightly around riverside granite boulders, utilizing natural stone mass as permanent cantilever ballast.',
        position: [-2.5, 0.8, 1.5],
        cameraPosition: [-5, 2, 5],
        cameraTarget: [-2.5, 0.8, 1.5],
        architecturalNote: 'Bio-integrated stone root anchors'
      }
    ],
    starSchemaNodes: [
      {
        id: 'technique',
        type: 'technique',
        label: 'Generational Root Training',
        shortDescription: 'Khasi betel nut trunk guidance system.',
        detailedContent: 'Takes 15–30 years for young aerial roots to cross gorges and fuse into solid load-bearing pedestrian pathways.'
      },
      {
        id: 'tribal',
        type: 'tribal',
        label: 'Matrilineal Clan Guardianship',
        shortDescription: 'Communal maintenance by villagers.',
        detailedContent: 'Nongriat villagers collectively weave new tendrils annually, ensuring multi-century durability without industrial inputs.'
      },
      {
        id: 'materials',
        type: 'materials',
        label: 'Ficus Elastica & River Stone',
        shortDescription: 'Living botanical matter resilient to 11,000mm annual rainfall.',
        detailedContent: 'Thrives in Cherrapunji’s hyper-precipitation where conventional steel and timber structures corrode rapidly.'
      }
    ],
    sources: [
      {
        title: 'Living Root Bridges: UNESCO Tentative Nomination Dossier',
        publisher: 'Government of Meghalaya & Forest Dept',
        verifiedDate: '2025-05-12'
      }
    ]
  },

  'rang-ghar': {
    id: 'rang-ghar',
    slug: 'rang-ghar',
    name: 'Rang Ghar, Sivasagar',
    nativeName: 'ৰংঘৰ, শিৱসাগৰ',
    marathiName: 'रंग घर, शिवसागर',
    hindiName: 'रंग घर, शिवसागर',
    state: 'Assam',
    stateId: 'assam',
    region: 'Upper Assam (Brahmaputra Valley)',
    district_or_city: 'Sivasagar',
    category: 'Tai-Ahom Royal Pavilion',
    shortDescription: 'Asia’s oldest royal sports amphitheater with an inverted-boat vaulted roof, constructed with organic sticky-rice bio-mortar.',
    description: 'Commissioned by Ahom King Swargadeo Pramatta Singha in 1746 CE, Rang Ghar served as the grand royal amphitheater from which monarchs and dignitaries enjoyed traditional sports, buffalo fights, and Rongali Bihu performances. Its seismic-resilient construction used indigenous bricks bonded with sticky rice, duck eggs, and fish paste.',
    detailedHistory: 'Commissioned by Ahom King Swargadeo Pramatta Singha in 1746 CE, Rang Ghar served as the grand royal amphitheater from which kings and dignitaries enjoyed traditional sports, bull fights, and Rongali Bihu performances. Its seismic-resilient construction used indigenous bricks bonded with sticky rice, duck eggs, and fish paste.',
    culturalImportance: 'An enduring secular architectural symbol of the 600-year Ahom Kingdom.',
    culturalSignificance: 'Asia’s oldest standing amphitheater pavilion, emblematic of Assamese royal sports culture and Ahom bio-cement architecture.',
    locationName: 'Sivasagar Ahom Royal Capital, Assam',
    yearBuilt: '1746 CE',
    architecturalStyle: 'Tai-Ahom Brick & Rice Mortar Pavilion',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1600&q=80',

    // Backend 3D Integration Contract
    modelAvailable: true,
    modelUrl: null,

    coordinates: {
      lat: 26.9644,
      lng: 94.6225
    },
    modelConfig: {
      modelType: 'gltf',
      defaultCameraPosition: [0, 6, 16],
      lookAtTarget: [0, 2.5, 0],
      lightingPreset: 'golden-hour',
      minDistance: 4,
      maxDistance: 30,
      autoRotateSpeed: 0.5
    },
    hotspots: [
      {
        id: 'inverted-boat-roof',
        title: 'Inverted-Boat Vaulted Roof',
        shortDescription: 'Parabolic roof profile modeled after traditional Tai-Ahom longboats.',
        detailedText: 'The curved masonry roof draws direct inspiration from Ahom royal war boats (Maku), providing rapid monsoon drainage and wind deflection.',
        position: [0, 4.8, 0],
        cameraPosition: [0, 6.5, 9],
        cameraTarget: [0, 4.8, 0],
        architecturalNote: 'Curvilinear brick vaulting with clay tile crowning'
      },
      {
        id: 'royal-viewing-pavilion',
        title: 'Royal Upper Gallery',
        shortDescription: 'Arched open pavilion for Swargadeo monarchs.',
        detailedText: 'The second tier accommodated the king and royal guests with panoramic vistas over the Rupahi Pathar sports arena.',
        position: [0, 2.8, 1.2],
        cameraPosition: [0, 3.5, 6],
        cameraTarget: [0, 2.8, 1.2],
        architecturalNote: 'Segmental arched colonnades'
      }
    ],
    starSchemaNodes: [
      {
        id: 'history',
        type: 'history',
        label: 'Ahom Royal Dynasty',
        shortDescription: 'Built under Pramatta Singha (1746).',
        detailedContent: 'Celebrated as the pinnacle of Tai-Ahom secular civic architecture in eastern India.'
      },
      {
        id: 'materials',
        type: 'materials',
        label: 'Bora Saul Bio-Mortar',
        shortDescription: 'Sticky rice & duck egg organic adhesive.',
        detailedContent: 'Created an exceptionally ductile, earthquake-resistant masonry bond.'
      }
    ],
    sources: [
      {
        title: 'Archaeological Survey of India — Rang Ghar Monograph',
        publisher: 'ASI Guwahati Circle',
        verifiedDate: '2025-02-18'
      }
    ]
  }
};
