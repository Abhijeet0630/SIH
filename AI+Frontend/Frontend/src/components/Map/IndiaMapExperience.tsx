import React, { useEffect, useMemo, useState } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, 
  RotateCcw,
  Navigation,
  ArrowRight,
  Sparkles,
  Loader2,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CloudTransition } from '../Transitions/CloudTransition';
import { getStateById } from '../../data/states';
import { getCulturalItemsByState } from '../../data/culturalItems';

const GEO_URL = 'https://raw.githubusercontent.com/AbhinavSwami28/india-official-geojson/main/india-states-simplified.geojson';

const norm = (v: string) => v.toLowerCase().replace(/[^a-z]/g, '');

const featureName = (f: any) => String(
  f.properties?.st_nm || 
  f.properties?.ST_NM || 
  f.properties?.name || 
  f.properties?.NAME_1 || 
  f.properties?.state || 
  f.properties?.State || 
  ''
);

// Distinct heritage colors exclusively for active interactive exploration hubs
export const getActiveStateColor = (stateId: string): string | null => {
  if (stateId === 'maharashtra') return '#D97706'; // Rich Saffron Amber
  if (stateId === 'assam') return '#059669'; // Tea Garden Emerald
  if (stateId === 'meghalaya') return '#0891B2'; // Cloud Cyan Teal
  return null;
};

// Supported interactive state route mappings
const STATE_ROUTES: Record<string, string> = {
  maharashtra: '/state/maharashtra',
  assam: '/state/assam',
  meghalaya: '/state/meghalaya'
};

