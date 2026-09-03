import React, { useState, useMemo, useRef, useCallback } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Layers, 
  MapPin, 
  Sparkles, 
  Shield, 
  UtensilsCrossed, 
  Activity, 
  Music, 
  Palette, 
  Landmark, 
  BookOpen, 
  ArrowRight, 
  X, 
  Compass, 
  ChevronRight,
  Info,
  Trees
} from 'lucide-react';
import { CulturalItem } from '../../types/culturalItem';
import { CulturalCategoryId } from '../../types/category';
import assamGeoData from '../../data/assamGeo.json';
import assamOfficialDistricts from '../../data/assamOfficialDistricts.json';

export type MapFilterCategory = 
  | 'all' 
  | 'forts_arch' 
  | 'food' 
  | 'dance' 
  | 'music' 
  | 'fashion_crafts' 
  | 'spiritual' 
  | 'tribal';

export interface CategoryFilterOption {
  id: MapFilterCategory;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  description: string;
  categories: CulturalCategoryId[];
}

export const ASSAM_MAP_CATEGORIES: CategoryFilterOption[] = [
  {
    id: 'all',
    label: 'All Heritage',
    shortLabel: 'All',
    icon: Layers,
    accentColor: '#B45309', // amber-700
    description: 'All verified cultural landmarks across the Brahmaputra & Barak Valleys',
    categories: ['food', 'fashion', 'forts', 'temples', 'monuments', 'architecture', 'dance', 'music', 'crafts', 'tribal', 'languages', 'festivals', 'culture']
  },
  {
    id: 'fashion_crafts',
    label: 'Muga Silk & Crafts',
    shortLabel: 'Silk & Crafts',
    icon: Palette,
    accentColor: '#D97706', // amber-600
    description: 'Golden Muga silks of Sualkuchi, Majuli Mukha masks, and bell-metal crafts',
    categories: ['fashion', 'crafts']
  },
  {
    id: 'dance',
    label: 'Bihu & Folk Arts',
    shortLabel: 'Dance',
    icon: Activity,
    accentColor: '#BE123C', // rose-700
    description: 'Rhythmic Rongali Bihu steps, Pepa horns, and classical Sattriya dance',
    categories: ['dance']
  },
  {
    id: 'forts_arch',
    label: 'Ahom Monuments',
    shortLabel: 'Monuments',
    icon: Shield,
    accentColor: '#9A3412', // orange-800
    description: 'Rang Ghar royal amphitheaters, Kareng Ghar palaces, and Sivasagar masonry',
    categories: ['architecture', 'forts', 'monuments']
  },
  {
    id: 'food',
    label: 'Assamese Gastronomy',
    shortLabel: 'Food',
    icon: UtensilsCrossed,
    accentColor: '#C2410C', // orange-700
    description: 'Masor Tenga sour broths, aromatic Joha rice, and Khar delicacies',
    categories: ['food']
  },
  {
    id: 'spiritual',
    label: 'Vaishnavite Satras',
    shortLabel: 'Satras',
    icon: Landmark,
    accentColor: '#4338CA', // indigo-700
    description: 'Majuli monastic hermitages, Namghars, and Kamakhya Shakti shrine',
    categories: ['temples', 'culture']
  },
  {
    id: 'tribal',
    label: 'Tribal Traditions',
    shortLabel: 'Tribal',
    icon: Trees,
    accentColor: '#0F766E', // teal-700
    description: 'Bodo, Mishing, Karbi, and Dimasa weaving and agricultural lore',
    categories: ['tribal', 'culture']
  }
];

// Clean and pleasing district name formatter
export const formatDistrictName = (name: string): string => {
  if (!name) return '';
  const clean = name.replace(/_c$/i, '').replace(/ district/i, '').replace(/,.*$/i, '').trim();
  if (clean.toLowerCase() === 'sibsagar') return 'Sivasagar';
  if (clean.toLowerCase() === 'dhuburi') return 'Dhubri';
  if (clean.toLowerCase() === 'marigaon') return 'Morigaon';
  if (clean.toLowerCase() === 'north cachar hills') return 'Dima Hasao';
  return clean;
};

