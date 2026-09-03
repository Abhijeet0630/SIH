import React, { useState, useMemo, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  MapPin, 
  UtensilsCrossed, 
  Sparkles, 
  Shield, 
  Landmark, 
  Music, 
  Palette, 
  CalendarDays, 
  Compass, 
  Building2, 
  Trees, 
  BookOpen, 
  Activity, 
  Layers,
  Loader2
} from 'lucide-react';
import { getStateById, STATES_DATA } from '../data/states';
import { CULTURAL_CATEGORIES } from '../data/categories';
import { getCulturalItemsByCategory, getCulturalItemsByState } from '../data/culturalItems';
import { CulturalCategoryId } from '../types/category';
import { CulturalItem } from '../types/culturalItem';
import { api, ApiCultureCard } from '../services/api';
import { StateInteractiveMap } from '../components/Map/StateInteractiveMap';
import { MaharashtraAtlasMap } from '../components/Map/MaharashtraAtlasMap';
import { AssamAtlasMap } from '../components/Map/AssamAtlasMap';
import { MeghalayaAtlasMap } from '../components/Map/MeghalayaAtlasMap';
import { Breadcrumbs } from '../components/Navigation/Breadcrumbs';

const getCategoryIcon = (id: string) => {
  switch (id) {
    case 'food': return <UtensilsCrossed className="w-4 h-4" />;
    case 'fashion': return <Sparkles className="w-4 h-4" />;
    case 'forts': return <Shield className="w-4 h-4" />;
    case 'temples': return <Landmark className="w-4 h-4" />;
    case 'monuments': return <Landmark className="w-4 h-4" />;
    case 'architecture': return <Building2 className="w-4 h-4" />;
    case 'dance': return <Activity className="w-4 h-4" />;
    case 'music': return <Music className="w-4 h-4" />;
    case 'crafts': return <Palette className="w-4 h-4" />;
    case 'tribal': return <Trees className="w-4 h-4" />;
    case 'languages': return <BookOpen className="w-4 h-4" />;
    case 'festivals': return <CalendarDays className="w-4 h-4" />;
    default: return <Compass className="w-4 h-4" />;
  }
};

