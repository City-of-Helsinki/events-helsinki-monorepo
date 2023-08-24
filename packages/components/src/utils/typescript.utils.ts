export const assertUnreachable = (param: never, message?: string): never => {
  throw new Error(`${message || 'Unknown parameter'}: ${param}`);
};

export type FalsyType = false | null | undefined | '' | 0;

export const skipFalsyType = <ValueType>(
  value: ValueType
): value is Exclude<ValueType, FalsyType> => {
  return Boolean(value);
};

/**
 * Check at compile time that Subtype is a subset of Supertype or not.
 * @warning This works with string literal types, but not necessarily with all types
 * @return Subtype if Subtype is a subset of Supertype, otherwise raise an error.
 */
export type Subset<Supertype, Subtype extends Supertype> = Subtype;

//-----------------------------------------------------------------------------
// Typescript type level tests for this file i.e. done at compile time:
//-----------------------------------------------------------------------------
type AB = { a: string; b: string };
type BC = { b: string; c: string };
type ABC = AB & BC;
type EnFr = 'en' | 'fr';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type SubsetTests = [
  // Equal sets:
  Subset<'a', 'a'>,
  Subset<'a' | 'b' | 'c', 'a' | 'b' | 'c'>,
  Subset<ABC, ABC>,
  Subset<keyof ABC, 'a' | 'b' | 'c'>,
  Subset<'a' | 'b' | 'c', keyof ABC>,
  // Proper subsets:
  Subset<'a' | 'b', 'a'>,
  Subset<'a' | 'b', 'b'>,
  Subset<keyof ABC, keyof AB>,
  Subset<keyof ABC, keyof BC>,
  Subset<`${keyof AB}_${EnFr}`, 'a_fr' | 'b_en' | 'b_fr'>,
  // Not subsets:
  // @ts-expect-error 'a' | 'b' | 'c' is not a subset of 'a' | 'b'
  Subset<'a' | 'b', 'a' | 'b' | 'c'>,
  // @ts-expect-error keyof BC is not a subset of keyof AB
  Subset<keyof AB, keyof BC>,
  // @ts-expect-error keyof AB is not a subset of keyof BC
  Subset<keyof BC, keyof AB>,
  // @ts-expect-error `${keyof AB}_${EnFr}` is not a subset of 'a_fr' | 'b_en' | 'b_fr'
  Subset<'a_fr' | 'b_en' | 'b_fr', `${keyof AB}_${EnFr}`>
];
