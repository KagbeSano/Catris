import { Position } from "../models/Position";
import { PieceType } from "./piece-types.constants";

export const PIECE_DEFAULT_POSITIONS: Record<PieceType, ReadonlyArray<Position>> = {
  J: [
    { col: -1, row: -1 },
    { col: -1, row: 0 },
    { col: 0, row: 0 },
    { col: +1, row: 0 },
  ],
  L: [
    { col: +1, row: -1 },
    { col: +1, row: 0 },
    { col: 0, row: 0 },
    { col: -1, row: 0 },
  ],
  T: [
    { col: 0, row: 0 },
    { col: -1, row: 0 },
    { col: 0, row: -1 },
    { col: +1, row: 0 },
  ],
  S: [
    { col: -1, row: 0 },
    { col: 0, row: 0 },
    { col: 0, row: -1 },
    { col: +1, row: -1 },
  ],
  Z: [
    { col: -1, row: -1 },
    { col: 0, row: -1 },
    { col: 0, row: 0 },
    { col: +1, row: 0 },
  ],
  I: [
    { col: -1, row: 0 },
    { col: 0, row: 0 },
    { col: +1, row: 0 },
    { col: +2, row: 0 },
  ],
  O: [
    { col: 0, row: 0 },
    { col: 0, row: -1 },
    { col: +1, row: -1 },
    { col: +1, row: 0 },
  ],
};


