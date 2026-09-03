import React, { useEffect, useMemo, useState } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import { MapPin, Sparkles, Navigation, Layers, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { CulturalItem } from '../../types/culturalItem';
import { MaharashtraAtlasMap } from './MaharashtraAtlasMap';
import { AssamAtlasMap } from './AssamAtlasMap';
import { MeghalayaAtlasMap } from './MeghalayaAtlasMap';

const GEO_URL = 'https://raw.githubusercontent.com/AbhinavSwami28/india-official-geojson/main/india-states-simplified.geojson';

const norm = (v: string) => v.toLowerCase().replace(/[^a-z]/g, '');
const featureName = (f: any) => String(
  f.properties?.st_nm || 
  f.properties?.ST_NM || 
  f.properties?.name || 
  f.properties?.NAME_1 || 
  f.properties?.state || 
  ''
);

const STATE_PROJECTIONS: Record<string, { center: [number, number]; scale: number; nameFilter: string }> = {
  maharashtra: {
    center: [76.0, 19.2],
    scale: 2300,
    nameFilter: 'maharashtra'
  },
  assam: {
    center: [92.9, 26.2],
    scale: 3400,
    nameFilter: 'assam'
  },
  meghalaya: {
    center: [91.35, 25.48],
    scale: 6400,
    nameFilter: 'meghalaya'
  },
  rajasthan: {
    center: [74.0, 26.5],
    scale: 2200,
    nameFilter: 'rajasthan'
  },
  kerala: {
    center: [76.3, 10.5],
    scale: 3600,
    nameFilter: 'kerala'
  },
  'west-bengal': {
    center: [87.8, 23.5],
    scale: 2800,
    nameFilter: 'bengal'
  }
};

export interface StateInteractiveMapProps {
  stateId?: string;
  stateName?: string;
  items: CulturalItem[];
  selectedId?: string;
  onSelect: (item: CulturalItem | null) => void;
  activeSubRegion?: string;
  onSubRegionChange?: (regionId: string) => void;
  className?: string;
}

export const StateInteractiveMap: React.FC<StateInteractiveMapProps> = ({
  stateId = 'maharashtra',
  stateName = 'Maharashtra',
  items,
  selectedId,
  onSelect,
  activeSubRegion = 'all',
  onSubRegionChange,
  className = ''
}) => {
  // If state is Maharashtra, render the enhanced MaharashtraAtlasMap!
  if (stateId.toLowerCase() === 'maharashtra') {
    return (
      <MaharashtraAtlasMap
        items={items}
        selectedId={selectedId}
        onSelect={onSelect}
        activeSubRegion={activeSubRegion}
        onSubRegionChange={onSubRegionChange}
        className={className}
      />
    );
  }

  // If state is Assam, render the enhanced AssamAtlasMap!
  if (stateId.toLowerCase() === 'assam') {
    return (
      <AssamAtlasMap
        items={items}
        selectedId={selectedId}
        onSelect={onSelect}
        activeSubRegion={activeSubRegion}
        onSubRegionChange={onSubRegionChange}
        className={className}
      />
    );
  }

  // If state is Meghalaya, render the enhanced MeghalayaAtlasMap!
  if (stateId.toLowerCase() === 'meghalaya') {
    return (
      <MeghalayaAtlasMap
        items={items}
        selectedId={selectedId}
        onSelect={onSelect}
        activeSubRegion={activeSubRegion}
        onSubRegionChange={onSubRegionChange}
        className={className}
      />
    );
  }

  const [feature, setFeature] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredItem, setHoveredItem] = useState<CulturalItem | null>(null);

  const config = STATE_PROJECTIONS[stateId.toLowerCase()] || STATE_PROJECTIONS['assam'];

  useEffect(() => {
    let isMounted = true;
    fetch(GEO_URL)
      .then(r => r.json())
      .then(d => {
        if (!isMounted) return;
        const target = d.features?.find((f: any) => 
          norm(featureName(f)).includes(config.nameFilter)
        ) || null;
        setFeature(target);
        setLoading(false);
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, [config.nameFilter]);

  const { projection, path } = useMemo(() => {
    const p = geoMercator();
    if (feature) {
      p.fitExtent([[50, 40], [810, 560]], feature);
    } else {
      p.center(config.center).scale(config.scale).translate([430, 300]);
    }
    return { projection: p, path: geoPath(p) };
  }, [config, feature]);

  // Filter items if district/subregion is selected
  const filteredItems = useMemo(() => {
    if (!activeSubRegion || activeSubRegion === 'all') return items;
    return items.filter(item => 
      (item.location.district && item.location.district.toLowerCase().includes(activeSubRegion.toLowerCase())) ||
      (item.tags && item.tags.some(t => t.toLowerCase().includes(activeSubRegion.toLowerCase())))
    );
  }, [items, activeSubRegion]);

  return (
    <div className={`maha-map relative overflow-hidden rounded-3xl border border-parchment-300 shadow-heritage-md bg-gradient-to-b from-[#faf6f0] to-[#f2eae0] ${className}`}>
      {/* Top Banner Control Strip */}
      <div className="maha-map-label flex items-center justify-between px-5 py-3 bg-white/90 backdrop-blur-sm border-b border-parchment-200">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-category-temples" />
          <span className="font-serif font-bold text-parchment-900 tracking-wide text-xs sm:text-sm">
            {stateName.toUpperCase()} · SPATIAL ARCHIVE
          </span>
        </div>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100/90 text-amber-900 border border-amber-300/50">
          {filteredItems.length} Landmarks Active
        </span>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full h-[480px] sm:h-[540px]">
        <svg viewBox="0 0 860 600" className="w-full h-full select-none" role="img" aria-label={`${stateName} cultural map`}>
          <defs>
            <radialGradient id="stateGrad" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#fffbf5" stopOpacity="1" />
              <stop offset="100%" stopColor="#eedec8" stopOpacity="0.8" />
            </radialGradient>
            <filter id="pinGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#92400e" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* State Boundary */}
          {feature && (
            <path
              d={path(feature) || ''}
              fill="url(#stateGrad)"
              stroke="#92400e"
              strokeWidth="2"
              strokeLinejoin="round"
              className="maha-outline filter drop-shadow-sm transition-all duration-300"
            />
          )}

          {/* Interactive Landmark Pins (Clean circular pins, no colliding static text!) */}
          {filteredItems.map(item => {
            const coords = item.location.coordinates;
            if (!coords || typeof coords.lng !== 'number' || typeof coords.lat !== 'number') return null;
            const pos = projection([coords.lng, coords.lat]);
            if (!pos) return null;
            const [x, y] = pos;
            const isSelected = selectedId === item.id;
            const isHovered = hoveredItem?.id === item.id;

            return (
              <g
                key={item.id}
                className={`landmark-pin group cursor-pointer transition-all duration-300 outline-none ${
                  isSelected ? 'active z-30' : 'z-10'
                }`}
                transform={`translate(${x},${y})`}
                onClick={() => onSelect(item)}
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
                tabIndex={0}
                role="button"
                aria-label={`Select ${item.title} at ${item.location.name}`}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelect(item);
                  }
                }}
              >
                {/* Outer Pulse ring on active */}
                {isSelected && (
                  <circle
                    r="22"
                    className="fill-category-temples/20 stroke-category-temples animate-ping"
                    strokeWidth="1.5"
                  />
                )}

                {/* Pin Base Circles */}
                <circle
                  r={isSelected ? '14' : isHovered ? '13' : '10'}
                  className={`transition-all duration-200 ${
                    isSelected
                      ? 'fill-category-temples stroke-white stroke-2 shadow-lg'
                      : 'fill-white stroke-category-temples stroke-2 hover:fill-amber-100 hover:scale-125'
                  }`}
                  filter="url(#pinGlow)"
                />
                <circle
                  r={isSelected ? '6' : isHovered ? '5' : '4'}
                  className={isSelected ? 'fill-white' : 'fill-category-temples'}
                />
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip */}
        {hoveredItem && (
          <div className="absolute bottom-4 left-4 z-30 bg-parchment-950/95 text-white px-3.5 py-2 rounded-xl shadow-heritage-md border border-amber-500/30 pointer-events-none text-xs">
            <span className="text-[10px] font-mono text-amber-300 uppercase block font-bold">
              {hoveredItem.category} · {hoveredItem.location.district}
            </span>
            <span className="font-serif font-bold text-sm block">
              {hoveredItem.title}
            </span>
            <span className="text-[10px] text-parchment-400">Click to explore story</span>
          </div>
        )}
      </div>

      {/* Loading state indicator */}
      {loading && !feature && (
        <div className="absolute inset-0 bg-parchment-50/70 backdrop-blur-xs flex items-center justify-center gap-2 text-parchment-700 text-xs font-medium">
          <MapPin className="w-4 h-4 animate-bounce text-category-temples" />
          <span>Calibrating {stateName} spatial grid...</span>
        </div>
      )}
    </div>
  );
};

export const MaharashtraMap = MaharashtraAtlasMap;
