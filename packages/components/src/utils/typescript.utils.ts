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
 * Extract prefixes from strings that are suffixed with underscore and any given locale.
 * @example ExtractPrefixesFromLocaleSuffixedNames<'a_fi' | 'b_sv' | 'c'> == 'a' | 'b'
 */
export type ExtractPrefixesFromLocaleSuffixedNames<
  T extends string,
  Locale extends string = 'fi' | 'en' | 'sv'
> = T extends `${infer Prefix}_${Locale}` ? Prefix : never;

/**
 * Check at compile time that Subtype is a subset of Supertype or not.
 * @warning This works with string literal types, but not necessarily with all types
 * @return Subtype if Subtype is a subset of Supertype, otherwise raise an error.
 */
export type Subset<Supertype, Subtype extends Supertype> = Subtype;

/**
 * Get keys of union type
 * @example KeysOfUnionType<{a: 1} | {b: 2, c: 3}> == 'a' | 'b' | 'c'
 */
export type KeysOfUnionType<T> = T extends infer U ? keyof U : never;

/**
 * Get object type's keys whose values are array fields (e.g. readonly string[]) or
 * union types that have an array type in them (e.g. string[] | null | undefined).
 * @example KeysOfArrayFields<{a: string; b: string[]; c: number}> == 'b'
 */
export type KeysOfArrayFields<T> = keyof {
  [K in keyof T as T[K] extends infer U // infer for supporting union type fields
    ? U extends unknown[] // non-readonly arrays
      ? K
      : U extends readonly unknown[] // readonly arrays
      ? K
      : never
    : never]: T[K];
};

//-----------------------------------------------------------------------------
// Typescript type level tests for this file i.e. done at compile time:
//-----------------------------------------------------------------------------
type AB = { a: string; b: string };
type BC = { b: string; c: string };
type ABC = AB & BC;
type EnFr = 'en' | 'fr';

type Translatable = {
  a_en: string;
  b_en: string;
  b_fr: string;
  c: string;
};

type TestCombos =
  | 'EnFi_en'
  | 'EnFi_fi'
  | 'EnFiSv_en'
  | 'EnFiSv_fi'
  | 'EnFiSv_sv'
  | 'EnSv_en'
  | 'EnSv_sv'
  | 'FiSv_fi'
  | 'FiSv_sv'
  | 'OnlyEn_en'
  | 'OnlyFi_fi'
  | 'OnlySv_sv'
  | 'ShouldNotShow sv'
  | 'ShouldNotShow'
  | 'ShouldNotShow-en'
  | 'ShouldNotShow_'
  | 'ShouldNotShow_ending'
  | 'ShouldNotShow_finishing'
  | 'ShouldNotShow_svenska'
  | 'ShouldNotShowfi';

type ExpectedPrefixes =
  | 'EnFi'
  | 'EnFiSv'
  | 'EnSv'
  | 'FiSv'
  | 'OnlyEn'
  | 'OnlyFi'
  | 'OnlySv';

const TestSymbol = Symbol('test');
type TestUnionType =
  | { first: '1' }
  | { second1: '2.1'; second2: '2.2' }
  | { third: ''; 3: null; [TestSymbol]: 'text' };
type ExpectedTestUnionTypeKeys =
  | 'first'
  | 'second1'
  | 'second2'
  | 'third'
  | 3
  | typeof TestSymbol;

type ArrayFieldsTestType = {
  '[]': [];
  boolean: boolean;
  number: number;
  'number[] | null | undefined': number[] | null | undefined;
  'readonly []': readonly [];
  'readonly string[]': readonly string[];
  'string | null | undefined': string | null | undefined;
  'string | null': string | null;
  string: string;
  'string[] | null | undefined': string[] | null | undefined;
  'string[] | null': string[] | null;
  'string[]': string[];
};

type ExpectedKeysOfArrayFields =
  | '[]'
  | 'number[] | null | undefined'
  | 'readonly []'
  | 'readonly string[]'
  | 'string[] | null | undefined'
  | 'string[] | null'
  | 'string[]';

