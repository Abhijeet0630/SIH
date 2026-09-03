import React from 'react';
import { MaharashtraAtlasMap } from './MaharashtraAtlasMap';
import { CulturalItem } from '../../types/culturalItem';

export const MaharashtraMap: React.FC<{
  items: CulturalItem[];
  selectedId?: string;
  onSelect: (i: CulturalItem | null) => void;
  activeSubRegion?: string;
  onSubRegionChange?: (regionId: string) => void;
  stateId?: string;
  stateName?: string;
  className?: string;
}> = (props) => {
  return (
    <MaharashtraAtlasMap
      items={props.items}
      selectedId={props.selectedId}
      onSelect={props.onSelect}
      activeSubRegion={props.activeSubRegion}
      onSubRegionChange={props.onSubRegionChange}
      className={props.className}
    />
  );
};


