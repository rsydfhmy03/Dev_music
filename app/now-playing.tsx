import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useAtom, useSetAtom } from 'jotai';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import {
  currentSongAtom,
  isPlayingAtom,
  togglePlayPauseAtom,
  playbackPositionAtom,
  playbackDurationAtom,
  playNextSongAtom,
  playPreviousSongAtom,
  seekSongAtom,
} from '../store/playerStore';

// Helper untuk format durasi
const formatTime = (millis: number | null) => {
    if (millis === null) return '0:00';
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export default function NowPlayingScreen() {
  const router = useRouter();
  const [currentSong] = useAtom(currentSongAtom);
  const [isPlaying] = useAtom(isPlayingAtom);
  const [position] = useAtom(playbackPositionAtom);
  const [duration] = useAtom(playbackDurationAtom);
  const togglePlayPause = useSetAtom(togglePlayPauseAtom);
  const seek = useSetAtom(seekSongAtom);
  const playNext = useSetAtom(playNextSongAtom);
  const playPrevious = useSetAtom(playPreviousSongAtom);

  if (!currentSong) {
    return (
      <View style={styles.container}>
        <Text style={styles.songTitle}>Tidak ada lagu diputar</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="chevron-down" size={32} color="white" />
      </Pressable>

      {/* Album Art Placeholder */}
      <View style={styles.artwork}>
        <Ionicons name="musical-notes" size={150} color="#555" />
      </View>

      <Text style={styles.songTitle}>{currentSong.filename}</Text>
      <Text style={styles.artistName}>{currentSong.artist ?? "Unknown Artist"}</Text>

      {/* Seek Bar */}
      <Slider
        style={styles.slider}
        value={position}
        maximumValue={duration ?? 1}
        minimumValue={0}
        onSlidingComplete={value => seek(value)}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#555"
        thumbTintColor="#FFFFFF"
      />
      <View style={styles.durationContainer}>
        <Text style={styles.durationText}>{formatTime(position)}</Text>
        <Text style={styles.durationText}>{formatTime(duration)}</Text>
      </View>

      {/* Controls */}
      <View style={styles.controlsContainer}>
        <Pressable onPress={playPrevious}>
          <Ionicons name="play-skip-back" size={40} color="white" />
        </Pressable>
        <Pressable onPress={togglePlayPause}>
          <Ionicons name={isPlaying ? "pause-circle" : "play-circle"} size={80} color="white" />
        </Pressable>
        <Pressable onPress={playNext}>
          <Ionicons name="play-skip-forward" size={40} color="white" />
        </Pressable>
      </View>
    </View>
  );
}

// (Tambahkan Stylesheet yang panjang ini di bawah komponen)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        paddingTop: 80,
        paddingHorizontal: 20,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
    },
    artwork: {
        width: 300,
        height: 300,
        backgroundColor: '#282828',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 40,
    },
    songTitle: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    artistName: {
        color: 'gray',
        fontSize: 16,
        marginTop: 5,
    },
    slider: {
        width: '100%',
        height: 40,
        marginTop: 30,
    },
    durationContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    durationText: {
        color: 'gray',
    },
    controlsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '80%',
        marginTop: 40,
    },
});