export const StateExplore: React.FC = () => {
  const { stateId = 'maharashtra' } = useParams<{ stateId?: string }>();
  const navigate = useNavigate();
  const state = getStateById(stateId) || STATES_DATA['maharashtra'];
  
  const [category, setCategory] = useState<CulturalCategoryId>('all');
  const [activeSubRegion, setActiveSubRegion] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<CulturalItem | null>(null);
  const [liveCultureItems, setLiveCultureItems] = useState<ApiCultureCard[]>([]);

  useEffect(() => {
    let isMounted = true;
    const backendCode = stateId.length === 2 ? stateId : (state.code?.replace('IN-', '').toLowerCase() || stateId);
    api.getStateCulture(backendCode, category).then((res) => {
      if (!isMounted) return;
      if (res.success && res.data) {
        setLiveCultureItems(res.data);
      }
    }).catch(() => {});
    return () => { isMounted = false; };
  }, [stateId, category, state.code]);

  // Get items for the selected state and category
  const rawItems = useMemo(() => {
    return getCulturalItemsByCategory(state.id, category);
  }, [state.id, category]);

  // Further filter items by subRegion/district if selected
  const items = useMemo(() => {
    if (activeSubRegion === 'all') return rawItems;
    return rawItems.filter(item => 
      (item.location.district && item.location.district.toLowerCase().includes(activeSubRegion.toLowerCase())) ||
      (item.tags && item.tags.some(t => t.toLowerCase().includes(activeSubRegion.toLowerCase())))
    );
  }, [rawItems, activeSubRegion]);

  const allStateItems = useMemo(() => {
    return getCulturalItemsByState(state.id);
  }, [state.id]);

  const handleCardClick = (item: CulturalItem) => {
    setSelectedItem(item);
    // Smooth scroll toward map container if on smaller screens
    const mapElement = document.querySelector('.map-stage-container');
    if (mapElement && window.innerWidth < 1024) {
      mapElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <div className="state-page min-h-screen bg-parchment-50 w-full overflow-hidden pb-16">
      
      {/* Breadcrumb Hierarchy */}
      <Breadcrumbs 
        items={[
          { label: 'Explore India', path: '/explore' },
          { label: state.name, path: `/state/${state.id}`, isCurrent: activeSubRegion === 'all' },
          ...(activeSubRegion !== 'all' ? [{ label: activeSubRegion, isCurrent: true }] : [])
        ]} 
      />

      {/* 1. STATE INTRODUCTION & CONTEXT HEADER */}
      <section className="state-intro texture-warp py-6 sm:py-8 border-b border-parchment-200 bg-white/75 backdrop-blur-xs">
        <div className="site-container space-y-3.5">
          
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link 
              to="/explore" 
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-parchment-700 hover:text-category-temples transition-colors px-3 py-1 rounded-full bg-white border border-parchment-200 shadow-heritage-xs w-fit"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> 
              <span>Back to National Map</span>
            </Link>

            {/* State Quick Switcher Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              <span className="text-xs font-medium text-parchment-500 hidden sm:inline shrink-0">Featured States:</span>
              {[
                { id: 'maharashtra', name: 'Maharashtra' },
                { id: 'assam', name: 'Assam' },
                { id: 'meghalaya', name: 'Meghalaya' }
              ].map(s => (
                <button
                  key={s.id}
                  onClick={() => {
                    setSelectedItem(null);
                    setActiveSubRegion('all');
                    setCategory('all');
                    navigate(`/state/${s.id}`);
                  }}
                  className={`text-xs px-3 py-1 rounded-full border font-medium transition-all shrink-0 ${
                    state.id === s.id
                      ? 'bg-category-temples text-white border-category-temples shadow-sm font-semibold'
                      : 'bg-white text-parchment-700 border-parchment-200 hover:border-parchment-400'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-1">
            <div className="flex items-center gap-2">
              <span className="heritage-kicker tracking-widest text-[11px] font-bold text-category-temples uppercase">
                {state.region} India · Living Cultural Atlas
              </span>
              {state.nativeName && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-serif bg-amber-100/80 text-amber-900 border border-amber-200">
                  {state.nativeName}
                </span>
              )}
            </div>

            <h1 className="page-title text-parchment-950 mt-1 leading-tight">
              {state.name} <em className="font-normal italic text-category-temples">Spatial Archive.</em>
            </h1>

            {state.culturalIdentity && (
              <p className="text-sm sm:text-base font-serif italic text-amber-950/80 mt-1 max-w-3xl leading-relaxed">
                "{state.culturalIdentity}"
              </p>
            )}

            <p className="body-text text-parchment-700 mt-1.5 max-w-4xl leading-relaxed">
              {state.shortDescription}
            </p>
          </div>

          {/* 2. SUBREGIONS SELECTOR PILLS */}
          {state.subRegions && state.subRegions.length > 0 && (
            <div className="pt-2.5 border-t border-parchment-200/60">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
                <span className="text-xs font-semibold text-parchment-600 shrink-0 flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-category-temples" />
                  <span>Subregions:</span>
                </span>
                <button
                  onClick={() => setActiveSubRegion('all')}
                  className={`text-xs px-3 py-1 rounded-full border shrink-0 transition-all ${
                    activeSubRegion === 'all'
                      ? 'bg-parchment-900 text-white border-parchment-900 font-semibold shadow-xs'
                      : 'bg-white text-parchment-700 border-parchment-300 hover:border-parchment-400'
                  }`}
                >
                  All {state.name}
                </button>

                {state.subRegions.map(reg => (
                  <button
                    key={reg.id}
                    onClick={() => setActiveSubRegion(reg.id)}
                    className={`text-xs px-3 py-1 rounded-full border shrink-0 transition-all ${
                      activeSubRegion === reg.id
                        ? 'bg-parchment-900 text-white border-parchment-900 font-semibold shadow-xs'
                        : 'bg-white text-parchment-700 border-parchment-300 hover:border-parchment-400'
                    }`}
                    title={reg.description}
                  >
                    <span>{reg.name}</span>
                    {reg.nativeName && <span className="ml-1 opacity-75">({reg.nativeName})</span>}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. CULTURAL CATEGORIES & INTERACTIVE MAP STAGE */}
      <section className="site-container py-6 space-y-5">
        
        {/* Cultural Category Lens Rail */}
        <div className="category-rail flex gap-2 overflow-x-auto pb-1.5 no-scrollbar" aria-label="Cultural categories">
          {CULTURAL_CATEGORIES.map(c => {
            const isSelected = category === c.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  setCategory(c.id);
                  setSelectedItem(null);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all border shrink-0 ${
                  isSelected
                    ? 'bg-white text-parchment-950 shadow-heritage-md font-bold scale-[1.02]'
                    : 'bg-white/80 text-parchment-700 border-parchment-200 hover:bg-white hover:text-parchment-950'
                }`}
                style={isSelected ? { borderColor: c.accentColor || '#D97706', borderLeftWidth: '4px' } : undefined}
              >
                <span style={{ color: c.accentColor || '#D97706' }}>
                  {getCategoryIcon(c.id)}
                </span>
                <span>{c.defaultLabel}</span>
              </button>
            );
          })}
        </div>

        {/* 4. INTERACTIVE MAP STAGE */}
        <div className="map-stage-container w-full">
          {state.id === 'maharashtra' ? (
            <MaharashtraAtlasMap
              items={allStateItems}
              selectedId={selectedItem?.id}
              onSelect={setSelectedItem}
              activeSubRegion={activeSubRegion}
              onSubRegionChange={setActiveSubRegion}
            />
          ) : state.id === 'assam' ? (
            <AssamAtlasMap
              items={allStateItems}
              selectedId={selectedItem?.id}
              onSelect={setSelectedItem}
              activeSubRegion={activeSubRegion}
              onSubRegionChange={setActiveSubRegion}
            />
          ) : state.id === 'meghalaya' ? (
            <MeghalayaAtlasMap
              items={allStateItems}
              selectedId={selectedItem?.id}
              onSelect={setSelectedItem}
              activeSubRegion={activeSubRegion}
              onSubRegionChange={setActiveSubRegion}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-8">
                <StateInteractiveMap 
                  stateId={state.id}
                  stateName={state.name}
                  items={items} 
                  selectedId={selectedItem?.id} 
                  onSelect={setSelectedItem}
                  activeSubRegion={activeSubRegion}
                />
              </div>

              {/* Cultural Inspector Panel for other states */}
              <aside className="lg:col-span-4 h-full">
                <AnimatePresence mode="wait">
                  {selectedItem ? (
                    <motion.div
                      key={selectedItem.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-white rounded-3xl p-5 border border-parchment-200 shadow-heritage-md space-y-4"
                    >
                      <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-parchment-100">
                        <img 
                          src={selectedItem.primaryImage} 
                          alt={selectedItem.title} 
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-xs text-white border border-white/20">
                          {selectedItem.category}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-parchment-950 leading-tight">
                          {selectedItem.title}
                        </h3>
                        {selectedItem.hindiTitle && (
                          <div className="text-xs font-serif text-category-temples mt-0.5">
                            {selectedItem.hindiTitle}
                          </div>
                        )}
                        <p className="item-location text-xs text-parchment-600 flex items-center gap-1.5 mt-2">
                          <MapPin className="w-3.5 h-3.5 text-category-temples shrink-0" />
                          <span>{selectedItem.location.name} ({selectedItem.location.district})</span>
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-parchment-700 leading-relaxed">
                        {selectedItem.shortDescription}
                      </p>

                      {/* Tags */}
                      {selectedItem.tags && selectedItem.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {selectedItem.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-parchment-100 text-parchment-700">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="pt-2 border-t border-parchment-200">
                        <Link 
                          to={`/item/${selectedItem.slug}`}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-category-temples hover:bg-amber-800 text-white font-semibold text-xs sm:text-sm transition-colors shadow-sm"
                        >
                          <span>Open Full Cultural Story</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="empty-detail bg-white/70 backdrop-blur-xs rounded-3xl p-8 border border-dashed border-parchment-300 flex flex-col items-center justify-center text-center space-y-3 min-h-[360px]">
                      <div className="p-3.5 rounded-full bg-amber-100/80 text-category-temples">
                        <MapPin className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="font-serif text-base sm:text-lg font-bold text-parchment-900">
                          Select Any Landmark Pin
                        </h3>
                        <p className="text-xs text-parchment-600 mt-1 max-w-xs leading-relaxed">
                          Click any interactive pin on the {state.name} spatial map to inspect its historical origin, materials, and living story.
                        </p>
                      </div>
                    </div>
                  )}
                </AnimatePresence>
              </aside>
            </div>
          )}
        </div>

        {/* 5. CULTURAL LOCATIONS CATALOGUE GRID */}
        <div className="pt-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-parchment-200 pb-2">
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-parchment-950">
                Verified Heritage Locations ({items.length})
              </h3>
              <p className="text-xs text-parchment-500">
                Click any catalogue card to focus its landmark on the spatial atlas.
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-100/80 border border-amber-200 text-amber-950 shadow-xs">
              {items.length} of {allStateItems.length} Landmarks Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map(item => {
              const isSelected = selectedItem?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => handleCardClick(item)}
                  className={`group cursor-pointer bg-white rounded-2xl overflow-hidden border transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? 'border-category-temples ring-2 ring-category-temples/20 shadow-heritage-md scale-[1.02]'
                      : 'border-parchment-200 hover:border-parchment-400 hover:shadow-heritage-sm'
                  }`}
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-parchment-100">
                      <img 
                        src={item.primaryImage} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-xs text-white">
                        {item.category}
                      </span>
                    </div>

                    <div className="p-3.5 space-y-1.5">
                      <h4 className="font-serif text-sm font-bold text-parchment-900 group-hover:text-category-temples transition-colors line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-parchment-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-category-temples shrink-0" />
                        <span className="truncate">{item.location.district}, {item.location.state}</span>
                      </p>
                      <p className="text-xs text-parchment-600 line-clamp-2 leading-relaxed">
                        {item.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 pt-0">
                    <div className="pt-2 border-t border-parchment-100 flex items-center justify-between text-[11px] font-semibold text-category-temples">
                      <Link 
                        to={`/item/${item.slug}`}
                        onClick={e => e.stopPropagation()}
                        className="hover:underline flex items-center gap-1"
                      >
                        <span>Deep Story</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                      <span className="text-[10px] text-parchment-400 font-normal">
                        ASI Verified
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
