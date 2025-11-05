import {
  getEnvOrError,
  ignoredErrorCodesHeader,
} from '@events-helsinki/components';
import { ButtonPresetTheme, ButtonVariant, type ButtonProps } from 'hds-react';
import getConfig from 'next/config';
import i18n from '../../../next-i18next.config.mjs';
import { ROUTES } from '../../constants';

// Only holds publicRuntimeConfig
const { publicRuntimeConfig } = getConfig();

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class AppConfig {
  /**
   * The base URL of the CMS.
   *
   * Example usage:
   * The headless CMS adds it's own domain (and possibly also the root path)
   * to every link that it returns through API. The cmsOrigin-getter is used
   * in the link manipulation so that we can remove the CMS origin from the link
   * inside the app.
   * */
  static get cmsOrigin() {
    return getEnvOrError(publicRuntimeConfig.cmsOrigin, 'CMS_ORIGIN');
  }

  /**
   * The endpoint for the Apollo federation Router.
   * Can be used for example to configure the Apollo-client.
   * */
  static get federationGraphqlEndpoint() {
    return getEnvOrError(
      publicRuntimeConfig.federationRouter,
      'FEDERATION_ROUTER_ENDPOINT'
    );
  }

  /**
   * The base URL of the LinkedEvents event-API.
   *
   * Example usage:
   * The headless CMS returns the LinkedEvent URLs through the API.
   * The linkedEventsEventEndpoint-getter is used
   * in the link manipulation so that we can remove the LinkedEvents origin from the link
   * inside the app.
   * */
  static get linkedEventsEventEndpoint() {
    return getEnvOrError(
      publicRuntimeConfig.linkedEvents,
      'LINKEDEVENTS_EVENT_ENDPOINT'
    );
  }

  static get locales() {
    return i18n.i18n.locales;
  }

  /**
   * The own origin of the app.
   * Can be used e.g. to configure the Headless CMS React Components -library.
   * */
  static get origin() {
    return getEnvOrError(
      process.env.NEXT_PUBLIC_APP_ORIGIN,
      'NEXT_PUBLIC_APP_ORIGIN'
    );
  }

  /**
   * The own hostname of the app.
   */
  static get hostname() {
    return new URL(this.origin).hostname;
  }

  /**
   * The app uses multiple domains from the Headless CMS API.
   * It serves posts / articles from 1 root and e.g the pages from another.
   * The CMS needs to be configured so, that the URI of an object it serves
   * contains the context. For example an URL to an article could contain
   * a static path `/articles` in it's pathname, so it's easily recognizible as an article URL.
   * The application can then use a PostQuery to fetch the related information from an external service.
   */
  static get cmsArticlesContextPath() {
    return process.env.NEXT_PUBLIC_CMS_ARTICLES_CONTEXT_PATH ?? '/articles';
  }

  /**
   * The app uses multiple domains from the Headless CMS API.
   * It serves posts / articles from 1 root and e.g the pages from another.
   * The CMS needs to be configured so, that the URI of an object it serves
   * contains the context. For example an URL to an page could contain
   * a static path `/pages` in it's pathname, so it's easily recognizible as a page URL.
   * The application can then use a PageQuery to fetch the related information from an external service.
   */
  static get cmsPagesContextPath() {
    return process.env.NEXT_PUBLIC_CMS_PAGES_CONTEXT_PATH ?? '/pages';
  }

  /**
   * The generally used date format.
   * Helsinki services are recommended to follow the Finnish date and time locale -
   * even if the user is using some other language.
   * Follow these guidelines when presenting date and time in your services.
   * https://hds.hel.fi/foundation/guidelines/data-formats/
   */
  static readonly dateFormat = 'dd.MM.yyyy';

  /**
   * The generally used short date time format.
   * Helsinki services are recommended to follow the Finnish date and time locale -
   * even if the user is using some other language.
   * Follow these guidelines when presenting date and time in your services.
   * https://hds.hel.fi/foundation/guidelines/data-formats/
   */
  static readonly shortDatetimeFormat = 'dd.MM.yyyy HH:mm';

  /**
   * The generally used long date time format.
   * Helsinki services are recommended to follow the Finnish date and time locale -
   * even if the user is using some other language.
   * Follow these guidelines when presenting date and time in your services.
   * https://hds.hel.fi/foundation/guidelines/data-formats/
   */
  static readonly datetimeFormat = 'dd.MM.yyyy HH:mm:ss';

  /** Should the application allow HTTP-connections? */
  static get allowUnauthorizedRequests() {
    return Boolean(
      parseEnvValue(process.env.NEXT_PUBLIC_ALLOW_UNAUTHORIZED_REQUESTS)
    );
  }

  /** A global debug switch for development purposes. */
  static get debug() {
    return Boolean(parseEnvValue(process.env.NEXT_PUBLIC_DEBUG));
  }

  /** A default HDS theme for the buttons. https://hds.hel.fi/foundation/design-tokens/colour. */
  static readonly defaultButtonTheme: ButtonProps['theme'] =
    ButtonPresetTheme.Bus;

  /** A primary variant for the buttons. https://hds.hel.fi/foundation/design-tokens/colour. */
  static readonly defaultButtonVariant: Exclude<
    ButtonVariant,
    ButtonVariant.Supplementary
  > = ButtonVariant.Success;

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
    const askemApiKeyByLocale: Record<typeof locale, string | undefined> = {
      fi: process.env.NEXT_PUBLIC_ASKEM_API_KEY_FI,
      sv: process.env.NEXT_PUBLIC_ASKEM_API_KEY_SV,
      en: process.env.NEXT_PUBLIC_ASKEM_API_KEY_EN,
    };
    const askemEnabled = process.env.NEXT_PUBLIC_ASKEM_ENABLED;
    return {
      disabled: !parseEnvValue(askemEnabled),
      apiKey: askemApiKeyByLocale[locale] ?? '',
    };
  }

  /**
   * A default NextJS page revalidation time.
   * https://nextjs.org/docs/pages/building-your-application/
   * data-fetching/incremental-static-regeneration#on-demand-revalidation
   */
  static get defaultRevalidate() {
    const envValue = process.env.NEXT_PUBLIC_DEFAULT_ISR_REVALIDATE_SECONDS;
    const value = envValue ? parseEnvValue(envValue) : 60;

    if (typeof value !== 'number') {
      throw Error(
        'NEXT_PUBLIC_DEFAULT_ISR_REVALIDATE_SECONDS must be a value that can be parsed into a number'
      );
    }

    // no revalidation
    // eslint-disable-next-line @stylistic/max-len
    // https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration#on-demand-revalidation
    if (value < 1) {
      return false;
    }

    return value;
  }

  /**
   * Determines whether to skip static page generation during the build process.
   * Skipping generation leads to faster build times but results in slower initial
   * page loads as pages are generated on-demand using `fallback: 'blocking'`.
   *
   * This is controlled by the `SKIP_BUILD_STATIC_GENERATION` environment variable.
   * The value is parsed as JSON. For example:
   * - To **skip** generation, set the variable to `'true'` or a non-zero number (e.g., `'1'`).
   * - To **enable** generation, set the variable to `'false'` or `'0'`.
   *
   * @defaultValue `false` - If the environment variable is not set or is an empty string,
   * static pages **are generated** by default. This is the recommended behavior for production builds.
   *
   * @see https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths#fallback-blocking
   */
  static get skipBuildStaticGeneration() {
    return Boolean(
      parseEnvValue(process.env.SKIP_BUILD_STATIC_GENERATION, false)
    );
  }

  /** A feature flag for the similar events. */
  static get showSimilarEvents() {
    return Boolean(
      parseEnvValue(process.env.NEXT_PUBLIC_SHOW_SIMILAR_EVENTS, true)
    );
  }

  /** A feature flag that can be used to show the enrolment status in the card details. */
  static get showSimilarVenues() {
    return Boolean(
      parseEnvValue(process.env.NEXT_PUBLIC_SHOW_SIMILAR_VENUES, true)
    );
  }

  /** A feature flag for showing the target group filter. */
  static get showTargetGroupFilter() {
    return Boolean(
      parseEnvValue(process.env.NEXT_PUBLIC_SHOW_TARGET_GROUP_FILTER, false)
    );
  }

  /** A feature flag for the upcoming venues module in details page. */
  static get showVenuesUpcomingEvents() {
    return Boolean(
      parseEnvValue(process.env.NEXT_PUBLIC_SHOW_VENUES_UPCOMING_EVENTS, true)
    );
  }

  /** A feature flag that can be used to show the enrolment status in the card details. */
  static get showEnrolmentStatusInCardDetails() {
    return Boolean(
      parseEnvValue(
        process.env.NEXT_PUBLIC_SHOW_ENROLMENT_STATUS_IN_CARD_DETAILS,
        false
      )
    );
  }

  /**
   * A map of URL reqriting.
   * Rewrite the URLs returned by the HEadless CMS
   * so that they can be routed and used inside the app.
   * */
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

  /** A feature flag for Hauki service usage. */
  static readonly isHaukiEnabled = false;

  /**
   * The response status codes that the error handler of
   * the Apollo federation client should ignore.
   * */
  static get apolloErrorHandlerIgnoredStatusCodes() {
    // Ignore HTTP410 - Not found, which is raised e.g.
    // when an event has been deleted from the LinkedEvents
    return [410];
  }

  /**
   * The Apollo-client context headers.
   * NOTE: The federation router needs to propagate all the defined headers
   * if they should be used in a request to a GraphQL subgraph.
   */
  static get apolloFederationContextHeaders() {
    // Ignore the unpopulated mandatory event data in LinkedEvents
    return { ...ignoredErrorCodesHeader };
  }

  /**
   * Number of results per page (i.e. pagination / page size).
   *
   * Affects event, hobby, venue and CMS article searches.
   */
  static readonly pageSize = 25;

  /**
   * What related data is fetched from LinkedEvents when a secondary search of events is made.
   * What is the value of `include`-param used in the search query?
   * @see https://api.hel.fi/linkedevents/v1/event/ for API-documentation
   */
  static readonly eventDetailsQueryIncludeParamValue = this
    .showEnrolmentStatusInCardDetails
    ? ['in_language', 'keywords', 'location', 'audience', 'registration']
    : ['in_language', 'keywords', 'location', 'audience'];

  /**
   * What related data is fetched from LinkedEvents when a main search of events is made.
   * What is the value of `include`-param used in the search query?
   * @see https://api.hel.fi/linkedevents/v1/event/ for API-documentation
   */
  static readonly eventSearchQueryIncludeParamValue = this
    .showEnrolmentStatusInCardDetails
    ? ['keywords', 'location', 'registration']
    : ['keywords', 'location'];

  /**
   * What related data is fetched from LinkedEvents when a secondary search of events is made.
   * What is the value of `include`-param used in the search query?
   * @see https://api.hel.fi/linkedevents/v1/event/ for API-documentation
   */
  static readonly eventSecondaryQueryIncludeParamValue = [
    'in_language',
    'keywords',
    'location',
    'audience',
  ];
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
    // eslint-disable-next-line no-console
    console.log('Could not parse env value', e);
    return null;
  }
}

export default AppConfig;
