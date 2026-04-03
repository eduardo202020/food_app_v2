import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { SQLiteProvider } from 'expo-sqlite';
import React, { useEffect } from 'react';
import 'react-native-reanimated';

import { initializeRecipesDatabase } from '@/lib/recipes-db';
import { AppThemeProvider } from '@/components/AppThemeProvider';
import { useAppTheme } from '@/hooks/useAppTheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function AppNavigation() {
  const { mode, theme } = useAppTheme();

  const navigationTheme = React.useMemo(() => {
    const base = mode === 'dark' ? DarkTheme : DefaultTheme;
    return {
      ...base,
      colors: {
        ...base.colors,
        background: theme.backgroundSolid,
        card: theme.surfaceStrong,
        text: theme.text,
        border: theme.border,
        primary: theme.accent,
      },
    };
  }, [mode, theme]);

  return (
    <ThemeProvider value={navigationTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SQLiteProvider
      databaseName="recipes.db"
      assetSource={{ assetId: require('../assets/db/recipes.db') }}
      onInit={initializeRecipesDatabase}
    >
      <AppThemeProvider>
        <AppNavigation />
      </AppThemeProvider>
    </SQLiteProvider>
  );
}
