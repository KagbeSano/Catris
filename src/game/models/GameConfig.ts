export interface GameConfig {
  readonly columns?: number;      
  readonly rows?: number;         
  readonly startLevel?: number;  
  readonly previewCount?: number; 
}

export const DEFAULT_CONFIG : GameConfig = {
  columns: 10,
  rows: 20,
  startLevel: 1
}
