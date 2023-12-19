import { TColor, TPoint } from '../types';

type ColorAndIndexes = {
    x: number;
    y: number;
    points: TPoint[];
};

export default function getColorByIndex({
    x,
    y,
    points
}: ColorAndIndexes): TColor | undefined {
    const found = points.find(point => point.x === x && point.y === y);

    return found?.person;
}
