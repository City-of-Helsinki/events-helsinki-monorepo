import camelCase from 'lodash/camelCase.js';
import mapKeys from 'lodash/mapKeys.js';

type CamelCase<S extends string> =
  S extends `${infer P1}_${infer P2}${infer P3}`
    ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
    : Lowercase<S>;

type MapKeysToCamelCase<T> = {
  [K in keyof T as CamelCase<string & K>]: T[K] extends Record<string, unknown>
    ? MapKeysToCamelCase<T[K]>
    : T[K];
};

const mapKeysToCamelCase = <T extends Record<string, unknown>>(obj: T) => {
  return mapKeys(obj, (_, k) => camelCase(k)) as MapKeysToCamelCase<T>;
};

export default mapKeysToCamelCase;
