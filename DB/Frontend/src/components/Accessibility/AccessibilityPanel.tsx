import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, 
  X, 
  ZoomIn, 
  ZoomOut, 
  SunMedium, 
  Contrast, 
  MousePointer, 
  MoveDiagonal, 
  RotateCcw,
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useTranslation } from '../../hooks/useTranslation';

export const AccessibilityPanel: React.FC = () => {
  const { 
    settings, 
    isOpen, 
    setIsOpen, 
    increaseTextSize, 
    decreaseTextSize,
    setTextSize,
    toggleHighContrast, 
    toggleGrayscale, 
    toggleInvertColors, 
    toggleReduceMotion, 
    toggleEnhancedCursor, 
    resetSettings 
  } = useAccessibility();

  const { t } = useTranslation();

  return (
    <>
      {/* Floating Trigger Button on Right-Center Edge */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={t('accessibility.panelTitle')}
          className="bg-parchment-900 text-parchment-50 hover:bg-category-temples p-3 rounded-l-2xl shadow-heritage-lg border-y border-l border-parchment-300/30 transition-all duration-300 flex flex-col items-center gap-1.5 group focus:outline-none focus:ring-2 focus:ring-category-temples"
        >
          <SlidersHorizontal className="w-5 h-5 text-category-temples group-hover:text-white transition-colors" />
          <span className="text-[10px] uppercase font-bold tracking-wider [writing-mode:vertical-lr] rotate-180">
            A11y
          </span>
        </button>
      </div>

      {/* Floating Panel Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-parchment-950/40 backdrop-blur-sm z-50"
            />

            {/* Modal Drawer */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-parchment-50 border-l border-parchment-200 shadow-2xl z-50 p-6 overflow-y-auto flex flex-col justify-between texture-parchment"
              role="dialog"
              aria-modal="true"
              aria-labelledby="a11y-title"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-parchment-200">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-category-temples/10 text-category-temples">
                      <Eye className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 id="a11y-title" className="text-lg font-bold font-serif text-parchment-900">
                        {t('accessibility.panelTitle')}
                      </h2>
                      <p className="text-xs text-parchment-600">
                        Personalize display & interaction preferences
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl hover:bg-parchment-200 text-parchment-600 transition-colors"
                    aria-label="Close accessibility panel"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Controls List */}
                <div className="space-y-4 mt-6">
                  {/* Font Size Scaling */}
                  <div className="p-4 bg-white/70 border border-parchment-200 rounded-2xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-parchment-800">
                        {t('accessibility.textSize')}
                      </span>
                      <span className="text-xs uppercase tracking-wider font-mono font-medium px-2 py-0.5 rounded bg-parchment-100 text-parchment-700">
                        {settings.textSize}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={decreaseTextSize}
                        className={`py-2 px-3 text-xs font-medium rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                          settings.textSize === 'small'
                            ? 'bg-category-temples text-white border-category-temples shadow-sm'
                            : 'bg-parchment-100 hover:bg-parchment-200 border-parchment-200 text-parchment-800'
                        }`}
                      >
                        <ZoomOut className="w-3.5 h-3.5" />
                        Small
                      </button>
                      <button
                        onClick={() => setTextSize('default')}
                        className={`py-2 px-3 text-xs font-medium rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                          settings.textSize === 'default'
                            ? 'bg-category-temples text-white border-category-temples shadow-sm'
                            : 'bg-parchment-100 hover:bg-parchment-200 border-parchment-200 text-parchment-800'
                        }`}
                      >
                        Default
                      </button>
                      <button
                        onClick={increaseTextSize}
                        className={`py-2 px-3 text-xs font-medium rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                          settings.textSize === 'large'
                            ? 'bg-category-temples text-white border-category-temples shadow-sm'
                            : 'bg-parchment-100 hover:bg-parchment-200 border-parchment-200 text-parchment-800'
                        }`}
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                        Large
                      </button>
                    </div>
                  </div>

                  {/* High Contrast */}
                  <div className="p-4 bg-white/70 border border-parchment-200 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-parchment-100 text-parchment-800">
                        <Contrast className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-parchment-900">
                          {t('accessibility.highContrast')}
                        </div>
                        <div className="text-xs text-parchment-600">Pure high-contrast theme</div>
                      </div>
                    </div>
                    <button
                      onClick={toggleHighContrast}
                      role="switch"
                      aria-checked={settings.highContrast}
                      className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                        settings.highContrast ? 'bg-category-temples justify-end' : 'bg-parchment-300 justify-start'
                      }`}
                    >
                      <motion.div
                        layout
                        className="bg-white w-4 h-4 rounded-full shadow-sm"
                      />
                    </button>
                  </div>

                  {/* Grayscale (Black & White) */}
                  <div className="p-4 bg-white/70 border border-parchment-200 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-parchment-100 text-parchment-800">
                        <SunMedium className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-parchment-900">
                          {t('accessibility.grayscale')}
                        </div>
                        <div className="text-xs text-parchment-600">Remove all color saturation</div>
                      </div>
                    </div>
                    <button
                      onClick={toggleGrayscale}
                      role="switch"
                      aria-checked={settings.grayscale}
                      className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                        settings.grayscale ? 'bg-category-temples justify-end' : 'bg-parchment-300 justify-start'
                      }`}
                    >
                      <motion.div
                        layout
                        className="bg-white w-4 h-4 rounded-full shadow-sm"
                      />
                    </button>
                  </div>

                  {/* Invert Colors */}
                  <div className="p-4 bg-white/70 border border-parchment-200 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-parchment-100 text-parchment-800">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-parchment-900">
                          {t('accessibility.invertColors')}
                        </div>
                        <div className="text-xs text-parchment-600">Invert page color spectrum</div>
                      </div>
                    </div>
                    <button
                      onClick={toggleInvertColors}
                      role="switch"
                      aria-checked={settings.invertColors}
                      className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                        settings.invertColors ? 'bg-category-temples justify-end' : 'bg-parchment-300 justify-start'
                      }`}
                    >
                      <motion.div
                        layout
                        className="bg-white w-4 h-4 rounded-full shadow-sm"
                      />
                    </button>
                  </div>

                  {/* Reduce Motion */}
                  <div className="p-4 bg-white/70 border border-parchment-200 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-parchment-100 text-parchment-800">
                        <MoveDiagonal className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-parchment-900">
                          {t('accessibility.reduceMotion')}
                        </div>
                        <div className="text-xs text-parchment-600">Disable transitions & motion</div>
                      </div>
                    </div>
                    <button
                      onClick={toggleReduceMotion}
                      role="switch"
                      aria-checked={settings.reduceMotion}
                      className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                        settings.reduceMotion ? 'bg-category-temples justify-end' : 'bg-parchment-300 justify-start'
                      }`}
                    >
                      <motion.div
                        layout
                        className="bg-white w-4 h-4 rounded-full shadow-sm"
                      />
                    </button>
                  </div>

                  {/* Enhanced High-Visibility Cursor */}
                  <div className="p-4 bg-white/70 border border-parchment-200 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-parchment-100 text-parchment-800">
                        <MousePointer className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-parchment-900">
                          {t('accessibility.enhancedCursor')}
                        </div>
                        <div className="text-xs text-parchment-600">High-contrast pointer target</div>
                      </div>
                    </div>
                    <button
                      onClick={toggleEnhancedCursor}
                      role="switch"
                      aria-checked={settings.enhancedCursor}
                      className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                        settings.enhancedCursor ? 'bg-category-temples justify-end' : 'bg-parchment-300 justify-start'
                      }`}
                    >
                      <motion.div
                        layout
                        className="bg-white w-4 h-4 rounded-full shadow-sm"
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <div className="pt-6 border-t border-parchment-200 mt-6">
                <button
                  onClick={resetSettings}
                  className="w-full py-3 px-4 rounded-xl border border-parchment-300 hover:bg-parchment-200 text-parchment-800 text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  {t('accessibility.resetAll')}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
