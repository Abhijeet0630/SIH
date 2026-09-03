export interface FestivalEvent {
  id: string;
  name: string;
  marathiName?: string;
  hindiName?: string;
  monthIndex: number; // 0 for Jan, 1 for Feb ... 11 for Dec
  dateOrSeason: string;
  upcomingDate?: string;
  dayOrTithi?: string;
  state: string;
  stateId: string;
  category: 'harvest' | 'religious' | 'seasonal' | 'art' | 'new-year';
  image: string;
  shortDescription: string;
  culturalSignificance: string;
  traditionalPractices: string[];
  relatedItemSlug?: string;
}
