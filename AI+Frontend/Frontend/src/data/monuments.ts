import { MonumentData } from '../types/monument';

export const MONUMENTS_DATA: Record<string, MonumentData> = {
  'gateway-of-india': {
    id: 'gateway-of-india',
    slug: 'gateway-of-india',
    name: 'Gateway of India',
    marathiName: 'गेटवे ऑफ इंडिया',
    hindiName: 'गेटवे ऑफ इंडिया',
    stateId: 'maharashtra',
    locationName: 'Apollo Bunder, Waterfront Mumbai',
    yearBuilt: '1911–1924',
    architecturalStyle: 'Indo-Saracenic Revival',
    shortDescription: 'A monumental basalt archway commemorating royal visits, blending 16th-century Gujarati architecture with European triumphal design.',
    detailedHistory: 'Designed by George Wittet, the Gateway of India was constructed to commemorate the visit of King George V and Queen Mary in 1911. The monument stands on Apollo Bunder facing the Arabian Sea and historically served as the ceremonial entrance to India. Paradoxically, it was also the point through which the last British regiment (First Battalion of the Somerset Light Infantry) departed India on February 28, 1948, marking the end of colonial rule.',
    culturalImportance: 'An enduring symbol of Mumbai, combining yellow basalt masonry, intricate jali lattice work, and Indo-Islamic domes.',
    bannerImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
    coordinates: {
      lat: 18.9220,
      lng: 72.8347
    },
    modelConfig: {
      modelType: 'procedural-arch',
      defaultCameraPosition: [0, 5, 14],
      lookAtTarget: [0, 2, 0],
      lightingPreset: 'golden-hour'
    },
    hotspots: [
      {
        id: 'central-arch',
        title: 'Central Triumphal Arch',
        shortDescription: 'Grand 26-meter basalt arch modeled after Roman triumphal arches with Gujarati vaulting.',
        detailedText: 'The main arch rises 26 meters (85 feet) above ground level. Constructed from yellow basalt and reinforced concrete, its proportions echo classical Roman triumphal designs with Islamic arched contours.',
        position: [0, 2.5, 1.2],
        architecturalNote: 'Basalt masonry with perforated screen accents'
      },
      {
        id: 'central-dome',
        title: 'Central Ribbed Dome',
        shortDescription: 'Indo-Islamic dome spanning 15 meters in diameter with ornamental spires.',
        detailedText: 'The central dome features an internal diameter of 15 meters and is crowned by four decorative side turrets. The structural load is distributed across massive stone buttresses.',
        position: [0, 5.2, 0],
        architecturalNote: 'Reinforced concrete shell with stone cladding'
      },
      {
        id: 'latticed-screens',
        title: 'Gujarati Jali Screen Windows',
        shortDescription: 'Intricate basalt jaali lattice panels carved in 16th-century Sultanate style.',
        detailedText: 'The lateral arches feature delicately carved pierced stonework screens (jalis), providing structural ventilation and shade while referencing the architectural lineage of Champaner and Ahmedabad.',
        position: [-2.8, 1.8, 0.8],
        architecturalNote: 'Fine-grain basalt pierced filigree'
      },
      {
        id: 'seafront-promenade',
        title: 'Arabian Sea Anchorage Steps',
        shortDescription: 'Ceremonial stone steps descending to the historic Apollo Bunder jetty.',
        detailedText: 'The seaward approach once welcomed dignitaries arriving by ship and today connects tourists with ferry routes to Elephanta Island.',
        position: [0, 0.2, 3.5],
        architecturalNote: 'Tide-resistant granite foundations'
      }
    ],
    starSchemaNodes: [
      {
        id: 'history',
        type: 'history',
        label: '1948 British Departure',
        shortDescription: 'The departure of the Somerset Light Infantry.',
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
        detailedContent: 'Originally an old jetty used by Koli fishing communities, developed in the late 19th century into Mumbai’s primary maritime gateway.'
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
  'ellora-caves': {
    id: 'ellora-caves',
    slug: 'ellora-caves',
    name: 'Kailasa Temple, Ellora Caves',
    marathiName: 'कैलास मंदिर, वेरुळ लेणी',
    hindiName: 'कैलाश मंदिर, एलोरा',
    stateId: 'maharashtra',
    locationName: 'Chhatrapati Sambhajinagar (Aurangabad)',
    yearBuilt: '8th Century CE (c. 756–773 CE)',
    architecturalStyle: 'Monolithic Dravidian Rock-Cut',
    shortDescription: 'The world’s largest monolithic rock-cut structure, carved vertically from top to bottom out of a single basalt cliff.',
    detailedHistory: 'Commissioned under Rashtrakuta King Krishna I, Cave 16 (Kailasa Temple) was excavated vertically downward from a basalt escarpment. An estimated 200,000 tonnes of volcanic rock were removed by hand chiseling over several decades, leaving a monumental multi-story temple complex with sanctuary, mandapa, life-size elephant sculptures, and mythological relief panels without the use of masonry joints or external support columns.',
    culturalImportance: 'A UNESCO World Heritage Site exemplifying harmony across Hindu, Buddhist, and Jain cave art in close proximity.',
    bannerImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    coordinates: {
      lat: 20.0268,
      lng: 75.1780
    },
    modelConfig: {
      modelType: 'procedural-arch',
      defaultCameraPosition: [0, 8, 18],
      lookAtTarget: [0, 3, 0],
      lightingPreset: 'dawn'
    },
    hotspots: [
      {
        id: 'vimana-shikhara',
        title: 'Dravidian Shikhara',
        shortDescription: '30-meter high monolithic pyramidal spire.',
        detailedText: 'The main sanctuary tower (Vimana) rises nearly 30 meters high. It was carved first from the crest of the cliff downward before the courtyards were cleared.',
        position: [0, 6, -2],
        architecturalNote: 'Solid carved basalt stone'
      },
      {
        id: 'dhwajasthambha',
        title: 'Monolithic Victory Pillars',
        shortDescription: 'Pair of freestanding 15-meter ceremonial columns.',
        detailedText: 'Two gigantic freestanding victory pillars (Dhwajastambhas) stand in the main courtyard, carved directly in-situ from the solid rock bed.',
        position: [-3.5, 2.5, 2],
        architecturalNote: 'In-situ monolithic basalt columns'
      }
    ],
    starSchemaNodes: [
      {
        id: 'history',
        type: 'history',
        label: 'Rashtrakuta Dynasty',
        shortDescription: 'Engineered during 8th-century golden age.',
        detailedContent: 'Represents the pinnacle of Rashtrakuta patronage under King Krishna I, displaying technical sophistication unparalleled in ancient rock engineering.'
      },
      {
        id: 'materials',
        type: 'materials',
        label: 'Deccan Trap Basalt',
        shortDescription: 'Carved directly from Cretaceous volcanic basalt.',
        detailedContent: 'The Deccan Traps provided homogeneous, fine-grained volcanic rock capable of holding intricate sculptural detail across millennia.'
      }
    ],
    sources: [
      {
        title: 'UNESCO World Heritage Centre — Ellora Caves List',
        publisher: 'UNESCO',
        verifiedDate: '2025-01-10'
      }
    ]
  },
  'rang-ghar': {
    id: 'rang-ghar',
    slug: 'rang-ghar',
    name: 'Rang Ghar, Sivasagar',
    marathiName: 'रंग घर, शिवसागर',
    hindiName: 'रंग घर, शिवसागर',
    stateId: 'assam',
    locationName: 'Sivasagar Ahom Royal Capital, Assam',
    yearBuilt: '1746 CE',
    architecturalStyle: 'Tai-Ahom Brick & Rice Mortar Pavilion',
    shortDescription: 'Asia’s oldest royal sports pavilion with an inverted-boat vaulted roof, constructed with organic sticky-rice mortar (Bora Saul).',
    detailedHistory: 'Commissioned by Ahom King Swargadeo Pramatta Singha in 1746 CE, Rang Ghar served as the grand royal amphitheater from which kings and dignitaries enjoyed traditional sports, bull fights, and Rongali Bihu performances. Its seismic-resilient construction used indigenous bricks bonded with sticky rice, duck eggs, and fish paste.',
    culturalImportance: 'An enduring secular architectural symbol of the 600-year Ahom Kingdom.',
    bannerImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    coordinates: {
      lat: 26.9644,
      lng: 94.6225
    },
    modelConfig: {
      modelType: 'procedural-arch',
      defaultCameraPosition: [0, 6, 16],
      lookAtTarget: [0, 2.5, 0],
      lightingPreset: 'golden-hour'
    },
    hotspots: [
      {
        id: 'inverted-boat-roof',
        title: 'Inverted-Boat Vaulted Roof',
        shortDescription: 'Parabolic roof profile modeled after traditional Tai-Ahom longboats.',
        detailedText: 'The curved masonry roof draws direct inspiration from Ahom royal war boats (Maku), providing rapid monsoon drainage and wind deflection.',
        position: [0, 4.8, 0],
        architecturalNote: 'Curvilinear brick vaulting with clay tile crowning'
      },
      {
        id: 'royal-viewing-pavilion',
        title: 'Royal Upper Gallery',
        shortDescription: 'Arched open pavilion for Swargadeo monarchs.',
        detailedText: 'The second tier accommodated the king and royal guests with panoramic vistas over the Rupahi Pathar sports arena.',
        position: [0, 2.8, 1.2],
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
  },
  'living-root-bridge': {
    id: 'living-root-bridge',
    slug: 'living-root-bridge',
    name: 'Double Decker Living Root Bridge',
    marathiName: 'डबल डेकर जिवंत मुळांचा पूल',
    hindiName: 'डबल डेकर जीवित जड़ पुल',
    stateId: 'meghalaya',
    locationName: 'Nongriat Village, Cherrapunji (Sohra)',
    yearBuilt: 'Over 250+ Years (Living Structure)',
    architecturalStyle: 'Indigenous Khasi Botanical Bio-Engineering',
    shortDescription: 'Two-tier regenerative pedestrian bridge guided across torrential mountain waters from living aerial roots of Ficus elastica trees.',
    detailedHistory: 'Grown over generations by the Khasi people of Nongriat. The second upper tier was grown when extreme monsoon river swelling threatened the lower pathway. Unlike concrete or iron structures that disintegrate in the hyper-humid climate of Cherrapunji, living root bridges become stronger and more secure every decade as roots intertwine and thicken.',
    culturalImportance: 'A global masterpiece of regenerative indigenous engineering on the UNESCO World Heritage tentative list.',
    bannerImage: 'https://images.unsplash.com/photo-1627894006066-b45786537123?auto=format&fit=crop&w=1200&q=80',
    coordinates: {
      lat: 25.2758,
      lng: 91.6811
    },
    modelConfig: {
      modelType: 'procedural-arch',
      defaultCameraPosition: [0, 5, 14],
      lookAtTarget: [0, 2, 0],
      lightingPreset: 'dawn'
    },
    hotspots: [
      {
        id: 'upper-tier-deck',
        title: 'Upper Root Deck',
        shortDescription: 'Secondary elevated span grown for high monsoon surges.',
        detailedText: 'Added approximately 100 years after the primary bridge to ensure year-round village connectivity during torrential rainfall.',
        position: [0, 3.8, 0],
        architecturalNote: 'Interwoven living secondary aerial roots'
      },
      {
        id: 'anchor-boulders',
        title: 'Basalt Boulder Anchors',
        shortDescription: 'Riverbed stone monoliths entwined by root tendrils.',
        detailedText: 'Roots wrap tightly around river boulders, utilizing natural stone mass as permanent cantilever ballast.',
        position: [-2.5, 0.8, 1.5],
        architecturalNote: 'Bio-integrated stone root anchors'
      }
    ],
    starSchemaNodes: [
      {
        id: 'technique',
        type: 'technique',
        label: 'Generational Root Training',
        shortDescription: 'Khasi betel nut trunk guidance.',
        detailedContent: 'Takes 15–30 years for young aerial roots to cross gorges and fuse into solid pedestrian platforms.'
      },
      {
        id: 'tribal',
        type: 'tribal',
        label: 'Matrilineal Clan Guardianship',
        shortDescription: 'Communal maintenance by villagers.',
        detailedContent: 'Nongriat villagers collectively weave new tendrils annually, ensuring multi-century durability.'
      }
    ],
    sources: [
      {
        title: 'Living Root Bridges: UNESCO Tentative Nomination Dossier',
        publisher: 'Government of Meghalaya & Forest Dept',
        verifiedDate: '2025-05-12'
      }
    ]
  }
};
