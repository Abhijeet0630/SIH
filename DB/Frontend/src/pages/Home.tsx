import React, { useState } from 'react';
import { 
  ArrowRight, 
  CalendarDays, 
  Compass, 
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
  MapPin,
  ChevronRight,
  ArrowUpRight,
  Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CULTURAL_FESTIVALS } from '../data/festivals';
import { CULTURAL_CATEGORIES } from '../data/categories';
import { ALL_CULTURAL_ITEMS } from '../data/culturalItems';
import { IndiaMapExperience } from '../components/Map/IndiaMapExperience';

const getCategoryIcon = (id: string) => {
  switch (id) {
    case 'food': return <UtensilsCrossed className="w-4 h-4 sm:w-5 sm:h-5" />;
    case 'fashion': return <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />;
    case 'forts': return <Shield className="w-4 h-4 sm:w-5 sm:h-5" />;
    case 'temples': return <Landmark className="w-4 h-4 sm:w-5 sm:h-5" />;
    case 'monuments': return <Landmark className="w-4 h-4 sm:w-5 sm:h-5" />;
    case 'architecture': return <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />;
    case 'dance': return <Activity className="w-4 h-4 sm:w-5 sm:h-5" />;
    case 'music': return <Music className="w-4 h-4 sm:w-5 sm:h-5" />;
    case 'crafts': return <Palette className="w-4 h-4 sm:w-5 sm:h-5" />;
    case 'tribal': return <Trees className="w-4 h-4 sm:w-5 sm:h-5" />;
    case 'languages': return <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />;
    case 'festivals': return <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5" />;
    default: return <Compass className="w-4 h-4 sm:w-5 sm:h-5" />;
  }
};

import { FeaturedStoryBanner } from '../components/Home/FeaturedStoryBanner';
import { useTranslation } from '../hooks/useTranslation';

