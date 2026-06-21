import {
  StyleSheet,
  Text, TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/color';
import { usePermissions } from '../hooks/usePermissions';

type Props = { navigation: any };

export default function PermissionsScreen({ navigation }: Props) {
  const { notifStatus, soundStatus, setNotif, setSound } = usePermissions();

  const handleNotif = (allow: boolean) => setNotif(allow);
const handleSound = (allow: boolean) => setSound(allow);
  const allAnswered = notifStatus !== 'pending' && soundStatus !== 'pending';

  const StatusBadge = ({ status }: { status: typeof notifStatus }) => {
    if (status === 'pending') return null;
    return (
      <Text style={status === 'granted' ? styles.badgeGranted : styles.badgeDenied}>
        {status === 'granted' ? '✓ Autorisé' : '✗ Refusé'}
      </Text>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.emoji}>🐾</Text>
        <Text style={styles.title}>Avant de jouer...</Text>
        <Text style={styles.sub}>
          Catris a besoin de quelques autorisations pour une meilleure expérience.
        </Text>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>🔔</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Notifications</Text>
              <Text style={styles.cardDesc}>
                Reçois un rappel pour battre ton record et voir les nouveaux scores.
              </Text>
            </View>
          </View>
          <StatusBadge status={notifStatus} />
          {notifStatus === 'pending' && (
            <View style={styles.btnRow}>
              <TouchableOpacity style={styles.btnAllow} onPress={() => handleNotif(true)}>
                <Text style={styles.btnAllowText}>Autoriser</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnDeny} onPress={() => handleNotif(false)}>
                <Text style={styles.btnDenyText}>Pas maintenant</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>🔊</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Effets sonores</Text>
              <Text style={styles.cardDesc}>
                Sons de chats, bruitages rétro et musique lo-fi pendant la partie.
              </Text>
            </View>
          </View>
          <StatusBadge status={soundStatus} />
          {soundStatus === 'pending' && (
            <View style={styles.btnRow}>
              <TouchableOpacity style={styles.btnAllow} onPress={() => handleSound(true)}>
                <Text style={styles.btnAllowText}>Autoriser</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnDeny} onPress={() => handleSound(false)}>
                <Text style={styles.btnDenyText}>Pas maintenant</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {allAnswered && (
          <TouchableOpacity style={styles.continueBtn} onPress={() => navigation.navigate('Game')}>
            <Text style={styles.continueBtnText}>C'EST PARTI ! 🐱</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => navigation.navigate('Game')}>
          <Text style={styles.skipText}>Passer cette étape</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, paddingHorizontal: 24, paddingTop: 40, alignItems: 'center' },
  emoji: { fontSize: 52, marginBottom: 12 },
  title: { fontSize: 26, fontWeight: '800', color: Colors.white, marginBottom: 8, textAlign: 'center' },
  sub: { fontSize: 14, color: Colors.muted, textAlign: 'center', lineHeight: 20, marginBottom: 32 },
  card: { width: '100%', backgroundColor: Colors.surface, borderRadius: 16, padding: 18, marginBottom: 14, borderWidth: 1, borderColor: Colors.surfaceLight },
  cardHeader: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  cardIcon: { fontSize: 32 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: Colors.white, marginBottom: 4 },
  cardDesc: { fontSize: 13, color: Colors.muted, lineHeight: 18 },
  btnRow: { flexDirection: 'row', gap: 10 },
  btnAllow: { flex: 1, backgroundColor: Colors.teal, borderRadius: 20, paddingVertical: 10, alignItems: 'center' },
  btnAllowText: { color: Colors.background, fontWeight: '700', fontSize: 13 },
  btnDeny: { flex: 1, backgroundColor: Colors.surfaceLight, borderRadius: 20, paddingVertical: 10, alignItems: 'center' },
  btnDenyText: { color: Colors.muted, fontSize: 13 },
  badgeGranted: { color: Colors.teal, fontSize: 13, fontWeight: '600', marginBottom: 4 },
  badgeDenied: { color: Colors.muted, fontSize: 13, marginBottom: 4 },
  continueBtn: { width: '100%', backgroundColor: Colors.pink, borderRadius: 30, paddingVertical: 16, alignItems: 'center', marginTop: 8, marginBottom: 12 },
  continueBtnText: { color: Colors.white, fontSize: 17, fontWeight: '800', letterSpacing: 1 },
  skipText: { color: Colors.muted, fontSize: 13, marginTop: 8 },
});