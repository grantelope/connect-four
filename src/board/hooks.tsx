// To illustrate the use of a hooks to abstract away functionality.
import { TColor, TPoint } from '../types';

import { insert } from '../libs';

type HookProps = {
    turn: TColor;
    points: TPoint[];
    rowCount: number;
    onTakeTurn: (point: TPoint) => void;
};

export function useBoardHooks({
    turn,
    onTakeTurn,
    points,
    rowCount
}: HookProps) {
    // could explore using useCallback to memoize the fn
    const onClick = (x: number, _y: number) => {
        const newPoint = insert(points, x, rowCount);

        if (!newPoint) {
            return;
        }

        onTakeTurn({
            ...newPoint,
            person: turn
        });
    };

    return { onClick };
}
