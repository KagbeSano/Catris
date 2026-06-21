import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/color';
import { useAuth } from '../contexts/AuthContext';
import { mockLeaderboard } from '../mocks/mockLeaderboard';

const RANK_COLORS: Record<number, string> = {
  0: Colors.amber,
  1: '#C0C0C0',
  2: '#CD7F32',
};

type Props = { navigation: any };

export default function LeaderboardScreen({ navigation }: Props) {
  const { user } = useAuth();

  const data = [...mockLeaderboard];
  if (user && !data.some((d) => d.id === user.id)) {
    data.push({ id: user.id, pseudo: user.pseudo, score: 0, avatar: '🐱' });
  }
  const sorted = data.sort((a, b) => b.score - a.score);

  const renderItem = ({ item, index }: { item: typeof sorted[0]; index: number }) => {
    const isTop3 = index < 3;
    const isMe = user?.id === item.id;
    const rankColor = RANK_COLORS[index] ?? Colors.muted;

    return (
      <View style={[styles.row, isTop3 && styles.rowTop3, isMe && styles.rowMe]}>
        <Text style={[styles.rank, { color: rankColor }]}>
          {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
        </Text>
        <Text style={styles.rowAvatar}>{item.avatar}</Text>
        <Text style={styles.rowPseudo}>{item.pseudo}{isMe ? ' (toi)' : ''}</Text>
        <Text style={[styles.rowScore, { color: isTop3 ? Colors.amber : Colors.white }]}>
          {item.score.toLocaleString()} pts
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Retour</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>🏆 CLASSEMENT</Text>
      <Text style={styles.sub}>TOP CHASSEURS DE SCORE</Text>

      <FlatList data={sorted} keyExtractor={(item) => item.id} renderItem={renderItem} contentContainerStyle={styles.list} />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.playBtn} onPress={() => navigation.navigate('Game')}>
          <Text style={styles.playBtnText}>JOUER 🐾</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: 20, paddingTop: 12 },
  back: { color: Colors.teal, fontSize: 14 },
  title: { fontSize: 28, fontWeight: '900', color: Colors.white, textAlign: 'center', marginTop: 12, letterSpacing: 2 },
  sub: { fontSize: 11, color: Colors.muted, textAlign: 'center', letterSpacing: 3, marginBottom: 20 },
  list: { paddingHorizontal: 20, paddingBottom: 20 },
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: 14, padding: 14, marginBottom: 8, borderWidth: 1, borderColor: Colors.surfaceLight, gap: 12 },
  rowTop3: { borderColor: Colors.amber + '55' },
  rowMe: { borderColor: Colors.teal, borderWidth: 2 },
  rank: { fontSize: 18, width: 32, textAlign: 'center', fontWeight: '800' },
  rowAvatar: { fontSize: 24 },
  rowPseudo: { flex: 1, fontSize: 15, color: Colors.white, fontWeight: '600' },
  rowScore: { fontSize: 15, fontWeight: '800' },
  footer: { padding: 20 },
  playBtn: { backgroundColor: Colors.pink, borderRadius: 30, paddingVertical: 16, alignItems: 'center' },
  playBtnText: { color: Colors.white, fontSize: 17, fontWeight: '800', letterSpacing: 1 },
});