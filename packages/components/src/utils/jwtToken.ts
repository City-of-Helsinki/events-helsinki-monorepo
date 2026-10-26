export const getPreviewDataMaxAge = (token: string): number => {
  try {
    const content = JSON.parse(atob(token.split('.')[1]));
    // value in seconds
    return Number(content.exp) - Number(content.iat);
  } catch (_) {
    // Invalid token data is treated as unavailable.
    return 0;
  }
};

export const getExpirationTime = (token?: string, date?: Date): number => {
  if (!token) {
    return 0;
  }
  try {
    const refDate = date || new Date();
    const content = JSON.parse(atob(token.split('.')[1]));
    // value in minutes, rounded to next int
    const expires = Number(content.exp) - refDate.getTime() / 1000;
    // NaN (missing exp) stays 0; Math.max alone would return NaN.
    return Math.max(Number.isNaN(expires) ? 0 : expires, 0);
  } catch (_) {
    // Invalid token data is treated as expired.
    return 0;
  }
};

export const getAuthorizationHeader = (token: string): string => {
  return `Bearer ${token}`;
};
