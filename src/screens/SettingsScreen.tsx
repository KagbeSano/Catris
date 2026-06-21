import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/color';
import { useAuth } from '../contexts/AuthContext';
import { usePermissions } from '../hooks/usePermissions';

type Props = { navigation: any };

export default function SettingsScreen({ navigation }: Props) {
  const { user, signOut } = useAuth();
  const { notifStatus, soundStatus, setNotif, setSound } = usePermissions();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Retour</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>⚙️ PARAMÈTRES</Text>

      <View style={styles.profileCard}>
        <Text style={styles.avatar}>🐱</Text>
        <Text style={styles.pseudo}>{user?.pseudo}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.profileLink}>Voir mon profil et mon historique →</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>AUTORISATIONS</Text>

      <View style={styles.permRow}>
        <View style={styles.permInfo}>
          <Text style={styles.permIcon}>🔔</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.permLabel}>Notifications</Text>
            <Text style={styles.permDesc}>Rappels et nouveaux scores</Text>
          </View>
        </View>
        <Switch
  value={notifStatus === 'granted'}
  onValueChange={setNotif}
  trackColor={{ false: Colors.surfaceLight, true: Colors.teal }}
  thumbColor={Colors.white}
/>
      </View>

      <View style={styles.permRow}>
        <View style={styles.permInfo}>
          <Text style={styles.permIcon}>🔊</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.permLabel}>Effets sonores</Text>
            <Text style={styles.permDesc}>Sons et musique pendant la partie</Text>
          </View>
        </View>
        <Switch
  value={soundStatus === 'granted'}
  onValueChange={setSound}
  trackColor={{ false: Colors.surfaceLight, true: Colors.teal }}
  thumbColor={Colors.white}
/>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut}>
          <Text style={styles.signOutText}>SE DÉCONNECTER</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: 20, paddingTop: 12 },
  back: { color: Colors.teal, fontSize: 14 },
  title: { fontSize: 24, fontWeight: '900', color: Colors.white, textAlign: 'center', marginTop: 8, marginBottom: 20, letterSpacing: 2 },
  profileCard: { backgroundColor: Colors.surface, marginHorizontal: 20, borderRadius: 20, padding: 20, alignItems: 'center', borderWidth: 1, borderColor: Colors.surfaceLight, marginBottom: 24 },
  avatar: { fontSize: 48, marginBottom: 6 },
  pseudo: { fontSize: 20, fontWeight: '800', color: Colors.amber },
  email: { fontSize: 13, color: Colors.muted, marginTop: 2, marginBottom: 10 },
  profileLink: { color: Colors.teal, fontSize: 13 },
  sectionTitle: { fontSize: 11, fontWeight: '700', color: Colors.muted, letterSpacing: 2, paddingHorizontal: 20, marginBottom: 10 },
  permRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: 14, padding: 16, marginHorizontal: 20, marginBottom: 10, borderWidth: 1, borderColor: Colors.surfaceLight },
  permInfo: { flexDirection: 'row', alignItems: 'center', flex: 1, gap: 12 },
  permIcon: { fontSize: 24 },
  permLabel: { fontSize: 15, fontWeight: '700', color: Colors.white },
  permDesc: { fontSize: 12, color: Colors.muted, marginTop: 2 },
  footer: { padding: 20, marginTop: 'auto' },
  signOutBtn: { backgroundColor: Colors.surface, borderRadius: 30, paddingVertical: 14, alignItems: 'center', borderWidth: 1, borderColor: Colors.error },
  signOutText: { color: Colors.error, fontSize: 14, fontWeight: '700', letterSpacing: 1 },
});