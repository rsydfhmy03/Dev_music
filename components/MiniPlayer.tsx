import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useAtom, useSetAtom } from 'jotai'; // <-- 1. Import hook dari Jotai
import { currentSongAtom, isPlayingAtom, togglePlayPauseAtom } from '../store/playerStore'; // <-- 2. Import atom-atom yang relevan
import { Ionicons } from '@expo/vector-icons'

export default function MiniPlayer() {
    // 3. Baca nilai dari atom
  const [currentSong] = useAtom(currentSongAtom);
  const [isPlaying] = useAtom(isPlayingAtom);
  // 4. Ambil fungsi aksi
  const togglePlayPause = useSetAtom(togglePlayPauseAtom);

  if (!currentSong) {
    return null; // Jika tidak ada lagu yang diputar, jangan tampilkan apa-apa
  }

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={1}>{currentSong.filename}</Text>
        <Text style={styles.artist} numberOfLines={1}>{currentSong.artist ?? "Unknown"}</Text>
      </View>
      <Pressable onPress={togglePlayPause}>
        <Ionicons
          name={isPlaying ? 'pause' : 'play'}
          size={32}
          color="white"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#282828',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingBottom: 20, // Beri ruang untuk home indicator
    },
    detailsContainer: {
        flex: 1,
        marginLeft: 10,
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
    },
    artist: {
        color: 'gray',
    },
});