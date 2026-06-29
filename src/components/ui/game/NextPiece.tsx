import { StyleSheet, View } from 'react-native';
import { PieceType } from '../../../game/constants/piece-types.constants';
import { PIECE_DEFAULT_POSITIONS } from '../../../game/constants/shape.constants';

const CELL = 12;

const PIECE_COLORS: Record<PieceType, string> = {
  I: '#5EEAD4', O: '#FFD166', T: '#8B5CF6',
  S: '#4ADE80', Z: '#FF6B6B', J: '#60A5FA', L: '#FB923C',
};

export default function NextPiece({ type }: { type: PieceType }) {
  const positions = PIECE_DEFAULT_POSITIONS[type];
  const minRow = Math.min(...positions.map(p => p.row));
  const minCol = Math.min(...positions.map(p => p.col));
  const maxRow = Math.max(...positions.map(p => p.row));
  const maxCol = Math.max(...positions.map(p => p.col));

  const grid = Array.from({ length: maxRow - minRow + 1 }, (_, r) =>
    Array.from({ length: maxCol - minCol + 1 }, (_, c) =>
      positions.some(p => p.row - minRow === r && p.col - minCol === c)
    )
  );

  return (
    <View>
      {grid.map((row, r) => (
        <View key={r} style={s.row}>
          {row.map((filled, c) => (
            <View
              key={c}
              style={[
                s.cell,
                filled ? { backgroundColor: PIECE_COLORS[type] } : s.empty,
              ]}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  row:  { flexDirection: 'row' },
  cell: { width: CELL, height: CELL, margin: 1, borderRadius: 2 },
  empty:{ width: CELL, height: CELL, margin: 1 },
});