export const mockGameState = {
  score: 1200,
  level: 3,
  lines: 15,
  status: 'running',
  board: Array(20).fill(null).map(() => Array(10).fill(null)),
  active: null,
  queue: [{ type: 'T' }],
};