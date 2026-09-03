import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Compass, 
  ArrowLeft, 
  ArrowRight, 
  MapPin, 
  Search, 
  Filter, 
  Sparkles, 
  Shield, 
  Landmark, 
  UtensilsCrossed, 
  Music, 
  Palette, 
  Trees, 
  BookOpen, 
  Building2, 
  Activity, 
  CalendarDays
} from 'lucide-react';
import { CULTURAL_CATEGORIES } from '../data/categories';
import { getCulturalItemsByGlobalCategory } from '../data/culturalItems';
import { CulturalCategoryId } from '../types/category';
import { useTranslation } from '../hooks/useTranslation';

const getCategoryIcon = (id: string) => {
  switch (id) {
    case 'food': return <UtensilsCrossed className="w-5 h-5" />;
    case 'fashion': return <Sparkles className="w-5 h-5" />;
    case 'forts': return <Shield className="w-5 h-5" />;
    case 'temples': return <Landmark className="w-5 h-5" />;
    case 'monuments': return <Landmark className="w-5 h-5" />;
    case 'architecture': return <Building2 className="w-5 h-5" />;
    case 'dance': return <Activity className="w-5 h-5" />;
    case 'music': return <Music className="w-5 h-5" />;
    case 'crafts': return <Palette className="w-5 h-5" />;
    case 'tribal': return <Trees className="w-5 h-5" />;
    case 'languages': return <BookOpen className="w-5 h-5" />;
    case 'festivals': return <CalendarDays className="w-5 h-5" />;
    default: return <Compass className="w-5 h-5" />;
  }
};

import { Breadcrumbs } from '../components/Navigation/Breadcrumbs';

