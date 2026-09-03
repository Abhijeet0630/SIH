import { SourceCitation, StarSchemaNode } from './culturalItem';

export interface HotspotAnnotation {
  id: string;
  title: string;
  shortDescription: string;
  detailedText: string;
  position: [number, number, number];
  imageUrl?: string;
  architecturalNote?: string;
}

export interface MonumentData {
  id: string;
  slug: string;
  name: string;
  marathiName?: string;
  hindiName?: string;
  stateId: string;
  locationName: string;
  yearBuilt: string;
  architecturalStyle: string;
  shortDescription: string;
  detailedHistory: string;
  culturalImportance: string;
  bannerImage: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  modelConfig: {
    modelType: 'procedural-arch' | 'gltf' | 'custom-mesh';
    defaultCameraPosition: [number, number, number];
    lookAtTarget: [number, number, number];
    lightingPreset: 'dawn' | 'noon' | 'golden-hour' | 'dusk';
  };
  hotspots: HotspotAnnotation[];
  starSchemaNodes: StarSchemaNode[];
  sources: SourceCitation[];
}
