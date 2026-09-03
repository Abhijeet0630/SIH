import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CulturalCategoryId } from '../types/category';
import { CulturalItem } from '../types/culturalItem';
import { StateOverview } from '../types/state';
import { getStateById } from '../data/states';
import { getCulturalItemsByCategory, getCulturalItemBySlug } from '../data/culturalItems';

interface CulturalContextType {
  selectedStateId: string;
  setSelectedStateId: (id: string) => void;
  selectedCategory: CulturalCategoryId;
  setSelectedCategory: (cat: CulturalCategoryId) => void;
  activeItemSlug: string | null;
  setActiveItemSlug: (slug: string | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  currentState: StateOverview | undefined;
  activeCulturalItems: CulturalItem[];
  activeCulturalItem: CulturalItem | undefined;
}

const CulturalContext = createContext<CulturalContextType | undefined>(undefined);

export const CulturalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedStateId, setSelectedStateId] = useState<string>('maharashtra');
  const [selectedCategory, setSelectedCategory] = useState<CulturalCategoryId>('all');
  const [activeItemSlug, setActiveItemSlug] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const currentState = getStateById(selectedStateId);
  const activeCulturalItems = getCulturalItemsByCategory(selectedStateId, selectedCategory);
  const activeCulturalItem = activeItemSlug ? getCulturalItemBySlug(activeItemSlug) : undefined;

  return (
    <CulturalContext.Provider
      value={{
        selectedStateId,
        setSelectedStateId,
        selectedCategory,
        setSelectedCategory,
        activeItemSlug,
        setActiveItemSlug,
        isSearchOpen,
        setIsSearchOpen,
        currentState,
        activeCulturalItems,
        activeCulturalItem,
      }}
    >
      {children}
    </CulturalContext.Provider>
  );
};

export const useCultural = (): CulturalContextType => {
  const context = useContext(CulturalContext);
  if (!context) {
    throw new Error('useCultural must be used within a CulturalProvider');
  }
  return context;
};
