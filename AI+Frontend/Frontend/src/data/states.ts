import { StateOverview } from '../types/state';

export const STATES_DATA: Record<string, StateOverview> = {
  maharashtra: {
    id: 'maharashtra',
    code: 'IN-MH',
    name: 'Maharashtra',
    nativeName: 'महाराष्ट्र',
    capital: 'Mumbai',
    region: 'West',
    isFullyDeveloped: true,
    culturalIdentity: 'Land of Sahyadri Forts, UNESCO Cave Temples, Royal Paithani Silks, and Lavani Rhythms',
    shortDescription: 'From impregnable cliff-top bastions to sacred basalt rock temples, coastal Konkani kitchens, and vibrant folk performing arts.',
    historicalOverview: 'From the ancient Satavahana and Rashtrakuta empires to the 17th-century Hindavi Swarajya established by Chhatrapati Shivaji Maharaj, Maharashtra has stood at the crossroads of military strategy, monumental rock architecture, and deep spiritual traditions.',
    languages: ['Marathi', 'Hindi', 'Konkani'],
    bannerImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    itemCount: 12,
    monumentCount: 4,
    highlightedItemSlug: 'raigad-fort',
    featuredTraditions: ['Shivrajyabhishek Sohala', 'Ganeshotsav Dhol Tasha', 'Paithani Handloom Weaving', 'Warli Tribal Art', 'Lavani Baithak'],
    subRegions: [
      {
        id: 'konkan',
        name: 'Konkan Coast',
        districts: ['Sindhudurg', 'Ratnagiri', 'Raigad', 'Thane', 'Palghar', 'Mumbai'],
        description: 'Coastal rainforest strip celebrated for sea forts, Alfonso mangoes, coconut cuisine, and Warli tribal arts.',
        culturalCharacter: 'Maritime forts, Koli fishing lore, Ukadiche Modak, and Malvani spices.'
      },
      {
        id: 'desh',
        name: 'Western Ghats / Desh',
        districts: ['Pune', 'Satara', 'Kolhapur', 'Sangli', 'Solapur'],
        description: 'The Sahyadri mountain heartland of Maratha hill bastions, Lavani folk theater, and Kolhapuri leather craftsmanship.',
        culturalCharacter: 'Chhatrapati Shivaji Maharaj forts, Puneri Misal, and Tambada Rassa.'
      },
      {
        id: 'marathwada',
        name: 'Marathwada',
        districts: ['Chhatrapati Sambhajinagar', 'Jalna', 'Beed', 'Nanded', 'Latur', 'Dharashiv', 'Parbhani', 'Hingoli'],
        description: 'Ancient cradle of world-renowned UNESCO caves (Ajanta & Ellora) and the sacred Godavari spiritual belt.',
        culturalCharacter: 'Kailasa monolithic temple, Paithani silk weaving, and Sufi-Bhakti poetry.'
      },
      {
        id: 'vidarbha',
        name: 'Vidarbha',
        districts: ['Nagpur', 'Amravati', 'Chandrapur', 'Wardha', 'Bhandara', 'Gondia', 'Gadchiroli', 'Yavatmal', 'Akola', 'Buldhana', 'Washim'],
        description: 'Eastern teak forests, tiger reserves, ancient copper-plate dynasties, and spicy Saoji cuisine.',
        culturalCharacter: 'Gond tribal traditions, orange orchards, and Lonar crater heritage.'
      },
      {
        id: 'khandesh',
        name: 'Khandesh',
        districts: ['Nashik', 'Jalgaon', 'Dhule', 'Nandurbar'],
        description: 'Northern Tapi-Godavari agricultural belt famous for Trimbakeshwar Jyotirlinga, banana groves, and spicy Shev Bhaji.',
        culturalCharacter: 'Kumbh Mela traditions, Hemadpanthi temples, and Ahirani dialect.'
      }
    ],
    coordinates: {
      lat: 19.7515,
      lng: 75.7139
    }
  },
  assam: {
    id: 'assam',
    code: 'IN-AS',
    name: 'Assam',
    nativeName: 'অসম',
    capital: 'Dispur',
    region: 'Northeast',
    isFullyDeveloped: true,
    culturalIdentity: 'Gateway to Northeast India, Golden Muga Silk, Majuli River Island, and Rhythmic Bihu Dances',
    shortDescription: 'Cradle of the mighty Brahmaputra river, ancient Ahom kingdom amphitheaters, Vaishnavite Satra monasteries, and aromatic tea gardens.',
    historicalOverview: 'Ruled unconquered by the Ahom dynasty for nearly 600 years (1228–1826 CE). Assam fostered a unique synthesis of Indo-Tibetan traditions, architectural brick pavilions (Rang Ghar), and the egalitarian Neo-Vaishnavite cultural renaissance pioneered by Srimanta Sankardev.',
    languages: ['Assamese', 'Bodo', 'Bengali'],
    bannerImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    itemCount: 8,
    monumentCount: 2,
    highlightedItemSlug: 'assam-muga-silk',
    featuredTraditions: ['Rongali Bihu Dance', 'Muga Silk Weaving', 'Majuli Mask Making', 'Sattriya Classical Dance', 'Kaziranga Ecological Lore'],
    subRegions: [
      {
        id: 'brahmaputra-valley',
        name: 'Brahmaputra Valley',
        districts: ['Kamrup', 'Jorhat', 'Sivasagar', 'Sonitpur', 'Dibrugarh'],
        description: 'Fertile river basin harboring historic Ahom royal capitals, tea plantations, and Vaishnavite Satras.',
        culturalCharacter: 'Rang Ghar amphitheater, Sivasagar royal tanks, and Sattriya dance monasteries.'
      },
      {
        id: 'majuli-island',
        name: 'Majuli River Island',
        districts: ['Majuli'],
        description: 'The world’s largest inhabited river island, spiritual heart of Vaishnavite monasteries and Mukha mask artisans.',
        culturalCharacter: 'Bamboo mask crafting, Bhaona folk theater, and spiritual chanting.'
      },
      {
        id: 'barak-valley',
        name: 'Barak Valley & Hill Tracts',
        districts: ['Cachar', 'Karbi Anglong', 'Dima Hasao'],
        description: 'Lush undulating hills and valleys with indigenous Dimasa, Karbi, and Bengali heritage.',
        culturalCharacter: 'Indigenous handlooms, cane crafts, and harvest songs.'
      }
    ],
    coordinates: {
      lat: 26.2006,
      lng: 92.9376
    }
  },
  meghalaya: {
    id: 'meghalaya',
    code: 'IN-ML',
    name: 'Meghalaya',
    nativeName: 'Meghalaya (Abode of Clouds)',
    capital: 'Shillong',
    region: 'Northeast',
    isFullyDeveloped: true,
    culturalIdentity: 'The Abode of Clouds, Bio-Engineered Living Root Bridges, Sacred Groves, and Matrilineal Traditions',
    shortDescription: 'High-altitude pine plateaus, majestic waterfalls, ancient living root architectures of the Khasi and Jaintia tribes, and vibrant music festivals.',
    historicalOverview: 'Home to the indigenous Khasi, Garo, and Jaintia peoples who have practiced matrilineal kinship for millennia. Renowned for their deep ecological harmony, preserving sacred groves (Law Kyntang) and engineering living Ficus elastica roots across torrential mountain gorges.',
    languages: ['Khasi', 'Garo', 'English', 'Pnar'],
    bannerImage: 'https://images.unsplash.com/photo-1627894006066-b45786537123?auto=format&fit=crop&w=1200&q=80',
    itemCount: 6,
    monumentCount: 2,
    highlightedItemSlug: 'meghalaya-living-root-bridge',
    featuredTraditions: ['Living Root Bridge Bio-Engineering', 'Shad Suk Mynsiem Dance', 'Wangala 100-Drum Festival', 'Mawphlang Sacred Grove Guardianship'],
    subRegions: [
      {
        id: 'khasi-hills',
        name: 'East & West Khasi Hills',
        districts: ['East Khasi Hills', 'West Khasi Hills', 'Ri-Bhoi'],
        description: 'Misty pine plateaus home to Shillong, Cherrapunji (Sohra), and Mawlynnong clean village.',
        culturalCharacter: 'Living root bridges, Mawphlang sacred forest, and Khasi oral epics.'
      },
      {
        id: 'jaintia-hills',
        name: 'Jaintia Hills',
        districts: ['West Jaintia Hills', 'East Jaintia Hills'],
        description: 'Mineral-rich highlands celebrated for Nartiang monoliths, Behdeinkhlam festival, and crystal-clear Umngot river at Dawki.',
        culturalCharacter: 'Stone megaliths, sacred water ceremonies, and turmeric farming.'
      },
      {
        id: 'garo-hills',
        name: 'Garo Hills',
        districts: ['West Garo Hills', 'East Garo Hills', 'South Garo Hills'],
        description: 'Western tropical forest range of the A-chik (Garo) people celebrated for the thunderous Wangala festival.',
        culturalCharacter: '100 Drums Wangala dance, Nokrek biosphere, and bamboo architectural pavilions.'
      }
    ],
    coordinates: {
      lat: 25.4670,
      lng: 91.3662
    }
  },
  rajasthan: {
    id: 'rajasthan',
    code: 'IN-RJ',
    name: 'Rajasthan',
    nativeName: 'राजस्थान',
    capital: 'Jaipur',
    region: 'North',
    isFullyDeveloped: false,
    culturalIdentity: 'The Land of Kings, Thar Desert Fortresses, Royal Textiles, and Ghoomar Dance',
    shortDescription: 'The Land of Kings, renowned for Thar desert fortresses, colorful royal textiles, folk puppetry, and Mewari chivalry.',
    languages: ['Hindi', 'Rajasthani', 'Marwari'],
    bannerImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    itemCount: 2,
    monumentCount: 1,
    coordinates: {
      lat: 27.0238,
      lng: 74.2179
    }
  },
  kerala: {
    id: 'kerala',
    code: 'IN-KL',
    name: 'Kerala',
    nativeName: 'കേരളം',
    capital: 'Thiruvananthapuram',
    region: 'South',
    isFullyDeveloped: false,
    culturalIdentity: 'God’s Own Country, Backwaters, Classical Kathakali, and Ayurvedic Heritage',
    shortDescription: 'God’s Own Country, famed for serene backwaters, classical Kathakali dance-drama, Ayurveda healing, and spice cultivation.',
    languages: ['Malayalam', 'English'],
    bannerImage: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&w=1200&q=80',
    itemCount: 1,
    monumentCount: 0,
    coordinates: {
      lat: 10.8505,
      lng: 76.2711
    }
  },
  'tamil-nadu': {
    id: 'tamil-nadu',
    code: 'IN-TN',
    name: 'Tamil Nadu',
    nativeName: 'தமிழ்நாடு',
    capital: 'Chennai',
    region: 'South',
    isFullyDeveloped: false,
    culturalIdentity: 'Cradle of Dravidian Architecture, Soaring Gopurams, and Bharatanatyam',
    shortDescription: 'Cradle of ancient Dravidian civilization, soaring Chola temple gopurams, Bharatanatyam classical dance, and Carnatic music.',
    languages: ['Tamil', 'English'],
    bannerImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    itemCount: 1,
    monumentCount: 0,
    coordinates: {
      lat: 11.1271,
      lng: 78.6569
    }
  },
  'west-bengal': {
    id: 'west-bengal',
    code: 'IN-WB',
    name: 'West Bengal',
    nativeName: 'পশ্চিমবঙ্গ',
    capital: 'Kolkata',
    region: 'East',
    isFullyDeveloped: false,
    culturalIdentity: 'Cultural Capital of Literature, Terracotta Temples, UNESCO Durga Puja, and Baul Music',
    shortDescription: 'Cultural capital of literature, terracotta temples of Bishnupur, UNESCO Durga Puja celebrations, and Baul mysticism.',
    languages: ['Bengali', 'English', 'Hindi'],
    bannerImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
    itemCount: 1,
    monumentCount: 0,
    coordinates: {
      lat: 22.9868,
      lng: 87.8550
    }
  },
  gujarat: {
    id: 'gujarat',
    code: 'IN-GJ',
    name: 'Gujarat',
    nativeName: 'ગુજરાત',
    capital: 'Gandhinagar',
    region: 'West',
    isFullyDeveloped: false,
    culturalIdentity: 'Land of Stepwells, Vibrant Garba, Patola Double-Ikat Weaving, and Coastal Ports',
    shortDescription: 'Land of stepwells, vibrant Garba and Dandiya folk dances, Patola double-ikat weaving, and Asiatic lions.',
    languages: ['Gujarati', 'Hindi'],
    bannerImage: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80',
    itemCount: 1,
    monumentCount: 0,
    coordinates: {
      lat: 22.2587,
      lng: 71.1924
    }
  },
  'uttar-pradesh': {
    id: 'uttar-pradesh',
    code: 'IN-UP',
    name: 'Uttar Pradesh',
    nativeName: 'उत्तर प्रदेश',
    capital: 'Lucknow',
    region: 'North',
    isFullyDeveloped: false,
    culturalIdentity: 'Spiritual Heartland of the Gangetic Plains, Ancient Ghats, and Classical Kathak',
    shortDescription: 'Spiritual heartland of the Gangetic plains, ancient Varanasi ghats, Taj Mahal, and classical Kathak dance.',
    languages: ['Hindi', 'Urdu'],
    bannerImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
    itemCount: 1,
    monumentCount: 0,
    coordinates: {
      lat: 26.8467,
      lng: 80.9462
    }
  },
  karnataka: {
    id: 'karnataka',
    code: 'IN-KA',
    name: 'Karnataka',
    nativeName: 'ಕರ್ನಾಟಕ',
    capital: 'Bengaluru',
    region: 'South',
    isFullyDeveloped: false,
    culturalIdentity: 'Architectural Splendour of Hampi, Hoysala Stone Carvings, and Yakshagana',
    shortDescription: 'Architectural splendour of Hampi, intricately carved Hoysala stone temples, Mysore silk, and Yakshagana folk theater.',
    languages: ['Kannada', 'English'],
    bannerImage: 'https://images.unsplash.com/photo-1600100397608-f010e42f9b17?auto=format&fit=crop&w=1200&q=80',
    itemCount: 1,
    monumentCount: 0,
    coordinates: {
      lat: 15.3173,
      lng: 75.7139
    }
  },
  punjab: {
    id: 'punjab',
    code: 'IN-PB',
    name: 'Punjab',
    nativeName: 'ਪੰਜਾਬ',
    capital: 'Chandigarh',
    region: 'North',
    isFullyDeveloped: false,
    culturalIdentity: 'Land of Five Rivers, Sacred Golden Temple, High-Energy Bhangra, and Phulkari',
    shortDescription: 'The Land of Five Rivers, sacred Golden Temple of Amritsar, energetic Bhangra and Giddha dances, and Phulkari embroidery.',
    languages: ['Punjabi', 'Hindi'],
    bannerImage: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1200&q=80',
    itemCount: 1,
    monumentCount: 0,
    coordinates: {
      lat: 31.1471,
      lng: 75.3412
    }
  },
  odisha: {
    id: 'odisha',
    code: 'IN-OD',
    name: 'Odisha',
    nativeName: 'ଓଡ଼ିଶା',
    capital: 'Bhubaneswar',
    region: 'East',
    isFullyDeveloped: false,
    culturalIdentity: 'Konark Sun Temple Architecture, Classical Odissi Dance, and Silver Filigree Craft',
    shortDescription: 'Konark Sun Temple architectural wonder, classical Odissi dance, silver filigree craft, and Puri Jagannath Ratha Yatra.',
    languages: ['Odia', 'Hindi'],
    bannerImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    itemCount: 1,
    monumentCount: 0,
    coordinates: {
      lat: 20.9517,
      lng: 85.0985
    }
  },
  'madhya-pradesh': {
    id: 'madhya-pradesh',
    code: 'IN-MP',
    name: 'Madhya Pradesh',
    nativeName: 'मध्य प्रदेश',
    capital: 'Bhopal',
    region: 'Central',
    isFullyDeveloped: false,
    culturalIdentity: 'The Heart of India, Khajuraho Sculptures, Sanchi Stupa, and Gond Art',
    shortDescription: 'The Heart of India, Khajuraho temples, Sanchi Buddhist stupa, Bhimbetka prehistoric rock shelters, and Chanderi weaving.',
    languages: ['Hindi'],
    bannerImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
    itemCount: 1,
    monumentCount: 0,
    coordinates: {
      lat: 22.9734,
      lng: 78.6569
    }
  }
};

const CODE_TO_SLUG: Record<string, string> = {
  mh: 'maharashtra',
  rj: 'rajasthan',
  gj: 'gujarat',
  kl: 'kerala',
  as: 'assam',
  tn: 'tamil-nadu',
  ml: 'meghalaya',
  wb: 'west-bengal',
  ka: 'karnataka',
  pb: 'punjab',
  od: 'odisha',
  mp: 'madhya-pradesh',
};

export const getAllStates = (): StateOverview[] => {
  return Object.values(STATES_DATA);
};

export const getStateById = (stateId: string): StateOverview | undefined => {
  if (!stateId) return undefined;
  const key = stateId.toLowerCase().trim();
  if (STATES_DATA[key]) return STATES_DATA[key];
  if (CODE_TO_SLUG[key] && STATES_DATA[CODE_TO_SLUG[key]]) return STATES_DATA[CODE_TO_SLUG[key]];
  return Object.values(STATES_DATA).find(
    s => s.id.toLowerCase() === key || s.code.toLowerCase() === key || s.code.toLowerCase() === `in-${key}` || s.name.toLowerCase() === key
  );
};
