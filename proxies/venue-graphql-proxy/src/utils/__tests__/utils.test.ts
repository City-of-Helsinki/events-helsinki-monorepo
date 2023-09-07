import AppConfig from '../../config/AppConfig';
import type VenueContext from '../../context/VenueContext';
import type { UnenrichedUnitFields } from '../../resolvers/integrations/VenueServiceMapIntegration';
import VenueServiceMapIntegration from '../../resolvers/integrations/VenueServiceMapIntegration';
import type {
  TranslationsObject,
  Locale,
  TranslatableVenueDetails,
} from '../../types';
import { pickLocaleWithFallback, translateUnenrichedVenue } from '../utils';

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
  it.each<[Locale, Locale, TranslationsObject]>([
    ['sv', 'en', { sv }],
    ['fi', 'en', { fi, sv }],
    ['en', 'sv', { fi, en }],
    ['fi', 'sv', { fi }],
  ])(
    'uses "%s" as first fallback locale to fetch the details when the default locale "%s" is not available in object %o',
    (resultLocale, locale, obj) => {
      const translation = pickLocaleWithFallback(locale, obj);
      const expectedTranslation = obj[resultLocale];
      expect(translation).toStrictEqual(expectedTranslation);
    }
  );
});

describe('translateUnenrichedVenue', () => {
  it.each(AppConfig.supportedLocales)(
    'returns the details in given language %s',
    (locale) => {
      const venueData = {
        ...EMPTY_TEST_VENUE_DATA,
        name: { fi, en, sv },
        description: { fi, en, sv },
      };
      const context = { language: locale } as VenueContext;
      const translatedVenue = translateUnenrichedVenue(venueData, context);
      expect(translatedVenue.description).toStrictEqual(
        venueData.description![locale]
      );
      expect(translatedVenue.name).toStrictEqual(venueData.name![locale]);
    }
  );
  it.each(AppConfig.supportedLocales)(
    'uses a fallback language when the requested details are not available in given language %s',
    (locale) => {
      const venueData = {
        ...EMPTY_TEST_VENUE_DATA,
        name: { fi, en, sv },
        description: { fi, en, sv },
      };
      const fallbackLocale = PRIMARY_FALLBACK_LOCALE[locale];
      const context = { language: locale } as VenueContext;
      delete venueData.description![locale];
      delete venueData.name![locale];
      const translatedVenue = translateUnenrichedVenue(
        venueData,
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
