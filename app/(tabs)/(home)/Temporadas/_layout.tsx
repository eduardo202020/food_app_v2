import { Stack } from "expo-router";

export default function Home() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#FCD34D",
        },
        headerTintColor: "#FFF",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 24,
        },
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
