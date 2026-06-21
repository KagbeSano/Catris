// src/models/index.ts
export interface GameRecord {
  id: string;
  score: number;
  lines: number;
  date: string;
}

export interface User {
  id: string;
  pseudo: string;
  email: string;
}