import { Slot } from 'expo-router';
import '../src/services/notificationService'; // configure le handler de notifs au lancement de l'app

export default function RootLayout() {
  return <Slot />;
}