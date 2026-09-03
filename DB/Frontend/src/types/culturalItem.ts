import { CulturalCategoryId } from './category';

export interface ImageMeta {
  url: string;
  alt: string;
  caption?: string;
  credit: string;
  license: string;
  source?: string;
}

export interface SourceCitation {
  title: string;
  url?: string;
  publisher: string;
  verifiedDate: string;
}

export interface StarSchemaNode {
  id: string;
  type: 'history' | 'region' | 'materials' | 'tradition' | 'festival' | 'modern' | 'people' | 'music' | 'technique' | 'tribal' | 'fashion' | 'art' | 'architecture';
  label: string;
  shortDescription: string;
  detailedContent: string;
}

export interface RecipeInfo {
  prepTime?: string;
  cookTime?: string;
  difficulty?: 'Easy' | 'Medium' | 'Advanced';
  ingredientsSummary: string[];
  culturalContext: string;
  recipeUrl: string;
  verifiedSourceName: string;
}

export interface CulturalItem {
  id: string;
  slug: string;
  title: string;
  marathiTitle?: string;
  hindiTitle?: string;
  stateId: string;
  category: CulturalCategoryId;
  shortDescription: string;
  description: string;
  history: string;
  culturalSignificance: string;
  location: {
    name: string;
    district: string;
    state: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  images: ImageMeta[];
  primaryImage: string;
  sources: SourceCitation[];
  starSchemaNodes: StarSchemaNode[];
  relatedItemSlugs: string[];
  tags: string[];
  recipeInfo?: RecipeInfo;
  model3DId?: string;
  lastVerified: string;
}
