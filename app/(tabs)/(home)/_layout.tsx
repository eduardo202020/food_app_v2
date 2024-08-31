import { Stack } from "expo-router";

export default function Home() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Mostrar el encabezado
      }}
    >
      <Stack.Screen name="index" options={{ title: "Inicio" }} />
      <Stack.Screen name="[slug]" options={{ title: "Detalles de Receta" }} />
      <Stack.Screen name="Temporadas" options={{ title: "Temporadas" }} />
    </Stack>
  );
}
