import {
  LanguageCodeEnum,
  LanguageCodeFilterEnum,
} from 'react-helsinki-headless-cms';
import getLanguageCodeFilter from '../getLanguageCodeFilter';

describe('getLanguageCodeFilter function', () => {
  it('should map En/Fi/Sv to same language', () => {
    expect(getLanguageCodeFilter(LanguageCodeEnum.En)).toBe(
      LanguageCodeFilterEnum.En
    );
    expect(getLanguageCodeFilter(LanguageCodeEnum.Fi)).toBe(
      LanguageCodeFilterEnum.Fi
    );
    expect(getLanguageCodeFilter(LanguageCodeEnum.Sv)).toBe(
      LanguageCodeFilterEnum.Sv
    );
  });
});
