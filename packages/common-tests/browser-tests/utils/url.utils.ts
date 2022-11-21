const localEnvUrl = 'http://localhost:3000';

export const getEnvUrl = (path = ''): string => {
  const baseUrl = process.env.BROWSER_TESTS_ENV_URL ?? localEnvUrl;
  return `${baseUrl}${path?.startsWith('/') ? path : `/${path ?? ''}`}`;
};

// eslint-disable-next-line no-console
console.log('BROWSER_TESTS_ENV_URL:', getEnvUrl());