// Data-driven geographic centers for Assam's primary cultural regions
export const ASSAM_REGION_CENTROIDS: Record<string, { name: string; shortLabel: string; lng: number; lat: number }> = {
  lower_assam: {
    name: 'LOWER ASSAM',
    shortLabel: 'Lower Assam',
    lng: 90.80,
    lat: 26.20
  },
  brahmaputra_valley: {
    name: 'BRAHMAPUTRA VALLEY',
    shortLabel: 'Brahmaputra Valley',
    lng: 93.20,
    lat: 26.65
  },
  majuli: {
    name: 'MAJULI ISLAND',
    shortLabel: 'Majuli',
    lng: 94.22,
    lat: 27.05
  },
  barak_valley: {
    name: 'BARAK VALLEY & HILLS',
    shortLabel: 'Barak Valley',
    lng: 92.75,
    lat: 24.80
  }
};

export interface AssamAtlasMapProps {
  items: CulturalItem[];
  selectedId?: string;
  onSelect?: (item: CulturalItem | null) => void;
  activeSubRegion?: string;
  onSubRegionChange?: (regionId: string) => void;
  className?: string;
}

interface ClusteredMarker {
  id: string;
  x: number;
  y: number;
  items: CulturalItem[];
  isCluster: boolean;
  primaryCategory: CulturalCategoryId;
  accentColor: string;
}

