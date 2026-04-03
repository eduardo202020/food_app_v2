import React from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '@/hooks/useAppTheme';

type AppBackgroundProps = ViewProps & {
  children: React.ReactNode;
};

export function AppBackground({ style, children, ...props }: AppBackgroundProps) {
  const { theme } = useAppTheme();
  const topOpacity = theme.mode === 'dark' ? 0.22 : 0.10;
  const bottomOpacity = theme.mode === 'dark' ? 0.14 : 0.08;
  const blobSize = theme.mode === 'dark' ? 420 : 320;

  return (
    <View style={[styles.container, style]} {...props}>
      <LinearGradient
        colors={theme.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View
        pointerEvents="none"
        style={[
          styles.blob,
          styles.blobTop,
          {
            backgroundColor: theme.blobTop,
            opacity: topOpacity,
            width: blobSize,
            height: blobSize,
          },
        ]}
      />
      <View
        pointerEvents="none"
        style={[
          styles.blob,
          styles.blobBottom,
          {
            backgroundColor: theme.blobBottom,
            opacity: bottomOpacity,
            width: blobSize + 20,
            height: blobSize + 20,
          },
        ]}
      />
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  blob: {
    position: 'absolute',
    borderRadius: 9999,
  },
  blobTop: {
    top: -200,
    left: -140,
    transform: [{ scaleX: 1.05 }],
  },
  blobBottom: {
    bottom: -240,
    right: -180,
    transform: [{ scaleX: 1.15 }],
  },
});
