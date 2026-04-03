import React from 'react';
import { StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

function AnimatedTabIcon({
  name,
  color,
  focused,
}: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
  focused: boolean;
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
        focused && styles.iconWrapActive,
        animatedStyle,
      ]}
    >
      <Ionicons name={name} size={focused ? 28 : 23} color={color} />
    </Animated.View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fbd34d',
          height: 68,
          paddingTop: 8,
          paddingBottom: 8,
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
    backgroundColor: 'rgba(255,255,255,0.28)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
  },
});
