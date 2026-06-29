import { PieceType } from "../constants/piece-types.constants";
import { Board, GameStatus } from "../types/types";
import { ActivePiece } from "../models/ActivePiece";

export interface GameState {
  readonly board: Board;  // only contains inactive pieces / cells
  readonly active: ActivePiece | null;
  readonly queue: ReadonlyArray<PieceType>;  
  readonly status: GameStatus;
  readonly score: number;
  readonly level: number;
  readonly lines: number;   // completed row?
}
