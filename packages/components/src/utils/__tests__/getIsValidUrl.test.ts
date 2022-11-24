import getIsValidUrl from '../getIsValidUrl';

it.each([
  'http://google.fi',
  'https://google.fi',
  'http://localhost:3000/fi/article-title?param=1',
])('yields true for %p', (url) => {
  expect(getIsValidUrl(url)).toStrictEqual(true);
});

it.each([
  '/',
  '/fi/article-title?param=1',
  'mailto:test@hel.fi',
  'https:|/malformed.fi',
])('yields false for %p', (url) => {
  expect(getIsValidUrl(url)).toStrictEqual(false);
});
