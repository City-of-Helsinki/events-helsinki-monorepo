import type { Locale } from '../types';

class AppConfig {
  static get debug() {
    return Boolean(parseEnvValue(process.env.GRAPHQL_PROXY_DEBUG));
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
export default AppConfig;
