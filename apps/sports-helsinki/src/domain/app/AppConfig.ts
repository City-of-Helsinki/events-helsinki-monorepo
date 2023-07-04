import type { CommonButtonProps } from 'hds-react';
import getConfig from 'next/config';
import { i18n } from '../../../next-i18next.config';
import { ROUTES } from '../../constants';

// Only holds publicRuntimeConfig
const { publicRuntimeConfig } = getConfig();

class AppConfig {
  static get cmsOrigin() {
    return getEnvOrError(publicRuntimeConfig.cmsOrigin, 'CMS_ORIGIN');
  }

  static get federationGraphqlEndpoint() {
    return getEnvOrError(
      process.env.NEXT_PUBLIC_FEDERATION_ROUTER_ENDPOINT,
      'NEXT_PUBLIC_FEDERATION_ROUTER_ENDPOINT'
    );
  }

  static get linkedEventsEventEndpoint() {
    return getEnvOrError(
      publicRuntimeConfig.linkedEvents,
      'LINKEDEVENTS_EVENT_ENDPOINT'
    );
  }

  static get locales() {
    return i18n.locales;
  }

  static get origin() {
    return getEnvOrError(
      process.env.NEXT_PUBLIC_APP_ORIGIN,
      'NEXT_PUBLIC_APP_ORIGIN'
    );
  }

  static get cmsArticlesContextPath() {
    return process.env.NEXT_PUBLIC_CMS_ARTICLES_CONTEXT_PATH ?? '/articles';
  }

  static get cmsPagesContextPath() {
    return process.env.NEXT_PUBLIC_CMS_PAGES_CONTEXT_PATH ?? '/pages';
  }

  static get dateFormat() {
    return 'dd.MM.yyyy';
  }

  static get shortDatetimeFormat() {
    return 'dd.MM.yyyy HH:mm';
  }

  static get datetimeFormat() {
    return 'dd.MM.yyyy HH:mm:ss';
  }

  static get allowUnauthorizedRequests() {
    return Boolean(
      parseEnvValue(process.env.NEXT_PUBLIC_ALLOW_UNAUTHORIZED_REQUESTS)
    );
  }

  static get debug() {
    return Boolean(parseEnvValue(process.env.NEXT_PUBLIC_DEBUG));
  }

  static get defaultButtonTheme(): CommonButtonProps['theme'] {
    return 'default';
  }

  static get defaultButtonVariant(): CommonButtonProps['variant'] {
    return 'success';
  }

  static get matomoConfiguration() {
    const matomoUrlBase = process.env.NEXT_PUBLIC_MATOMO_URL_BASE;
    const matomoEnabled = process.env.NEXT_PUBLIC_MATOMO_ENABLED;
    const matomoSiteId = process.env.NEXT_PUBLIC_MATOMO_SITE_ID;
    const getMatomoUrlPath = (path: string) => `${matomoUrlBase}${path}`;

    return {
      disabled: !parseEnvValue(matomoEnabled),
      urlBase: matomoUrlBase as string,
      srcUrl: getMatomoUrlPath(
        process.env.NEXT_PUBLIC_MATOMO_SRC_URL as string
      ),
      trackerUrl: getMatomoUrlPath(
        process.env.NEXT_PUBLIC_MATOMO_TRACKER_URL as string
      ),
      siteId: Number(matomoSiteId),
    };
  }

  static askemFeedbackConfiguration(locale: 'en' | 'fi' | 'sv') {
    const askemEnabled = process.env.NEXT_PUBLIC_ASKEM_ENABLED;
    let askemApiKey = process.env.NEXT_PUBLIC_ASKEM_API_KEY_FI;
    if (locale === 'en') {
      askemApiKey = process.env.NEXT_PUBLIC_ASKEM_API_KEY_EN;
    } else if (locale === 'sv') {
      askemApiKey = process.env.NEXT_PUBLIC_ASKEM_API_KEY_SV;
    }
    return {
      disabled: !parseEnvValue(askemEnabled),
      apiKey: askemApiKey as string,
    };
  }

  static get defaultRevalidate() {
    const envValue = process.env.NEXT_PUBLIC_DEFAULT_ISR_REVALIDATE_SECONDS;
    const value = envValue ? parseEnvValue(envValue) : 60;

    if (typeof value !== 'number') {
      throw Error(
        'NEXT_PUBLIC_DEFAULT_ISR_REVALIDATE_SECONDS must be a value that can be parsed into a number'
      );
    }

    // no revalidation
    // https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration#on-demand-revalidation
    if (value < 1) {
      return false;
    }

    return value;
  }

  static get showSimilarEvents() {
    return Boolean(
      parseEnvValue(process.env.NEXT_PUBLIC_SHOW_SIMILAR_EVENTS, true)
    );
  }

  static get showSimilarVenues() {
    return Boolean(
      parseEnvValue(process.env.NEXT_PUBLIC_SHOW_SIMILAR_VENUES, true)
    );
  }

  static get showVenuesUpcomingEvents() {
    return Boolean(
      parseEnvValue(process.env.NEXT_PUBLIC_SHOW_VENUES_UPCOMING_EVENTS, true)
    );
  }

  static get showEnrolmentStatusInCardDetails() {
    return Boolean(
      parseEnvValue(
        process.env.NEXT_PUBLIC_SHOW_ENROLMENT_STATUS_IN_CARD_DETAILS,
        false
      )
    );
  }

  static get URLRewriteMapping() {
    return {
      [AppConfig.linkedEventsEventEndpoint]: ROUTES.COURSES.replace(
        '/[eventId]',
        ''
      ),
      [`${AppConfig.cmsOrigin}[/fi|/en|/sv]*${AppConfig.cmsArticlesContextPath}`]:
        ROUTES.ARTICLES.replace('/[...slug]', ''),
      [`${AppConfig.cmsOrigin}[/fi|/en|/sv]*${AppConfig.cmsPagesContextPath}`]:
        ROUTES.PAGES.replace('/[...slug]', ''),
    };
  }

  static get isHaukiEnabled() {
    return false;
  }
}

function parseEnvValue(
  value?: string,
  defaultValue: boolean | string | number | null = null
) {
  if (!value) {
    return defaultValue;
  }

  try {
    return JSON.parse(value);
  } catch (e) {
    return null;
  }
}

// Accept both variable and name so that variable can be correctly replaced
// by build.
// process.env.VAR => value
// process.env["VAR"] => no value
// Name is used to make debugging easier.
function getEnvOrError(variable?: string, name?: string) {
  if (!variable) {
    throw Error(`Environment variable with name ${name} was not found`);
  }

  return variable;
}

export default AppConfig;
