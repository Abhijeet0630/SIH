import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CalendarHeart, 
  Filter, 
  ArrowRight, 
  Calendar, 
  LayoutGrid, 
  Clock,
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { CULTURAL_FESTIVALS } from '../data/festivals';
import { FestivalEvent } from '../types/festival';
import { api, ApiFestivalSummary } from '../services/api';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

import { Breadcrumbs } from '../components/Navigation/Breadcrumbs';

export const FestivalsPage: React.FC = () => {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<'month' | 'grid'>('month');
  const [selectedMonth, setSelectedMonth] = useState<number | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<string>('all');

  const [liveFestivals, setLiveFestivals] = useState<ApiFestivalSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    api.getFestivals().then((res) => {
      if (!isMounted) return;
      if (res.success && res.data && res.data.length > 0) {
        setLiveFestivals(res.data);
      }
      setLoading(false);
    }).catch(() => {
      if (!isMounted) return;
      setLoading(false);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const allFestivals: FestivalEvent[] = useMemo(() => {
    if (liveFestivals.length === 0) return CULTURAL_FESTIVALS;
    return CULTURAL_FESTIVALS;
  }, [liveFestivals]);

  const filteredFestivals = useMemo(() => {
    return allFestivals.filter(fest => {
      const matchMonth = selectedMonth === 'all' || fest.monthIndex === selectedMonth;
      const matchCategory = selectedCategory === 'all' || fest.category === selectedCategory;
      const matchState = selectedState === 'all' || fest.stateId === selectedState;
      return matchMonth && matchCategory && matchState;
    });
  }, [allFestivals, selectedMonth, selectedCategory, selectedState]);

  // Group festivals by month for the month view
  const festivalsByMonth = useMemo(() => {
    const grouped: Record<number, FestivalEvent[]> = {};
    for (let i = 0; i < 12; i++) {
      grouped[i] = [];
    }
    allFestivals.forEach(f => {
      if (grouped[f.monthIndex]) {
        grouped[f.monthIndex].push(f);
      }
    });
    return grouped;
  }, [allFestivals]);

  return (
    <div className="min-h-screen bg-parchment-50 text-parchment-900 pb-20 w-full overflow-hidden">
      
      {/* Breadcrumb Hierarchy */}
      <Breadcrumbs 
        items={[
          { label: 'Cultural Festivals Calendar', isCurrent: true }
        ]} 
      />

      {/* Header Context */}
      <section className="texture-warp py-8 sm:py-10 border-b border-parchment-200 bg-white/70 backdrop-blur-xs">
        <div className="site-container space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-category-festivals/10 text-category-festivals text-xs font-bold uppercase tracking-wider">
            <CalendarHeart className="w-4 h-4" />
            <span>Living Solar & Lunar Cycles</span>
          </div>

          <h1 className="page-title text-parchment-950">
            Interactive Cultural Calendar
          </h1>

          <p className="body-text text-parchment-600 max-w-2xl mx-auto leading-relaxed">
            Track traditional seasonal harvests, spring new year dances, and sacred communal gatherings celebrated across Maharashtra, Assam, Meghalaya, and across India.
          </p>

          {/* View Mode Toggle */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setViewMode('month')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                viewMode === 'month'
                  ? 'bg-parchment-900 text-white shadow-sm'
                  : 'bg-white text-parchment-700 border border-parchment-300 hover:bg-parchment-100'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Timeline / Month View</span>
            </button>

            <button
              onClick={() => setViewMode('grid')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                viewMode === 'grid'
                  ? 'bg-parchment-900 text-white shadow-sm'
                  : 'bg-white text-parchment-700 border border-parchment-300 hover:bg-parchment-100'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>All Festival Cards ({filteredFestivals.length})</span>
            </button>
          </div>
        </div>
      </section>

      {/* Filter Controls Strip */}
      <section className="site-container py-6 space-y-4">
        
        {/* Month Selector Pills */}
        <div className="bg-white p-3 rounded-2xl border border-parchment-200 shadow-heritage-xs overflow-x-auto no-scrollbar flex items-center gap-1.5">
          <button
            onClick={() => setSelectedMonth('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
              selectedMonth === 'all'
                ? 'bg-category-temples text-white shadow-xs'
                : 'bg-parchment-100 text-parchment-700 hover:bg-parchment-200'
            }`}
          >
            All Months
          </button>

          {MONTH_NAMES.map((name, idx) => {
            const count = festivalsByMonth[idx]?.length || 0;
            const isSelected = selectedMonth === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedMonth(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium shrink-0 transition-all flex items-center gap-1 ${
                  isSelected
                    ? 'bg-category-temples text-white font-bold shadow-xs'
                    : count > 0
                      ? 'bg-amber-50 text-amber-900 border border-amber-200/80 hover:bg-amber-100'
                      : 'bg-parchment-50 text-parchment-400 opacity-60'
                }`}
              >
                <span>{name.slice(0, 3)}</span>
                {count > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/30 text-white' : 'bg-amber-200 text-amber-950 font-bold'}`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Secondary Category & State Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-parchment-600 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-category-temples" />
              <span>Category:</span>
            </span>
            {[
              { id: 'all', label: 'All Celebrations' },
              { id: 'harvest', label: 'Harvest' },
              { id: 'new-year', label: 'Spring & New Year' },
              { id: 'religious', label: 'Sacred Devotion' },
              { id: 'seasonal', label: 'Seasonal' },
              { id: 'art', label: 'Fairs' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-parchment-900 text-white border-parchment-900 font-semibold shadow-xs'
                    : 'bg-white text-parchment-700 border-parchment-200 hover:border-parchment-400'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <select
              value={selectedState}
              onChange={e => setSelectedState(e.target.value)}
              aria-label="Filter by state"
              className="px-3 py-1.5 bg-white border border-parchment-300 rounded-xl text-xs font-semibold text-parchment-800 focus:outline-none focus:border-category-temples w-full sm:w-auto"
            >
              <option value="all">All States</option>
              <option value="maharashtra">Maharashtra (Ganeshotsav, Gudi Padwa, Pola)</option>
              <option value="assam">Assam (Rongali & Magh Bihu)</option>
              <option value="meghalaya">Meghalaya (Shad Suk Mynsiem, Wangala)</option>
              <option value="kerala">Kerala (Onam)</option>
              <option value="west-bengal">West Bengal (Durga Puja)</option>
              <option value="rajasthan">Rajasthan (Pushkar Fair)</option>
            </select>
          </div>
        </div>
      </section>

      {/* Main Calendar View Display */}
      <section className="site-container py-4">
        {viewMode === 'month' && (
          <div className="space-y-8">
            {MONTH_NAMES.map((mName, mIdx) => {
              if (selectedMonth !== 'all' && selectedMonth !== mIdx) return null;
              const fests = (festivalsByMonth[mIdx] || []).filter(f => {
                const matchCategory = selectedCategory === 'all' || f.category === selectedCategory;
                const matchState = selectedState === 'all' || f.stateId === selectedState;
                return matchCategory && matchState;
              });

              if (fests.length === 0 && selectedMonth !== 'all') {
                return (
                  <div key={mIdx} className="bg-white rounded-2xl p-8 text-center border border-dashed border-parchment-300">
                    <p className="text-xs text-parchment-500">No festivals scheduled for {mName} under current filters.</p>
                  </div>
                );
              }
              if (fests.length === 0) return null;

              return (
                <div key={mIdx} className="space-y-4">
                  {/* Month Header Banner */}
                  <div className="flex items-center gap-3 border-b border-parchment-300/80 pb-2">
                    <span className="w-8 h-8 rounded-xl bg-category-temples text-white font-serif font-bold flex items-center justify-center text-sm shadow-xs shrink-0">
                      {mIdx + 1}
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-parchment-950">
                      {mName}
                    </h2>
                    <span className="text-xs text-parchment-500 font-medium">
                      ({fests.length} {fests.length === 1 ? 'Festival' : 'Festivals'})
                    </span>
                  </div>

                  {/* Month Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {fests.map(fest => (
                      <FestivalCard key={fest.id} festival={fest} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredFestivals.map(fest => (
              <FestivalCard key={fest.id} festival={fest} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

const FestivalCard: React.FC<{ festival: FestivalEvent }> = ({ festival }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-white border border-parchment-200 rounded-3xl overflow-hidden shadow-heritage-xs hover:shadow-heritage-md transition-all flex flex-col justify-between group"
    >
      <div>
        <div className="relative aspect-[16/10] overflow-hidden bg-parchment-200">
          <img
            src={festival.image}
            alt={festival.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[11px] font-bold text-parchment-900 shadow-xs">
              {festival.state}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-xs text-[10px] font-medium text-amber-200 uppercase tracking-wider">
              {festival.category}
            </span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 text-white">
            <div className="text-[11px] font-semibold text-amber-300 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{festival.dateOrSeason}</span>
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold leading-tight mt-0.5">
              {festival.name}
            </h3>
            {festival.marathiName && (
              <div className="text-xs text-amber-100/90 font-serif">
                {festival.marathiName}
              </div>
            )}
          </div>
        </div>

        <div className="p-4 sm:p-5 space-y-3">
          {festival.upcomingDate && (
            <div className="px-3 py-1 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-950 text-xs font-semibold flex items-center justify-between">
              <span>Next Expected Celebration:</span>
              <strong className="text-category-temples">{festival.upcomingDate}</strong>
            </div>
          )}

          <p className="text-xs sm:text-sm text-parchment-700 leading-relaxed">
            {festival.shortDescription}
          </p>

          {festival.traditionalPractices && festival.traditionalPractices.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-category-temples block">
                Key Living Practices:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {festival.traditionalPractices.map((prac, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-parchment-100 border border-parchment-200/60 text-parchment-800 text-[11px]"
                  >
                    {prac}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {festival.relatedItemSlug && (
        <div className="p-4 sm:p-5 pt-0">
          <div className="pt-3 border-t border-parchment-100 flex items-center justify-between text-xs font-semibold text-category-temples">
            <Link
              to={`/item/${festival.relatedItemSlug}`}
              className="hover:underline flex items-center gap-1"
            >
              <span>Explore Associated Heritage Story</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </motion.div>
  );
};