export const Home: React.FC = () => {
  const [festivalIndex, setFestivalIndex] = useState(0);
  const { t } = useTranslation();

  const currentFestival = CULTURAL_FESTIVALS[festivalIndex];

  return (
    <div className="home-shell bg-parchment-50 text-parchment-900 w-full overflow-hidden">
      
      {/* 1. EDITORIAL HERO: DIGITAL CULTURAL ATLAS (38% Narrative / 62% Storytelling Engine) */}
      <section className="texture-warp relative overflow-hidden py-8 sm:py-10 lg:py-12 border-b border-parchment-200">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Editorial Column (~38% Width) */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-4.5 max-w-xl">
              
              {/* Controlled Serif Headline */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.65rem] xl:text-[3.1rem] font-bold text-parchment-950 leading-[1.12] tracking-tight">
                {t('hero.headlineLine1') || 'Every Place'} <br className="hidden sm:inline" />
                <em className="font-normal italic text-category-temples">{t('hero.headlineLine2') || 'Carries a Story.'}</em>
              </h1>

              {/* Short Narrative Introduction */}
              <p className="text-parchment-700 max-w-[480px] font-sans leading-relaxed text-xs sm:text-sm">
                {t('hero.description') || 'From ancient landscapes and living traditions to food, art, architecture and music—explore the many cultures that continue to shape India.'}
              </p>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center gap-2.5 pt-0.5">
                <a 
                  href="#india-map" 
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-category-temples hover:bg-amber-800 text-white font-semibold text-xs sm:text-sm transition-all shadow-heritage-md hover:shadow-heritage-lg hover:-translate-y-0.5"
                >
                  <Compass className="w-4 h-4" />
                  <span>{t('hero.beginExploring') || 'Begin Exploring'}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <Link 
                  to="/categories" 
                  className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-white hover:bg-parchment-100 text-parchment-900 border border-parchment-300 font-semibold text-xs sm:text-sm transition-colors shadow-heritage-xs"
                >
                  <Layers className="w-4 h-4 text-category-temples" />
                  <span>{t('hero.browseLayers') || 'Browse Cultural Layers'}</span>
                </Link>
              </div>

              {/* Compact Cultural Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3.5 border-t border-parchment-200/80">
                <div className="min-w-0 pr-1">
                  <div className="font-serif text-base sm:text-lg lg:text-xl font-bold text-parchment-950">
                    {t('hero.statFortresses') || '350+'}
                  </div>
                  <div className="text-[10px] text-parchment-600 font-medium truncate uppercase tracking-wider">
                    {t('hero.statFortressesLabel') || 'Fortresses'}
                  </div>
                </div>
                <div className="min-w-0 pr-1">
                  <div className="font-serif text-base sm:text-lg lg:text-xl font-bold text-category-temples">
                    {t('hero.statLivingLayers') || '12'}
                  </div>
                  <div className="text-[10px] text-parchment-600 font-medium truncate uppercase tracking-wider">
                    {t('hero.statLivingLayersLabel') || 'Living Layers'}
                  </div>
                </div>
                <div className="min-w-0 pr-1">
                  <div className="font-serif text-base sm:text-lg lg:text-xl font-bold text-parchment-950">
                    {t('hero.statStatesUTs') || '36'}
                  </div>
                  <div className="text-[10px] text-parchment-600 font-medium truncate uppercase tracking-wider">
                    {t('hero.statStatesUTsLabel') || 'States & UTs'}
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="font-serif text-base sm:text-lg lg:text-xl font-bold text-emerald-800">
                    {t('hero.statUnescoSites') || '40+'}
                  </div>
                  <div className="text-[10px] text-parchment-600 font-medium truncate uppercase tracking-wider">
                    {t('hero.statUnescoSitesLabel') || 'UNESCO Sites'}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Immersive Cultural Storytelling Banner (~62% Width) */}
            <div className="lg:col-span-7 w-full">
              <FeaturedStoryBanner />
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE INDIA MAP EXPERIENCE (70-75% Map / 25-30% Left Content) */}
      <section id="india-map" className="py-10 sm:py-14 border-b border-parchment-200 bg-parchment-100/30">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <IndiaMapExperience />
        </div>
      </section>

      {/* 3. SECTION TRANSITION: "Explore India Through Culture" (Taxonomy of Discovery) */}
      <section id="explore-culture" className="py-10 sm:py-14 bg-white/70 border-b border-parchment-200">
        <div className="site-container space-y-7 sm:space-y-8">
          
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-1.5">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-parchment-950 leading-tight">
                {t('taxonomy.title') || 'Explore India Through Culture'}
              </h2>
              <p className="text-xs sm:text-sm text-parchment-600 max-w-xl">
                {t('taxonomy.description') || 'Choose a cultural lens to reveal living traditions across regions, or journey directly into state spatial atlases.'}
              </p>
            </div>

            <Link 
              to="/categories" 
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-category-temples hover:underline"
            >
              <span>{t('taxonomy.viewAllCategories') || 'View All 12 Cultural Layers'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Cultural Layer Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {CULTURAL_CATEGORIES.filter(c => c.id !== 'all').map(cat => (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                className="group p-3.5 sm:p-4 bg-white rounded-2xl border border-parchment-200 hover:border-category-temples shadow-heritage-xs hover:shadow-heritage-md transition-all hover:-translate-y-0.5 flex flex-col justify-between"
              >
                <div>
                  <div 
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center mb-2 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${cat.accentColor}18`, color: cat.accentColor }}
                  >
                    {getCategoryIcon(cat.id)}
                  </div>

                  <h3 className="font-serif text-sm sm:text-base font-bold text-parchment-900 group-hover:text-category-temples transition-colors leading-snug">
                    {t(`categories.${cat.id}`) || cat.defaultLabel}
                  </h3>
                  <p className="text-[11px] text-parchment-600 mt-1 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-2.5 pt-2 border-t border-parchment-100 flex items-center justify-between text-[11px] font-semibold" style={{ color: cat.accentColor }}>
                  <span>{t('taxonomy.exploreLayer') || 'Explore Layer'}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED STATE ARCHIVES SPOTLIGHT (Maharashtra, Assam, Meghalaya) */}
      <section className="py-10 sm:py-14 bg-parchment-100/50 border-b border-parchment-200">
        <div className="site-container space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-[11px] uppercase font-bold tracking-widest text-category-temples block">
              {t('stateAtlases.kicker') || 'Regional Deep-Dives'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-parchment-950">
              {t('stateAtlases.title') || 'Featured State Spatial Atlases'}
            </h2>
            <p className="text-xs sm:text-sm text-parchment-600 max-w-2xl mx-auto">
              {t('stateAtlases.description') || 'Explore spatial maps with authoritative GIS district geometry, regional divisions, and verified cultural coordinates.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            
            {/* Maharashtra Card */}
            <div className="group bg-white rounded-3xl overflow-hidden border border-parchment-200 shadow-heritage-sm hover:shadow-heritage-lg transition-all flex flex-col">
              <div className="relative aspect-[16/10] overflow-hidden bg-parchment-100">
                <img 
                  src="https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1000&q=80" 
                  alt="Maharashtra Heritage"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-950/80 backdrop-blur-xs text-amber-100 border border-amber-700/50">
                  Western Core Hub
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5">
                <div>
                  <div className="text-xs font-serif font-bold text-category-temples uppercase tracking-wider">
                    West India · महाराष्ट्र
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-parchment-950 mt-1">
                    Maharashtra
                  </h3>
                  <p className="text-xs sm:text-sm text-parchment-600 mt-1.5 leading-relaxed">
                    Home to 350+ Sahyadri mountain fortresses of Chhatrapati Shivaji Maharaj, UNESCO rock temples of Kailasa at Ellora, royal Paithani handlooms, and energetic Lavani folk dances.
                  </p>
                </div>

                <div className="pt-3 border-t border-parchment-200 flex items-center justify-between">
                  <span className="text-xs text-parchment-500 font-medium">
                    36 Districts · 5 Regions
                  </span>
                  <Link 
                    to="/state/maharashtra"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-category-temples hover:text-amber-800"
                  >
                    <span>{t('stateAtlases.launchAtlas') || 'Launch Atlas'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Assam Card */}
            <div className="group bg-white rounded-3xl overflow-hidden border border-parchment-200 shadow-heritage-sm hover:shadow-heritage-lg transition-all flex flex-col">
              <div className="relative aspect-[16/10] overflow-hidden bg-parchment-100">
                <img 
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80" 
                  alt="Assam Heritage"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-950/80 backdrop-blur-xs text-emerald-100 border border-emerald-700/50">
                  Northeast Gateway
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5">
                <div>
                  <div className="text-xs font-serif font-bold text-emerald-800 uppercase tracking-wider">
                    Northeast India · অসম
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-parchment-950 mt-1">
                    Assam
                  </h3>
                  <p className="text-xs sm:text-sm text-parchment-600 mt-1.5 leading-relaxed">
                    Lush Brahmaputra valleys renowned for natural golden Muga silk, 500-year-old Samaguri Satra bamboo mask craft in Majuli, Tai-Ahom Rang Ghar amphitheater, and spring Rongali Bihu.
                  </p>
                </div>

                <div className="pt-3 border-t border-parchment-200 flex items-center justify-between">
                  <span className="text-xs text-parchment-500 font-medium">
                    23 Districts · Majuli Island
                  </span>
                  <Link 
                    to="/state/assam"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950"
                  >
                    <span>{t('stateAtlases.launchAtlas') || 'Launch Atlas'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Meghalaya Card */}
            <div className="group bg-white rounded-3xl overflow-hidden border border-parchment-200 shadow-heritage-sm hover:shadow-heritage-lg transition-all flex flex-col">
              <div className="relative aspect-[16/10] overflow-hidden bg-parchment-100">
                <img 
                  src="https://images.unsplash.com/photo-1627894006066-b45786537123?auto=format&fit=crop&w=1000&q=80" 
                  alt="Meghalaya Heritage"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold bg-cyan-950/80 backdrop-blur-xs text-cyan-100 border border-cyan-700/50">
                  Living Architecture
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5">
                <div>
                  <div className="text-xs font-serif font-bold text-cyan-800 uppercase tracking-wider">
                    Northeast India · मेघालय
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-parchment-950 mt-1">
                    Meghalaya
                  </h3>
                  <p className="text-xs sm:text-sm text-parchment-600 mt-1.5 leading-relaxed">
                    The "Abode of Clouds", featuring generational living root bridges in Cherrapunji, 800-year-old Mawphlang sacred groves, matrilineal clan heritage, and Shad Suk Mynsiem dances.
                  </p>
                </div>

                <div className="pt-3 border-t border-parchment-200 flex items-center justify-between">
                  <span className="text-xs text-parchment-500 font-medium">
                    7 Districts · Khasi, Garo & Jaintia
                  </span>
                  <Link 
                    to="/state/meghalaya"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-800 hover:text-cyan-950"
                  >
                    <span>{t('stateAtlases.launchAtlas') || 'Launch Atlas'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5. 3D MONUMENT DIGITAL EXHIBITIONS SPOTLIGHT */}
      <section id="monuments-3d" className="py-12 sm:py-16 bg-gradient-to-b from-parchment-900 via-stone-900 to-parchment-950 text-white border-y border-parchment-800">
        <div className="site-container space-y-8 sm:space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[11px] uppercase font-bold tracking-widest text-amber-400 font-mono flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('monuments3D.kicker') || '3D Architectural Explorations'}</span>
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-100">
                {t('monuments3D.title') || 'Spatial Reconstructions in 3D'}
              </h2>
              <p className="text-xs sm:text-sm text-parchment-300 leading-relaxed">
                {t('monuments3D.description') || "Step into India's monumental architectural feats. Inspect rock-cut sanctuaries, triumphal basalt arches, and living botanical suspension spans from every spatial angle."}
              </p>
            </div>

            <Link
              to="/monument/ellora-caves"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs sm:text-sm transition-all shadow-sm shrink-0"
            >
              <span>{t('monuments3D.launch3DExplorer') || 'Launch 3D Explorer'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Monument 1: Ellora Caves */}
            <Link
              to="/monument/ellora-caves"
              className="group bg-white/5 hover:bg-white/10 rounded-3xl overflow-hidden border border-white/10 hover:border-amber-400/50 transition-all flex flex-col justify-between shadow-heritage-md hover:-translate-y-1"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                  <img
                    src="https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80"
                    alt="Kailasa Temple, Ellora"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase tracking-wider bg-amber-500 text-stone-950 shadow-sm">
                    {t('monuments3D.modelAvailable') || '3D Available'}
                  </span>
                </div>
                <div className="p-4 space-y-1.5">
                  <span className="text-[10px] uppercase font-mono text-amber-400 font-semibold block">
                    Maharashtra · Marathwada
                  </span>
                  <h3 className="font-serif text-base font-bold text-amber-100 group-hover:text-amber-300 transition-colors">
                    Kailasa Temple, Ellora
                  </h3>
                  <p className="text-xs text-parchment-400 line-clamp-2 leading-relaxed">
                    World’s largest monolithic rock excavation carved top-down from volcanic basalt.
                  </p>
                </div>
              </div>
              <div className="p-4 pt-0">
                <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:text-amber-300">
                  <span>{t('monuments3D.exploreIn3D') || 'Explore in 3D'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Monument 2: Gateway of India */}
            <Link
              to="/monument/gateway-of-india"
              className="group bg-white/5 hover:bg-white/10 rounded-3xl overflow-hidden border border-white/10 hover:border-amber-400/50 transition-all flex flex-col justify-between shadow-heritage-md hover:-translate-y-1"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                  <img
                    src="https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80"
                    alt="Gateway of India"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase tracking-wider bg-amber-500 text-stone-950 shadow-sm">
                    {t('monuments3D.modelAvailable') || '3D Available'}
                  </span>
                </div>
                <div className="p-4 space-y-1.5">
                  <span className="text-[10px] uppercase font-mono text-amber-400 font-semibold block">
                    Maharashtra · Mumbai
                  </span>
                  <h3 className="font-serif text-base font-bold text-amber-100 group-hover:text-amber-300 transition-colors">
                    Gateway of India
                  </h3>
                  <p className="text-xs text-parchment-400 line-clamp-2 leading-relaxed">
                    Indo-Saracenic yellow basalt archway on the historic Arabian Sea waterfront.
                  </p>
                </div>
              </div>
              <div className="p-4 pt-0">
                <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:text-amber-300">
                  <span>{t('monuments3D.exploreIn3D') || 'Explore in 3D'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Monument 3: Raigad Fort Shivaji Statue */}
            <Link
              to="/monument/raigad-fort-shivaji-statue"
              className="group bg-white/5 hover:bg-white/10 rounded-3xl overflow-hidden border border-white/10 hover:border-amber-400/50 transition-all flex flex-col justify-between shadow-heritage-md hover:-translate-y-1"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                  <img
                    src="https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80"
                    alt="Raigad Fort Memorial"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase tracking-wider bg-amber-500 text-stone-950 shadow-sm">
                    {t('monuments3D.modelAvailable') || '3D Available'}
                  </span>
                </div>
                <div className="p-4 space-y-1.5">
                  <span className="text-[10px] uppercase font-mono text-amber-400 font-semibold block">
                    Maharashtra · Raigad
                  </span>
                  <h3 className="font-serif text-base font-bold text-amber-100 group-hover:text-amber-300 transition-colors">
                    Shivaji Maharaj Statue, Raigad
                  </h3>
                  <p className="text-xs text-parchment-400 line-clamp-2 leading-relaxed">
                    Carved basalt Meghadambari canopy and royal memorial in the high Sahyadris.
                  </p>
                </div>
              </div>
              <div className="p-4 pt-0">
                <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:text-amber-300">
                  <span>{t('monuments3D.exploreIn3D') || 'Explore in 3D'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Monument 4: Living Root Bridge */}
            <Link
              to="/monument/living-root-bridge"
              className="group bg-white/5 hover:bg-white/10 rounded-3xl overflow-hidden border border-white/10 hover:border-amber-400/50 transition-all flex flex-col justify-between shadow-heritage-md hover:-translate-y-1"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                  <img
                    src="https://images.unsplash.com/photo-1627894006066-b45786537123?auto=format&fit=crop&w=800&q=80"
                    alt="Living Root Bridge"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase tracking-wider bg-amber-500 text-stone-950 shadow-sm">
                    {t('monuments3D.modelAvailable') || '3D Available'}
                  </span>
                </div>
                <div className="p-4 space-y-1.5">
                  <span className="text-[10px] uppercase font-mono text-amber-400 font-semibold block">
                    Meghalaya · Khasi Hills
                  </span>
                  <h3 className="font-serif text-base font-bold text-amber-100 group-hover:text-amber-300 transition-colors">
                    Double Decker Root Bridge
                  </h3>
                  <p className="text-xs text-parchment-400 line-clamp-2 leading-relaxed">
                    Centuries-old regenerative botanical bridge guided across rainforest torrents.
                  </p>
                </div>
              </div>
              <div className="p-4 pt-0">
                <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:text-amber-300">
                  <span>{t('monuments3D.exploreIn3D') || 'Explore in 3D'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. FOUR PILLARS OF LIVING HERITAGE */}
      <section id="diversity-pillars" className="py-10 sm:py-14 border-b border-parchment-200">
        <div className="site-container space-y-8 sm:space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-[11px] uppercase font-bold tracking-widest text-category-temples block">
              {t('fourPillars.kicker') || 'Civilizational Continuum'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-parchment-950">
              {t('fourPillars.title') || 'Four Pillars of Living Heritage'}
            </h2>
            <p className="text-xs sm:text-sm text-parchment-600 max-w-2xl mx-auto">
              {t('fourPillars.description') || 'Across geographic micro-climates and ancient trade corridors, India developed interconnected artistic, architectural, and culinary systems.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            <div className="bg-white p-5 rounded-2xl border border-parchment-200 shadow-heritage-xs hover:shadow-heritage-md transition-shadow space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-category-temples font-bold">
                <Shield className="w-4 h-4" />
              </div>
              <h3 className="font-serif text-base font-bold text-parchment-900">
                {t('fourPillars.pillar1Title') || 'Forts & Bio-Engineering'}
              </h3>
              <p className="text-xs text-parchment-600 leading-relaxed">
                {t('fourPillars.pillar1Desc') || 'From the basalt mountain bastions of Raigad to Meghalaya’s 250-year-old living botanical root bridges guided through torrential river gorges.'}
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-parchment-200 shadow-heritage-xs hover:shadow-heritage-md transition-shadow space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center text-rose-800 font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-serif text-base font-bold text-parchment-900">
                {t('fourPillars.pillar2Title') || 'Handloom Weaves & Silks'}
              </h3>
              <p className="text-xs text-parchment-600 leading-relaxed">
                {t('fourPillars.pillar2Desc') || 'Centuries of tapestry interlock in 2000-year-old Paithani sarees and the indestructible golden luster of Assamese wild Muga silk.'}
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-parchment-200 shadow-heritage-xs hover:shadow-heritage-md transition-shadow space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-100 flex items-center justify-center text-teal-800 font-bold">
                <Activity className="w-4 h-4" />
              </div>
              <h3 className="font-serif text-base font-bold text-parchment-900">
                {t('fourPillars.pillar3Title') || 'Folk Poly-Rhythms'}
              </h3>
              <p className="text-xs text-parchment-600 leading-relaxed">
                {t('fourPillars.pillar3Desc') || 'The thunderous Dholki polyrhythms of Marathi Lavani, the spring buffalo-horn Pepa melodies of Bihu, and the sacred drums of Wangala.'}
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-parchment-200 shadow-heritage-xs hover:shadow-heritage-md transition-shadow space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center text-orange-800 font-bold">
                <UtensilsCrossed className="w-4 h-4" />
              </div>
              <h3 className="font-serif text-base font-bold text-parchment-900">
                {t('fourPillars.pillar4Title') || 'Sacred Culinary Arts'}
              </h3>
              <p className="text-xs text-parchment-600 leading-relaxed">
                {t('fourPillars.pillar4Desc') || 'Ayurvedic Goda Masala-infused Puneri Misal, steam-molded Ukadiche Modak, and probiotic fermented bamboo shoot delicacies.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. LIVING CULTURAL CALENDAR IN MOTION */}
      <section className="py-10 sm:py-14 bg-white border-b border-parchment-200">
        <div className="site-container space-y-7 sm:space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[11px] uppercase font-bold tracking-widest text-category-festivals flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4 text-category-festivals" />
                <span>{t('culturalCalendar.kicker') || 'Living Solar & Lunar Cycles'}</span>
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-parchment-950 mt-1">
                {t('culturalCalendar.title') || 'The Cultural Calendar in Motion'}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setFestivalIndex((festivalIndex - 1 + CULTURAL_FESTIVALS.length) % CULTURAL_FESTIVALS.length)}
                className="p-2.5 rounded-full border border-parchment-300 hover:bg-parchment-100 text-parchment-800 transition-colors font-bold"
                aria-label="Previous festival"
              >
                ←
              </button>
              <button 
                onClick={() => setFestivalIndex((festivalIndex + 1) % CULTURAL_FESTIVALS.length)}
                className="p-2.5 rounded-full border border-parchment-300 hover:bg-parchment-100 text-parchment-800 transition-colors font-bold"
                aria-label="Next festival"
              >
                →
              </button>
            </div>
          </div>

          <div className="max-w-4xl mx-auto w-full">
            <AnimatePresence mode="wait">
              {currentFestival && (
                <motion.article 
                  key={currentFestival.id} 
                  className="bg-parchment-50 rounded-3xl p-5 sm:p-7 border border-parchment-200 shadow-heritage-md grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-6 items-center"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.22 }}
                >
                  <div className="sm:col-span-5 rounded-2xl overflow-hidden aspect-[4/3] bg-parchment-200 shadow-xs">
                    <img 
                      src={currentFestival.image} 
                      alt={currentFestival.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="sm:col-span-7 space-y-3 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300/60">
                        {currentFestival.state}
                      </span>
                      <span className="text-xs font-medium text-parchment-500">
                        {currentFestival.dateOrSeason}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-parchment-950">
                      {currentFestival.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-parchment-700 leading-relaxed">
                      {currentFestival.shortDescription}
                    </p>

                    {currentFestival.traditionalPractices && currentFestival.traditionalPractices.length > 0 && (
                      <div className="pt-1">
                        <div className="text-[10px] font-bold text-parchment-500 uppercase tracking-wider mb-1">
                          {t('culturalCalendar.keyPractices') || 'Key Living Practices:'}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {currentFestival.traditionalPractices.map((p, i) => (
                            <span key={i} className="text-[11px] px-2.5 py-0.5 rounded-md bg-white border border-parchment-200 text-parchment-800">
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-2">
                      <Link 
                        to="/festivals" 
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-category-temples hover:underline"
                      >
                        <span>{t('culturalCalendar.exploreCompleteCalendar') || 'Explore Complete Calendar'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 7. FINAL INVITATION CTA BANNER */}
      <section className="py-12 sm:py-16 bg-gradient-to-tr from-amber-900 to-amber-950 text-white text-center">
        <div className="site-container">
          <div className="max-w-3xl mx-auto space-y-4 sm:space-y-5">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-800/80 text-amber-200 border border-amber-600">
              {t('invitationCta.kicker') || 'Open Digital Access'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              {t('invitationCta.title') || 'Begin your journey across India’s living cultural heritage.'}
            </h2>
            <p className="text-xs sm:text-sm text-amber-200/90 max-w-xl mx-auto leading-relaxed">
              {t('invitationCta.description') || 'From the Sahyadris to the Brahmaputra Valley, discover interconnected folklore, monuments in 3D, and centuries of artistic mastery.'}
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <a 
                href="#india-map" 
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-xs sm:text-sm transition-colors shadow-lg"
              >
                {t('invitationCta.openAtlasCta') || 'Open Interactive Atlas'}
              </a>
              <Link 
                to="/festivals" 
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-xs sm:text-sm transition-colors"
              >
                {t('invitationCta.viewCalendarCta') || 'View Cultural Calendar'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
