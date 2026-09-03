import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Landmark,
  Loader2
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { MONUMENTS_DATA } from '../data/monuments';
import { HotspotAnnotation } from '../types/monument';
import { api, ApiMonumentDetail, ApiMonumentHotspot, ApiMonumentSummary } from '../services/api';
import { Breadcrumbs } from '../components/Navigation/Breadcrumbs';

export const MonumentExperience: React.FC = () => {
  const { monumentId = 'gateway-of-india' } = useParams<{ monumentId: string }>();
  const { t } = useTranslation();
  const fallbackMonument = MONUMENTS_DATA[monumentId] || MONUMENTS_DATA['gateway-of-india'];

  const [liveMonument, setLiveMonument] = useState<ApiMonumentDetail | null>(null);
  const [monumentsList, setMonumentsList] = useState<ApiMonumentSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    Promise.all([
      api.getMonument(monumentId),
      api.getMonuments(),
    ]).then(([detailRes, listRes]) => {
      if (!isMounted) return;
      if (detailRes.success && detailRes.data) {
        setLiveMonument(detailRes.data);
      }
      if (listRes.success && listRes.data) {
        setMonumentsList(listRes.data);
      }
      setLoading(false);
    }).catch(() => {
      if (!isMounted) return;
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [monumentId]);

  const monumentName = liveMonument?.name || fallbackMonument.name;
  const monumentLocation = liveMonument?.location || fallbackMonument.locationName;
  const monumentYear = liveMonument?.built_year || fallbackMonument.yearBuilt;
  const monumentStyle = liveMonument?.architecture || fallbackMonument.architecturalStyle;
  const monumentHistory = liveMonument?.history || fallbackMonument.detailedHistory;

  const hotspots: HotspotAnnotation[] = liveMonument?.hotspots && liveMonument.hotspots.length > 0
    ? liveMonument.hotspots.map((h: ApiMonumentHotspot) => ({
        id: h.id,
        title: h.name,
        shortDescription: h.description,
        detailedText: h.description,
        architecturalNote: h.annotation,
        position: [h.position?.x ?? 0, h.position?.y ?? 0, h.position?.z ?? 0] as [number, number, number],
        cameraTarget: [0, 0, 0] as [number, number, number],
      }))
    : fallbackMonument.hotspots;

  const [selectedHotspot, setSelectedHotspot] = useState<HotspotAnnotation | null>(null);

  const activeHotspot = selectedHotspot || hotspots[0] || null;

  return (
    <div className="min-h-screen pb-20 space-y-6 sm:space-y-8 w-full overflow-hidden">
      
      {/* Breadcrumb Hierarchy */}
      <Breadcrumbs 
        items={[
          { label: 'Explore India', path: '/explore' },
          { label: '3D Monument Experiences', isCurrent: true }
        ]} 
      />

      {/* Header Banner */}
      <section className="bg-parchment-950 text-white py-8 sm:py-10 px-4 sm:px-6 lg:px-8 border-b border-parchment-800">
        <div className="site-container flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400">
              <span>Architectural 3D Reconstruction</span>
            </div>
            <h1 className="page-title text-amber-100">
              {monumentName}
            </h1>
            <p className="text-xs sm:text-sm text-parchment-300">
              {monumentLocation} • Built: {monumentYear} • Style: {monumentStyle}
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {(monumentsList.length > 0 ? monumentsList : Object.values(MONUMENTS_DATA)).map((mon) => (
              <Link
                key={mon.id}
                to={`/monument/${mon.id}`}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                  mon.id === (liveMonument?.id || fallbackMonument.id)
                    ? 'bg-category-temples text-white shadow-sm'
                    : 'bg-white/10 hover:bg-white/20 text-parchment-300'
                }`}
              >
                {mon.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3D Viewport & Interactive Hotspots */}
      <div className="site-container grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Main 3D Canvas / Monument Stage */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative h-80 sm:h-[450px] lg:h-[500px] bg-gradient-to-b from-parchment-900 via-stone-900 to-parchment-950 rounded-3xl overflow-hidden shadow-heritage-lg border border-parchment-800 flex items-center justify-center">
            
            {/* Monument Silhouette & Hotspot Overlay */}
            <div className="relative w-full h-full flex flex-col items-center justify-center p-6 sm:p-8 text-center text-white">
              <div className="w-40 h-40 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full border border-amber-500/30 flex items-center justify-center animate-pulse-subtle relative">
                <Landmark className="w-20 h-20 sm:w-24 sm:h-24 text-amber-400/80" />
                
                {/* Hotspot Interactive Pulsing Pins */}
                {hotspots.map((hotspot, idx) => (
                  <button
                    key={hotspot.id}
                    onClick={() => setSelectedHotspot(hotspot)}
                    className={`absolute w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-transform transform hover:scale-125 focus:outline-none ${
                      activeHotspot?.id === hotspot.id
                        ? 'bg-amber-400 text-parchment-950 ring-4 ring-amber-400/30 scale-110'
                        : 'bg-white/90 text-parchment-900 shadow-md'
                    }`}
                    style={{
                      top: idx === 0 ? '18%' : idx === 1 ? '10%' : idx === 2 ? '50%' : '80%',
                      left: idx === 0 ? '50%' : idx === 1 ? '70%' : idx === 2 ? '20%' : '50%',
                    }}
                    title={hotspot.title}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              <div className="mt-6 space-y-1 z-10">
                <span className="text-[11px] text-amber-300 uppercase tracking-widest font-mono">
                  Interactive Heritage Stage
                </span>
                <p className="text-xs text-parchment-400">
                  {t('monument3D.rotateTip')}
                </p>
              </div>
            </div>

            {/* Viewport Control Badges */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] sm:text-[11px] font-mono text-amber-300">
                Lighting: Warm Daylight
              </span>
            </div>
          </div>

          {/* Hotspot Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
            {hotspots.map((hotspot, idx) => (
              <button
                key={hotspot.id}
                onClick={() => setSelectedHotspot(hotspot)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
                  activeHotspot?.id === hotspot.id
                    ? 'bg-category-temples text-white shadow-sm font-semibold'
                    : 'bg-white border border-parchment-200 text-parchment-800 hover:bg-parchment-100'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-black/20 flex items-center justify-center text-[10px]">
                  {idx + 1}
                </span>
                <span>{hotspot.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Hotspot Annotation & Architectural Details Panel */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-white border border-parchment-200 rounded-3xl p-5 sm:p-7 shadow-heritage-md space-y-5">
            <div className="border-b border-parchment-200 pb-3.5">
              <span className="text-[10px] uppercase font-bold text-category-temples tracking-wider block">
                Selected Hotspot Annotation
              </span>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-parchment-950 mt-1">
                {activeHotspot?.title || hotspots[0]?.title}
              </h2>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-parchment-700 leading-relaxed">
              <p>{activeHotspot?.detailedText || hotspots[0]?.detailedText}</p>
              
              {activeHotspot?.architecturalNote && (
                <div className="p-3.5 rounded-2xl bg-parchment-100 border border-parchment-200 space-y-1">
                  <strong className="text-parchment-900 block font-serif text-xs">Architectural Note:</strong>
                  <p className="text-xs text-parchment-600 font-mono">
                    {activeHotspot.architecturalNote}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-3.5 border-t border-parchment-100 space-y-2">
              <span className="text-[10px] uppercase font-bold text-parchment-500 tracking-wider block">
                Monument Legacy
              </span>
              <p className="text-xs text-parchment-600 leading-relaxed line-clamp-4">
                {monumentHistory}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
