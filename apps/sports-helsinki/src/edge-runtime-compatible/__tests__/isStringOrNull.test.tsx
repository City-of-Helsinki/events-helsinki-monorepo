import { isStringOrNull } from '../typeguards';

describe('isStringOrNull returns true', () => {
  it.each(['', ' ', 'test', '匹', null])('%s', (value) => {
    expect(isStringOrNull(value)).toBe(true);
  });
});

describe('isStringOrNull returns false', () => {
  it.each([
    {},
    undefined,
    NaN,
    0,
    1,
    123,
    123.5,
    { 1: undefined },
    { key: 'value' },
    { key: 'value', anotherKey: 'another value' },
    { a: { b: 1, 2: { 3: [4, 5, 6] } } },
    [],
    ['non-empty array'],
    Array(1).fill(1),
    new Set(),
    new Set([1, 2, 3]),
    new Map(),
    new Map([['key', 'value']]),
    Symbol('symbol'),
    BigInt(123),
  ])('%s', (value) => {
    expect(isStringOrNull(value)).toBe(false);
  });
});
