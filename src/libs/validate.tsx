import { TPoint } from '../types';

type TComparison = TPoint | undefined;

export default function validate(points: TPoint[], winningAmt: number) {
    // compare all within list to see if there is a member the right of the current member.
    const upToTheRightComparison = (prev: TPoint): TPoint | undefined => {
        const { x, y, person } = prev;

        return points.find(point => {
            return (
                point.x === x + 1 &&
                point.y === y + 1 &&
                point.person === person
            );
        });
    };

    // compare all within list to see if there is a member up and to the right of the current member.
    const toTheRightComparison = (prev: TPoint): TComparison => {
        const { x, y, person } = prev;

        return points.find(point => {
            return (
                point.x === x + 1 && point.y === y && point.person === person
            );
        });
    };

    // compare all within list to see if there is a member above of the current member
    const upComparison = (prev: TPoint): TComparison => {
        const { x, y, person } = prev;

        return points.find(point => {
            return (
                point.x === x && point.y === y + 1 && point.person === person
            );
        });
    };

    // compare all within list to see if there is a member up and to the left of the current member.
    const upToTheLeftComparison = (prev: TPoint): TComparison => {
        const { x, y, person } = prev;

        return points.find(point => {
            return (
                point.x === x - 1 &&
                point.y === y + 1 &&
                point.person === person
            );
        });
    };

    // walk all array members
    function walkTheList(
        prev: TPoint,
        fn: (ob: TPoint) => TComparison
    ): TPoint[] {
        const next = fn(prev);

        if (next) {
            // @ts-expect-error
            return [].concat(prev).concat(walkTheList(next, fn));
        }

        return [prev];
    }

    function clearOutNonWinners(points: TPoint[]): TPoint[] {
        if (points.length < winningAmt) {
            return [];
        }

        return points;
    }

    return [
        // filter out any duplicate points w/ the ... new Set trick
        ...new Set(
            [
                upToTheRightComparison,
                toTheRightComparison,
                upToTheLeftComparison,
                upComparison
            ]
                .map(fn =>
                    points.map(point =>
                        clearOutNonWinners(walkTheList(point, fn))
                    )
                )
                // flatten the array of array of matches
                .flat(Infinity)
        )
    ];
}
