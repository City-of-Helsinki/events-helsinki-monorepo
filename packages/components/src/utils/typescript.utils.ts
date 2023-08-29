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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Tests = [
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
  Subset<ExtractPrefixesFromLocaleSuffixedNames<TestCombos>, 'ShouldNotShow'>
];
