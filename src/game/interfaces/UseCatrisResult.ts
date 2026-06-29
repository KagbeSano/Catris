import { CatrisActions } from "./CatrisActions";
import { GameConfig } from "../models/GameConfig";
import { GameState } from "./GameState";

export interface UseCatrisResult {
  readonly state: GameState;
  readonly actions: CatrisActions;
}
 
export declare function useCatris(config?: GameConfig): UseCatrisResult;
