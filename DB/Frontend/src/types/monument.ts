import { SourceCitation, StarSchemaNode } from './culturalItem';

export interface HotspotAnnotation {
  id: string;
  title: string;
  shortDescription: string;
  detailedText: string;
  position: [number, number, number];
  cameraPosition?: [number, number, number];
  cameraTarget?: [number, number, number];
  imageUrl?: string;
  architecturalNote?: string;
}

export interface Monument3DModelConfig {
  modelType?: 'gltf' | 'procedural-arch' | 'custom-mesh';
  defaultCameraPosition?: [number, number, number];
  lookAtTarget?: [number, number, number];
  lightingPreset?: 'warm-heritage' | 'golden-hour' | 'museum-daylight' | 'dusk';
  minDistance?: number;
  maxDistance?: number;
  autoRotateSpeed?: number;
  modelScale?: number;
  groundOffset?: number;
}

export interface MonumentData {
  id: string;
  slug: string;
  name: string;
  nativeName?: string;
  marathiName?: string;
  hindiName?: string;
  state: string;
  stateId: string;
  region: string;
  district_or_city: string;
  category: string;
  description: string;
  shortDescription: string;
  image: string;
  bannerImage?: string;

  // Backend 3D Integration Contract
  modelUrl: string | null;
  modelAvailable: boolean;

  architecturalStyle?: string;
  yearBuilt?: string;
  culturalSignificance?: string;
  detailedHistory?: string;
  culturalImportance?: string;
  locationName?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  modelConfig?: Monument3DModelConfig;
  hotspots?: HotspotAnnotation[];
  starSchemaNodes?: StarSchemaNode[];
  sources?: SourceCitation[];
}
