import { createContext, useContext } from 'react';
import type { AppTheme, AppThemeMode } from '@/constants/appTheme';

export type AppThemeContextValue = {
  mode: AppThemeMode;
  theme: AppTheme;
  setMode: (mode: AppThemeMode) => void;
  toggleMode: () => void;
};

export const AppThemeContext = createContext<AppThemeContextValue | null>(null);

export function useAppTheme(): AppThemeContextValue {
  const value = useContext(AppThemeContext);
  if (!value) {
    throw new Error('useAppTheme must be used within AppThemeProvider');
  }
  return value;
}

