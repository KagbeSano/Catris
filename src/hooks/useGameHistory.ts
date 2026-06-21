// src/hooks/useGameHistory.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { GameRecord } from '../models';

const HISTORY_KEY  = 'gameHistory';
const BEST_KEY     = 'bestScore';
const MAX_HISTORY  = 10;

/**
 * Hook personnalisé — gère l'historique des parties et le meilleur score.
 * Charge depuis AsyncStorage au montage, expose des fonctions de sauvegarde.
 */
export function useGameHistory() {
  const [history, setHistory]     = useState<GameRecord[]>([]);
  const [bestScore, setBestScore] = useState(0);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState<string | null>(null);

  // Charger au montage
  useEffect(() => {
    const load = async () => {
      try {
        const [storedHistory, storedBest] = await Promise.all([
          AsyncStorage.getItem(HISTORY_KEY),
          AsyncStorage.getItem(BEST_KEY),
        ]);
        if (storedHistory) setHistory(JSON.parse(storedHistory));
        if (storedBest)    setBestScore(parseInt(storedBest));
      } catch (e) {
        setError('Impossible de charger l\'historique.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Sauvegarder une nouvelle partie
  const saveGame = useCallback(async (score: number, lines: number) => {
    try {
      const record: GameRecord = {
        id:    Date.now().toString(),
        score,
        lines,
        date:  new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      };

      const updated = [record, ...history].slice(0, MAX_HISTORY);
      await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      setHistory(updated);

      if (score > bestScore) {
        await AsyncStorage.setItem(BEST_KEY, String(score));
        setBestScore(score);
      }

      return record;
    } catch (e) {
      setError('Impossible de sauvegarder la partie.');
      return null;
    }
  }, [history, bestScore]);

  const clearHistory = useCallback(async () => {
    await AsyncStorage.multiRemove([HISTORY_KEY, BEST_KEY]);
    setHistory([]);
    setBestScore(0);
  }, []);

  return { history, bestScore, loading, error, saveGame, clearHistory };
}
