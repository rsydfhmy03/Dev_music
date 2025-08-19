import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Song } from '../types/Song';
import { Ionicons } from '@expo/vector-icons'; 
import { useAtom, useSetAtom } from 'jotai';
import { playSongAtom } from '../store/playerStore';
interface SongListItemProps {
  song: Song;
 queue?: Song[]; 
}

export default function SongListItem({ song, queue }: SongListItemProps) {
    // const [, playSong] = useAtom(playSongAtom);
    const playSong = useSetAtom(playSongAtom);

     const handlePress = () => {
    playSong({ song, queue: queue ?? [] });
  };
  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <View style={styles.iconContainer}>
        <Ionicons name="musical-note" size={24} color="#aeaeae" />
      </View>
      <View style={styles.metadataContainer}>
        <Text style={styles.title} numberOfLines={1}>{song.filename}</Text>
        <Text style={styles.artist} numberOfLines={1}>{song.artist ?? 'Unknown Artist'}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#282828',
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metadataContainer: {
    flex: 1, // Agar teks mengambil sisa ruang yang tersedia
    marginLeft: 10,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  artist: {
    color: 'gray',
    fontSize: 14,
  },
});