type TooManyKeysOfArrayFields = ExpectedKeysOfArrayFields | 'extra';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Tests = [
  // Equal sets:
  Subset<'a', 'a'>,
  Subset<'a' | 'b' | 'c', 'a' | 'b' | 'c'>,
  Subset<ABC, ABC>,
  Subset<keyof ABC, 'a' | 'b' | 'c'>,
  Subset<'a' | 'b' | 'c', keyof ABC>,
  Subset<KeysOfArrayFields<{ a: string; b: string[]; c: number }>, 'b'>,
  Subset<'b', KeysOfArrayFields<{ a: string; b: string[]; c: number }>>,
  Subset<KeysOfArrayFields<ArrayFieldsTestType>, ExpectedKeysOfArrayFields>,
  Subset<ExpectedKeysOfArrayFields, KeysOfArrayFields<ArrayFieldsTestType>>,
  // Proper subsets:
  Subset<'a' | 'b', 'a'>,
  Subset<'a' | 'b', 'b'>,
  Subset<keyof ABC, keyof AB>,
  Subset<keyof ABC, keyof BC>,
  Subset<`${keyof AB}_${EnFr}`, 'a_fr' | 'b_en' | 'b_fr'>,
  Subset<'b' | 'c', KeysOfArrayFields<{ a: string; b: string[]; c: number }>>,
  Subset<TooManyKeysOfArrayFields, KeysOfArrayFields<ArrayFieldsTestType>>,
  // Not subsets:
  // @ts-expect-error 'a' | 'b' | 'c' is not a subset of 'a' | 'b'
  Subset<'a' | 'b', 'a' | 'b' | 'c'>,
  // @ts-expect-error keyof BC is not a subset of keyof AB
  Subset<keyof AB, keyof BC>,
  // @ts-expect-error keyof AB is not a subset of keyof BC
  Subset<keyof BC, keyof AB>,
  // @ts-expect-error `${keyof AB}_${EnFr}` is not a subset of 'a_fr' | 'b_en' | 'b_fr'
  Subset<'a_fr' | 'b_en' | 'b_fr', `${keyof AB}_${EnFr}`>,
  // Prefixes from Translatable should be 'a' and 'b' using default locale selection:
  Subset<ExtractPrefixesFromLocaleSuffixedNames<keyof Translatable>, 'a' | 'b'>,
  Subset<'a' | 'b', ExtractPrefixesFromLocaleSuffixedNames<keyof Translatable>>,
  // Prefixes from Translatable should be 'a' and 'b' using 'en' and 'fr' locales
  Subset<
    ExtractPrefixesFromLocaleSuffixedNames<keyof Translatable, EnFr>,
    'a' | 'b'
  >,
  Subset<
    'a' | 'b',
    ExtractPrefixesFromLocaleSuffixedNames<keyof Translatable, EnFr>
  >,
  // Prefixes from Translatable should be 'b' using 'fr' locale
  Subset<ExtractPrefixesFromLocaleSuffixedNames<keyof Translatable, 'fr'>, 'b'>,
  Subset<'b', ExtractPrefixesFromLocaleSuffixedNames<keyof Translatable, 'fr'>>,
  // Prefixes from TestCombos should be ExpectedPrefixes
  Subset<ExtractPrefixesFromLocaleSuffixedNames<TestCombos>, ExpectedPrefixes>,
  Subset<ExpectedPrefixes, ExtractPrefixesFromLocaleSuffixedNames<TestCombos>>,
  // @ts-expect-error 'ShouldNotShow' should not be found as a prefix from TestCombos
  Subset<ExtractPrefixesFromLocaleSuffixedNames<TestCombos>, 'ShouldNotShow'>,
  // KeysOfUnionType<TestUnionType> should be ExpectedTestUnionTypeKeys
  Subset<KeysOfUnionType<TestUnionType>, ExpectedTestUnionTypeKeys>,
  Subset<ExpectedTestUnionTypeKeys, KeysOfUnionType<TestUnionType>>,
  // KeysOfUnionType<{ a: 1 } | { b: 2; c: 3 }> should be 'a' | 'b' | 'c'
  Subset<KeysOfUnionType<{ a: 1 } | { b: 2; c: 3 }>, 'a' | 'b' | 'c'>,
  Subset<'a' | 'b' | 'c', KeysOfUnionType<{ a: 1 } | { b: 2; c: 3 }>>,
  // @ts-expect-error 'a' is not a subset of KeysOfArrayFields<{ a: string; b: string[] }>
  Subset<KeysOfArrayFields<{ a: string; b: string[] }>, 'a'>,
  // @ts-expect-error TooManyKeysOfArrayFields is not a subset of KeysOfArrayFields<ArrayFieldsTestType>
  Subset<KeysOfArrayFields<ArrayFieldsTestType>, TooManyKeysOfArrayFields>
];
