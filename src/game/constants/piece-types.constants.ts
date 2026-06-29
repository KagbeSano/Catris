export const PIECE_TYPES = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'] as const;
export type PieceType = typeof PIECE_TYPES[number];
export type Cell = PieceType | null;