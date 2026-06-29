import { PieceType } from "../constants/piece-types.constants";
import { Position } from "./Position";

export type Rotation = 0 | 1 | 2 | 3;

export interface ActivePiece {
  readonly type: PieceType;
  readonly pivot: Position;
  readonly rotation: Rotation;
  readonly cells: ReadonlyArray<Position>;
}
