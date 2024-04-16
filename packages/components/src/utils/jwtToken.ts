export const getPreviewDataMaxAge = (token: string): number => {
  try {
    const content = JSON.parse(atob(token.split('.')[1]));
    // value in seconds
    return Number(content.exp) - Number(content.iat);
  } catch (error) {
    return 0;
  }
};

export const getAuthorizationHeader = (token: string): string => {
  return `Bearer ${token}`;
};
