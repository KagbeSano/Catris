// src/screens/GameScreen.tsx
import { useEffect, useRef, useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/color';
import GameBoard from '../components/ui/game/GameBoard';
import NextPiece from '../components/ui/game/NextPiece';
import { useCatris } from '../hooks/useCatris';
import { usePermissions } from '../hooks/usePermissions';
import { sendGameStartNotification } from '../services/notificationService';
import { playSound } from '../services/soundService';

type Props = { navigation: any };

export default function GameScreen({ navigation }: Props) {
  const { state, actions, restart } = useCatris();
  const { notifStatus, soundStatus } = usePermissions();
  const [paused, setPaused] = useState(false);
  const prevLinesRef = useRef(0);
  const gameOverSoundPlayedRef = useRef(false);

  // Lancement au montage
  useEffect(() => {
    actions.start();
    if (notifStatus === 'granted') sendGameStartNotification();
    if (soundStatus === 'granted') playSound('gameStart');
  }, []);

  // Son lors d'une ligne complétée
  useEffect(() => {
    if (state.lines > prevLinesRef.current) {
      if (soundStatus === 'granted') playSound('lineClear');
      prevLinesRef.current = state.lines;
    }
  }, [state.lines]);

  // Game over — ref pour éviter que le son se rejoue à chaque re-render
  useEffect(() => {
    if (state.status === 'gameover' && !gameOverSoundPlayedRef.current) {
      gameOverSoundPlayedRef.current = true;
      if (soundStatus === 'granted') playSound('gameOver');
    }
    if (state.status === 'running') {
      gameOverSoundPlayedRef.current = false; // reset pour la prochaine partie
    }
  }, [state.status, soundStatus]);

  const handlePause = () => {
    actions.pause();
    setPaused(true);
  };

  const handleResume = () => {
    actions.resume();
    setPaused(false);
  };

  const handleRestart = () => {
    setPaused(false);
    prevLinesRef.current = 0;
    gameOverSoundPlayedRef.current = false;
    restart();
    if (soundStatus === 'granted') playSound('gameStart');
  };

  return (
    <SafeAreaView style={styles.safe}>

      {/* HUD */}
      <View style={styles.hud}>
        <View style={styles.hudBlock}>
          <Text style={styles.hudLabel}>SCORE</Text>
          <Text style={styles.hudValue}>{state.score.toLocaleString()}</Text>
        </View>

        <TouchableOpacity style={styles.pauseBtn} onPress={handlePause} disabled={state.status === 'gameover'}>
          <Text style={styles.pauseIcon}>⏸</Text>
        </TouchableOpacity>

        <View style={[styles.hudBlock, { alignItems: 'flex-end' }]}>
          <Text style={styles.hudLabel}>NIVEAU</Text>
          <Text style={styles.hudBest}>{state.level}</Text>
        </View>
      </View>

      {/* Zone de jeu + infos latérales */}
      <View style={styles.gameArea}>
        <View>
          {state.status === 'gameover' ? (
            <View style={styles.gameOverBox}>
              <Text style={styles.gameOverText}>😿</Text>
              <Text style={styles.gameOverLabel}>GAME OVER</Text>
              <Text style={styles.gameOverScore}>{state.score.toLocaleString()} pts</Text>
              <TouchableOpacity style={styles.restartBtn} onPress={handleRestart}>
                <Text style={styles.restartBtnText}>REJOUER 🐾</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text style={styles.homeLink}>← Menu principal</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <GameBoard state={state} />
          )}
        </View>

        {/* Panneau infos */}
        <View style={styles.sidebar}>
          <View style={styles.sideBlock}>
            <Text style={styles.sideLabel}>LIGNES</Text>
            <Text style={styles.sideValue}>{state.lines}</Text>
          </View>

          {state.queue[0] && (
            <View style={styles.sideBlock}>
              <Text style={styles.sideLabel}>SUIVANT</Text>
              <NextPiece type={state.queue[0]} />
            </View>
          )}

          {state.queue[1] && (
            <View style={styles.sideBlock}>
              <Text style={styles.sideLabel}>APRÈS</Text>
              <NextPiece type={state.queue[1]} />
            </View>
          )}
        </View>
      </View>

      {/* Contrôles */}
      {state.status !== 'gameover' && (
        <View style={styles.controls}>
          <View style={styles.controlRow}>
            <TouchableOpacity
              style={styles.ctrlBtn}
              onPress={() => {
                actions.moveLeft();
                if (soundStatus === 'granted') playSound('move', 0.5);
              }}
            >
              <Text style={styles.ctrlIcon}>◀</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.ctrlBtn}
              onPress={() => {
                actions.rotateCW();
                if (soundStatus === 'granted') playSound('move', 0.5);
              }}
            >
              <Text style={styles.ctrlIcon}>↻</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.ctrlBtn}
              onPress={() => {
                actions.moveRight();
                if (soundStatus === 'granted') playSound('move', 0.5);
              }}
            >
              <Text style={styles.ctrlIcon}>▶</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.ctrlBtn, styles.dropBtn]}
            onPress={() => {
              actions.hardDrop();
              if (soundStatus === 'granted') playSound('lineClear', 0.7);
            }}
          >
            <Text style={styles.ctrlIcon}>⬇  HARD DROP</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Modal PAUSE */}
      <Modal visible={paused} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>EN PAUSE</Text>
            <Text style={styles.modalCat}>😺</Text>

            <TouchableOpacity
              style={[styles.modalBtn, { backgroundColor: Colors.teal }]}
              onPress={handleResume}
            >
              <Text style={styles.modalBtnText}>REPRENDRE</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalBtn, { backgroundColor: Colors.amber }]}
              onPress={handleRestart}
            >
              <Text style={[styles.modalBtnText, { color: Colors.background }]}>RECOMMENCER</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalBtn, { backgroundColor: Colors.purple }]}
              onPress={() => { setPaused(false); navigation.navigate('Home'); }}
            >
              <Text style={styles.modalBtnText}>MENU PRINCIPAL</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalBtn, { backgroundColor: Colors.surface }]}
              onPress={() => { handleResume(); navigation.navigate('Settings'); }}
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
    paddingVertical: 10,
  },
  hudBlock: {},
  hudLabel: { fontSize: 9, color: Colors.muted, letterSpacing: 2, fontWeight: '700' },
  hudValue: { fontSize: 26, fontWeight: '900', color: Colors.white },
  hudBest:  { fontSize: 20, fontWeight: '700', color: Colors.amber },
  pauseBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.surface,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: Colors.surfaceLight,
  },
  pauseIcon: { fontSize: 16 },

  gameArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 12,
    gap: 12,
  },

  sidebar: { gap: 16, paddingTop: 4 },
  sideBlock: { alignItems: 'center', gap: 4 },
  sideLabel: { fontSize: 9, color: Colors.muted, letterSpacing: 2, fontWeight: '700' },
  sideValue: { fontSize: 22, fontWeight: '900', color: Colors.white },

  gameOverBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    borderWidth: 2,
    borderColor: Colors.error,
    borderRadius: 16,
    padding: 24,
    gap: 10,
  },
  gameOverText:  { fontSize: 52 },
  gameOverLabel: { fontSize: 24, fontWeight: '900', color: Colors.error, letterSpacing: 3 },
  gameOverScore: { fontSize: 20, fontWeight: '700', color: Colors.amber },
  restartBtn: {
    backgroundColor: Colors.pink,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 28,
    marginTop: 8,
  },
  restartBtnText: { color: Colors.white, fontWeight: '800', fontSize: 15, letterSpacing: 1 },
  homeLink: { color: Colors.muted, fontSize: 13, marginTop: 4 },

  controls: { padding: 12, gap: 8 },
  controlRow: { flexDirection: 'row', justifyContent: 'center', gap: 12 },
  ctrlBtn: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.surfaceLight,
  },
  ctrlIcon: { color: Colors.white, fontSize: 18, fontWeight: '700' },
  dropBtn: { alignSelf: 'center', paddingHorizontal: 40, backgroundColor: Colors.purple },

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
    fontSize: 26, fontWeight: '900', color: Colors.white,
    letterSpacing: 3, marginBottom: 8,
  },
  modalCat: { fontSize: 44, marginBottom: 20 },
  modalBtn: {
    width: '100%', borderRadius: 20,
    paddingVertical: 13, alignItems: 'center', marginBottom: 10,
  },
  modalBtnText: { color: Colors.white, fontWeight: '700', fontSize: 14, letterSpacing: 1 },
});