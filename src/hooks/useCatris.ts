import { useCallback, useEffect, useRef, useState } from 'react';
import { GameState } from '../game/interfaces/GameState';
import { createCatris } from '../game/services/engine';
import { gravityDelay } from '../game/services/scoring';

const TICK_MS = 60;

export function useCatris() {
  const engineRef  = useRef(createCatris());
  const unsubRef   = useRef<(() => void) | null>(null);
  const loopRef    = useRef<ReturnType<typeof setInterval> | null>(null);
  const elapsedRef = useRef(0);

  const [state, setState] = useState<GameState>(() => engineRef.current.getState());

  useEffect(() => {
    unsubRef.current = engineRef.current.subscribe(setState);
    return () => {
      unsubRef.current?.();
      if (loopRef.current) clearInterval(loopRef.current);
    };
  }, []);

 useEffect(() => {
    if (loopRef.current) {
      clearInterval(loopRef.current);
      loopRef.current = null;
    }

    if (state.status === 'running') {
      elapsedRef.current = 0;
      loopRef.current = setInterval(() => {
        elapsedRef.current += TICK_MS;
        const delay = gravityDelay(engineRef.current.getState().level);
        if (elapsedRef.current >= delay) {
          elapsedRef.current = 0;
          engineRef.current.actions.tick();
        }
      }, TICK_MS);
    }

    return () => {
      if (loopRef.current) {
        clearInterval(loopRef.current);
        loopRef.current = null;
      }
    };
  }, [state.status]);

  const restart = useCallback(() => {
    if (loopRef.current) {
      clearInterval(loopRef.current);
      loopRef.current = null;
    }
    unsubRef.current?.();

    const newEngine = createCatris();
    engineRef.current = newEngine;
    elapsedRef.current = 0;

    unsubRef.current = newEngine.subscribe(setState);
    setState(newEngine.getState());
    newEngine.actions.start();
  }, []);

  return {
    state,
    actions: engineRef.current.actions,
    restart,
  };
}