// src/screens/ProfileScreen.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '../../constants/color';
import { GameRecord } from '../models';
import { SafeAreaView } from 'react-native-safe-area-context';

// Nous avons mis les données fictives pour tester visuellement
const MOCK_HISTORY: GameRecord[] = [
  { id: '1', score: 4560, lines: 18, date: '14/06/2025' },
  { id: '2', score: 3200, lines: 12, date: '13/06/2025' },
  { id: '3', score: 1850, lines: 7,  date: '12/06/2025' },
  { id: '4', score: 920,  lines: 3,  date: '11/06/2025' },
];

const CAT_AVATARS = ['🐱', '🐈', '😺', '😸', '🙀', '😻'];

type Props = { navigation: any };

export default function ProfileScreen({ navigation }: Props) {
  const [pseudo, setPseudo] = useState('CatPlayer');
  const [bestScore, setBestScore] = useState(4560);
  const [totalGames, setTotalGames] = useState(12);
  const [history, setHistory] = useState<GameRecord[]>(MOCK_HISTORY);
  const [avatar] = useState(CAT_AVATARS[0]);

  useEffect(() => {
    const load = async () => {
      const stored = await AsyncStorage.getItem('gameHistory');
      if (stored) setHistory(JSON.parse(stored));
      const best = await AsyncStorage.getItem('bestScore');
      if (best) setBestScore(parseInt(best));
    };
    load();
  }, []);

  const handleSignOut = () => {

    navigation.navigate('Login');
  };

  const renderItem = ({ item, index }: { item: GameRecord; index: number }) => (
    <View style={styles.historyRow}>
      <Text style={styles.historyRank}>#{index + 1}</Text>
      <View style={styles.historyInfo}>
        <Text style={styles.historyScore}>{item.score} pts</Text>
        <Text style={styles.historyLines}>{item.lines} lignes</Text>
      </View>
      <Text style={styles.historyDate}>{item.date}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Game')}>
          <Text style={styles.navLink}>🎮 Jouer</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Leaderboard')}>
          <Text style={styles.navLink}>🏆 Classement</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileCard}>
        <Text style={styles.avatar}>{avatar}</Text>
        <Text style={styles.pseudo}>{pseudo}</Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{bestScore}</Text>
            <Text style={styles.statLabel}>Meilleur score</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{totalGames}</Text>
            <Text style={styles.statLabel}>Parties jouées</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>HISTORIQUE DES PARTIES</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>Aucune partie jouée pour l'instant 😿</Text>
        }
      />

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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  navLink: { color: Colors.teal, fontSize: 14 },
  profileCard: {
    backgroundColor: Colors.surface,
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.surfaceLight,
    marginBottom: 20,
  },
  avatar: { fontSize: 64, marginBottom: 8 },
  pseudo: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.amber,
    marginBottom: 16,
    letterSpacing: 1,
  },
  statsRow: { flexDirection: 'row', alignItems: 'center' },
  statBox: { alignItems: 'center', paddingHorizontal: 24 },
  statValue: { fontSize: 28, fontWeight: '900', color: Colors.white },
  statLabel: { fontSize: 11, color: Colors.muted, marginTop: 2, letterSpacing: 1 },
  statDivider: { width: 1, height: 40, backgroundColor: Colors.surfaceLight },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.muted,
    letterSpacing: 2,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  list: { paddingHorizontal: 20, paddingBottom: 20 },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.surfaceLight,
  },
  historyRank: { fontSize: 13, color: Colors.muted, width: 30 },
  historyInfo: { flex: 1 },
  historyScore: { fontSize: 16, fontWeight: '700', color: Colors.amber },
  historyLines: { fontSize: 12, color: Colors.teal, marginTop: 2 },
  historyDate: { fontSize: 12, color: Colors.muted },
  empty: { textAlign: 'center', color: Colors.muted, marginTop: 40, fontSize: 15 },
  footer: { padding: 20 },
  signOutBtn: {
    backgroundColor: Colors.surface,
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.error,
  },
  signOutText: { color: Colors.error, fontSize: 14, fontWeight: '700', letterSpacing: 1 },
});