export interface StateRegion {
  id: string;
  name: string;
  nativeName?: string;
  districts: string[];
  description: string;
  culturalCharacter: string;
}

export interface StateOverview {
  id: string; // e.g. 'maharashtra', 'assam', 'meghalaya'
  code: string; // e.g. 'MH', 'AS', 'ML'
  name: string;
  title?: string;
  nativeName?: string;
  capital: string;
  region: 'North' | 'South' | 'West' | 'East' | 'Central' | 'Northeast' | 'North-East';
  isFullyDeveloped: boolean;
  culturalIdentity: string;
  shortDescription: string;
  description?: string;
  historicalOverview?: string;
  languages: string[];
  bannerImage: string;
  itemCount: number;
  monumentCount: number;
  highlightedItemSlug?: string;
  featuredTraditions?: string[];
  subRegions?: StateRegion[];
  coordinates: {
    lat: number;
    lng: number;
  };
}
