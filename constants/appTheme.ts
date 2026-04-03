export type AppThemeMode = 'dark' | 'light';

export type AppTheme = {
  mode: AppThemeMode;
  accent: string;
  accentTextOn: string;
  text: string;
  textMuted: string;
  backgroundSolid: string;
  backgroundGradient: [string, string, string];
  blobTop: string;
  blobBottom: string;
  surface: string;
  surfaceStrong: string;
  border: string;
  shadow: string;
  tabBarBg: string;
  tabBarBorder: string;
  tabBarActiveTint: string;
  tabBarInactiveTint: string;
  statusBarStyle: 'light-content' | 'dark-content';
};

export const appThemes: Record<AppThemeMode, AppTheme> = {
  dark: {
    mode: 'dark',
    accent: '#FACC15',
    accentTextOn: '#3a2200',
    text: '#FFFFFF',
    textMuted: 'rgba(229,231,235,0.82)',
    backgroundSolid: '#0B1220',
    backgroundGradient: ['#050B18', '#0B1220', '#111827'],
    blobTop: '#FACC15',
    blobBottom: '#22C55E',
    surface: 'rgba(17, 24, 39, 0.55)',
    surfaceStrong: 'rgba(17, 24, 39, 0.72)',
    border: 'rgba(255,255,255,0.08)',
    shadow: '#000',
    tabBarBg: 'rgba(17, 24, 39, 0.92)',
    tabBarBorder: 'rgba(255,255,255,0.06)',
    tabBarActiveTint: '#FACC15',
    tabBarInactiveTint: 'rgba(229, 231, 235, 0.75)',
    statusBarStyle: 'light-content',
  },
  light: {
    mode: 'light',
    accent: '#FACC15',
    accentTextOn: '#3a2200',
    text: '#0B1220',
    textMuted: 'rgba(31, 41, 55, 0.70)',
    backgroundSolid: '#F8FAFC',
    backgroundGradient: ['#FFFFFF', '#F8FAFC', '#EEF2FF'],
    blobTop: '#FACC15',
    blobBottom: '#60A5FA',
    surface: 'rgba(255,255,255,0.72)',
    surfaceStrong: 'rgba(255,255,255,0.88)',
    border: 'rgba(15, 23, 42, 0.08)',
    shadow: '#000',
    tabBarBg: 'rgba(255,255,255,0.92)',
    tabBarBorder: 'rgba(15, 23, 42, 0.08)',
    tabBarActiveTint: '#B45309',
    tabBarInactiveTint: 'rgba(31, 41, 55, 0.65)',
    statusBarStyle: 'dark-content',
  },
};

