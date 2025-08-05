import AppConfig from '../../config/AppConfig.js';
import type VenueContext from '../../context/VenueContext.js';
import type { UnenrichedUnitFields } from '../../resolvers/integrations/VenueServiceMapIntegration.js';
import VenueServiceMapIntegration from '../../resolvers/integrations/VenueServiceMapIntegration.js';
import type {
  TranslationsObject,
  Locale,
  TranslatableVenueDetails,
} from '../../types.js';
import { pickLocaleWithFallback, translateUnenrichedVenue } from '../utils.js';

const fi = 'tekstiä suomeksi';
const sv = 'text på svenska';
const en = 'text in English';

const EMPTY_TEST_VENUE_DATA: Readonly<
  Pick<TranslatableVenueDetails, UnenrichedUnitFields>
> = new VenueServiceMapIntegration({
  enrichers: [],
}).makeUnenrichedTranslatableVenueDetails(null);

// Primary fallback locale for each locale
const PRIMARY_FALLBACK_LOCALE: Record<Locale, Locale> = {
  en: 'fi',
  fi: 'en',
  sv: 'en',
};

describe('pickLocaleWithFallback', () => {
  it.each<[Locale, Locale, Pick<TranslationsObject, 'en' | 'fi' | 'sv'>]>([
    ['sv', 'en', { sv }],
    ['fi', 'en', { fi, sv }],
    ['en', 'sv', { fi, en }],
    ['fi', 'sv', { fi }],
  ])(
    // eslint-disable-next-line @stylistic/max-len
    'uses "%s" as first fallback locale to fetch the details when the default locale "%s" is not available in object %o',
    (resultLocale, locale, obj) => {
      const translation = pickLocaleWithFallback(
        locale,
        obj as TranslationsObject
      );
      const expectedTranslation = obj[resultLocale];
      expect(translation).toStrictEqual(expectedTranslation);
    }
  );
});

describe('translateUnenrichedVenue', () => {
  it.each<Locale>(AppConfig.supportedLocales)(
    'returns the details in given language %s',
    (locale) => {
      const venueData = {
        ...EMPTY_TEST_VENUE_DATA,
        name: { fi, en, sv } as TranslationsObject,
        description: { fi, en, sv } as TranslationsObject,
      };
      const context = { language: locale };
      const translatedVenue = translateUnenrichedVenue(
        venueData,
        context as VenueContext
      );
      expect(translatedVenue.description).toStrictEqual(
        venueData.description![locale]
      );
      expect(translatedVenue.name).toStrictEqual(venueData.name![locale]);
    }
  );
  it.each<Locale>(AppConfig.supportedLocales)(
    'uses a fallback language when the requested details are not available in given language %s',
    (locale) => {
      const venueData = {
        ...EMPTY_TEST_VENUE_DATA,
        name: { fi, en, sv },
        description: { fi, en, sv },
      };
      const fallbackLocale: keyof TranslationsObject =
        PRIMARY_FALLBACK_LOCALE[locale];
      const context = { language: locale } as VenueContext;
      delete venueData.description![locale];
      delete venueData.name![locale];
      const translatedVenue = translateUnenrichedVenue(
        venueData as TranslatableVenueDetails,
        context,
        true
      );
      expect(translatedVenue.description).toStrictEqual(
        venueData.description[fallbackLocale]
      );
      expect(translatedVenue.name).toStrictEqual(
        venueData.name[fallbackLocale]
      );
    }
  );
});
