import { GameRecord } from '../models';

export const mockHistoryByUser: Record<string, GameRecord[]> = {
  '1': [
    { id: 'h1', score: 5800, lines: 22, date: '14/06/2025' },
    { id: 'h2', score: 4100, lines: 16, date: '10/06/2025' },
  ],
  '2': [
    { id: 'h3', score: 5900, lines: 24, date: '15/06/2025' },
    { id: 'h4', score: 3200, lines: 12, date: '09/06/2025' },
  ],
  '3': [
    { id: 'h5', score: 5080, lines: 19, date: '13/06/2025' },
  ],
};

export function getHistoryForUser(userId: string): GameRecord[] {
  return mockHistoryByUser[userId] ?? [];
}