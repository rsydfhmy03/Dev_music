import { Stack } from 'expo-router';
import { Provider } from 'jotai'; 
import { useEffect } from 'react'; 
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av'; 
export default function RootLayout() {

    useEffect(() => {
    const setupAudioMode = async () => {
      try {
        await Audio.setAudioModeAsync({
          staysActiveInBackground: true, 
          playsInSilentModeIOS: true,
          interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
          interruptionModeIOS: InterruptionModeIOS.DoNotMix,
        });
      } catch (e) {
        console.error("Failed to set audio mode", e);
      }
    };

    setupAudioMode();
  }, []);
  return (
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