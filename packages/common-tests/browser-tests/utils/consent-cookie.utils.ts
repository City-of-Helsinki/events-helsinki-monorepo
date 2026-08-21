/**
 * HDS CookieConsent stores per-app cookies named `{app}-cookie-consents`
 * (see useAppCookieName in components). Values use a groups/checksum payload.
 *
 * Essentials checksums differ per app (cookie list includes the app cookie name);
 * optional group checksums are shared across apps for the current consent config.
 */
export type ConsentApp = 'sports' | 'hobbies' | 'events';

export const CONSENT_COOKIE_NAMES: Record<ConsentApp, string> = {
  sports: 'sports-cookie-consents',
  hobbies: 'hobbies-cookie-consents',
  events: 'events-cookie-consents',
};

const OPTIONAL_GROUP_CHECKSUMS = {
  optionalServiceMap: '95936570',
  optionalMatomo: '81a2b5d5',
  optionalAskem: '0c4e4134',
} as const;

const ESSENTIALS_CHECKSUMS: Record<ConsentApp, string> = {
  sports: 'ddbd83f4',
  hobbies: '9d166ee1',
  events: 'eb35797f',
};

/** Stable far-future timestamp so presets stay valid across CI runs. */
const CONSENT_TIMESTAMP = 1893456000000;

export function getConsentCookieName(app: ConsentApp): string {
  return CONSENT_COOKIE_NAMES[app];
}

/** Raw cookie value (JSON). Prefer this with TestCafe `t.setCookies`. */
export function buildHdsConsentCookieRawValue(app: ConsentApp): string {
  return JSON.stringify({
    groups: {
      essentials: {
        checksum: ESSENTIALS_CHECKSUMS[app],
        timestamp: CONSENT_TIMESTAMP,
      },
      optionalServiceMap: {
        checksum: OPTIONAL_GROUP_CHECKSUMS.optionalServiceMap,
        timestamp: CONSENT_TIMESTAMP,
      },
      optionalMatomo: {
        checksum: OPTIONAL_GROUP_CHECKSUMS.optionalMatomo,
        timestamp: CONSENT_TIMESTAMP,
      },
      optionalAskem: {
        checksum: OPTIONAL_GROUP_CHECKSUMS.optionalAskem,
        timestamp: CONSENT_TIMESTAMP,
      },
    },
  });
}

/** URL-encoded value for `document.cookie` / clientScripts. */
export function buildHdsConsentCookieValue(app: ConsentApp): string {
  return encodeURIComponent(buildHdsConsentCookieRawValue(app));
}

export const CONSENT_APPS = Object.keys(CONSENT_COOKIE_NAMES) as ConsentApp[];

/** document.cookie assignment used by TestCafe clientScripts. */
export function buildConsentCookieClientScript(app: ConsentApp): string {
  const name = getConsentCookieName(app);
  const value = buildHdsConsentCookieValue(app);
  return `document.cookie='${name}=${value}; path=/;'`;
}
