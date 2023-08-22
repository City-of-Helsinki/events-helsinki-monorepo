import type { Locale } from '../types';

class AppConfig {
  static get debug() {
    return Boolean(parseEnvValue(process.env.GRAPHQL_PROXY_DEBUG));
  }

  static get isHaukiEnabled() {
    return false;
  }

  static get supportedLocales() {
    return ['fi', 'en', 'sv'] as Locale[];
  }

  /** A prioritized list of fallback languages. */
  static get fallbackLocales() {
    return ['en', 'fi', 'sv'] as Locale[];
  }

  /**
   * When Venue details are fetched and there are no details populated for the language in the context,
   * should the server serve the details in the most prioritized fallback langauge.
   * @return boolean  Returns tru if the fallback langauges should be used.
   */
  static get isUseFallbackLocalesEnabled() {
    return true;
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
