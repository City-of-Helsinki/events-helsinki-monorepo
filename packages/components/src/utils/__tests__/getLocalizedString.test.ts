import getLocalizedString from '../getLocalizedString';

const dummyLocalisedObj = {
  en: 'text en',
  fi: 'text fi',
  sv: 'text sv',
};

describe('getLocalizedString function', () => {
  it('should return localised string', () => {
    expect(getLocalizedString(dummyLocalisedObj, 'en')).toBe('text en');
    expect(getLocalizedString(dummyLocalisedObj, 'fi')).toBe('text fi');
    expect(getLocalizedString(dummyLocalisedObj, 'sv')).toBe('text sv');
  });
  /**
   * If logic for selecting the fallback language priority is needed,
   * then prioritize order is English, Finnish, Swedish.
   * Ref: https://helsinkisolutionoffice.atlassian.net/browse/HH-110
   */
  it('should return string in first prioritized language when localised string is not found', () => {
    expect(
      getLocalizedString({ ...dummyLocalisedObj, sv: undefined }, 'sv')
    ).toBe('text en');
    expect(
      getLocalizedString(
        { ...dummyLocalisedObj, en: undefined, sv: undefined },
        'sv'
      )
    ).toBe('text fi');
  });
});
