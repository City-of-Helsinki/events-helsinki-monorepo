import pascalCaseWithUnderscoreBeforeLeadingDigit from '../pascalCaseWithUnderscoreBeforeLeadingDigit';

describe('pascalCaseWithUnderscoreBeforeLeadingDigit', () => {
  it.each([
    { inputString: '_', expectedResult: '_' },
    { inputString: '9', expectedResult: '_9' },
    { inputString: '123', expectedResult: '_123' },
    { inputString: 'a123', expectedResult: 'A123' },
    { inputString: '_test', expectedResult: 'Test' },
    { inputString: '_test_with_parts', expectedResult: 'TestWithParts' },
    { inputString: 'a__b_c__de___f2__3g__', expectedResult: 'ABCDeF2_3g' },
    { inputString: '1_2_and__3', expectedResult: '_1_2And_3' },
    { inputString: '_1536X1536', expectedResult: '_1536X1536' },
    { inputString: '_2048X2048', expectedResult: '_2048X2048' },
  ])(
    "pascalCaseWithUnderscoreBeforeLeadingDigit('$inputString') == '$expectedResult'",
    ({ inputString, expectedResult }) => {
      expect(pascalCaseWithUnderscoreBeforeLeadingDigit(inputString)).toBe(
        expectedResult
      );
    }
  );
});
