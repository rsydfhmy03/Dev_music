import { Tabs } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MiniPlayer from '../../components/MiniPlayer';

export default function TabLayout() {
  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: 'white',
          tabBarStyle: {
            backgroundColor: '#1c1c1c',
            borderTopWidth: 0,
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index" // Merujuk ke file index.tsx
          options={{
            title: 'Pustaka',
            tabBarIcon: ({ color }) => <Ionicons name="library" size={24} color={color} />,
          }}
        />
        {/* Kita bisa tambahkan tab lain di sini nanti, misal playlist.tsx */}
      </Tabs>
      <MiniPlayer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});