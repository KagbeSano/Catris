// src/screens/LeaderboardScreen.tsx
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Colors } from '../../constants/color';
import { SafeAreaView } from 'react-native-safe-area-context';

const MOCK_SCORES = [
  { id: '1', pseudo: 'NightCat',   score: 12400, avatar: '🐈‍⬛' },
  { id: '2', pseudo: 'MiaouKing',  score: 9850,  avatar: '😸' },
  { id: '3', pseudo: 'PurrFect',   score: 8200,  avatar: '😺' },
  { id: '4', pseudo: 'CatPlayer',  score: 4560,  avatar: '🐱' },
  { id: '5', pseudo: 'TetrisCat',  score: 3900,  avatar: '🙀' },
  { id: '6', pseudo: 'FluffyPaws', score: 2750,  avatar: '😻' },
  { id: '7', pseudo: 'CatNinja',   score: 1200,  avatar: '🐾' },
];

const RANK_COLORS: Record<number, string> = {
  0: Colors.amber,
  1: '#C0C0C0',
  2: '#CD7F32',
};

type Props = { navigation: any };

export default function LeaderboardScreen({ navigation }: Props) {

  const renderItem = ({ item, index }: { item: typeof MOCK_SCORES[0]; index: number }) => {
    const isTop3 = index < 3;
    const rankColor = RANK_COLORS[index] ?? Colors.muted;

    return (
      <View style={[styles.row, isTop3 && styles.rowTop3]}>
        <Text style={[styles.rank, { color: rankColor }]}>
          {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
        </Text>
        <Text style={styles.rowAvatar}>{item.avatar}</Text>
        <Text style={styles.rowPseudo}>{item.pseudo}</Text>
        <Text style={[styles.rowScore, { color: isTop3 ? Colors.amber : Colors.white }]}>
          {item.score.toLocaleString()} pts
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Retour</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>🏆 CLASSEMENT</Text>
      <Text style={styles.sub}>TOP CHASSEURS DE SCORE</Text>

      <FlatList
        data={MOCK_SCORES}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.playBtn}
          onPress={() => navigation.navigate('Game')}
        >
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
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.white,
    textAlign: 'center',
    marginTop: 12,
    letterSpacing: 2,
  },
  sub: {
    fontSize: 11,
    color: Colors.muted,
    textAlign: 'center',
    letterSpacing: 3,
    marginBottom: 20,
  },
  list: { paddingHorizontal: 20, paddingBottom: 20 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.surfaceLight,
    gap: 12,
  },
  rowTop3: {
    borderColor: Colors.amber + '55',
    backgroundColor: Colors.surface,
  },
  rank: { fontSize: 18, width: 32, textAlign: 'center', fontWeight: '800' },
  rowAvatar: { fontSize: 24 },
  rowPseudo: { flex: 1, fontSize: 15, color: Colors.white, fontWeight: '600' },
  rowScore: { fontSize: 15, fontWeight: '800' },
  footer: { padding: 20 },
  playBtn: {
    backgroundColor: Colors.pink,
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
  },
  playBtnText: { color: Colors.white, fontSize: 17, fontWeight: '800', letterSpacing: 1 },
});