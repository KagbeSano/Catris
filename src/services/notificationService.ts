import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

const CHANNEL_ID = 'catris-default';
const isWeb = Platform.OS === 'web';

//Comment se comporte une notif reçue pendant que l'app est ouverte
if (!isWeb) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

async function setupNotificationChannel() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
      name: 'Catris',
      importance: Notifications.AndroidImportance.HIGH,
      sound: 'default', // tu pourras mettre un .wav perso plus tard
      vibrationPattern: [0, 150, 100, 150],
    });
  }
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (isWeb) return false;

  await setupNotificationChannel();

  const { status: existing } = await Notifications.getPermissionsAsync();
  let finalStatus = existing;

  if (existing !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === 'granted';
}

export async function sendGameStartNotification() {
  if (isWeb) return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: '🐱 Catris',
      body: 'La partie commence, à toi de jouer !',
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 1,
      ...(Platform.OS === 'android' ? { channelId: CHANNEL_ID } : {}),
    },
  });
}