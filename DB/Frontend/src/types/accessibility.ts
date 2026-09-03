export type TextSize = 'small' | 'default' | 'large';

export interface AccessibilitySettings {
  textSize: TextSize;
  highContrast: boolean;
  grayscale: boolean;
  invertColors: boolean;
  reduceMotion: boolean;
  enhancedCursor: boolean;
}

export interface AccessibilityContextType {
  settings: AccessibilitySettings;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  setTextSize: (size: TextSize) => void;
  increaseTextSize: () => void;
  decreaseTextSize: () => void;
  toggleHighContrast: () => void;
  toggleGrayscale: () => void;
  toggleInvertColors: () => void;
  toggleReduceMotion: () => void;
  toggleEnhancedCursor: () => void;
  resetSettings: () => void;
}
