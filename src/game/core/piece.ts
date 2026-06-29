import { PieceType } from "../constants/piece-types.constants";
import { PIECE_DEFAULT_POSITIONS } from "../constants/shape.constants";
import { ActivePiece, Rotation } from "../models/ActivePiece";
import { Position } from "../models/Position";

export function createPiece(type: PieceType, pivot: Position) : ActivePiece {
  return {type : type, pivot: pivot, rotation: 0 as Rotation, cells: calculatePositions(type, pivot, 0)};
};

export function calculatePositions(
  type: PieceType,
  pivot: Position,
  rotation: Rotation,
): ReadonlyArray<Position> {
  let offsets = PIECE_DEFAULT_POSITIONS[type];

  for (let i = 0; i < rotation; i++) {
    offsets = rotateOffsetCW(offsets);
  }

  return offsets.map((o) => ({
    col: pivot.col + o.col,
    row: pivot.row + o.row,
  }));
}

export function rotateOffsetCW(
  offsets: ReadonlyArray<Position>,
): ReadonlyArray<Position> {
  let rotateOffsets: Position[] = [];

  for (const offset of offsets) {
    rotateOffsets.push({ col: offset.row * -1, row: offset.col });
  }
  return rotateOffsets as ReadonlyArray<Position>;
}

export function move(
  piece: ActivePiece,
  moveX: number,
  moveY: number,
): ActivePiece {
  // modifies where the active piece is in the board (moveLeft()...)
  let pivot: Position = {
    col: piece.pivot.col + moveX,
    row: piece.pivot.row + moveY,
  };

  let cells: ReadonlyArray<Position> = calculatePositions(
    piece.type,
    pivot,
    piece.rotation,
  );

  return { ...piece, cells: cells, pivot: pivot } as ActivePiece;
}

export function rotateCW(piece: ActivePiece): ActivePiece {
  // modifies how active piece rotates
  if (piece.type == "O") {
    return piece;
  }

  let rotation: Rotation = ((piece.rotation + 1) % 4) as Rotation;

  let cells: ReadonlyArray<Position> = calculatePositions(
    piece.type,
    piece.pivot,
    rotation,
  );

  return { ...piece, cells: cells, rotation: rotation } as ActivePiece;
}
