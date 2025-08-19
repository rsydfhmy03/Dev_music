import { atom } from 'jotai';
import { Audio } from 'expo-av';
import { Song } from '../types/Song';

// --- ATOM DASAR (Menyimpan Data) ---

export const currentSongAtom = atom<Song | null>(null);
export const isPlayingAtom = atom<boolean>(false);
export const soundObjectAtom = atom<Audio.Sound | null>(null);

export const playbackPositionAtom = atom<number>(0);
export const playbackDurationAtom = atom<number | null>(null);

// --- ATOM AKSI (Melakukan Sesuatu) ---

// Atom ini hanya untuk 'menulis' atau melakukan aksi play
export const playSongAtom = atom(
  null, // Atom ini tidak punya nilai 'bacaan'
  async (get, set, song: Song) => {
    // Hentikan lagu sebelumnya jika ada
    const currentSound = get(soundObjectAtom);
    if (currentSound) {
      await currentSound.unloadAsync();
    }

    try {
      const { sound } = await Audio.Sound.createAsync({ uri: song.uri });
      sound.setOnPlaybackStatusUpdate(status => {
        if (status.isLoaded && status.isPlaying) {
            if ('positionMillis' in status && 'durationMillis' in status && 'isPlaying' in status) {
              set(playbackPositionAtom, status.positionMillis);
              set(playbackDurationAtom, status.durationMillis ?? null);
              set(isPlayingAtom, status.isPlaying);
            }
            if (status.didJustFinish) {
              set(isPlayingAtom, false);
            }
        }
      });
      
      set(soundObjectAtom, sound);
      set(currentSongAtom, song);
      set(isPlayingAtom, true);
      await sound.playAsync();
    } catch (error) {
      console.error("Error playing song:", error);
    }
  }
);

// Atom ini untuk aksi play/pause
export const togglePlayPauseAtom = atom(
  null,
  async (get, set) => {
    const sound = get(soundObjectAtom);
    if (!sound) return;

    const isPlaying = get(isPlayingAtom);
    if (isPlaying) {
      await sound.pauseAsync();
      set(isPlayingAtom, false);
    } else {
      await sound.playAsync();
      set(isPlayingAtom, true);
    }
  }
);

export const seekSongAtom = atom(null, async (get, set, position: number) => {
  const sound = get(soundObjectAtom);
  if (sound) {
    await sound.setPositionAsync(position);
  }
});