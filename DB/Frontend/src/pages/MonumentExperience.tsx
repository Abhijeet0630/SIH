import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Landmark, 
  MapPin, 
  Sparkles, 
  BookOpen, 
  Layers, 
  ArrowRight,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Calendar,
  Compass
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { monumentService } from '../services/monumentService';
import { MonumentData, HotspotAnnotation } from '../types/monument';
import { Monument3DViewer } from '../components/3D/Monument3DViewer';
import { Breadcrumbs } from '../components/Navigation/Breadcrumbs';

export const MonumentExperience: React.FC = () => {
  const { monumentId = 'gateway-of-india' } = useParams<{ monumentId: string }>();
  const { t } = useTranslation();

  const [monumentsList, setMonumentsList] = useState<MonumentData[]>([]);
  const [currentMonument, setCurrentMonument] = useState<MonumentData | null>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<HotspotAnnotation | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch monuments list & current monument via monumentService
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      setLoading(true);
      const all = await monumentService.getMonuments();
      if (!isMounted) return;
      setMonumentsList(all);

      const found = await monumentService.getMonumentById(monumentId);
      if (!isMounted) return;

      const active = found || all[0] || null;
      setCurrentMonument(active);
      if (active?.hotspots && active.hotspots.length > 0) {
        setSelectedHotspot(active.hotspots[0]);
      } else {
        setSelectedHotspot(null);
      }
      setLoading(false);
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [monumentId]);

  if (loading && !currentMonument) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 text-parchment-800">
        <div className="w-12 h-12 rounded-full border-3 border-category-temples/20 border-t-category-temples animate-spin" />
        <p className="font-serif text-sm font-medium">Opening Digital Heritage Archive...</p>
      </div>
    );
  }

  if (!currentMonument) {
    return (
      <div className="site-container py-16 text-center space-y-4">
        <h2 className="text-2xl font-serif font-bold text-parchment-950">Monument Not Found</h2>
        <p className="text-sm text-parchment-600">The requested monument record could not be retrieved from the archive.</p>
        <Link to="/explore" className="btn-primary inline-flex">Return to National Map</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 space-y-6 sm:space-y-8 w-full overflow-hidden">
      
      {/* Breadcrumb Navigation */}
      <Breadcrumbs 
        items={[
          { label: 'Explore India', path: '/explore' },
          { label: currentMonument.state, path: `/state/${currentMonument.stateId}` },
          { label: currentMonument.name, isCurrent: true }
        ]} 
      />

      {/* Header Banner with Architectural Metadata */}
      <section className="bg-parchment-950 text-white py-8 sm:py-10 px-4 sm:px-6 lg:px-8 border-b border-parchment-800 texture-sandstone">
        <div className="site-container flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Landmark className="w-3 h-3" />
                <span>{currentMonument.category}</span>
              </span>

              {currentMonument.modelAvailable ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <Sparkles className="w-3 h-3" />
                  <span>3D Interactive Available</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <span>Photogrammetry in Curation</span>
                </span>
              )}
            </div>

            <div>
              <h1 className="page-title text-amber-100">
                {currentMonument.name}
              </h1>
              {currentMonument.nativeName && (
                <div className="text-sm font-serif text-amber-300/90 mt-0.5">
                  {currentMonument.nativeName}
                </div>
              )}
            </div>

            <p className="text-xs sm:text-sm text-parchment-300 flex flex-wrap items-center gap-2 pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{currentMonument.locationName || currentMonument.district_or_city}, {currentMonument.state}</span>
              </span>
              <span>•</span>
              <span>Built: {currentMonument.yearBuilt}</span>
              <span>•</span>
              <span>Style: {currentMonument.architecturalStyle}</span>
            </p>
          </div>

          {/* Quick Monument Switcher Rail */}
          <div className="space-y-1.5 shrink-0">
            <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-parchment-400 block">
              Digital Monument Switcher
            </span>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 max-w-full md:max-w-md">
              {monumentsList.map((mon) => (
                <Link
                  key={mon.id}
                  to={`/monument/${mon.id}`}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 border ${
                    mon.id === currentMonument.id
                      ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-sm font-bold'
                      : 'bg-white/10 hover:bg-white/20 text-parchment-300 border-white/10'
                  }`}
                >
                  {mon.name.split(',')[0]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main 3D Viewport & Interactive Hotspots */}
      <div className="site-container grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Left Column: Reusable 3D Viewer & Hotspots Ribbon */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Reusable 3D Viewer Component */}
          <Monument3DViewer
            modelUrl={currentMonument.modelUrl}
            monument={currentMonument}
            activeHotspotId={selectedHotspot?.id}
            onSelectHotspot={setSelectedHotspot}
          />

          {/* Hotspot Selector Rail */}
          {currentMonument.hotspots && currentMonument.hotspots.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-parchment-600">
                <span className="font-semibold uppercase tracking-wider font-mono text-[11px] text-category-temples flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Architectural Hotspots ({currentMonument.hotspots.length})</span>
                </span>
                <span className="text-[11px] text-parchment-500">
                  Select a hotspot to focus the inspection camera
                </span>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                {currentMonument.hotspots.map((hotspot, idx) => {
                  const isSelected = selectedHotspot?.id === hotspot.id;
                  return (
                    <button
                      key={hotspot.id}
                      onClick={() => setSelectedHotspot(hotspot)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 shrink-0 border ${
                        isSelected
                          ? 'bg-parchment-950 text-white border-parchment-950 shadow-xs font-bold'
                          : 'bg-white border-parchment-200 text-parchment-800 hover:bg-parchment-50 hover:border-parchment-300'
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                        isSelected ? 'bg-amber-400 text-stone-950' : 'bg-parchment-100 text-parchment-700'
                      }`}>
                        {idx + 1}
                      </span>
                      <span>{hotspot.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Hotspot Annotation & Monument Legacy Details */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-white border border-parchment-200 rounded-3xl p-5 sm:p-6 shadow-heritage-md space-y-5">
            
            {/* Active Hotspot Inspection Card */}
            {selectedHotspot ? (
              <div className="space-y-3.5 border-b border-parchment-200 pb-5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-category-temples tracking-wider font-mono">
                    Hotspot Inspection
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-100 text-amber-950 font-mono font-bold">
                    POI Focus
                  </span>
                </div>

                <h3 className="font-serif text-lg sm:text-xl font-bold text-parchment-950 leading-tight">
                  {selectedHotspot.title}
                </h3>

                <p className="text-xs sm:text-sm text-parchment-700 leading-relaxed">
                  {selectedHotspot.detailedText || selectedHotspot.shortDescription}
                </p>

                {selectedHotspot.architecturalNote && (
                  <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1">
                    <strong className="text-amber-950 block font-serif text-xs">
                      Architectural Note:
                    </strong>
                    <p className="text-xs text-amber-900 leading-relaxed font-mono">
                      {selectedHotspot.architecturalNote}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="border-b border-parchment-200 pb-4">
                <h3 className="font-serif text-lg font-bold text-parchment-950">
                  {currentMonument.name}
                </h3>
                <p className="text-xs text-parchment-600 mt-1">
                  {currentMonument.shortDescription}
                </p>
              </div>
            )}

            {/* Monument Cultural Legacy */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-parchment-500 tracking-wider block font-mono">
                Historical Heritage
              </span>
              <p className="text-xs sm:text-sm text-parchment-700 leading-relaxed">
                {currentMonument.detailedHistory || currentMonument.description}
              </p>
            </div>

            {/* Cultural Significance Highlight */}
            {currentMonument.culturalSignificance && (
              <div className="p-3.5 rounded-2xl bg-parchment-100 border border-parchment-200 space-y-1">
                <span className="text-[10px] uppercase font-bold text-category-temples tracking-wider flex items-center gap-1 font-mono">
                  <Sparkles className="w-3 h-3 text-category-temples" />
                  <span>Cultural Significance</span>
                </span>
                <p className="text-xs text-parchment-800 leading-relaxed italic font-serif">
                  "{currentMonument.culturalSignificance}"
                </p>
              </div>
            )}

            {/* Verified Archival Sources */}
            {currentMonument.sources && currentMonument.sources.length > 0 && (
              <div className="pt-3 border-t border-parchment-100 space-y-2">
                <span className="text-[10px] uppercase font-bold text-parchment-400 tracking-wider block font-mono flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-category-temples" />
                  <span>Verified Archival Citations</span>
                </span>
                <ul className="space-y-1.5 text-xs text-parchment-600">
                  {currentMonument.sources.map((src, idx) => (
                    <li key={idx} className="flex items-start justify-between gap-2">
                      <span>• {src.title}</span>
                      <span className="text-[10px] text-parchment-400 font-mono shrink-0">
                        {src.publisher}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Connected Star Schema Knowledge Nodes */}
      {currentMonument.starSchemaNodes && currentMonument.starSchemaNodes.length > 0 && (
        <section className="site-container pt-4">
          <div className="bg-white border border-parchment-200 rounded-3xl p-5 sm:p-8 shadow-heritage-md space-y-6 texture-parchment">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-parchment-200 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-category-temples font-mono">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Connected Knowledge Graph</span>
                </div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-parchment-950">
                  Historical & Material Ecosystem
                </h2>
              </div>
              <span className="text-xs text-parchment-500 font-mono">
                {currentMonument.starSchemaNodes.length} Verified Relations
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentMonument.starSchemaNodes.map((node) => (
                <div
                  key={node.id}
                  className="p-4 rounded-2xl bg-parchment-50/80 border border-parchment-200 space-y-2 hover:border-category-temples transition-all"
                >
                  <span className="text-[10px] uppercase font-bold tracking-wider text-category-temples font-mono block">
                    {node.type}
                  </span>
                  <h4 className="font-serif text-sm font-bold text-parchment-950 leading-tight">
                    {node.label}
                  </h4>
                  <p className="text-xs text-parchment-600 leading-relaxed">
                    {node.detailedContent || node.shortDescription}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
