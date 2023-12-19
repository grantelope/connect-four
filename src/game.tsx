import './App.css';

import { TColor, TPoint } from './types';
import { getColorByIndex, range, validate } from './libs';

import Board from './board';
import React from 'react';
import { hexColor } from './config';

const COLUMNS = 7;
const ROWS = 6;
const TO_WIN = 4;

const columnsIndexes = range(0, COLUMNS - 1).reverse();
const rowsIndexes = range(0, ROWS + 1);

function Game() {
    const [turn, setTurn] = React.useState<TColor>('red');
    const [points, setPoints] = React.useState<TPoint[]>([]);

    const winners = React.useMemo(() => {
        return validate(points, TO_WIN);
    }, [points]);

    function nextTurn(): TColor {
        return turn === 'red' ? 'yellow' : 'red';
    }

    function reset() {
        setPoints([]);
        setTurn('red');
    }

    function onTakeTurn(point: TPoint) {
        // if the winners array is filled, no more playing.
        if (winners.length) {
            return;
        }

        if (
            !getColorByIndex({
                x: point.x,
                y: point.y,
                points
            })
        ) {
            setPoints([...points, point]);
            setTurn(nextTurn());
        }
    }

    const winner = winners && (winners[0] as TPoint)?.person;

    return (
        <>
            <div className="header">
                {!Boolean(winners.length) && (
                    <h1 style={{ color: hexColor[turn] }}>{turn} Turn </h1>
                )}
                {Boolean(winners.length) && (
                    <h1 style={{ color: hexColor[winner] }}>{winner} Wins!</h1>
                )}
                <button onClick={reset} className="reset">
                    reset game
                </button>
            </div>
            <Board
                turn={turn}
                onTakeTurn={onTakeTurn}
                points={points}
                winners={winners as TPoint[]}
                columnsIndexes={columnsIndexes}
                rowsIndexes={rowsIndexes}
                columnCount={COLUMNS}
                rowCount={ROWS}
            />
            <div
                style={{
                    paddingTop: '20px',
                    textAlign: 'center'
                }}
            ></div>
        </>
    );
}

export default Game;
