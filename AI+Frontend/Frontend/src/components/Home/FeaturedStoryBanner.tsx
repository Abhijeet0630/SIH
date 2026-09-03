import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, Sparkles, ChevronLeft, ChevronRight, Compass } from 'lucide-react';

export interface FeaturedCulturalStory {
  id: string;
  storyIndex: string;
  category: string;
  title: string;
  location: string;
  region_or_district: string;
  state: string;
  stateId: string;
  story: string;
  image: string;
  alt: string;
  route: string;
  accentColor: string;
}

export const CULTURAL_STORIES: FeaturedCulturalStory[] = [
  {
    id: 'sahyadri-forts',
    storyIndex: '01',
    category: 'FORTS & ARCHITECTURE',
    title: 'Sahyadri Mountain Fortresses',
    location: 'Raigad',
    region_or_district: 'Western Ghats & Konkan',
    state: 'Maharashtra',
    stateId: 'maharashtra',
    story: 'Perched atop sheer basalt precipices, explore the military architecture, rock cisterns, and living folklore of over 350 mountain citadels engineered by Chhatrapati Shivaji Maharaj.',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1600&q=85',
    alt: 'Stone ramparts and bastions of Raigad Fort amidst the Sahyadri mountains of Maharashtra',
    route: '/item/raigad-fort',
    accentColor: '#D97706'
  },
  {
    id: 'muga-silk',
    storyIndex: '02',
    category: 'LIVING HANDLOOMS',
    title: 'Golden Muga Wild Silk',
    location: 'Sualkuchi & Majuli',
    region_or_district: 'Brahmaputra Valley',
    state: 'Assam',
    stateId: 'assam',
    story: 'Naturally lustrous with the shimmer of molten gold, discover 500-year-old Sualkuchi weaving lineages, royal Ahom Kingkhap motifs, and riverine Satra textile traditions.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85',
    alt: 'Lustrous golden Assamese Muga silk handloom textile woven with traditional motifs',
    route: '/item/assam-muga-silk',
    accentColor: '#059669'
  },
  {
    id: 'living-root-bridges',
    storyIndex: '03',
    category: 'BIO-ARCHITECTURE',
    title: 'Living Root Bridges (Jingkieng Jri)',
    location: 'Cherrapunji & Nongriat',
    region_or_district: 'East Khasi Hills',
    state: 'Meghalaya',
    stateId: 'meghalaya',
    story: 'Guided across torrent river gorges over decades by Khasi tribal clans, living rubber fig tree roots interlock with boulders to create self-healing botanical suspension bridges.',
    image: 'https://images.unsplash.com/photo-1627894006066-b45786537123?auto=format&fit=crop&w=1600&q=85',
    alt: 'Centuries-old living root bridge bio-engineered over crystal mountain stream in Meghalaya',
    route: '/item/meghalaya-living-root-bridge',
    accentColor: '#0891B2'
  },
  {
    id: 'kailasa-temple',
    storyIndex: '04',
    category: 'UNESCO ROCK ARCHITECTURE',
    title: 'Kailasa Monolithic Temple',
    location: 'Ellora Caves (Cave 16)',
    region_or_district: 'Chhatrapati Sambhajinagar',
    state: 'Maharashtra',
    stateId: 'maharashtra',
    story: 'The world’s largest monolithic rock excavation, carved top-down from a single volcanic basalt cliffside in the 8th century by master Rashtrakuta sculptors without joining stone blocks.',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1600&q=85',
    alt: 'Monolithic rock-cut Kailasa Temple carved vertically from basalt cliff at Ellora',
    route: '/item/ellora-kailasa-caves',
    accentColor: '#B45309'
  },
  {
    id: 'majuli-masks',
    storyIndex: '05',
    category: 'RITUALS & FOLK CRAFT',
    title: 'Majuli Island Mask Traditions',
    location: 'Samaguri Satra',
    region_or_district: 'Brahmaputra River',
    state: 'Assam',
    stateId: 'assam',
    story: 'Crafted from river silt clay, split bamboo armatures, and natural vegetable pigments, discover the centuries-old Bhaona theatrical mask-making lineages of Majuli Island.',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=85',
    alt: 'Traditional bamboo and clay mask making in Majuli Island of Assam',
    route: '/state/assam',
    accentColor: '#059669'
  },
  {
    id: 'sacred-gastronomy',
    storyIndex: '06',
    category: 'SACRED GASTRONOMY',
    title: 'Puran Poli & Ayurvedic Spices',
    location: 'Deccan Plateau',
    region_or_district: 'Desh & Marathwada',
    state: 'Maharashtra',
    stateId: 'maharashtra',
    story: 'From festive cardamom-infused Puran Poli flatbreads to Goda Masala-simmered curries, explore culinary wisdom rooted in solar harvest calendars and Ayurvedic medicine.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1600&q=85',
    alt: 'Traditional Maharashtrian festive gastronomy with brass thali and heritage spices',
    route: '/category/food',
    accentColor: '#C2410C'
  }
];

