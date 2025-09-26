import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen name="index" options={{ title: "Gênio do amor" }}></Stack.Screen>
  </Stack>;
}
