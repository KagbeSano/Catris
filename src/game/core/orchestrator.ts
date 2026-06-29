import {
  Cell,
  PIECE_TYPES,
  PieceType,
} from "../constants/piece-types.constants";
import { GameState } from "../interfaces/GameState";
import { ActivePiece } from "../models/ActivePiece";
import { DEFAULT_CONFIG } from "../models/GameConfig";
import { levelForLines, scoreForLines } from "../services/scoring";
import { Action } from "../types/actions.enum";
import { Board } from "../types/types";
import { createEmptyBoard, printPiecePositions } from "./board";
import { canPlace } from "./collision";
import { createPiece, move, rotateCW } from "./piece";

export function orchestrate(gameState: GameState, action: Action): GameState {
  switch (action) {
    case Action.START:
      return spawnNextActivePiece({ ...createNewState(), status: "running" });
    case Action.PAUSE:
      return gameState.status == "running"
        ? { ...gameState, status: "paused" }
        : gameState;
    case Action.RESUME:
      return gameState.status == "paused"
        ? { ...gameState, status: "running" }
        : gameState;
    /*         case Action.RESET: return gameState.status == 'paused' ? {...gameState, status:'running'} : gameState;  // TODO reset
     */
  }

  if (gameState.status != "running" || gameState.active == null) {
    return gameState;
  }

  switch (action) {
    case Action.MOVE_LEFT:
      return tryMove(gameState, -1, 0);
    case Action.MOVE_RIGHT:
      return tryMove(gameState, +1, 0);
    case Action.TICK:
      return gravityTick(gameState);
    case Action.ROTATE_CW: {
      const rotatedPiece = rotateCW(gameState.active);
      if (canPlace(gameState.board, rotatedPiece.cells)) {
        return { ...gameState, active: rotatedPiece };
      }
      return gameState;
    }
    case Action.HARD_DROP: {
      let s = gameState;
      while (true) {
        const movedPiece = move(s.active!, 0, 1);
        if (!canPlace(s.board, movedPiece.cells)) {
          break;
        }
        s = { ...s, active: movedPiece };
      }
      return resolvePiece(s);
    }
    default:
      return gameState;
  }
}

export function createNewState(): GameState {
  return {
    board: createEmptyBoard(DEFAULT_CONFIG.rows!, DEFAULT_CONFIG.columns!),
    active: null,
    queue: refillQueue(),
    status: "idle",
    score: 0,
    level: DEFAULT_CONFIG.startLevel!,
    lines: 0,
  };
}

function gravityTick(gameState: GameState): GameState {
  if (!gameState.active) {
    return gameState;
  }

  let movedPiece: ActivePiece = move(gameState.active, 0, +1);

  if (canPlace(gameState.board, movedPiece.cells)) {
    return { ...gameState, active: movedPiece } as GameState;
  }

  return resolvePiece(gameState) as GameState;
}

function resolvePiece(gameState: GameState): GameState {
  if (!gameState.active) {
    return gameState;
  }

  const newBoard: Board = printPiecePositions(
    gameState.board,
    gameState.active.cells,
    gameState.active.type,
  );

  const clearedRes: ClearResult = clearLines(newBoard);
  const lines: number = gameState.lines + clearedRes.cleared;
  const level: number = levelForLines(lines, DEFAULT_CONFIG.startLevel!);
  const score =
    gameState.score + scoreForLines(clearedRes.cleared, gameState.level);

  return spawnNextActivePiece({
    ...gameState,
    board: clearedRes.board,
    active: null,
    lines: lines,
    level: level,
    score: score,
  });
}

function spawnNextActivePiece(gameState: GameState): GameState {
  const queue: ReadonlyArray<PieceType> = gameState.queue.length > 0 ? gameState.queue : refillQueue();

  let newPiece = createPiece(queue[0], {
    col: Math.floor((DEFAULT_CONFIG.columns! + 1) / 2),
    row: 0,
  });

  const minRow = Math.min(...newPiece.cells.map((c) => c.row));
  if (minRow < 0) {
    newPiece = move(newPiece, 0, -minRow);
  }

  if (!canPlace(gameState.board, newPiece.cells)) {
    return { ...gameState, active: null, status: "gameover" };
  }

  if (gameState.queue.length > 0) {
    return {
      ...gameState,
      active: newPiece,
      queue: queue.slice(1),
    };
  }
  return {
    ...gameState,
    active: newPiece,
    queue: refillQueue(),
  };
}

function refillQueue(): ReadonlyArray<PieceType> {
  const pieceTypeArr = [];
  for (const pieceType of PIECE_TYPES) {
    pieceTypeArr.push(pieceType);
  }
  return pieceTypeArr.sort(
    () => Math.random() - 0.5,
  ) as ReadonlyArray<PieceType>;
}

export interface ClearResult {
  board: Board;
  cleared: number;
}

function clearLines(board: Board): ClearResult {
  const clearedBoard = board.filter((row) => row.some((cell) => cell == null));
  const clearedCount = board.length - clearedBoard.length;
  const emptyLines: Cell[][] = [];

  for (let i = 0; i < clearedCount; i++) {
    emptyLines.push(Array(board[0].length).fill(null) as Cell[]);
  }

  return { board: [...emptyLines, ...clearedBoard], cleared: clearedCount };
}

function tryMove(gameState: GameState, moveX: number, moveY: number) {
  if (!gameState.active) {
    return gameState;
  }

  const movedPiece: ActivePiece = move(gameState.active, moveX, moveY);

  if (canPlace(gameState.board, movedPiece.cells)) {
    return { ...gameState, active: movedPiece } as GameState;
  }
  return gameState;
}
