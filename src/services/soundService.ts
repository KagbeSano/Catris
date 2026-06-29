import { Platform } from 'react-native';
import type { AudioPlayer } from 'expo-audio';

type SoundName = 'gameStart' | 'lineClear' | 'move' | 'gameOver';

const SOUND_FILES: Record<SoundName, () => any> = {
  gameStart: () => require('../../assets/sounds/game_start.wav'),
  lineClear: () => require('../../assets/sounds/line_clear.wav'),
  move:      () => require('../../assets/sounds/move.wav'),
  gameOver:  () => require('../../assets/sounds/game_over.wav'),
};

let audioModeReady = false;

async function ensureAudioMode() {
  if (audioModeReady) return;
  const { setAudioModeAsync } = await import('expo-audio');
  await setAudioModeAsync({ playsInSilentMode: true, allowsRecording: false });
  audioModeReady = true;
}

export async function playSound(name: SoundName, volume = 1) {
  if (Platform.OS === 'web') return; // expo-audio non supporté sur web

  try {
    await ensureAudioMode();
    const { createAudioPlayer } = await import('expo-audio');
    const player: AudioPlayer = createAudioPlayer(SOUND_FILES[name]());
    player.volume = volume;
    player.play();
    setTimeout(() => player.release(), 4000);
  } catch (e) {
    console.warn(`Impossible de jouer le son "${name}"`, e);
  }
}