export const IndiaMapExperience: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [transitioningState, setTransitioningState] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    fetch(GEO_URL)
      .then(r => r.json())
      .then(json => {
        if (isMounted) {
          setData(json);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setData({ features: [] });
          setLoading(false);
        }
      });
    return () => { isMounted = false; };
  }, []);

  // Compute projection dynamically using fitExtent on GeoJSON features
  // ViewBox: 940 x 900 -> Tightly bounds India mainland and Northeast with zero distortion
  const { projection, path } = useMemo(() => {
    if (!data || !data.features || data.features.length === 0) {
      const p = geoMercator().center([82.8, 22.5]).scale(1120).translate([470, 450]);
      return { projection: p, path: geoPath(p) };
    }
    const p = geoMercator().fitExtent(
      [[15, 15], [925, 885]],
      data
    );
    return { projection: p, path: geoPath(p) };
  }, [data]);

  // Map state name to stateId in our repository
  const resolveStateId = (name: string): string => {
    const n = norm(name);
    if (n.includes('maharashtra')) return 'maharashtra';
    if (n.includes('assam')) return 'assam';
    if (n.includes('meghalaya')) return 'meghalaya';
    if (n.includes('rajasthan')) return 'rajasthan';
    if (n.includes('kerala')) return 'kerala';
    if (n.includes('bengal')) return 'west-bengal';
    if (n.includes('tamil')) return 'tamil-nadu';
    if (n.includes('gujarat')) return 'gujarat';
    return '';
  };

  const handleStateClick = (name: string) => {
    setSelectedState(name);
    const stateId = resolveStateId(name);
    
    if (stateId && STATE_ROUTES[stateId]) {
      const stateObj = getStateById(stateId);
      const displayName = stateObj?.name || name;
      setTransitioningState(displayName);
      setTimeout(() => {
        navigate(STATE_ROUTES[stateId]);
      }, 650);
    }
  };

  // Active state data (either hovered or currently selected)
  const activeFocusName = hoveredState || selectedState;
  const activeStateData = useMemo(() => {
    if (!activeFocusName) return null;
    const stateId = resolveStateId(activeFocusName);
    const stateObj = stateId ? getStateById(stateId) : null;
    const items = stateId ? getCulturalItemsByState(stateId) : [];
    
    return {
      rawName: activeFocusName,
      stateId,
      stateObj,
      itemCount: items.length,
      isFullyModeled: ['maharashtra', 'assam', 'meghalaya'].includes(stateId)
    };
  }, [activeFocusName]);

  return (
    <div className="w-full relative select-none" aria-label="Interactive Cultural Atlas of India">
      <CloudTransition active={!!transitioningState} stateName={transitioningState || 'India'} />

      {/* Main 70/30 Asymmetric Desktop Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-stretch">
        
        {/* ============================================================ */}
        {/* LEFT COLUMN: NATURAL EXPLORATION NARRATIVE (25–30% WIDTH)     */}
        {/* ============================================================ */}
        <div className="lg:col-span-4 xl:col-span-3 flex flex-col justify-between space-y-5 max-w-full lg:max-w-[420px]">
          
          {/* Section Kicker & Heading */}
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/90 border border-amber-300/80 text-amber-950 text-[11px] font-bold uppercase tracking-wider shadow-heritage-xs w-fit">
              <Compass className="w-3.5 h-3.5 text-category-temples shrink-0" />
              <span>India, Unfolded</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl xl:text-[2.2rem] font-bold text-parchment-950 leading-[1.15] tracking-tight">
              Every State <br />
              <em className="font-normal italic text-category-temples">Tells a Story.</em>
            </h2>

            <p className="text-xs sm:text-sm text-parchment-700 font-sans leading-relaxed">
              A living landscape of traditions, languages, crafts, architecture, and folklore—connected across the subcontinent, yet distinct in every region.
            </p>
          </div>

          {/* Contextual Information Panel (Updates on user interaction) */}
          <div className="p-4 sm:p-5 bg-white/90 backdrop-blur-md border border-parchment-200/90 rounded-2xl shadow-heritage-xs space-y-3.5 transition-all">
            <AnimatePresence mode="wait">
              {activeStateData ? (
                <motion.div
                  key={activeStateData.rawName}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-3"
                >
                  <div className="border-b border-parchment-200/80 pb-2.5 flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-category-temples block">
                        {activeStateData.stateObj?.region ? `${activeStateData.stateObj.region} India` : 'Indian Territory'}
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-parchment-950 mt-0.5">
                        {activeStateData.stateObj?.name || activeStateData.rawName}
                      </h3>
                      {activeStateData.stateObj?.nativeName && (
                        <span className="text-xs text-category-temples font-serif">
                          {activeStateData.stateObj.nativeName}
                        </span>
                      )}
                    </div>

                    {activeStateData.isFullyModeled ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-950 border border-amber-300 shrink-0">
                        Interactive Hub
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-parchment-100 text-parchment-700 border border-parchment-300 shrink-0">
                        <Clock className="w-3 h-3 text-parchment-500" />
                        <span>In Curation</span>
                      </span>
                    )}
                  </div>

                  {activeStateData.stateObj?.culturalIdentity ? (
                    <p className="text-xs text-parchment-700 font-serif italic leading-relaxed">
                      "{activeStateData.stateObj.culturalIdentity}"
                    </p>
                  ) : (
                    <p className="text-xs text-parchment-600 leading-relaxed">
                      Explore the architectural landmarks, oral histories, and living folk traditions of {activeStateData.rawName}.
                    </p>
                  )}

                  {activeStateData.stateObj?.shortDescription && (
                    <p className="text-[11px] text-parchment-600 leading-relaxed line-clamp-3">
                      {activeStateData.stateObj.shortDescription}
                    </p>
                  )}

                  <div className="pt-2 border-t border-parchment-100 flex items-center justify-between">
                    <span className="text-[11px] text-parchment-500 font-medium">
                      {activeStateData.itemCount > 0 ? `${activeStateData.itemCount} Cultural Records` : 'Archival Territory'}
                    </span>

                    {activeStateData.stateId && STATE_ROUTES[activeStateData.stateId] ? (
                      <button
                        onClick={() => handleStateClick(activeStateData.rawName)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-category-temples hover:bg-amber-800 text-white text-xs font-semibold transition-all shadow-xs"
                      >
                        <span>Explore {activeStateData.stateObj?.name || activeStateData.rawName}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <span className="text-[11px] text-parchment-500 italic">Coming soon</span>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2 text-category-temples">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider text-parchment-800">
                      Discover by Geography
                    </span>
                  </div>

                  <p className="text-xs text-parchment-600 leading-relaxed">
                    Click any state shape on the map to enter its dedicated living cultural atlas. Explore rock temples, handlooms, festivals, and oral folklore.
                  </p>

                  <div className="pt-2 border-t border-parchment-100 space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-parchment-500 tracking-wider block">
                      Active In-Depth Atlases:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { id: 'maharashtra', name: 'Maharashtra', color: '#D97706' },
                        { id: 'assam', name: 'Assam', color: '#059669' },
                        { id: 'meghalaya', name: 'Meghalaya', color: '#0891B2' }
                      ].map(s => (
                        <button
                          key={s.id}
                          onClick={() => handleStateClick(s.name)}
                          onMouseEnter={() => setHoveredState(s.name)}
                          onMouseLeave={() => setHoveredState(null)}
                          className="text-xs px-2.5 py-1 rounded-lg bg-parchment-100 hover:bg-amber-100 border border-parchment-300/80 text-parchment-800 font-medium transition-colors flex items-center gap-1.5"
                        >
                          <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: s.color }} />
                          <span>{s.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Minimal Cultural Cartography Note */}
          <div className="pt-2 border-t border-parchment-200/70 flex items-center justify-between text-[11px] text-parchment-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-category-temples inline-block" />
              <span>Interactive Cultural Atlas</span>
            </span>
            <span>Survey of India Projection</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* RIGHT COLUMN: DOMINANT INTERACTIVE INDIA MAP (70–75% WIDTH)  */}
        {/* ============================================================ */}
        <div className="lg:col-span-8 xl:col-span-9 w-full">
          <div className="india-canvas-wrapper relative w-full h-[460px] sm:h-[540px] md:h-[620px] lg:h-[76vh] xl:h-[82vh] min-h-[440px] max-h-[880px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#FAF7F2] via-[#F4EDE4] to-[#EAE1D4] border border-parchment-300/80 shadow-heritage-lg flex items-center justify-center p-2 sm:p-4">
            
            {/* Ambient Museum-Grade Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(217,119,6,0.06)_0%,rgba(245,239,235,0)_70%)] pointer-events-none" />
            
            {/* Subtle Geographic Latitude / Longitude Reference Lines */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <div className="absolute top-[30%] left-0 right-0 border-b border-dashed border-parchment-400" />
              <div className="absolute top-[60%] left-0 right-0 border-b border-dashed border-parchment-400" />
              <div className="absolute left-[35%] top-0 bottom-0 border-r border-dashed border-parchment-400" />
              <div className="absolute left-[70%] top-0 bottom-0 border-r border-dashed border-parchment-400" />
            </div>

            {/* Top-Right Geographic Metadata Badge */}
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 flex items-center gap-2 pointer-events-auto">
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-parchment-300 text-[10px] font-mono text-parchment-700 shadow-heritage-xs">
                <Navigation className="w-3 h-3 text-category-temples" />
                <span>N 22°30' · E 82°45'</span>
              </div>
              {selectedState && (
                <button
                  onClick={() => {
                    setSelectedState(null);
                    setHoveredState(null);
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 hover:bg-white backdrop-blur-md border border-parchment-300 text-[11px] font-semibold text-parchment-800 transition-colors shadow-heritage-xs"
                  title="Clear selection"
                >
                  <RotateCcw className="w-3 h-3 text-category-temples" />
                  <span>Reset View</span>
                </button>
              )}
            </div>

            {/* Bottom-Left Latitude Calibrated Scale Bar */}
            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 z-10 hidden sm:flex items-center gap-2 px-3 py-1 rounded-xl bg-white/80 backdrop-blur-md border border-parchment-300 text-[10px] font-mono text-parchment-700 shadow-heritage-xs pointer-events-none">
              <span>0</span>
              <span className="w-12 h-1 bg-parchment-800 inline-block rounded-full" />
              <span>500 km</span>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex flex-col items-center justify-center p-12 text-parchment-700 z-10 space-y-2 pointer-events-none">
                <Loader2 className="w-9 h-9 animate-spin text-category-temples" />
                <span className="font-serif text-sm font-semibold">Rendering national cartography...</span>
              </div>
            )}

            {/* Interactive National SVG Map Canvas */}
            {!loading && data && data.features?.length > 0 && (
              <div className="relative w-full h-full flex items-center justify-center">
                <svg 
                  viewBox="0 0 940 900" 
                  className="w-full h-full max-h-full object-contain filter drop-shadow-md select-none" 
                  role="img" 
                  aria-label="Authoritative Interactive Geographic Map of India"
                >
                  {/* LAYER 0: Dark National Boundary Silhouette Base (pointer-events: none) */}
                  <g className="india-national-boundary-underlay" pointerEvents="none">
                    {data.features.map((f: any, i: number) => (
                      <path
                        key={`national-border-base-${i}`}
                        d={path(f) || ''}
                        fill="var(--map-land-stroke, #383632)"
                        stroke="var(--map-land-stroke, #383632)"
                        strokeWidth="3.6"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                        opacity={0.95}
                      />
                    ))}
                  </g>

                  {/* LAYER 1: State Fill Layer (Directly Clickable State Polygons) */}
                  <g className="india-state-fill-layer">
                    {data.features.map((f: any, i: number) => {
                      const n = featureName(f);
                      const stateId = resolveStateId(n);
                      const activeColor = getActiveStateColor(stateId);
                      const isHovered = hoveredState === n;
                      const isSelected = selectedState === n;
                      const isCurationState = !activeColor;

                      const defaultFill = document.documentElement.classList.contains('dark') ? '#261F18' : '#F5EFEB';
                      let fillColor = activeColor || defaultFill;
                      let fillOpacity = 1;

                      if (isCurationState) {
                        if (isSelected) {
                          fillColor = '#E2D5C7';
                        } else if (isHovered) {
                          fillColor = '#E8DDD2';
                        }
                      } else {
                        fillOpacity = isSelected ? 1 : isHovered ? 0.98 : 0.92;
                      }

                      return (
                        <path
                          key={`state-fill-${i}`}
                          id={`state-${norm(n)}`}
                          data-state={n}
                          d={path(f) || ''}
                          tabIndex={0}
                          role="button"
                          aria-label={`${n} state`}
                          fill={fillColor}
                          fillOpacity={fillOpacity}
                          className="state-shape transition-colors duration-150 outline-none"
                          style={{
                            cursor: 'pointer',
                            pointerEvents: 'all'
                          }}
                          onMouseEnter={() => setHoveredState(n)}
                          onMouseLeave={() => setHoveredState(null)}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStateClick(n);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleStateClick(n);
                            }
                          }}
                        >
                          <title>{n}</title>
                        </path>
                      );
                    })}
                  </g>

                  {/* LAYER 2: Internal State Boundaries (Rendered ABOVE state fills, clearly visible) */}
                  <g className="internal-state-border-layer" pointerEvents="none">
                    {data.features.map((f: any, i: number) => (
                      <path
                        key={`internal-border-${i}`}
                        d={path(f) || ''}
                        fill="none"
                        stroke="#AAB5C0"
                        strokeWidth="1.3"
                        strokeOpacity={0.9}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                      />
                    ))}
                  </g>

                  {/* LAYER 3: Hovered & Selected State Highlight Stroke (pointer-events: none) */}
                  <g className="state-highlight-stroke-layer" pointerEvents="none">
                    {data.features.map((f: any, i: number) => {
                      const n = featureName(f);
                      const stateId = resolveStateId(n);
                      const isHovered = hoveredState === n;
                      const isSelected = selectedState === n;
                      const activeColor = getActiveStateColor(stateId);

                      if (!isHovered && !isSelected) return null;

                      const strokeColor = isSelected ? '#1E293B' : activeColor ? '#78350F' : '#64748B';
                      const strokeWidth = isSelected ? 2.2 : 1.8;

                      return (
                        <path
                          key={`highlight-stroke-${i}`}
                          d={path(f) || ''}
                          fill="none"
                          stroke={strokeColor}
                          strokeWidth={strokeWidth}
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          vectorEffect="non-scaling-stroke"
                          style={{
                            filter: isSelected
                              ? 'drop-shadow(0 2px 6px rgba(44, 24, 16, 0.4))'
                              : 'drop-shadow(0 1px 4px rgba(44, 24, 16, 0.2))'
                          }}
                        />
                      );
                    })}
                  </g>
                </svg>
              </div>
            )}

            {/* Interactive Cultural Tooltip / State Hover Badge */}
            <AnimatePresence>
              {activeStateData && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  transition={{ duration: 0.16, ease: 'easeOut' }}
                  className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 left-3 sm:left-auto z-20 max-w-[calc(100%-24px)] sm:max-w-xs bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-parchment-300 shadow-heritage-xl text-parchment-900 pointer-events-auto"
                >
                  <div className="flex items-start justify-between gap-2 border-b border-parchment-200 pb-2">
                    <div>
                      <div className="text-[10px] font-bold tracking-wider text-category-temples uppercase">
                        {activeStateData.stateObj?.region ? `${activeStateData.stateObj.region} India` : 'Indian Territory'}
                      </div>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-parchment-950 leading-tight">
                        {activeStateData.stateObj?.name || activeStateData.rawName}
                      </h3>
                      {activeStateData.stateObj?.nativeName && (
                        <div className="text-xs text-category-temples font-serif">
                          {activeStateData.stateObj.nativeName}
                        </div>
                      )}
                    </div>

                    {activeStateData.isFullyModeled ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-950 border border-amber-300 shrink-0">
                        Interactive Hub
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-parchment-100 text-parchment-700 border border-parchment-300 shrink-0">
                        <Clock className="w-2.5 h-2.5 text-parchment-500" />
                        <span>In Curation</span>
                      </span>
                    )}
                  </div>

                  {activeStateData.stateObj?.culturalIdentity ? (
                    <p className="text-xs text-parchment-700 mt-2 font-serif italic line-clamp-2 leading-relaxed">
                      "{activeStateData.stateObj.culturalIdentity}"
                    </p>
                  ) : (
                    <p className="text-xs text-parchment-600 mt-2">
                      Explore the architectural landmarks, oral histories, and living folk traditions of {activeStateData.rawName}.
                    </p>
                  )}

                  <div className="mt-3 pt-2 border-t border-parchment-200 flex items-center justify-between">
                    <span className="text-[11px] text-parchment-500 font-medium">
                      {activeStateData.itemCount > 0 ? `${activeStateData.itemCount} Records` : 'Territory'}
                    </span>
                    
                    {activeStateData.stateId && STATE_ROUTES[activeStateData.stateId] ? (
                      <button
                        onClick={() => handleStateClick(activeStateData.rawName)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-category-temples hover:bg-amber-800 text-white text-xs font-semibold transition-all shadow-xs cursor-pointer"
                      >
                        <span>Explore {activeStateData.stateObj?.name || activeStateData.rawName}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <span className="text-[10px] text-parchment-400 font-medium italic">In Curation</span>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
