import { TPoint } from '../types';
import { getColorByIndex } from '../libs';
import { hexColor } from '../config';

type CircleProps = {
    x: number,
    y: number,
    points: TPoint[],
    winners: TPoint[]
};

export default function Circle({ x, y, points, winners }: CircleProps) {
    const color = getColorByIndex({ x, y, points });
    const fill = hexColor?.[color as keyof typeof hexColor] || hexColor.white;

    const isWinner = winners.find(point =>
        point.x === x && point.y === y && point.person === color
    );

    const width = isWinner ? '10' : '0';

    return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{
            width: '100%;',
        }}>
            <circle cx="50" cy="50" r="40" fill={fill} stroke="orange" stroke-width={width} />
        </svg>
    );
}