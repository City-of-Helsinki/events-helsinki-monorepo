import { isObject } from '../typeguards';

describe('isObject returns true', () => {
  it.each([
    {},
    { 1: undefined },
    { key: 'value' },
    { key: 'value', anotherKey: 'another value' },
    { a: { b: 1, 2: { 3: [4, 5, 6] } } },
  ])('%s', (value) => {
    expect(isObject(value)).toBe(true);
  });
});

describe('isObject returns false', () => {
  it.each([
    null,
    undefined,
    NaN,
    0,
    '',
    ' ',
    'test',
    1,
    123,
    123.5,
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
    expect(isObject(value)).toBe(false);
  });
});
