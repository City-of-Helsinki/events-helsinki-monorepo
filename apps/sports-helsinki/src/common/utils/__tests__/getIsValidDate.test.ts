import getIsValidDate from '../getIsValidDate';

describe('getIsValidDate', () => {
  it('returns true for valid dates', () => {
    expect(getIsValidDate(new Date(2021, 11, 24, 12, 12))).toStrictEqual(true);
  });

  it('returns false for invalid dates', () => {
    expect(getIsValidDate(new Date('next friday'))).toStrictEqual(false);
  });
});
