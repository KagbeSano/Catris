import { AudioPlayer, createAudioPlayer, setAudioModeAsync } from 'expo-audio';

const SOUND_FILES = {
  gameStart: require('../../assets/sounds/game_start.wav'),
  lineClear: require('../../assets/sounds/line_clear.wav'),
  move:      require('../../assets/sounds/move.wav'),
  gameOver:  require('../../assets/sounds/game_over.wav'),
} as const;

type SoundName = keyof typeof SOUND_FILES;

let audioModeReady = false;

async function ensureAudioMode() {
  if (audioModeReady) return;
  await setAudioModeAsync({ playsInSilentMode: true, allowsRecording: false });
  audioModeReady = true;
}

export async function playSound(name: SoundName, volume = 1) {
  try {
    await ensureAudioMode();
    const player: AudioPlayer = createAudioPlayer(SOUND_FILES[name]);
    player.volume = volume;
    player.play();

    setTimeout(() => player.release(), 4000);
  } catch (e) {
    console.warn(`Impossible de jouer le son "${name}"`, e);
  }
}