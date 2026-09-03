import { CulturalItem } from '../types/culturalItem';
import { CulturalCategoryId } from '../types/category';
import { MAHARASHTRA_CULTURAL_ITEMS } from './maharashtraCulturalItems';
import { NORTHEAST_CULTURAL_ITEMS } from './northeastCulturalItems';

export const ALL_CULTURAL_ITEMS: CulturalItem[] = [
  ...MAHARASHTRA_CULTURAL_ITEMS,
  ...NORTHEAST_CULTURAL_ITEMS,
  // Additional states' initial teaser items for scalable architecture
  {
    id: 'rajasthan-kathputli',
    slug: 'rajasthan-kathputli',
    title: 'Kathputli String Puppetry',
    hindiTitle: 'कठपुतली',
    stateId: 'rajasthan',
    category: 'crafts',
    shortDescription: 'Centuries-old wooden string puppetry from the Thar Desert depicting chivalric ballads of Amar Singh Rathore.',
    description: 'Kathputli is a traditional string puppet theater native to Rajasthan, carved from mango wood and dressed in bright Rajasthani bandhani and gota-patti fabrics.',
    history: 'Practiced for over a millennium by the Bhatt community of Rajasthan.',
    culturalSignificance: 'One of the earliest recorded performing arts of northern India.',
    location: {
      name: 'Jaipur & Jodhpur',
      district: 'Jaipur',
      state: 'Rajasthan',
      coordinates: {
        lat: 26.9124,
        lng: 75.7873
      }
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
        alt: 'Rajasthani Kathputli puppets with colorful bandhani skirts',
        credit: 'Rajasthan Folk Heritage Trust',
        license: 'Open Access'
      }
    ],
    primaryImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
    sources: [
      {
        title: 'Puppetry Traditions of India',
        publisher: 'Sangeet Natak Akademi',
        verifiedDate: '2024-11-05'
      }
    ],
    starSchemaNodes: [],
    relatedItemSlugs: [],
    tags: ['Kathputli', 'Rajasthan', 'Puppetry', 'Folk Art'],
    lastVerified: '2025-08-01'
  }
];

export const getAllCulturalItems = (): CulturalItem[] => {
  return ALL_CULTURAL_ITEMS;
};

export const getCulturalItemsByState = (stateId: string): CulturalItem[] => {
  return ALL_CULTURAL_ITEMS.filter(item => item.stateId.toLowerCase() === stateId.toLowerCase());
};

export const getCulturalItemsByCategory = (stateId: string, categoryId: CulturalCategoryId): CulturalItem[] => {
  const stateItems = getCulturalItemsByState(stateId);
  if (categoryId === 'all') {
    return stateItems;
  }
  return stateItems.filter(item => item.category === categoryId);
};

export const getCulturalItemsByGlobalCategory = (categoryId: CulturalCategoryId): CulturalItem[] => {
  if (categoryId === 'all') {
    return ALL_CULTURAL_ITEMS;
  }
  return ALL_CULTURAL_ITEMS.filter(item => item.category === categoryId);
};

export const getCulturalItemBySlug = (slug: string): CulturalItem | undefined => {
  return ALL_CULTURAL_ITEMS.find(item => item.slug.toLowerCase() === slug.toLowerCase());
};
