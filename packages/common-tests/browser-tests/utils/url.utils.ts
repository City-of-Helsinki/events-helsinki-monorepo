const localEnvUrl = 'http://localhost:3000';

export const getEnvUrl = (path = ''): string => {
  let baseUrl = process.env.BROWSER_TESTS_ENV_URL ?? localEnvUrl;
  baseUrl = `${baseUrl?.endsWith('/') ? baseUrl.slice(0, -1) : `${baseUrl}`}`;

  return `${baseUrl}${path?.startsWith('/') ? path : `/${path ?? ''}`}`;
};

// eslint-disable-next-line no-console
console.log('BROWSER_TESTS_ENV_URL:', getEnvUrl());
