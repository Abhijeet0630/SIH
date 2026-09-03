import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import en from '../locales/en.json';
import hi from '../locales/hi.json';
import mr from '../locales/mr.json';

export type LanguageCode = 'en' | 'hi' | 'mr';

export interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  availableLanguages: { code: LanguageCode; label: string; nativeLabel: string }[];
  t: (keyPath: string, replacements?: Record<string, string | number>) => string;
}

const translations: Record<LanguageCode, Record<string, unknown>> = {
  en,
  hi,
  mr,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const availableLanguages: { code: LanguageCode; label: string; nativeLabel: string }[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
  { code: 'mr', label: 'Marathi', nativeLabel: 'मराठी' },
];

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('heritage_language') as LanguageCode;
    return saved && ['en', 'hi', 'mr'].includes(saved) ? saved : 'en';
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('heritage_language', lang);
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (keyPath: string, replacements?: Record<string, string | number>): string => {
    const keys = keyPath.split('.');
    let current: unknown = translations[language];

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = (current as Record<string, unknown>)[key];
      } else {
        // Fallback to English
        let fallback: unknown = translations['en'];
        for (const fbKey of keys) {
          if (fallback && typeof fallback === 'object' && fbKey in fallback) {
            fallback = (fallback as Record<string, unknown>)[fbKey];
          } else {
            return '';
          }
        }
        current = fallback;
        break;
      }
    }

    if (typeof current !== 'string') {
      return '';
    }

    let result = current;
    if (replacements) {
      for (const [rKey, rVal] of Object.entries(replacements)) {
        result = result.replace(new RegExp(`{{${rKey}}}`, 'g'), String(rVal));
      }
    }

    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, availableLanguages, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
