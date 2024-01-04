import { appendUnique } from '../arrayUtils';

describe('appendUnique', () => {
  it.each([
    [
      [{ x: 1 }, { x: 2 }, { x: 3 }],
      [{ x: 2 }, { x: 3 }, { x: 4 }],
      [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 4 }],
    ],
    [
      [{ x: 3 }, { x: 4 }, { x: 5 }],
      [{ x: 1 }, { x: 2 }, { x: 6 }, { x: 4 }],
      [{ x: 3 }, { x: 4 }, { x: 5 }, { x: 1 }, { x: 2 }, { x: 6 }],
    ],
    [
      [{ x: 1 }, { x: 2 }, { x: 3 }],
      [{ a: 2 }, { b: 3 }, { c: 4 }],
      [{ x: 1 }, { x: 2 }, { x: 3 }],
    ],
  ])(
    'appends a list with the objects that does not exist there yet and has the compared property - %#',
    (existing, incoming, result) => {
      expect(
        appendUnique(existing, incoming as typeof existing, 'x')
      ).toStrictEqual(result);
    }
  );
});
