import type { TFunction } from 'next-i18next';

import { createLocaleDictBuilder } from '../utils';

describe('createLocaleDictBuilder', () => {
  const t = vi.fn((key, options) => {
    const lng = (options as { lng: string })?.lng;
    return `${key}_${lng}`;
  }) as unknown as TFunction;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return a function that builds a locale dictionary', () => {
    const languageCodes = ['en', 'fi', 'sv'];
    const buildLocaleDict = createLocaleDictBuilder(languageCodes, t);

    expect(typeof buildLocaleDict).toBe('function');

    const translationKey = 'test:key';
    const result = buildLocaleDict(translationKey);

    expect(result).toStrictEqual({
      en: 'test:key_en',
      fi: 'test:key_fi',
      sv: 'test:key_sv',
    });

    expect(t).toHaveBeenCalledTimes(3);
    expect(t).toHaveBeenCalledWith(translationKey, { lng: 'en' });
    expect(t).toHaveBeenCalledWith(translationKey, { lng: 'fi' });
    expect(t).toHaveBeenCalledWith(translationKey, { lng: 'sv' });
  });

  it('should return an empty object if languageCodes is empty', () => {
    const languageCodes: string[] = [];
    const buildLocaleDict = createLocaleDictBuilder(languageCodes, t);
    const result = buildLocaleDict('any:key');

    expect(result).toStrictEqual({});
    expect(t).not.toHaveBeenCalled();
  });
});
