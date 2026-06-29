const LINE_SCORE: Record<number, number> = { 1: 100, 2: 300, 3: 500, 4: 800 };

export function scoreForLines(cleared: number, level: number): number {
  return (LINE_SCORE[cleared] ?? 0) * level;
}

export function levelForLines(totalLines: number, startLevel: number): number {
  return startLevel + Math.floor(totalLines / 10);
}

export function gravityDelay(level: number): number {
  return Math.max(80, 800 - (level - 1) * 70);
}