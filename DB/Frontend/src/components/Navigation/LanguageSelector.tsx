import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown, Check, Sparkles } from 'lucide-react';
import { useLanguage, LanguageCode } from '../../context/LanguageContext';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  sublabel: string;
  region: string;
  flagEmoji: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  {
    code: 'en',
    label: 'English',
    nativeLabel: 'English',
    sublabel: 'Global Edition',
    region: 'International',
    flagEmoji: '🇬🇧'
  },
  {
    code: 'hi',
    label: 'Hindi',
    nativeLabel: 'हिन्दी',
    sublabel: 'हिंदी संस्करण',
    region: 'राष्ट्रीय भाषा',
    flagEmoji: '🇮🇳'
  },
  {
    code: 'mr',
    label: 'Marathi',
    nativeLabel: 'मराठी',
    sublabel: 'महाराष्ट्र आवृत्ती',
    region: 'राज्य भाषा',
    flagEmoji: '🇮🇳'
  }
];

export const LanguageSelector: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const activeOption = LANGUAGE_OPTIONS.find((opt) => opt.code === language) || LANGUAGE_OPTIONS[0];

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Keyboard navigation & accessibility (Escape to close)
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          const currentIndex = LANGUAGE_OPTIONS.findIndex((opt) => opt.code === language);
          const nextIndex = (currentIndex + 1) % LANGUAGE_OPTIONS.length;
          setLanguage(LANGUAGE_OPTIONS[nextIndex].code);
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          const currentIndex = LANGUAGE_OPTIONS.findIndex((opt) => opt.code === language);
          const prevIndex = (currentIndex - 1 + LANGUAGE_OPTIONS.length) % LANGUAGE_OPTIONS.length;
          setLanguage(LANGUAGE_OPTIONS[prevIndex].code);
        }
      }
    },
    [isOpen, language, setLanguage]
  );

  const handleSelect = (code: LanguageCode) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      className={`relative inline-block text-left select-none ${className}`}
    >
      {/* 1. CLOSED STATE: Compact, Refined Cultural Navigation Artifact */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Select language. Currently active: ${activeOption.nativeLabel}`}
        className={`group relative flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-white hover:bg-parchment-100/80 border transition-all duration-200 shadow-heritage-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 ${
          isOpen
            ? 'border-amber-400/80 ring-2 ring-amber-400/20 bg-parchment-50'
            : 'border-parchment-200/90 hover:border-parchment-400'
        }`}
      >
        <span className="flex items-center justify-center w-5 h-5 rounded-lg bg-amber-100/70 text-category-temples group-hover:scale-105 transition-transform shrink-0">
          <Globe className="w-3.5 h-3.5" />
        </span>

        <span className="font-serif text-xs sm:text-sm font-bold text-parchment-900 tracking-tight">
          {activeOption.nativeLabel}
        </span>

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="text-parchment-400 group-hover:text-category-temples transition-colors shrink-0"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </motion.span>
      </button>

      {/* 2. ELEGANT ANIMATED DROPDOWN MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 mt-2 w-64 sm:w-72 rounded-2xl bg-white/95 backdrop-blur-md border border-parchment-300/90 shadow-heritage-xl p-2 z-50 overflow-hidden text-parchment-900 texture-parchment"
          >
            {/* Header Kicker */}
            <div className="px-3 py-2 border-b border-parchment-200/80 flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-category-temples font-mono flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>भाषा / Language</span>
              </span>
              <span className="text-[10px] text-parchment-500 font-medium">3 Editions</span>
            </div>

            {/* Language Options List */}
            <ul
              ref={listRef}
              role="listbox"
              aria-label="Available Languages"
              className="space-y-1 focus:outline-none"
            >
              {LANGUAGE_OPTIONS.map((option, index) => {
                const isSelected = option.code === language;

                return (
                  <motion.li
                    key={option.code}
                    role="option"
                    aria-selected={isSelected}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15, delay: index * 0.04 }}
                  >
                    <button
                      type="button"
                      onClick={() => handleSelect(option.code)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all duration-150 group ${
                        isSelected
                          ? 'bg-amber-100/90 border border-amber-300/80 text-amber-950 shadow-xs'
                          : 'hover:bg-parchment-100/80 text-parchment-800 border border-transparent hover:border-parchment-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-base shrink-0 select-none">{option.flagEmoji}</span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`font-serif text-sm font-bold tracking-tight truncate ${
                                isSelected ? 'text-amber-950' : 'text-parchment-900 group-hover:text-category-temples'
                              }`}
                            >
                              {option.nativeLabel}
                            </span>
                            {option.code !== 'en' && (
                              <span className="text-[11px] text-parchment-500 font-sans">
                                ({option.label})
                              </span>
                            )}
                          </div>
                          <span className="block text-[11px] text-parchment-500 truncate font-sans">
                            {option.sublabel} · {option.region}
                          </span>
                        </div>
                      </div>

                      {/* Active Checkmark */}
                      {isSelected ? (
                        <span className="w-5 h-5 rounded-full bg-category-temples text-white flex items-center justify-center shrink-0 shadow-xs">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      ) : (
                        <span className="w-5 h-5 rounded-full border border-parchment-300 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      )}
                    </button>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
