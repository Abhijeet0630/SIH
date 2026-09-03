import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AccessibilitySettings, AccessibilityContextType, TextSize } from '../types/accessibility';

const defaultSettings: AccessibilitySettings = {
  textSize: 'default',
  highContrast: false,
  grayscale: false,
  invertColors: false,
  reduceMotion: false,
  enhancedCursor: false,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    try {
      const saved = localStorage.getItem('heritage_accessibility');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore JSON parse errors
    }
    // Check system prefers-reduced-motion
    const prefersReducedMotion = typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    return {
      ...defaultSettings,
      reduceMotion: prefersReducedMotion,
    };
  });

  // Apply classes to body
  useEffect(() => {
    try {
      localStorage.setItem('heritage_accessibility', JSON.stringify(settings));
    } catch {
      // ignore storage errors
    }

    const body = document.body;

    // Text size
    body.classList.remove('small-text', 'large-text');
    if (settings.textSize === 'small') body.classList.add('small-text');
    if (settings.textSize === 'large') body.classList.add('large-text');

    // Modes
    settings.highContrast ? body.classList.add('high-contrast') : body.classList.remove('high-contrast');
    settings.grayscale ? body.classList.add('grayscale-mode') : body.classList.remove('grayscale-mode');
    settings.invertColors ? body.classList.add('invert-colors') : body.classList.remove('invert-colors');
    settings.enhancedCursor ? body.classList.add('enhanced-cursor') : body.classList.remove('enhanced-cursor');
    settings.reduceMotion ? body.classList.add('reduced-motion') : body.classList.remove('reduced-motion');
  }, [settings]);

  const setTextSize = (size: TextSize) => setSettings(prev => ({ ...prev, textSize: size }));

  const increaseTextSize = () => {
    setSettings(prev => ({
      ...prev,
      textSize: prev.textSize === 'small' ? 'default' : 'large',
    }));
  };

  const decreaseTextSize = () => {
    setSettings(prev => ({
      ...prev,
      textSize: prev.textSize === 'large' ? 'default' : 'small',
    }));
  };

  const toggleHighContrast = () => setSettings(prev => ({ ...prev, highContrast: !prev.highContrast }));
  const toggleGrayscale = () => setSettings(prev => ({ ...prev, grayscale: !prev.grayscale }));
  const toggleInvertColors = () => setSettings(prev => ({ ...prev, invertColors: !prev.invertColors }));
  const toggleReduceMotion = () => setSettings(prev => ({ ...prev, reduceMotion: !prev.reduceMotion }));
  const toggleEnhancedCursor = () => setSettings(prev => ({ ...prev, enhancedCursor: !prev.enhancedCursor }));

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        isOpen,
        setIsOpen,
        setTextSize,
        increaseTextSize,
        decreaseTextSize,
        toggleHighContrast,
        toggleGrayscale,
        toggleInvertColors,
        toggleReduceMotion,
        toggleEnhancedCursor,
        resetSettings,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
