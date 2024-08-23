import { Stack } from "expo-router";
import React from "react";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Mostrar el encabezado
        headerStyle: {
          backgroundColor: "#B89C00", // Cambiar el color del encabezado
        },
        headerTintColor: "white", // Color del texto y los iconos del encabezado
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="[slug]" />
    </Stack>
  );
}
