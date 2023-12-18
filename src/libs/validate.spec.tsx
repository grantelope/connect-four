import validate from './validate';

describe('validate', () => {
    it('matches a right ascending result', () => {
        expect(
            validate([
                { x: 0, y: 0, person: 'red' },
                { x: 1, y: 1, person: 'red' },
                { x: 2, y: 2, person: 'red' },
                { x: 3, y: 3, person: 'red' },
                { x: 4, y: 4, person: 'red' }],
                4
            )).toMatchObject([
                { x: 0, y: 0, person: 'red' },
                { x: 1, y: 1, person: 'red' },
                { x: 2, y: 2, person: 'red' },
                { x: 3, y: 3, person: 'red' },
                { x: 4, y: 4, person: 'red' }
            ])
    });

    it('matches an up ascending result', () => {
        expect(
            validate([
                { x: 0, y: 0, person: 'red' },
                { x: 0, y: 1, person: 'red' },
                { x: 0, y: 2, person: 'red' },
                { x: 0, y: 3, person: 'red' }],
                4
            )).toMatchObject([
                { x: 0, y: 0, person: 'red' },
                { x: 0, y: 1, person: 'red' },
                { x: 0, y: 2, person: 'red' },
                { x: 0, y: 3, person: 'red' }
            ])
    });

    it('matches a right result', () => {
        expect(
            validate([
                { x: 0, y: 0, person: 'red' },
                { x: 1, y: 0, person: 'red' },
                { x: 2, y: 0, person: 'red' },
                { x: 3, y: 0, person: 'red' }
            ], 4)).toMatchObject([
                { x: 0, y: 0, person: 'red' },
                { x: 1, y: 0, person: 'red' },
                { x: 2, y: 0, person: 'red' },
                { x: 3, y: 0, person: 'red' }
            ])
    });

    it('matches a left ascending result', () => {
        expect(
            validate([
                { x: 3, y: 0, person: 'red' },
                { x: 2, y: 1, person: 'red' },
                { x: 1, y: 2, person: 'red' },
                { x: 0, y: 3, person: 'red' },
            ], 4)).toMatchObject([
                { x: 3, y: 0, person: 'red' },
                { x: 2, y: 1, person: 'red' },
                { x: 1, y: 2, person: 'red' },
                { x: 0, y: 3, person: 'red' }
            ])
    });

    it('returns an empty result', () => {
        expect(
            validate([
                { x: 3, y: 0, person: 'red' },
                { x: 2, y: 1, person: 'red' },
                { x: 1, y: 2, person: 'yellow' },
                { x: 0, y: 3, person: 'red' },
            ], 4)).toMatchObject([])
    });

    it('returns an empty result with a break', () => {
        expect(
            validate([
                { x: 3, y: 0, person: 'red' },
                { x: 2, y: 1, person: 'red' },
                { x: 1, y: 2, person: 'yellow' },
                { x: 0, y: 2, person: 'red' },
            ], 4)).toMatchObject([])
    });
});