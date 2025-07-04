import type { Locale } from '../types.js';

class AppConfig {
  static get serverPort() {
    return Number(parseEnvValue(process.env.GRAPHQL_PROXY_PORT, 4100));
  }

  static get debug() {
    return Boolean(parseEnvValue(process.env.GRAPHQL_PROXY_DEBUG));
  }

  static get sentryEnvironment() {
    return parseEnvValue(process.env.GRAPHQL_PROXY_SENTRY_ENVIRONMENT);
  }

  static get sentryDsn() {
    return parseEnvValue(process.env.GRAPHQL_PROXY_SENTRY_DSN);
  }

  static get enableWinstonLogging() {
    return !Boolean(
      parseEnvValue(process.env.GRAPHQL_PROXY_DISABLE_WINSTON_LOGGING)
    );
  }

  static get enableIntrospection() {
    return Boolean(parseEnvValue(process.env.GRAPHQL_PROXY_INTROSPECTION));
  }

  static get supportedLocales(): Readonly<Array<Locale>> {
    return ['fi', 'en', 'sv'] as const;
  }

  /** A prioritized list of fallback languages. */
  static get fallbackLocales(): Readonly<Array<Locale>> {
    return ['en', 'fi', 'sv'] as const;
  }

  static get defaultLocale(): Locale {
    return 'fi' as const;
  }

  static get apiBaseUrl() {
    const url = parseEnvValue(process.env.GRAPHQL_PROXY_API_BASE_URL);
    if (!url) {
      throw new Error(
        'Environment variable "GRAPHQL_PROXY_API_BASE_URL" is not set!'
      );
    }
    return url;
  }

  static get mapOpenDataApiBaseUrl() {
    const url = parseEnvValue(
      process.env.GRAPHQL_PROXY_MAP_OPEN_DATA_API_BASE_URL
    );
    if (!url) {
      throw new Error(
        'Environment variable "GRAPHQL_PROXY_MAP_OPEN_DATA_API_BASE_URL" is not set!'
      );
    }
    return url;
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
export default AppConfig;
