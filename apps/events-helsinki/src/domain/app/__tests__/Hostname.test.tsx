import os from 'os';
import AppConfig from '../AppConfig';

it('AppConfig.hostname is hostname (or localhost in local development)', () => {
  // If this test fails the cookieDomain setting won't work with CookieModal/CookiePage
  // and trying to close the cookie consent modal/page will fail
  const isLocalDevelopment =
    AppConfig.debug && process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT == 'develop';
  const allowedHostnames = [
    os.hostname(),
    ...(isLocalDevelopment ? ['localhost'] : []),
  ];
  expect(allowedHostnames).toContain(AppConfig.hostname);
});
