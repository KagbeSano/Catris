// src/screens/GameScreen.tsx
import { useEffect, useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text, TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/color';
import { usePermissions } from '../hooks/usePermissions';
import { sendGameStartNotification } from '../services/notificationService';
import { playSound } from '../services/soundService';

type Props = { navigation: any };

export default function GameScreen({ navigation }: Props) {
  const { notifStatus, soundStatus } = usePermissions();
  const [score, setScore] = useState(1250);
  const [bestScore] = useState(4560);
  const [combo, setCombo] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);

  // Au lancement de l'écran de jeu : notif + son si autorisés
  useEffect(() => {
    if (notifStatus === 'granted') sendGameStartNotification();
    if (soundStatus === 'granted') playSound('gameStart');
  }, [notifStatus, soundStatus]);

  // Zone de jeu : le moteur
  const GameBoard = () => (
    <View style={styles.board}>
      <Text style={styles.boardPlaceholder}>
        🐱{'\n\n'}Zone de jeu{'\n'}(moteur Tetris ici)
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>

      {/* HUD — Score */}
      <View style={styles.hud}>
        <View style={styles.hudBlock}>
          <Text style={styles.hudLabel}>SCORE</Text>
          <Text style={styles.hudValue}>{score.toLocaleString()}</Text>
        </View>
        <TouchableOpacity style={styles.pauseBtn} onPress={() => setPaused(true)}>
          <Text style={styles.pauseIcon}>⏸</Text>
        </TouchableOpacity>
        <View style={[styles.hudBlock, { alignItems: 'flex-end' }]}>
          <Text style={styles.hudLabel}>MEILLEUR</Text>
          <Text style={styles.hudBest}>{bestScore.toLocaleString()}</Text>
        </View>
      </View>

      {/* Plateau de jeu */}
      <View style={styles.boardContainer}>
        <GameBoard />

        {combo !== null && (
          <View style={styles.comboOverlay} pointerEvents="none">
            <Text style={styles.comboLabel}>COMBO</Text>
            <Text style={styles.comboValue}>x{combo}</Text>
          </View>
        )}
      </View>

      {/* Boutons test visuels (à retirer une fois le moteur branché) */}
      <View style={styles.testRow}>
        <TouchableOpacity
          style={styles.testBtn}
          onPress={() => {
            setScore(s => s + 100);
            setCombo(3);
            if (soundStatus === 'granted') playSound('lineClear');
            setTimeout(() => setCombo(null), 1500);
          }}
        >
          <Text style={styles.testBtnText}>+100 (test combo)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.testBtn, { backgroundColor: Colors.error + '33' }]}
          onPress={() => {
            if (soundStatus === 'granted') playSound('gameOver');
            navigation.navigate('GameOver', { score });
          }}
        >
          <Text style={[styles.testBtnText, { color: Colors.error }]}>Game Over</Text>
        </TouchableOpacity>
      </View>

      {/* Modal PAUSE */}
      <Modal visible={paused} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>EN PAUSE</Text>
            <Text style={styles.modalCat}>😺</Text>

            <TouchableOpacity
              style={[styles.modalBtn, { backgroundColor: Colors.teal }]}
              onPress={() => setPaused(false)}
            >
              <Text style={styles.modalBtnText}>REPRENDRE</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalBtn, { backgroundColor: Colors.amber }]}
              onPress={() => { setPaused(false); setScore(0); }}
            >
              <Text style={[styles.modalBtnText, { color: Colors.background }]}>RECOMMENCER</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalBtn, { backgroundColor: Colors.purple }]}
              onPress={() => { setPaused(false); navigation.navigate('Profile'); }}
            >
              <Text style={styles.modalBtnText}>MENU PRINCIPAL</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalBtn, { backgroundColor: Colors.surface }]}
              onPress={() => { setPaused(false); navigation.navigate('Settings'); }}
            >
              <Text style={[styles.modalBtnText, { color: Colors.muted }]}>PARAMÈTRES</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  hud: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  hudBlock: {},
  hudLabel: { fontSize: 10, color: Colors.muted, letterSpacing: 2, fontWeight: '700' },
  hudValue: { fontSize: 28, fontWeight: '900', color: Colors.white },
  hudBest: { fontSize: 20, fontWeight: '700', color: Colors.amber },
  pauseBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.surfaceLight,
  },
  pauseIcon: { fontSize: 18 },
  boardContainer: {
    flex: 1,
    marginHorizontal: 16,
    position: 'relative',
  },
  board: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.surfaceLight,
  },
  boardPlaceholder: {
    color: Colors.muted,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 28,
  },
  comboOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  comboLabel: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.amber,
    letterSpacing: 4,
  },
  comboValue: {
    fontSize: 72,
    fontWeight: '900',
    color: Colors.amber,
    lineHeight: 80,
  },
  testRow: {
    flexDirection: 'row',
    gap: 10,
    padding: 16,
  },
  testBtn: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  testBtnText: { color: Colors.muted, fontSize: 12 },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#000000BB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBox: {
    backgroundColor: Colors.background,
    borderRadius: 24,
    padding: 28,
    width: '80%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.surfaceLight,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.white,
    letterSpacing: 3,
    marginBottom: 8,
  },
  modalCat: { fontSize: 48, marginBottom: 20 },
  modalBtn: {
    width: '100%',
    borderRadius: 20,
    paddingVertical: 13,
    alignItems: 'center',
    marginBottom: 10,
  },
  modalBtnText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 1,
  },
});