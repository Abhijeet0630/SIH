export type CulturalCategoryId =
  | 'all'
  | 'food'
  | 'fashion'
  | 'forts'
  | 'temples'
  | 'monuments'
  | 'dance'
  | 'music'
  | 'crafts'
  | 'festivals'
  | 'languages'
  | 'architecture'
  | 'tribal'
  | 'culture';

export interface CategoryInfo {
  id: CulturalCategoryId;
  labelKey: string;
  defaultLabel: string;
  iconName: string;
  accentColor: string;
  description: string;
}
