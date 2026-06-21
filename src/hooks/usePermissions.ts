import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { requestNotificationPermission } from '../services/notificationService';

export type PermStatus = 'pending' | 'granted' | 'denied';

const NOTIF_KEY = '@catris_notif_perm';
const SOUND_KEY = '@catris_sound_perm';

export function usePermissions() {
  const [notifStatus, setNotifStatus] = useState<PermStatus>('pending');
  const [soundStatus, setSoundStatus] = useState<PermStatus>('pending');

  useEffect(() => {
    (async () => {
      const [notif, sound] = await Promise.all([
        AsyncStorage.getItem(NOTIF_KEY),
        AsyncStorage.getItem(SOUND_KEY),
      ]);
      if (notif) setNotifStatus(notif as PermStatus);
      if (sound) setSoundStatus(sound as PermStatus);
    })();
  }, []);

  // Notifications = vraie permission OS
  const setNotif = useCallback(async (enabled: boolean) => {
    if (!enabled) {
      setNotifStatus('denied');
      await AsyncStorage.setItem(NOTIF_KEY, 'denied');
      return;
    }
    const granted = await requestNotificationPermission();
    const status: PermStatus = granted ? 'granted' : 'denied';
    setNotifStatus(status);
    await AsyncStorage.setItem(NOTIF_KEY, status);
  }, []);

  const setSound = useCallback(async (enabled: boolean) => {
    const status: PermStatus = enabled ? 'granted' : 'denied';
    setSoundStatus(status);
    await AsyncStorage.setItem(SOUND_KEY, status);
  }, []);

  return { notifStatus, soundStatus, setNotif, setSound };
}