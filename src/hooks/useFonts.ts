// src/hooks/useFonts.ts
import { FredokaOne_400Regular } from '@expo-google-fonts/fredoka-one';
import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from '@expo-google-fonts/nunito';
import { useFonts as useExpoFonts } from 'expo-font';

/**
 * Hook personnalisé — charge les polices Catris au démarrage.
 * Usage : const { fontsLoaded } = useCatrisFonts();
 * Installer : npx expo install expo-font @expo-google-fonts/fredoka-one @expo-google-fonts/nunito
 */
export function useCatrisFonts() {
  const [fontsLoaded, error] = useExpoFonts({
    FredokaOne:           FredokaOne_400Regular,
    Nunito:               Nunito_400Regular,
    'Nunito-SemiBold':    Nunito_600SemiBold,
    'Nunito-Bold':        Nunito_700Bold,
    'Nunito-ExtraBold':   Nunito_800ExtraBold,
  });

  return { fontsLoaded, error };
}
