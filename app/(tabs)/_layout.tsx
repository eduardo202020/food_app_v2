import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { Tabs } from "expo-router";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

function AnimatedTabBarIcon({
  name,
  color,
  focused,
}: {
  name: string;
  color: string;
  focused: boolean;
}) {
  const scale = useRef(new Animated.Value(1)).current; // Valor inicial de la escala

  useEffect(() => {
    Animated.timing(scale, {
      toValue: focused ? 1.2 : 1, // Aumenta la escala a 1.2 cuando está enfocado
      duration: 400, // Duración de la animación
      useNativeDriver: true, // Usa el motor nativo para mejor rendimiento
    }).start();
  }, [focused]);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TabBarIcon name={name as "search"} color={color} />
    </Animated.View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName="(home)" // Establece la ruta inicial
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarShowLabel: false, // Oculta los nombres debajo de los íconos
        tabBarStyle: {
          backgroundColor: "#FCD34D", // Cambia este valor al color que desees para la barra de tabs
        },
      }}
    >
      <Tabs.Screen
        name="favoritos"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabBarIcon
              name={focused ? "heart" : "heart-outline"}
              color={color}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="(home)"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabBarIcon
              name={focused ? "search" : "search-outline"}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
