/**
 * Check if the given pathname is a valid redirect address
 * @param pathname The pathname to check
 * @returns True if the pathname is a valid redirect address, otherwise false
 */
export function isValidRedirectAddress(pathname: unknown): boolean {
  /**
   * Unicode character class escapes (e.g. \p{Letter}):
   *
   * L = Letter, includes categories:
   * - Lu = Uppercase Letter = https://www.compart.com/en/unicode/category/Lu for e.g. "A" (Latin capital letter A)
   * - Ll = Lowercase Letter = https://www.compart.com/en/unicode/category/Ll for e.g. "a" (Latin small letter A)
   * - Lt = Titlecase Letter = https://www.compart.com/en/unicode/category/Lt for e.g. "ǈ" (Latin capital letter lj)
   * - Lm = Modifier Letter = https://www.compart.com/en/unicode/category/Lm for e.g. "ʼ" (Modifier Letter Apostrophe)
   * - Lo = Other Letter = https://www.compart.com/en/unicode/category/Lo for e.g. "ƒ" (Latin small letter f with hook)
   *
   * N = Number, includes categories:
   * - Nd = Decimal Number = https://www.compart.com/en/unicode/category/Nd for e.g. "5" (Digit Five)
   * - Nl = Letter Number = https://www.compart.com/en/unicode/category/Nl for e.g. "Ⅷ" (Roman Numeral Eight)
   * - No = Other Number = https://www.compart.com/en/unicode/category/No for e.g. "½" (Vulgar Fraction One Half)
   *
   * Pc = Connector Punctuation = https://www.compart.com/en/unicode/category/Pc for e.g. "_" (underscore)
   * Pd = Dash Punctuation = https://www.compart.com/en/unicode/category/Pd for e.g. "-" (hyphen-minus)
   * Sc = Currency Symbol = https://www.compart.com/en/unicode/category/Sc for e.g. "$" (Dollar sign)
   *
   * See documentation:
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/
   * Unicode_character_class_escape
   * https://unicode.org/reports/tr18/#General_Category_Property
   */
  return (
    typeof pathname === 'string' &&
    (pathname == '/' ||
      /^(?:\/[\p{L}\p{N}\p{Pc}\p{Pd}\p{Sc}#%&+,.:;=?@]+)+\/?$/u.test(pathname))
  );
}
