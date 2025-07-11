export const setCookieConsents = (
  consents: Record<string, boolean | undefined>
) =>
  Object.defineProperty(window.document, 'cookie', {
    writable: true,
    value: `city-of-helsinki-cookie-consents=${decodeURI(
      JSON.stringify(consents)
    )}`,
  });

type OptionalCookieNames =
  | 'servicemap_analytics'
  | 'servicemap_session'
  | 'servicemap_ga';

type OptionalCookieConsents =
  | Record<OptionalCookieNames, boolean>
  | Record<string, unknown>;

const setRequiredCookieConsents = (
  optionalConsents: OptionalCookieConsents = {}
) =>
  setCookieConsents({
    matomo: true,
    linkedevents: true,
    i18next: true,
    'city-of-helsinki-cookie-consents': true,
    ...optionalConsents,
  });

export const acceptRequiredCookieConsentsOnly = () =>
  setRequiredCookieConsents();

export const setOptionalCookieConsents = (
  optionalConsents: OptionalCookieConsents
) => setRequiredCookieConsents(optionalConsents);

export const acceptServiceMapCookieConsents = () =>
  setRequiredCookieConsents({
    servicemap_session: true,
    servicemap_analytics: true,
    servicemap_ga: true,
  });

export const resetCookieConsents = () => setCookieConsents({});

afterEach(() => {
  resetCookieConsents();
});
