import AppConfig from '../../config/AppConfig';
import type VenueContext from '../../context/VenueContext';
import type {
  TranslationsObject,
  Locale,
  TranslatableVenueDetails,
} from '../../types';
import { pickLocaleWithFallback, translateVenue } from '../utils';

const fi = 'tekstiä suomeksi';
const sv = 'text på svenska';
const en = 'text in English';

describe('pickLocaleWithFallback', () => {
  it.each<[Locale, Locale, TranslationsObject]>([
    ['sv', 'en', { sv }],
    ['fi', 'en', { fi, sv }],
    ['en', 'sv', { fi, en }],
    ['fi', 'sv', { fi }],
  ])(
    'uses "%s" as first fallback locale to fetch the details when the default locale "%s" is not available in object %o',
    (resultLocale, locale, obj) => {
      const translation = pickLocaleWithFallback(obj, locale);
      const expectedTranslation = obj[resultLocale];
      expect(translation).toStrictEqual(expectedTranslation);
    }
  );
});

describe('translateVenue', () => {
  it.each(AppConfig.supportedLocales)(
    'returns the details in given language %s',
    (locale) => {
      const venueData = {
        name: {
          fi,
          en,
          sv,
        },
        description: {
          fi,
          en,
          sv,
        },
      } as Partial<TranslatableVenueDetails>;
      const context = { language: locale } as VenueContext;
      const translatedVenue = translateVenue(venueData, context);
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
        name: {
          fi,
          en,
          sv,
        },
        description: {
          fi,
          en,
          sv,
        },
      } as Partial<TranslatableVenueDetails>;
      const fallbackLng = locale === 'en' ? 'fi' : 'en';
      const context = { language: locale } as VenueContext;
      delete venueData.description![locale];
      delete venueData.name![locale];
      const translatedVenue = translateVenue(venueData, context, true);
      expect(translatedVenue.description).toStrictEqual(
        venueData.description![fallbackLng]
      );
      expect(translatedVenue.name).toStrictEqual(venueData.name![fallbackLng]);
    }
  );
});