export const CategoryExplore: React.FC = () => {
  const { categoryId = 'all' } = useParams<{ categoryId?: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStateFilter, setSelectedStateFilter] = useState('all');

  const currentCategory = useMemo(() => {
    return CULTURAL_CATEGORIES.find(c => c.id === categoryId) || CULTURAL_CATEGORIES[0];
  }, [categoryId]);

  const rawItems = useMemo(() => {
    return getCulturalItemsByGlobalCategory(categoryId as CulturalCategoryId);
  }, [categoryId]);

  const filteredItems = useMemo(() => {
    return rawItems.filter(item => {
      const matchesSearch = !searchQuery || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.location.district && item.location.district.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.tags && item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
      
      const matchesState = selectedStateFilter === 'all' || item.stateId.toLowerCase() === selectedStateFilter.toLowerCase();

      return matchesSearch && matchesState;
    });
  }, [rawItems, searchQuery, selectedStateFilter]);

  return (
    <div className="min-h-screen bg-parchment-50 text-parchment-900 w-full overflow-hidden pb-16">
      
      {/* Breadcrumb Hierarchy */}
      <Breadcrumbs 
        items={[
          { label: 'Cultural Layers', path: '/categories', isCurrent: categoryId === 'all' },
          ...(categoryId !== 'all' ? [{ label: currentCategory.defaultLabel, isCurrent: true }] : [])
        ]} 
      />

      {/* Header Context */}
      <section className="texture-warp py-8 sm:py-10 border-b border-parchment-200 bg-white/70 backdrop-blur-xs">
        <div className="site-container space-y-5 sm:space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link 
              to="/explore" 
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-parchment-700 hover:text-category-temples transition-colors px-3 py-1 rounded-full bg-white border border-parchment-200 shadow-heritage-xs w-fit"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> 
              <span>Back to National Map</span>
            </Link>

            <span className="text-xs font-semibold text-parchment-500 uppercase tracking-wider">
              Cross-State Cultural Taxonomy
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center shadow-xs shrink-0"
                  style={{ backgroundColor: `${currentCategory.accentColor}20`, color: currentCategory.accentColor }}
                >
                  {getCategoryIcon(currentCategory.id)}
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-category-temples">
                    Heritage Lens
                  </span>
                  <h1 className="page-title text-parchment-950">
                    {t(`categories.${currentCategory.id}`) || currentCategory.defaultLabel}
                  </h1>
                </div>
              </div>

              <p className="body-text text-parchment-700 mt-2 max-w-3xl leading-relaxed">
                {currentCategory.description}
              </p>
            </div>

            <div className="shrink-0 bg-white p-4 rounded-2xl border border-parchment-200 shadow-heritage-xs text-left md:text-right w-fit">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-parchment-950">
                {filteredItems.length}
              </div>
              <div className="text-xs text-parchment-500 font-medium">
                Verified Cross-State Records
              </div>
            </div>
          </div>

          {/* Category Rail Switcher */}
          <div className="pt-2 border-t border-parchment-200/60">
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
              {CULTURAL_CATEGORIES.map(c => {
                const isActive = categoryId === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedStateFilter('all');
                      navigate(c.id === 'all' ? '/categories' : `/category/${c.id}`);
                    }}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium shrink-0 transition-all border ${
                      isActive
                        ? 'bg-parchment-900 text-white border-parchment-900 font-bold shadow-xs'
                        : 'bg-white text-parchment-700 border-parchment-200 hover:border-parchment-400'
                    }`}
                  >
                    <span style={{ color: isActive ? '#fff' : c.accentColor }}>
                      {getCategoryIcon(c.id)}
                    </span>
                    <span>{t(`categories.${c.id}`) || c.defaultLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Filtering */}
      <section className="site-container py-6 sm:py-8 space-y-6">
        
        {/* Search & State Filter Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 bg-white p-3.5 sm:p-4 rounded-2xl border border-parchment-200 shadow-heritage-xs">
          {/* Search Input */}
          <div className="relative flex-1 min-w-0">
            <Search className="w-4 h-4 text-parchment-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={`Search ${currentCategory.defaultLabel.toLowerCase()} (e.g. Paithani, Muga, Living Root, Misal)...`}
              className="w-full pl-10 pr-4 py-2 bg-parchment-50 border border-parchment-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-category-temples text-parchment-900"
            />
          </div>

          {/* State Filter Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <Filter className="w-4 h-4 text-parchment-500 shrink-0" />
            <select
              value={selectedStateFilter}
              onChange={e => setSelectedStateFilter(e.target.value)}
              aria-label="Filter by state"
              className="px-3 py-2 bg-parchment-50 border border-parchment-200 rounded-xl text-xs sm:text-sm font-medium text-parchment-800 focus:outline-none focus:border-category-temples"
            >
              <option value="all">All States</option>
              <option value="maharashtra">Maharashtra (Sahyadris & Deccan)</option>
              <option value="assam">Assam (Brahmaputra Valley)</option>
              <option value="meghalaya">Meghalaya (Khasi & Garo Hills)</option>
              <option value="rajasthan">Rajasthan</option>
            </select>
          </div>
        </div>

        {/* Results Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredItems.map(item => (
              <Link
                key={item.id}
                to={`/item/${item.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-parchment-200 hover:border-category-temples shadow-heritage-xs hover:shadow-heritage-md transition-all hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-parchment-100">
                    <img 
                      src={item.primaryImage} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-xs text-white">
                      {item.category}
                    </span>
                    <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white/90 backdrop-blur-xs text-parchment-900 border border-parchment-300">
                      {item.location.state}
                    </span>
                  </div>

                  <div className="p-4 space-y-1.5">
                    <h3 className="font-serif text-sm sm:text-base font-bold text-parchment-950 group-hover:text-category-temples transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-parchment-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-category-temples shrink-0" />
                      <span className="truncate">{item.location.name}</span>
                    </p>
                    <p className="text-xs text-parchment-600 line-clamp-2 leading-relaxed">
                      {item.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <div className="pt-2 border-t border-parchment-100 flex items-center justify-between text-xs font-semibold text-category-temples">
                    <span>Explore Story</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-dashed border-parchment-300 max-w-md mx-auto space-y-3">
            <Search className="w-8 h-8 text-parchment-400 mx-auto" />
            <h3 className="font-serif text-base sm:text-lg font-bold text-parchment-900">
              No matching records found
            </h3>
            <p className="text-xs sm:text-sm text-parchment-600">
              Try adjusting your search terms or clearing the state filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedStateFilter('all');
              }}
              className="px-4 py-2 rounded-xl bg-parchment-100 hover:bg-parchment-200 text-xs font-semibold text-parchment-900 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
