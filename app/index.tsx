// Buka file app/index.tsx dan ganti seluruh isinya dengan ini

import { StyleSheet, Text, View, Alert, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';

export default function LibraryScreen() {
  const [songs, setSongs] = useState<MediaLibrary.Asset[]>([]);
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null);

  // Fungsi untuk meminta izin dan mengambil file audio
  const getAudioFiles = async () => {
    // Meminta izin dari pengguna
    const permission = await MediaLibrary.requestPermissionsAsync();

    if (permission.granted) {
      setPermissionGranted(true);
      // Jika diizinkan, ambil semua file dengan tipe 'audio'
      const media = await MediaLibrary.getAssetsAsync({
        mediaType: 'audio',
      });
      setSongs(media.assets);
      console.log(media.assets); // <-- Cek di terminal untuk melihat data lagunya!
    } else {
      setPermissionGranted(false);
      Alert.alert(
        "Izin Ditolak",
        "Aplikasi ini butuh izin untuk bisa menampilkan lagu."
      );
    }
  };

  // Jalankan fungsi di atas saat komponen pertama kali dimuat
  useEffect(() => {
    getAudioFiles();
  }, []);

  // Fungsi untuk menampilkan konten berdasarkan status izin
  const renderContent = () => {
    if (permissionGranted === null) {
      // Saat sedang menunggu jawaban izin
      return <Text style={styles.subtitle}>Meminta izin...</Text>;
    }
    if (permissionGranted === false) {
      return <Text style={styles.subtitle}>Izin akses media diperlukan.</Text>;
    }
    if (songs.length > 0) {
      // Jika lagu ditemukan
      return <Text style={styles.subtitle}>{songs.length} lagu ditemukan!</Text>;
    } else {
      // Jika tidak ada lagu yang ditemukan
      return <Text style={styles.subtitle}>Tidak ada lagu ditemukan di perangkatmu.</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>expo_music</Text>
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
  },
});