export const getMaxAge = (token: string): number => {
  try {
    const content = JSON.parse(atob(token.split('.')[1]));
    // value in seconds
    return +content.exp - +content.iat;
  } catch (error) {
    return 0;
  }
};

export const getToken = (token: string): string => {
  return `Bearer ${token}`;
};
