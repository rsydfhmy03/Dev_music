import { StyleSheet, Text, View, Alert, FlatList, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';

import { Song } from '../../types/Song';
import SongListItem from '../../components/SongListItem';

export default function LibraryScreen() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null);

  const getAudioFiles = async () => {
    const permission = await MediaLibrary.requestPermissionsAsync();

    if (permission.granted) {
      setPermissionGranted(true);
      const media = await MediaLibrary.getAssetsAsync({
        mediaType: 'audio',
      });
      
      // Ubah data dari MediaLibrary menjadi format 'Song' kita
      const mappedSongs: Song[] = media.assets.map(asset => ({
        id: asset.id,
        filename: asset.filename,
        uri: asset.uri,
        duration: asset.duration,
        artist: (asset as any)?.artist ?? 'Unknown Artist', 
      }));

      setSongs(mappedSongs);
    } else {
      setPermissionGranted(false);
    }
  };

  useEffect(() => {
    getAudioFiles();
  }, []);

  if (permissionGranted === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="white" />
        <Text style={styles.subtitle}>Meminta izin...</Text>
      </View>
    );
  }

  if (permissionGranted === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.subtitle}>Izin akses media diperlukan.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SongListItem song={item} queue={songs} />
        )}
        ListHeaderComponent={() => (
          <Text style={styles.title}>Pustaka Musik</Text>
        )}
        ListEmptyComponent={() => (
          <Text style={styles.subtitle}>Tidak ada lagu ditemukan.</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 50, // Beri sedikit ruang di atas
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});