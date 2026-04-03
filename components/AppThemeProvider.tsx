import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

import { appThemes, type AppThemeMode } from '@/constants/appTheme';
import { AppThemeContext } from '@/hooks/useAppTheme';

const STORAGE_KEY = 'app_theme_mode_v1';

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = React.useState<AppThemeMode>('dark');

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (!cancelled && (stored === 'dark' || stored === 'light')) {
          setModeState(stored);
        }
      } finally {
        // no-op
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const setMode = React.useCallback((nextMode: AppThemeMode) => {
    setModeState(nextMode);
    AsyncStorage.setItem(STORAGE_KEY, nextMode).catch(() => {});
  }, []);

  const toggleMode = React.useCallback(() => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  }, [mode, setMode]);

  const value = React.useMemo(
    () => ({
      mode,
      theme: appThemes[mode],
      setMode,
      toggleMode,
    }),
    [mode, setMode, toggleMode]
  );

  return (
    <AppThemeContext.Provider value={value}>{children}</AppThemeContext.Provider>
  );
}
