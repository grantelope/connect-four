import { TColor, TPoint } from '../types';

export default function insert(
    points: TPoint[],
    x: number,
    rowCount: number
): TPoint | undefined {
    const highestPossibleIndex = rowCount - 1;
    const [topPoint] = points
        .filter(point => point.x === x)
        .sort((a, b) => b.y - a.y);

    if (!topPoint) {
        return {
            y: 0,
            x,
            person: 'red' as TColor // color won't matter here. we overwrite it.
        };
    }

    const newPoint = {
        x,
        y: topPoint.y + 1,
        person: 'red' as TColor
    };

    if (topPoint.y + 1 > highestPossibleIndex) {
        return undefined;
    }

    return newPoint;
}
