import { Stack } from 'expo-router';
import { Provider } from 'jotai'; // <-- 1. Import Provider

export default function RootLayout() {
  return (
    // 2. Bungkus semua dengan Provider
    <Provider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="now-playing" 
          options={{ presentation: 'modal', headerShown: false }} 
        />
      </Stack>
    </Provider>
  );
}