export const AssamAtlasMap: React.FC<AssamAtlasMapProps> = ({
  items,
  selectedId,
  onSelect,
  activeSubRegion = 'all',
  onSubRegionChange,
  className = ''
}) => {
  const [activeCategory, setActiveCategory] = useState<MapFilterCategory>('all');
  const [hoveredMarker, setHoveredMarker] = useState<ClusteredMarker | null>(null);
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [clusterPopover, setClusterPopover] = useState<ClusteredMarker | null>(null);
  const [internalSelectedItem, setInternalSelectedItem] = useState<CulturalItem | null>(null);

  // Zoom & Pan state
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Natural Geographic Dimensions (1.44:1 aspect ratio matching Assam's bounds)
  const MAP_WIDTH = 750;
  const MAP_HEIGHT = 500;

  // D3 Projection fitted precisely to authoritative Assam district boundary collection
  const { projection, pathGenerator } = useMemo(() => {
    const proj = geoMercator();
    proj.fitExtent([[35, 20], [MAP_WIDTH - 35, MAP_HEIGHT - 20]], assamOfficialDistricts as any);
    return {
      projection: proj,
      pathGenerator: geoPath(proj)
    };
  }, []);

  // Sync internal selected item with prop if provided
  React.useEffect(() => {
    if (selectedId) {
      const found = items.find(i => i.id === selectedId || i.slug === selectedId);
      if (found) {
        setInternalSelectedItem(found);
      }
    } else {
      setInternalSelectedItem(null);
    }
  }, [selectedId, items]);

  // Filter items by active category
  const categoryFilteredItems = useMemo(() => {
    const catConfig = ASSAM_MAP_CATEGORIES.find(c => c.id === activeCategory);
    if (!catConfig || catConfig.id === 'all') {
      return items;
    }
    return items.filter(item => catConfig.categories.includes(item.category));
  }, [items, activeCategory]);

  // Filter items by active subregion / district if set
  const regionFilteredItems = useMemo(() => {
    if (!activeSubRegion || activeSubRegion === 'all') {
      return categoryFilteredItems;
    }
    return categoryFilteredItems.filter(item => {
      const dist = (item.location.district || '').toLowerCase();
      const tags = (item.tags || []).map(t => t.toLowerCase());
      const query = activeSubRegion.toLowerCase();
      return dist.includes(query) || tags.some(t => t.includes(query));
    });
  }, [categoryFilteredItems, activeSubRegion]);

  // Color helper for categories
  const getCategoryColor = useCallback((category: CulturalCategoryId): string => {
    switch (category) {
      case 'forts':
      case 'architecture': return '#9A3412'; // orange-800
      case 'food': return '#C2410C'; // orange-700
      case 'dance': return '#BE123C'; // rose-700
      case 'music': return '#7E22CE'; // purple-700
      case 'fashion':
      case 'crafts': return '#D97706'; // amber-600
      case 'temples': return '#4338CA'; // indigo-700
      case 'tribal': return '#0F766E'; // teal-700
      default: return '#B45309';
    }
  }, []);

  // Proximity Clustering & Geographic Marker Positioning
  const markers = useMemo<ClusteredMarker[]>(() => {
    const positioned: { item: CulturalItem; x: number; y: number }[] = [];

    regionFilteredItems.forEach(item => {
      const coords = item.location.coordinates;
      if (!coords || typeof coords.lng !== 'number' || typeof coords.lat !== 'number') return;
      const pos = projection([coords.lng, coords.lat]);
      if (pos) {
        positioned.push({ item, x: pos[0], y: pos[1] });
      }
    });

    const CLUSTER_THRESHOLD = 26 / zoomLevel;
    const clusters: ClusteredMarker[] = [];
    const visited = new Set<string>();

    positioned.forEach((current, i) => {
      if (visited.has(current.item.id)) return;

      const group: { item: CulturalItem; x: number; y: number }[] = [current];
      visited.add(current.item.id);

      for (let j = i + 1; j < positioned.length; j++) {
        const other = positioned[j];
        if (visited.has(other.item.id)) continue;

        const dx = current.x - other.x;
        const dy = current.y - other.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CLUSTER_THRESHOLD) {
          group.push(other);
          visited.add(other.item.id);
        }
      }

      const avgX = group.reduce((acc, g) => acc + g.x, 0) / group.length;
      const avgY = group.reduce((acc, g) => acc + g.y, 0) / group.length;
      const groupItems = group.map(g => g.item);
      const isCluster = groupItems.length > 1;
      const primaryCategory = groupItems[0].category;

      clusters.push({
        id: isCluster ? `cluster-${groupItems.map(g => g.id).join('-')}` : groupItems[0].id,
        x: avgX,
        y: avgY,
        items: groupItems,
        isCluster,
        primaryCategory,
        accentColor: getCategoryColor(primaryCategory)
      });
    });

    return clusters;
  }, [regionFilteredItems, projection, zoomLevel, getCategoryColor]);

  // Projected Regional Labels
  const projectedRegions = useMemo(() => {
    return Object.entries(ASSAM_REGION_CENTROIDS).map(([id, reg]) => {
      const pos = projection([reg.lng, reg.lat]);
      return {
        id,
        name: reg.name,
        shortLabel: reg.shortLabel,
        x: pos ? pos[0] : 0,
        y: pos ? pos[1] : 0
      };
    });
  }, [projection]);

  // Dynamic Geographic Scale Calculation (calibrated at 26.2°N latitude across Assam)
  const scaleInfo = useMemo(() => {
    const kmPerPixel = 0.94 / zoomLevel;
    
    let distanceKm = 100;
    if (zoomLevel >= 2.7) {
      distanceKm = 25;
    } else if (zoomLevel >= 1.6) {
      distanceKm = 50;
    } else {
      distanceKm = 100;
    }
    
    const barWidthPx = Math.round(distanceKm / kmPerPixel);
    return {
      distanceKm,
      barWidthPx: Math.min(Math.max(barWidthPx, 45), 130),
      label: `${distanceKm} km`
    };
  }, [zoomLevel]);

  // Zoom handlers
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.35, 3.5));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => {
      const next = Math.max(prev - 0.35, 1);
      if (next === 1) {
        setPanOffset({ x: 0, y: 0 });
      }
      return next;
    });
  };

  const handleResetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setHoveredMarker(null);
    setClusterPopover(null);
    if (onSubRegionChange) onSubRegionChange('all');
  };

  // Pan / Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragStartRef.current.x;
      const newY = e.clientY - dragStartRef.current.y;
      const maxPan = (zoomLevel - 1) * 240;
      setPanOffset({
        x: Math.max(-maxPan, Math.min(maxPan, newX)),
        y: Math.max(-maxPan, Math.min(maxPan, newY))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Marker Interaction handlers
  const handleMarkerClick = (marker: ClusteredMarker, e: React.MouseEvent) => {
    e.stopPropagation();
    if (marker.isCluster) {
      setClusterPopover(marker);
    } else {
      const item = marker.items[0];
      setInternalSelectedItem(item);
      if (onSelect) onSelect(item);
      setClusterPopover(null);
    }
  };

  const handleItemSelectFromCluster = (item: CulturalItem) => {
    setInternalSelectedItem(item);
    if (onSelect) onSelect(item);
    setClusterPopover(null);
  };

  const handleMarkerHover = (marker: ClusteredMarker, e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setTooltipPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
    setHoveredMarker(marker);
  };

  const handleCloseDetail = () => {
    setInternalSelectedItem(null);
    if (onSelect) onSelect(null);
  };

  const handleCanvasClick = () => {
    setClusterPopover(null);
  };

  return (
    <div className={`assam-atlas-container relative bg-parchment-50 rounded-3xl border border-parchment-300/80 shadow-heritage-md overflow-hidden select-none ${className}`}>
      
      {/* 1. TOP CONTROL & STATUS HEADER */}
      <div className="atlas-header px-4 sm:px-6 py-2.5 bg-white/90 backdrop-blur-md border-b border-parchment-200 flex flex-wrap items-center justify-between gap-2.5 z-30 relative">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-category-temples/10 text-category-temples shrink-0">
            <Compass className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-sm sm:text-base font-bold text-parchment-950 leading-tight">
                Assam Spatial Atlas
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300/60 hidden sm:inline-block">
                Census GIS District Geography
              </span>
            </div>
            <p className="text-[11px] text-parchment-500 hidden sm:block">
              Brahmaputra basin boundaries, Ahom royal monuments & verified heritage coordinates.
            </p>
          </div>
        </div>

        {/* Active Pin Count & Live District Inspector Badge */}
        <div className="flex items-center gap-2">
          {hoveredDistrict && (
            <span className="text-xs sm:text-sm font-serif font-bold text-parchment-950 px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-amber-300/90 shadow-heritage-xs animate-fadeIn flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-category-temples shrink-0" />
              <span className="tracking-wide">{formatDistrictName(hoveredDistrict)}</span>
            </span>
          )}
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-parchment-100 text-parchment-800 border border-parchment-300">
            {markers.reduce((sum, m) => sum + m.items.length, 0)} Landmarks Visible
          </span>
          {zoomLevel > 1 && (
            <button
              onClick={handleResetView}
              className="text-xs px-2.5 py-1 rounded-lg bg-amber-50 text-category-temples border border-amber-200 hover:bg-amber-100 transition-colors flex items-center gap-1 font-semibold"
              title="Reset Zoom & Pan (North Up)"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. CULTURAL CATEGORY LAYER STRIP */}
      <div className="category-filter-rail px-4 sm:px-6 py-2 bg-parchment-100/60 border-b border-parchment-200/80 overflow-x-auto no-scrollbar flex items-center gap-1.5 z-20 relative">
        <span className="text-[11px] font-bold uppercase tracking-wider text-parchment-500 mr-1 shrink-0 flex items-center gap-1">
          <Layers className="w-3.5 h-3.5 text-category-temples" />
          <span className="hidden md:inline">Layer:</span>
        </span>
        {ASSAM_MAP_CATEGORIES.map(cat => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setClusterPopover(null);
              }}
              className={`text-xs px-3 py-1.5 rounded-full font-medium shrink-0 flex items-center gap-1.5 transition-all duration-200 border ${
                isActive
                  ? 'bg-parchment-950 text-white border-parchment-950 shadow-xs font-semibold scale-[1.02]'
                  : 'bg-white text-parchment-700 border-parchment-300 hover:border-parchment-400 hover:bg-parchment-50'
              }`}
              style={isActive ? { backgroundColor: cat.accentColor, borderColor: cat.accentColor } : undefined}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. MAIN GEOGRAPHIC MAP CANVAS STAGE */}
      <div
        ref={containerRef}
        className={`map-canvas-stage relative w-full h-[400px] sm:h-[460px] md:h-[500px] lg:h-[540px] bg-gradient-to-b from-[#FAF6F0] via-[#F4ECE1] to-[#EFE4D4] overflow-hidden ${
          zoomLevel > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleCanvasClick}
      >
        {/* Subtle Map Coordinate Dot-Grid Texture */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#92400e_0.75px,transparent_0.75px)] [background-size:24px_24px]" />

        {/* SVG Projection Canvas with True Natural Geographic Proportions */}
        <svg
          ref={svgRef}
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          className="w-full h-full select-none"
          role="img"
          aria-label="Authoritative Assam Cultural Atlas Map with real administrative districts"
        >
          <defs>
            {/* Rich Topographic Landmass Gradient */}
            <radialGradient id="assamLandGrad" cx="50%" cy="45%" r="65%">
              <stop offset="0%" stopColor="var(--map-land-start, #FFFDF9)" stopOpacity="1" />
              <stop offset="55%" stopColor="var(--map-land-mid, #F9F1E2)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--map-land-end, #EADBC3)" stopOpacity="1" />
            </radialGradient>

            {/* Glowing Drop Shadows */}
            <filter id="mapShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="5" stdDeviation="10" floodColor="var(--map-land-stroke, #78350F)" floodOpacity="0.25" />
            </filter>
            <filter id="markerGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.25" />
            </filter>
            <filter id="activeMarkerGlow" x="-60%" y="-60%" width="220%" height="220%">
              <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#D97706" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* Transform group for smooth Zoom & Pan */}
          <g
            transform={`translate(${panOffset.x}, ${panOffset.y}) scale(${zoomLevel})`}
            style={{ transformOrigin: 'center center', transition: isDragging ? 'none' : 'transform 0.25s ease-out' }}
          >
            {/* 1. Base Assam State Landmass Polygon with Elevation Shadow */}
            <path
              d={pathGenerator(assamGeoData as any) || ''}
              fill="url(#assamLandGrad)"
              stroke="#78350F"
              strokeWidth="2.6"
              strokeLinejoin="round"
              strokeLinecap="round"
              filter="url(#mapShadow)"
              className="transition-all duration-300"
            />

            {/* 2. Official District Polygons */}
            <g className="district-polygons">
              {assamOfficialDistricts.features.map((feature: any, index: number) => {
                const rawDistrictName = feature.properties.district || feature.properties.NAME_2 || `District ${index}`;
                const formattedName = formatDistrictName(rawDistrictName);
                const isHovered = hoveredDistrict === rawDistrictName;

                return (
                  <path
                    key={feature.properties.ID_2 || rawDistrictName || index}
                    d={pathGenerator(feature) || ''}
                    fill={isHovered ? '#FEF3C7' : 'transparent'}
                    fillOpacity={isHovered ? 0.35 : 0}
                    stroke={isHovered ? '#B45309' : '#854D0E'}
                    strokeWidth={isHovered ? 1.2 : 0.75}
                    strokeOpacity={isHovered ? 0.8 : 0.28}
                    strokeDasharray={isHovered ? undefined : '2,2'}
                    className="transition-colors duration-150 cursor-pointer"
                    onMouseEnter={() => setHoveredDistrict(rawDistrictName)}
                    onMouseLeave={() => setHoveredDistrict(null)}
                    onClick={() => {
                      if (onSubRegionChange) onSubRegionChange(rawDistrictName);
                    }}
                  >
                    <title>{formattedName}</title>
                  </path>
                );
              })}
            </g>

            {/* 3. Outer State Boundary Perimeter Reinforcement */}
            <path
              d={pathGenerator(assamGeoData as any) || ''}
              fill="none"
              stroke="#78350F"
              strokeWidth="2.6"
              strokeLinejoin="round"
              strokeLinecap="round"
              className="pointer-events-none"
            />

            {/* 4. Data-Driven Cultural Regional Centroid Overlays (Subtle, non-intrusive annotations) */}
            <g className={`geographic-zones pointer-events-none select-none font-serif font-bold text-[#78350F] transition-opacity duration-300 ${zoomLevel > 2.2 ? 'opacity-15' : 'opacity-30'}`}>
              {projectedRegions.map(reg => (
                <text
                  key={reg.id}
                  x={reg.x}
                  y={reg.y}
                  textAnchor="middle"
                  className={reg.id === 'majuli' ? 'text-[10px] tracking-wider' : 'text-[12px] sm:text-[13px] tracking-widest'}
                >
                  {reg.name}
                </text>
              ))}
            </g>

            {/* 5. INTERACTIVE CULTURAL MARKERS LAYER (Visual Hierarchy) */}
            {markers.map(marker => {
              const isSelected = internalSelectedItem && marker.items.some(i => i.id === internalSelectedItem.id);
              const isHovered = hoveredMarker?.id === marker.id;

              return (
                <g
                  key={marker.id}
                  transform={`translate(${marker.x}, ${marker.y})`}
                  className="cursor-pointer group"
                  onClick={(e) => handleMarkerClick(marker, e)}
                  onMouseEnter={(e) => handleMarkerHover(marker, e)}
                  onMouseLeave={() => setHoveredMarker(null)}
                  role="button"
                  tabIndex={0}
                  aria-label={marker.isCluster ? `${marker.items.length} cultural landmarks` : marker.items[0].title}
                >
                  {/* Active Pin Sonar Pulse Rings */}
                  {isSelected && (
                    <>
                      <circle
                        r="20"
                        className="fill-category-temples/20 stroke-category-temples animate-ping"
                        strokeWidth="1.5"
                      />
                      <circle
                        r="26"
                        className="fill-transparent stroke-category-temples/40 stroke-dashed"
                        strokeWidth="1"
                        strokeDasharray="3,3"
                      />
                    </>
                  )}

                  {/* Hierarchical Pin Structure */}
                  {marker.isCluster ? (
                    <g filter="url(#markerGlow)">
                      <circle
                        r={isHovered || isSelected ? '16' : '13.5'}
                        fill="#FEF3C7"
                        stroke="#92400E"
                        strokeWidth="2.2"
                        className="transition-all duration-200"
                      />
                      <circle
                        r={isHovered || isSelected ? '11.5' : '9.5'}
                        fill="#78350F"
                        className="transition-all duration-200"
                      />
                      <text
                        textAnchor="middle"
                        dy="3.5"
                        fill="#FFFFFF"
                        className="text-[10px] font-sans font-black select-none pointer-events-none"
                      >
                        {marker.items.length}
                      </text>
                    </g>
                  ) : (
                    <g filter={isSelected ? 'url(#activeMarkerGlow)' : 'url(#markerGlow)'}>
                      <circle
                        r={isHovered || isSelected ? '13' : '10'}
                        fill={isSelected ? '#FEF3C7' : '#FFFFFF'}
                        stroke={marker.accentColor}
                        strokeWidth={isSelected ? '2.8' : '2.0'}
                        className="transition-all duration-200 group-hover:scale-110"
                      />
                      <circle
                        r={isHovered || isSelected ? '5.5' : '4.2'}
                        fill={marker.accentColor}
                        className="transition-all duration-200"
                      />
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        </svg>

        {/* 4. FLOATING MAP NAVIGATION CONTROLS */}
        <div className="absolute top-3 right-3 z-20 flex flex-col gap-1 bg-white/95 backdrop-blur-md p-1 rounded-2xl border border-parchment-300 shadow-heritage-md">
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-xl text-parchment-800 hover:bg-parchment-100 hover:text-category-temples transition-colors"
            title="Zoom In (+)"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <div className="h-px bg-parchment-200 mx-1" />
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-xl text-parchment-800 hover:bg-parchment-100 hover:text-category-temples transition-colors"
            title="Zoom Out (-)"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <div className="h-px bg-parchment-200 mx-1" />
          <button
            onClick={handleResetView}
            className="p-2 rounded-xl text-parchment-800 hover:bg-parchment-100 hover:text-category-temples transition-colors"
            title="Reset Map View (North Up)"
            aria-label="Reset View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* 5. PERFECTLY ALIGNED NORTH & SCALE CONTROL */}
        <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2.5 text-parchment-700 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-parchment-300/80 shadow-heritage-xs">
          <button
            onClick={handleResetView}
            className="flex items-center gap-1 group cursor-pointer hover:text-category-temples transition-colors"
            title="Reset to True North"
            aria-label="Reset to True North"
          >
            <Compass className="w-3.5 h-3.5 text-category-temples group-hover:rotate-45 transition-transform duration-300" />
            <span className="text-[10px] font-serif font-bold text-parchment-900 group-hover:text-category-temples">N</span>
          </button>

          <div className="h-3 w-px bg-parchment-300" />

          <div className="flex items-center gap-1.5">
            <div 
              style={{ width: `${scaleInfo.barWidthPx}px` }} 
              className="h-1 bg-parchment-900 rounded-full border border-white/60 transition-all duration-300 relative"
            >
              <div className="absolute left-0 top-[-2px] w-0.5 h-2 bg-parchment-900" />
              <div className="absolute right-0 top-[-2px] w-0.5 h-2 bg-parchment-900" />
            </div>
            <span className="text-[10px] font-mono font-semibold text-parchment-800 leading-none">
              {scaleInfo.label}
            </span>
          </div>
        </div>

        {/* 6. HOVER TOOLTIP */}
        <AnimatePresence>
          {hoveredMarker && !clusterPopover && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 4 }}
              transition={{ duration: 0.12 }}
              style={{
                left: Math.min(Math.max(tooltipPos.x, 140), MAP_WIDTH - 160),
                top: Math.max(tooltipPos.y - 12, 40)
              }}
              className="absolute z-40 -translate-x-1/2 -translate-y-full pointer-events-none max-w-[calc(100vw-32px)] w-64 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-parchment-300 shadow-heritage-lg text-left"
            >
              {hoveredMarker.isCluster ? (
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                      Cluster ({hoveredMarker.items.length} Landmarks)
                    </span>
                    <span className="text-[10px] text-parchment-500 font-serif font-bold">
                      {formatDistrictName(hoveredMarker.items[0].location.district)}
                    </span>
                  </div>
                  <h4 className="font-serif text-sm font-bold text-parchment-950 mt-1">
                    {hoveredMarker.items.map(i => i.title.split('—')[0]).join(', ')}
                  </h4>
                  <p className="text-[11px] text-parchment-600">
                    Click cluster beacon to inspect individual heritage records.
                  </p>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-1">
                    <span 
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: hoveredMarker.accentColor }}
                    >
                      {hoveredMarker.items[0].category}
                    </span>
                    <span className="text-[10px] text-parchment-700 font-serif font-bold tracking-wide">
                      {formatDistrictName(hoveredMarker.items[0].location.district)}
                    </span>
                  </div>
                  <h4 className="font-serif text-sm font-bold text-parchment-950 leading-tight">
                    {hoveredMarker.items[0].title}
                  </h4>
                  {hoveredMarker.items[0].hindiTitle && (
                    <div className="text-[11px] font-serif text-category-temples">
                      {hoveredMarker.items[0].hindiTitle}
                    </div>
                  )}
                  <p className="text-[11px] text-parchment-600 line-clamp-2 leading-relaxed">
                    {hoveredMarker.items[0].shortDescription}
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 7. CLUSTER SELECTION POPOVER */}
        <AnimatePresence>
          {clusterPopover && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-parchment-300 shadow-heritage-lg max-w-[calc(100vw-32px)] sm:max-w-sm w-full space-y-3"
            >
              <div className="flex items-center justify-between border-b border-parchment-200 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center">
                    {clusterPopover.items.length}
                  </span>
                  <span className="font-serif font-bold text-sm text-parchment-950">
                    {formatDistrictName(clusterPopover.items[0].location.district) || 'Regional Heritage'}
                  </span>
                </div>
                <button
                  onClick={() => setClusterPopover(null)}
                  className="p-1 rounded-lg text-parchment-400 hover:text-parchment-800 hover:bg-parchment-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {clusterPopover.items.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleItemSelectFromCluster(item)}
                    className="w-full text-left p-2.5 rounded-2xl border border-parchment-200 hover:border-category-temples hover:bg-amber-50/50 transition-all flex items-center gap-3 group"
                  >
                    <img 
                      src={item.primaryImage} 
                      alt={item.title} 
                      className="w-12 h-12 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-category-temples block">
                        {item.category}
                      </span>
                      <h4 className="font-serif font-bold text-xs text-parchment-950 truncate group-hover:text-category-temples">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-parchment-500 truncate">
                        {item.location.name}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-parchment-400 group-hover:text-category-temples shrink-0" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 8. FLOATING DETAILED INFORMATION CARD OVERLAY ON CLICK */}
        <AnimatePresence>
          {internalSelectedItem && (
            <motion.div
              initial={{ opacity: 0, x: 20, y: 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 20, y: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="absolute z-40 top-3 bottom-3 right-3 sm:right-4 left-3 sm:left-auto max-w-[calc(100vw-24px)] sm:max-w-md w-full bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-5 border border-parchment-300 shadow-heritage-lg flex flex-col justify-between overflow-y-auto"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-100 text-amber-950 border border-amber-300">
                    {internalSelectedItem.category}
                  </span>
                  <button
                    onClick={handleCloseDetail}
                    className="p-1.5 rounded-full bg-parchment-100 text-parchment-600 hover:text-parchment-950 hover:bg-parchment-200 transition-colors"
                    aria-label="Close landmark inspection"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-parchment-100 shadow-xs">
                  <img
                    src={internalSelectedItem.primaryImage}
                    alt={internalSelectedItem.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-2.5 left-3 text-white flex items-center gap-1.5 text-xs font-medium">
                    <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                    <span className="truncate">{internalSelectedItem.location.name} · {formatDistrictName(internalSelectedItem.location.district)}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-parchment-950 leading-tight">
                    {internalSelectedItem.title}
                  </h3>
                  {internalSelectedItem.hindiTitle && (
                    <div className="text-xs font-serif text-category-temples mt-0.5">
                      {internalSelectedItem.hindiTitle}
                    </div>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-parchment-700 leading-relaxed">
                  {internalSelectedItem.shortDescription}
                </p>

                {internalSelectedItem.culturalSignificance && (
                  <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-amber-900 tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-category-temples" />
                      <span>Cultural Significance</span>
                    </span>
                    <p className="text-xs text-amber-950/90 leading-relaxed italic">
                      "{internalSelectedItem.culturalSignificance}"
                    </p>
                  </div>
                )}

                {internalSelectedItem.tags && internalSelectedItem.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {internalSelectedItem.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-parchment-100 text-parchment-700">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3 mt-2 border-t border-parchment-200">
                <Link
                  to={`/item/${internalSelectedItem.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-category-temples hover:bg-amber-800 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm"
                >
                  <span>Explore Full Cultural Story & Star Graph</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 9. BOTTOM REGION QUICK SWITCHER BAR & PIN HIERARCHY HINT */}
      <div className="atlas-footer px-4 sm:px-6 py-2.5 bg-white/90 backdrop-blur-md border-t border-parchment-200 flex flex-wrap items-center justify-between gap-2 text-xs z-20 relative">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-bold uppercase tracking-wider text-parchment-500 shrink-0">
            Divisions:
          </span>
          {[
            { id: 'all', label: 'All Regions' },
            { id: 'brahmaputra-valley', label: 'Brahmaputra Valley' },
            { id: 'majuli-island', label: 'Majuli Island' },
            { id: 'barak-valley', label: 'Barak Valley' }
          ].map(div => (
            <button
              key={div.id}
              onClick={() => {
                if (onSubRegionChange) onSubRegionChange(div.id);
              }}
              className={`px-2.5 py-1 rounded-lg font-medium shrink-0 transition-all ${
                activeSubRegion === div.id
                  ? 'bg-parchment-900 text-white font-bold'
                  : 'text-parchment-600 hover:text-parchment-950 hover:bg-parchment-100'
              }`}
            >
              {div.label}
            </button>
          ))}
        </div>

        {/* Pin Hierarchy Legend */}
        <div className="text-[11px] text-parchment-500 hidden lg:flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full border border-amber-700 bg-white inline-block" />
            <span>Single Landmark</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-amber-900 text-white text-[8px] font-bold flex items-center justify-center">2+</span>
            <span>Cluster</span>
          </span>
          <span className="text-parchment-300">|</span>
          <span>Click pins for verified narratives</span>
        </div>
      </div>
    </div>
  );
};