export const FeaturedStoryBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const current = CULTURAL_STORIES[currentIndex];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % CULTURAL_STORIES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + CULTURAL_STORIES.length) % CULTURAL_STORIES.length);
  }, []);

  // Gentle, calm auto-advance that pauses on hover/focus and respects reduced motion
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  // Touch swipe support for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    setTouchStart(null);
  };

  // Keyboard navigation support
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      handlePrev();
    }
  };

  return (
    <div 
      className="featured-story-banner relative w-full h-[470px] sm:h-[510px] lg:h-[540px] rounded-3xl overflow-hidden shadow-heritage-lg border border-parchment-300/80 bg-parchment-950 flex flex-col justify-between select-none outline-none focus:ring-2 focus:ring-amber-500/50"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Interactive Cultural Storytelling Engine"
    >
      {/* 1. CINEMATIC FULL VISUAL BACKGROUND */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <img
            src={current.image}
            alt={current.alt}
            className="w-full h-full object-cover object-center"
          />
          {/* Multi-layered cinematic gradient for pure editorial readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent sm:w-4/5" />
        </motion.div>
      </AnimatePresence>

      {/* 2. TOP STORY HEADER: Category Badge + Story Index + Arrow Controls */}
      <div className="relative z-10 p-4 sm:p-6 flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[11px] font-bold tracking-wider text-amber-200 uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Living Cultural Story</span>
          </span>
          <span className="text-xs font-mono text-white/70">
            {current.storyIndex} / 0{CULTURAL_STORIES.length}
          </span>
        </div>

        {/* Tactile Navigation Arrows */}
        <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md rounded-full p-1 border border-white/15">
          <button
            onClick={handlePrev}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors focus:outline-none"
            aria-label="Previous cultural story"
            title="Previous story (Left Arrow)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="w-px h-3.5 bg-white/20" />
          <button
            onClick={handleNext}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors focus:outline-none"
            aria-label="Next cultural story"
            title="Next story (Right Arrow)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. CORE EDITORIAL NARRATIVE OVERLAY */}
      <div className="relative z-10 p-5 sm:p-7 lg:p-8 space-y-3.5 max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="space-y-3"
          >
            {/* Location & Category Kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold uppercase tracking-widest text-amber-300 font-sans text-[11px]">
                {current.category}
              </span>
              <span className="text-white/40">·</span>
              <span className="inline-flex items-center gap-1 text-white/90 font-medium">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{current.location}, {current.state}</span>
              </span>
            </div>

            {/* Display Story Title */}
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight drop-shadow-md">
              {current.title}
            </h2>

            {/* Narrative Story Lore */}
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-sans line-clamp-3 max-w-xl">
              {current.story}
            </p>

            {/* Direct Deep-Dive Action Button */}
            <div className="pt-2">
              <Link
                to={current.route}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-category-temples hover:bg-amber-600 text-white font-semibold text-xs sm:text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <span>Explore Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 4. BOTTOM NUMBERED STORY SELECTOR TABS */}
      <div className="relative z-10 px-4 sm:px-6 py-2.5 bg-black/40 backdrop-blur-md border-t border-white/10 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {CULTURAL_STORIES.map((story, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={story.id}
              onClick={() => setCurrentIndex(idx)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all shrink-0 flex items-center gap-1.5 ${
                isActive
                  ? 'bg-white text-parchment-950 font-bold shadow-xs scale-[1.02]'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="font-mono text-[10px] opacity-75">{story.storyIndex}</span>
              <span className="truncate max-w-[120px]">{story.title.split('(')[0].trim()}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
