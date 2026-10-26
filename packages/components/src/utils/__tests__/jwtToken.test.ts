import { getExpirationTime, getPreviewDataMaxAge } from '../jwtToken';

const tokenWithPayload = (payload: Record<string, unknown>) =>
  `header.${btoa(JSON.stringify(payload))}.signature`;

describe('getExpirationTime', () => {
  const now = new Date('2026-10-26T08:00:00.000Z');

  it('returns the remaining lifetime when the token is still valid', () => {
    const expiresAt = now.getTime() / 1000 + 125;

    expect(
      getExpirationTime(tokenWithPayload({ exp: expiresAt }), now)
    ).toBeCloseTo(125);
  });

  it('returns zero when the token is expired, missing exp, or not a token', () => {
    const expiredAt = now.getTime() / 1000 - 10;

    expect(getExpirationTime(tokenWithPayload({ exp: expiredAt }), now)).toBe(
      0
    );
    expect(getExpirationTime(tokenWithPayload({}), now)).toBe(0);
    expect(getExpirationTime(tokenWithPayload({ exp: 'soon' }), now)).toBe(0);
    expect(getExpirationTime(undefined, now)).toBe(0);
    expect(getExpirationTime('not-a-jwt', now)).toBe(0);
  });
});

describe('getPreviewDataMaxAge', () => {
  it('returns the token lifetime in seconds', () => {
    expect(getPreviewDataMaxAge(tokenWithPayload({ exp: 200, iat: 50 }))).toBe(
      150
    );
  });

  it('returns zero when the token cannot be decoded', () => {
    expect(getPreviewDataMaxAge('not-a-jwt')).toBe(0);
  });
});
