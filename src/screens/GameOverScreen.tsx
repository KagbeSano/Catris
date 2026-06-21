// src/screens/GameOverScreen.tsx
import { useEffect, useRef } from 'react';
import { Animated, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { CatBtn } from '../components/ui/ui';
import { useGameHistory } from '../hooks/useGameHistory';
import { Colors, Radius, Spacing } from '../../constants/theme';

type Props = { navigation: any; route: { params: { score: number } } };

export default function GameOverScreen({ navigation, route }: Props) {
  const { score } = route.params ?? { score: 0 };
  const { bestScore, saveGame } = useGameHistory();

  const scaleAnim   = useRef(new Animated.Value(0.4)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const isNewBest = score > bestScore;

  useEffect(() => {
    saveGame(score, Math.floor(score / 100));

    Animated.parallel([
      Animated.spring(scaleAnim,   { toValue: 1,    friction: 5, tension: 80, useNativeDriver: true }),
      Animated.timing(opacityAnim, { toValue: 1,    duration: 400,            useNativeDriver: true }),
    ]).start();
  }, []);

  const catEmoji = score > 3000 ? '😸' : score > 1000 ? '😺' : '😿';

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.container}>

        <Animated.Text style={[s.cat, { transform: [{ scale: scaleAnim }], opacity: opacityAnim }]}>
          {catEmoji}
        </Animated.Text>

        <Text style={s.title}>PARTIE TERMINÉE</Text>

        {isNewBest && (
          <View style={s.newBestBadge}>
            <Text style={s.newBestText}>🏆 NOUVEAU RECORD !</Text>
          </View>
        )}

        <Animated.View style={[s.scoreCard, { opacity: opacityAnim }]}>
          <Text style={s.scoreLabel}>TON SCORE</Text>
          <Text style={s.scoreValue}>{score.toLocaleString('fr-FR')}</Text>
          <Text style={s.scoreSub}>pts</Text>
          {!isNewBest && (
            <Text style={s.bestHint}>Meilleur : <Text style={{ color: Colors.amber }}>{bestScore.toLocaleString('fr-FR')}</Text></Text>
          )}
        </Animated.View>

        <View style={s.actions}>
          <CatBtn label="REJOUER 🐱"      variant="pink"   onPress={() => navigation.replace('Game')}        style={s.btn} />
          <CatBtn label="CLASSEMENT 🏆"   variant="purple" onPress={() => navigation.navigate('Leaderboard')} style={s.btn} />
          <CatBtn label="MON PROFIL"       variant="dark"   onPress={() => navigation.navigate('Profile')}    style={s.btn} />
        </View>

      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:         { flex: 1, backgroundColor: Colors.background },
  container:    { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: Spacing.xl, gap: Spacing.lg },
  cat:          { fontSize: 80 },
  title:        { fontSize: 22, fontWeight: '900', color: Colors.white, letterSpacing: 3 },
  newBestBadge: { backgroundColor: Colors.amber + '22', borderRadius: Radius.full, paddingVertical: 6, paddingHorizontal: Spacing.lg, borderWidth: 1, borderColor: Colors.amber + '55' },
  newBestText:  { color: Colors.amber, fontWeight: '700', fontSize: 13, letterSpacing: 1 },
  scoreCard:    { backgroundColor: Colors.surface, borderRadius: Radius.xl, paddingVertical: Spacing.xl, paddingHorizontal: 48, alignItems: 'center', borderWidth: 2, borderColor: Colors.purple + '66', marginVertical: Spacing.sm },
  scoreLabel:   { fontSize: 10, color: Colors.muted, letterSpacing: 3, fontWeight: '700', marginBottom: 4 },
  scoreValue:   { fontSize: 56, fontWeight: '900', color: Colors.amber, lineHeight: 64 },
  scoreSub:     { fontSize: 14, color: Colors.muted, fontWeight: '600', letterSpacing: 1 },
  bestHint:     { fontSize: 12, color: Colors.muted, marginTop: Spacing.sm },
  actions:      { width: '100%', gap: Spacing.md },
  btn:          {},
});
