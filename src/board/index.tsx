import { TColor, TPoint } from '../types';

import Circle from '../circle';
import { useBoardHooks } from './hooks';

type BoardProps = {
    turn: TColor,
    points: TPoint[],
    winners: TPoint[],
    columnCount: number,
    rowCount: number,
    columnsIndexes: number[],
    rowsIndexes: number[],
    onTakeTurn: (point: TPoint) => void
};

export default function Board({ winners, rowCount, onTakeTurn, turn, points = [], columnCount, columnsIndexes, rowsIndexes }: BoardProps) {

    const { onClick } = useBoardHooks({
        rowCount,
        onTakeTurn,
        turn,
        points
    });

    const columns = columnsIndexes.map(yIndex => {
        return rowsIndexes.map(xIndex => {
            return <div key={`${xIndex}-${yIndex}`} className="box" onClick={() => onClick(xIndex, yIndex)}>
                <Circle x={xIndex} y={yIndex} points={points} winners={winners} />
            </div>
        })
    })

    return (
        <div className="grid" style={{
            gridTemplateColumns: `repeat(${columnCount}, 1fr)`
        }}>
            {columns}
        </div>
    );
}