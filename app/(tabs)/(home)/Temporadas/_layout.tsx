import { Stack } from "expo-router";

export default function Home() {
  return (
    <Stack
      screenOptions={{
        headerShown: true, // Mostrar el encabezado
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
