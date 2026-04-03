import React from 'react';
import { StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useAppTheme } from '@/hooks/useAppTheme';

function AnimatedTabIcon({
  name,
  color,
  focused,
  activeBg,
  shadowColor,
}: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
  focused: boolean;
  activeBg: string;
  shadowColor: string;
}) {
  const scale = useSharedValue(focused ? 1.18 : 1);
  const translateY = useSharedValue(focused ? -4 : 0);

  React.useEffect(() => {
    scale.value = withSpring(focused ? 1.18 : 1, {
      damping: 12,
      stiffness: 220,
    });
    translateY.value = withSpring(focused ? -4 : 0, {
      damping: 12,
      stiffness: 220,
    });
  }, [focused, scale, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
  }));

  return (
    <Animated.View
      style={[
        styles.iconWrap,
        focused && [styles.iconWrapActive, { backgroundColor: activeBg, shadowColor }],
        animatedStyle,
      ]}
    >
      <Ionicons name={name} size={focused ? 28 : 23} color={color} />
    </Animated.View>
  );
}

export default function TabLayout() {
  const { theme } = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.tabBarActiveTint,
        tabBarInactiveTintColor: theme.tabBarInactiveTint,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.tabBarBg,
          borderTopColor: theme.tabBarBorder,
          borderTopWidth: 1,
          height: 68,
          paddingTop: 8,
          paddingBottom: 8,
          shadowColor: theme.shadow,
          shadowOpacity: 0.25,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: -6 },
          elevation: 14,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
        },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon
              name={focused ? 'home' : 'home-outline'}
              color={color}
              focused={focused}
              activeBg={
                theme.mode === 'dark'
                  ? 'rgba(250, 204, 21, 0.16)'
                  : 'rgba(250, 204, 21, 0.28)'
              }
              shadowColor={theme.shadow}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explorar',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon
              name={focused ? 'search' : 'search-outline'}
              color={color}
              focused={focused}
              activeBg={
                theme.mode === 'dark'
                  ? 'rgba(250, 204, 21, 0.16)'
                  : 'rgba(250, 204, 21, 0.28)'
              }
              shadowColor={theme.shadow}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favoritos"
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon
              name={focused ? 'heart' : 'heart-outline'}
              color={color}
              focused={focused}
              activeBg={
                theme.mode === 'dark'
                  ? 'rgba(250, 204, 21, 0.16)'
                  : 'rgba(250, 204, 21, 0.28)'
              }
              shadowColor={theme.shadow}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    alignItems: 'center',
    borderRadius: 18,
    justifyContent: 'center',
    minHeight: 36,
    minWidth: 36,
  },
  iconWrapActive: {
    backgroundColor: 'rgba(250, 204, 21, 0.16)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
  },
});
