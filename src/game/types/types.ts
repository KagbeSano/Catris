import { Cell } from "../constants/piece-types.constants";

export type Board = ReadonlyArray<ReadonlyArray<Cell>>;
 
export type GameStatus = 'idle' | 'running' | 'paused' | 'gameover';