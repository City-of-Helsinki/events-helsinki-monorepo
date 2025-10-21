import type { Locale } from '../types.js';

class AppConfig {
  static get serverPort() {
    return Number(process.env.GRAPHQL_PROXY_PORT) || 4200;
  }

  static get debug() {
    return Boolean(parseEnvValue(process.env.GRAPHQL_PROXY_DEBUG));
  }

  static get sentryEnvironment() {
    return getEnvOrError(
      process.env.GRAPHQL_PROXY_SENTRY_ENVIRONMENT,
      'GRAPHQL_PROXY_SENTRY_ENVIRONMENT'
    );
  }

  static get sentryDsn() {
    return process.env.GRAPHQL_PROXY_SENTRY_DSN;
  }

  static get enableWinstonLogging() {
    const isLoggingDisabled = Boolean(
      parseEnvValue(process.env.GRAPHQL_PROXY_DISABLE_WINSTON_LOGGING, true)
    );
    return !isLoggingDisabled;
  }

  static get enableIntrospection() {
    return Boolean(
      parseEnvValue(process.env.GRAPHQL_PROXY_INTROSPECTION, true)
    );
  }

  static get isHaukiEnabled() {
    return true as const;
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

  /**
   * When Venue details are fetched and there are no details populated for the language in the context,
   * should the server serve the details in the most prioritized fallback langauge.
   * @return boolean  Returns true if the fallback langauges should be used.
   */
  static get isUseFallbackLocalesEnabled() {
    return true as const;
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

function getEnvOrError(variable?: string, name?: string) {
  if (!variable) {
    throw Error(`Environment variable with name ${name} was not found`);
  }
  return variable;
}

export default AppConfig;
