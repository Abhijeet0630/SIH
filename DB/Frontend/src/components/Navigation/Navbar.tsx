import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Compass, Sparkles, CalendarDays, Layers, Info, Landmark } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';
import { LanguageSelector } from './LanguageSelector';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();

  const navLinks = [
    { label: t('nav.home') || 'Home', path: '/', icon: Compass },
    { label: t('nav.exploreIndia') || 'Explore India', path: '/explore', icon: Sparkles },
    { label: t('nav.monuments3D') || '3D Monuments', path: '/monument/ellora-caves', icon: Landmark },
    { label: t('nav.categories') || 'Cultural Layers', path: '/categories', icon: Layers },
    { label: t('nav.festivals') || 'Festivals', path: '/festivals', icon: CalendarDays },
    { label: t('nav.about') || 'About', path: '/about', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-parchment-200/80 transition-colors shadow-heritage-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
        
        {/* Brand / Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-3 group shrink-0 min-w-0"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-amber-700 to-amber-900 text-white flex items-center justify-center font-bold text-base sm:text-lg shadow-heritage-xs group-hover:scale-105 transition-transform shrink-0">
            भारत
          </div>
          <div className="min-w-0">
            <span className="block text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-category-temples truncate">
              {t('nav.brandKicker') || 'National Cultural Atlas'}
            </span>
            <span className="block font-serif text-sm sm:text-base font-bold text-parchment-950 tracking-tight truncate group-hover:text-category-temples transition-colors">
              {t('nav.brandTitle') || 'Heritage India'}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3.5 py-2 rounded-xl text-xs lg:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-amber-700 text-white shadow-heritage-xs font-bold'
                    : 'text-parchment-800 hover:text-amber-800 hover:bg-amber-50/80'
                }`}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Nav Tools (Custom Language Selector + Mobile Toggle) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Custom Animated Language Selector */}
          <LanguageSelector />

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-parchment-100 border border-parchment-200 text-parchment-800 hover:text-parchment-950 hover:bg-parchment-200 transition-colors focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Animated Dropdown Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="md:hidden border-t border-parchment-200 bg-white/95 backdrop-blur-md px-4 py-4 space-y-1.5 shadow-heritage-lg overflow-hidden"
          >
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.path !== '/' && location.pathname.startsWith(item.path));
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-700 text-white shadow-xs font-bold'
                      : 'text-parchment-800 hover:bg-amber-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-category-temples'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
