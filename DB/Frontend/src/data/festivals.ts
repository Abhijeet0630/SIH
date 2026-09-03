import { FestivalEvent } from '../types/festival';

export const CULTURAL_FESTIVALS: FestivalEvent[] = [
  {
    id: 'makar-sankranti',
    name: 'Makar Sankranti & Magh Bihu',
    marathiName: 'मकर संक्रांत',
    hindiName: 'मकर संक्रांति',
    monthIndex: 0, // January
    dateOrSeason: 'January 14–15 (Solar Transition)',
    upcomingDate: 'January 14, 2026',
    dayOrTithi: 'Poush Shukla Ekadashi / Solar Capricorn Entry',
    state: 'Maharashtra & Assam',
    stateId: 'maharashtra',
    category: 'harvest',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'Winter solstice harvest festival celebrated with sesame-jaggery Tilgul exchange ("Tilgul ghya, god god bola") in Maharashtra and community Meji bonfires in Assam.',
    culturalSignificance: 'Marks the northward sun journey (Uttarayana), gratitude for winter crops, and forgiving past grudges through sweet sesame offerings.',
    traditionalPractices: ['Tilgul Ladoo preparation', 'Haldi-Kunku ceremonies', 'Meji and Bhelaghar straw bonfire feasts', 'Kite flying']
  },
  {
    id: 'gudi-padwa',
    name: 'Gudi Padwa',
    marathiName: 'गुढीपाडवा',
    hindiName: 'गुड़ी पड़वा',
    monthIndex: 2, // March
    dateOrSeason: 'Chaitra Shukla Pratipada (Mar–Apr)',
    upcomingDate: 'March 20, 2026',
    dayOrTithi: 'Chaitra Shukla Pratipada',
    state: 'Maharashtra',
    stateId: 'maharashtra',
    category: 'new-year',
    image: 'https://images.unsplash.com/photo-1617654112365-3ed7cfbe3395?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'Traditional Marathi New Year celebrating harvest, victory, and the onset of auspicious new beginnings.',
    culturalSignificance: 'Symbolizes the victory of righteousness and commemorates the coronation of Chhatrapati Shivaji Maharaj in tradition.',
    traditionalPractices: ['Raising the auspicious Gudi banner', 'Eating neem-jaggery prasad', 'Shrikhand Puri feast', 'Shobha Yatra in traditional attire']
  },
  {
    id: 'bihu',
    name: 'Rongali (Bohag) Bihu',
    marathiName: 'रोंगाली बिहू',
    hindiName: 'रंगाली बिहू',
    monthIndex: 3, // April
    dateOrSeason: 'Bohag Month (Mid-April)',
    upcomingDate: 'April 14, 2026',
    dayOrTithi: '1st Day of Bohag',
    state: 'Assam',
    stateId: 'assam',
    category: 'harvest',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'The 7-day Assamese spring and agrarian New Year festival celebrated with spirited Bihu dance, Pepa horn calls, and Pitha sweets.',
    culturalSignificance: 'Marks the start of the agrarian calendar, honors cattle (Goru Bihu), ancestors, and the rejuvenation of nature.',
    traditionalPractices: ['Bihu Naach with Pepa & Dhol', 'Weaving Gamusa towels', 'Pitha and Laroo preparation', 'Goru Bihu cattle veneration'],
    relatedItemSlug: 'bihu-dance'
  },
  {
    id: 'shad-suk-mynsiem-fest',
    name: 'Shad Suk Mynsiem',
    marathiName: 'शाद सुक मिनसिएम',
    hindiName: 'शाद सुक मिनसिएम',
    monthIndex: 3, // April
    dateOrSeason: 'Mid-April (Spring Thanksgiving)',
    upcomingDate: 'April 18, 2026',
    dayOrTithi: 'Khasi Lunar Spring Cycle',
    state: 'Meghalaya',
    stateId: 'meghalaya',
    category: 'seasonal',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'The "Dance of the Peaceful Hearts" celebrated by the Khasi people in Shillong as a majestic thanksgiving to the Creator for fertile rains.',
    culturalSignificance: 'Highlights the matrilineal structure of Khasi society, with women dancing in pure silver-gold crowns encircled by male protectors.',
    traditionalPractices: ['Tangmuri flute melodies', 'Pansngiat gold crown regalia', 'Feathered quiver dances', 'Community thanksgiving prayers'],
    relatedItemSlug: 'shad-suk-mynsiem'
  },
  {
    id: 'pola-festival',
    name: 'Bail Pola (Bullock Thanksgiving)',
    marathiName: 'बैल पोळा',
    hindiName: 'बैल पोला',
    monthIndex: 7, // August
    dateOrSeason: 'Shravan/Bhadrapada Purnima (August)',
    upcomingDate: 'August 28, 2026',
    dayOrTithi: 'Pithori Amavasya',
    state: 'Maharashtra',
    stateId: 'maharashtra',
    category: 'harvest',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'A heart-touching rural agrarian festival honoring farm bullocks and cattle that labor alongside farmers year-round.',
    culturalSignificance: 'Farmers wash, decorate horns with paint and ornaments, and bow to their bulls, exempting them from work on this sacred day.',
    traditionalPractices: ['Horn painting with geru clay', 'Beaded headdress adornment', 'Puran Poli feast for farm animals', 'Village cattle procession']
  },
  {
    id: 'ganeshotsav',
    name: 'Ganeshotsav (Ganesh Chaturthi)',
    marathiName: 'गणेशोत्सव',
    hindiName: 'गणेश चतुर्थी',
    monthIndex: 8, // September
    dateOrSeason: 'Bhadrapada Shukla Chaturthi (Aug–Sep)',
    upcomingDate: 'September 14, 2026',
    dayOrTithi: 'Bhadrapada Shukla Chaturthi',
    state: 'Maharashtra',
    stateId: 'maharashtra',
    category: 'religious',
    image: 'https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'The grand 10-day cultural festival honoring Lord Ganesha with Dhol Tasha, public pandals, and community unity.',
    culturalSignificance: 'Transformed by Lokmanya Tilak in 1893 into a mass public movement fostering national pride and social cohesion.',
    traditionalPractices: ['Dhol Tasha Vadak', 'Ukadiche Modak preparation', 'Visarjan procession', 'Aarti with traditional instruments'],
    relatedItemSlug: 'ukadiche-modak'
  },
  {
    id: 'onam',
    name: 'Onam Harvest Festival',
    hindiName: 'ओणम',
    monthIndex: 8, // September
    dateOrSeason: 'Chingam Month (Aug–Sep)',
    upcomingDate: 'September 5, 2026',
    dayOrTithi: 'Thiruvonam Asterism',
    state: 'Kerala',
    stateId: 'kerala',
    category: 'harvest',
    image: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'Kerala’s harvest festival commemorating King Mahabali with floral carpets, boat races, and Onasadya feasts.',
    culturalSignificance: 'Celebrates abundance, equality, communal harmony, and cultural pride through elaborate folk art forms.',
    traditionalPractices: ['Pookkalam floral carpets', 'Vallam Kali snake boat races', 'Grand 26-dish Onasadya banquet', 'Pulikali tiger dance']
  },
  {
    id: 'durga-puja',
    name: 'Durga Puja',
    hindiName: 'दुर्गा पूजा',
    monthIndex: 9, // October
    dateOrSeason: 'Ashwin Month (Sep–Oct)',
    upcomingDate: 'October 18, 2026',
    dayOrTithi: 'Maha Saptami to Dashami',
    state: 'West Bengal',
    stateId: 'west-bengal',
    category: 'religious',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'UNESCO Intangible Cultural Heritage celebrating the victory of Goddess Durga over Mahishasura through grand artistic pandals.',
    culturalSignificance: 'A monumental public celebration uniting visual arts, dhak percussion, classical literature, and community banquets.',
    traditionalPractices: ['Dhunuchi Naach', 'Sindoor Khela', 'Dhak drumming', 'Artistic thematic pandal visits']
  },
  {
    id: 'wangala-fest',
    name: 'Wangala (100 Drums Festival)',
    marathiName: 'वांगाला उत्सव',
    hindiName: 'वांगला उत्सव',
    monthIndex: 10, // November
    dateOrSeason: 'Post-Harvest (Second Week of November)',
    upcomingDate: 'November 12, 2026',
    dayOrTithi: 'Garo Post-Harvest Moon',
    state: 'Meghalaya',
    stateId: 'meghalaya',
    category: 'harvest',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'The most significant post-harvest festival of the Garo (A-chik) tribe, honoring Saljong (the Sun God of fertility) with 100 synchronized long drums.',
    culturalSignificance: 'Men in feathered headdresses (Do’kisha) beat 100 Dama drums simultaneously while women dance to invoke blessings for future crops.',
    traditionalPractices: ['100 Dama drum synchronization', 'Feathered turban ceremonial attire', 'Indigenous rice beer (Chu) offerings', 'Traditional warrior dance steps']
  },
  {
    id: 'pushkar-fair',
    name: 'Pushkar Camel Fair',
    hindiName: 'पुष्कर मेला',
    monthIndex: 10, // November
    dateOrSeason: 'Kartik Purnima (Oct–Nov)',
    upcomingDate: 'November 22, 2026',
    dayOrTithi: 'Kartik Shukla Ekadashi to Purnima',
    state: 'Rajasthan',
    stateId: 'rajasthan',
    category: 'art',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
    shortDescription: 'One of the world’s largest camel and cultural fairs set against the sacred dunes and ghats of Lake Pushkar.',
    culturalSignificance: 'A vibrant confluence of pastoral traditions, folk music, Rajasthani textiles, and sacred pilgrimage rituals.',
    traditionalPractices: ['Camel decoration contests', 'Folk Kalbelia performances', 'Sacred bath in Pushkar Sarovar', 'Handicraft bazaars']
  }
];
