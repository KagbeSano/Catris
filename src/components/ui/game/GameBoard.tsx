import { useMemo } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Cell, PieceType } from '../../../game/constants/piece-types.constants';
import { printPiecePositions } from '../../../game/core/board';
import { GameState } from '../../../game/interfaces/GameState';

const COLS = 10;
const ROWS = 20;
const SCREEN_W = Dimensions.get('window').width;
const CELL = Math.floor((SCREEN_W - 80) / COLS); // s'adapte à l'écran

const PIECE_COLORS: Record<PieceType, string> = {
  I: '#5EEAD4', // teal
  O: '#FFD166', // amber
  T: '#8B5CF6', // purple
  S: '#4ADE80', // vert
  Z: '#FF6B6B', // rouge
  J: '#60A5FA', // bleu
  L: '#FB923C', // orange
};

export default function GameBoard({ state }: { state: GameState }) {
  // Fusionne la pièce active avec le board pour l'affichage
  const displayBoard = useMemo(() => {
    if (!state.active) return state.board;
    return printPiecePositions(state.board, state.active.cells, state.active.type);
  }, [state.board, state.active]);

  return (
    <View style={[styles.board, { width: CELL * COLS, height: CELL * ROWS }]}>
      {displayBoard.map((row, rowIdx) => (
        <View key={rowIdx} style={styles.row}>
          {row.map((cell: Cell, colIdx) => (
            <View
              key={colIdx}
              style={[
                styles.cell,
                { width: CELL, height: CELL },
                cell
                  ? { backgroundColor: PIECE_COLORS[cell], borderColor: 'rgba(255,255,255,0.15)', borderWidth: 1 }
                  : styles.emptyCell,
              ]}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    borderWidth: 2,
    borderColor: '#1E2D50',
    backgroundColor: '#0D1526',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    borderRadius: 2,
  },
  emptyCell: {
    backgroundColor: '#0D1526',
    borderWidth: 0.5,
    borderColor: '#1A2440',
  },
});