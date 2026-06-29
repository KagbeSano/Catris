import { Position } from "../models/Position";
import { Board } from "../types/types";
import { isEmpty, isInsideBoard } from "./board";

export function canPlace(board: Board, positions: ReadonlyArray<Position>) : boolean {
 for(const position of positions) {
    if(!isInsideBoard(position, board) || !isEmpty(position, board)) {
        return false;
    }
 }
 return true;   
}