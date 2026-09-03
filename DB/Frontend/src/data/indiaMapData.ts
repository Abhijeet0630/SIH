import statesJson from './indiaMapData.json';

export interface StateGeoConfig {
  id: string;
  name: string;
  nativeName: string;
  capital: string;
  code: string;
  region: 'West' | 'North' | 'South' | 'East' | 'Central' | 'North-East';
  path: string;
  center: [number, number];
  zoomConfig: {
    scale: number;
    x: number;
    y: number;
  };
}

export const INDIA_STATES_GEO: StateGeoConfig[] = statesJson as StateGeoConfig[];

export const getStateGeoById = (id: string): StateGeoConfig | undefined => {
  const normId = id.toLowerCase().replace(/[^a-z0-9]/g, '');
  return INDIA_STATES_GEO.find(s => s.id.toLowerCase().replace(/[^a-z0-9]/g, '') === normId);
};
