export interface CatrisActions {
  start(): void;  
  pause(): void;  
  resume(): void; 
  reset(): void;
  moveLeft(): void;
  moveRight(): void;
  Drop(): void;
  hardDrop(): void;
  rotateCW(): void;
  tick(): void
}
