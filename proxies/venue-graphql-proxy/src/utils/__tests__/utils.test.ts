import AppConfig from '../../config/AppConfig.js';
import type VenueContext from '../../context/VenueContext.js';
import type { UnenrichedUnitFields } from '../../resolvers/integrations/VenueServiceMapIntegration.js';
import VenueServiceMapIntegration from '../../resolvers/integrations/VenueServiceMapIntegration.js';
import type {
  TranslationsObject,
  Locale,
  TranslatableVenueDetails,
  TprekUnit,
  TprekDepartment,
  TranslatableOntologyIdLabel,
  TranslatableAccessibilitySentences,
  TranslatableDepartment,
  AccessibilitySentences,
} from '../../types.js';
import {
  pickLocaleWithFallback,
  translateUnenrichedVenue,
  formTranslationObject,
  formAccessibilitySentences,
  makeTranslatableDepartment,
  getTprekId,
  getPointFromLongAndLat,
  translateOntologyIdLabel,
  translateOntologyIdLabels,
  translateAccessibilitySentences,
  translateDepartment,
} from '../utils.js';

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

  it('defaults a connection name to an empty string when no translation is available', () => {
    const venueData = {
      ...EMPTY_TEST_VENUE_DATA,
      connections: [
        {
          sectionType: 'PHONE',
          name: {} as TranslationsObject,
          phone: '0123456789',
          url: null,
        },
      ],
    };
    const context = { language: 'fi' } as VenueContext;
    const translatedVenue = translateUnenrichedVenue(venueData, context);
    expect(translatedVenue.connections[0].name).toBe('');
  });
});

describe('formTranslationObject', () => {
  it('returns an object with all three locales when at least one is present', () => {
    const unit = { name_fi: fi, name_en: en, name_sv: sv };
    expect(formTranslationObject(unit, 'name')).toStrictEqual({
      fi,
      en,
      sv,
    });
  });

  it('returns undefined for locales that are missing', () => {
    const unit = { name_fi: fi };
    expect(formTranslationObject(unit, 'name')).toStrictEqual({
      fi,
      en: undefined,
      sv: undefined,
    });
  });

  it('returns null when none of the locales have a value', () => {
    const unit = {};
    expect(formTranslationObject(unit, 'name')).toBeNull();
  });
});

describe('formAccessibilitySentences', () => {
  it('groups sentences by group name for each supported locale', () => {
    const data = {
      accessibility_sentences: [
        {
          sentence_group_name: 'entrance',
          sentence_group_fi: 'Sisäänkäynti',
          sentence_group_en: 'Entrance',
          sentence_group_sv: 'Ingång',
          sentence_fi: 'Ovi on leveä.',
          sentence_en: 'The door is wide.',
          sentence_sv: 'Dörren är bred.',
        },
        {
          sentence_group_name: 'entrance',
          sentence_group_fi: 'Sisäänkäynti',
          sentence_group_en: 'Entrance',
          sentence_group_sv: 'Ingång',
          sentence_fi: 'Ovi avautuu automaattisesti.',
          sentence_en: 'The door opens automatically.',
          sentence_sv: 'Dörren öppnas automatiskt.',
        },
      ],
    } as unknown as TprekUnit;

    const result = formAccessibilitySentences(data!);

    expect(result.fi).toStrictEqual([
      {
        groupName: 'Sisäänkäynti',
        sentences: ['Ovi on leveä.', 'Ovi avautuu automaattisesti.'],
      },
    ]);
    expect(result.en).toStrictEqual([
      {
        groupName: 'Entrance',
        sentences: ['The door is wide.', 'The door opens automatically.'],
      },
    ]);
    expect(result.sv).toStrictEqual([
      {
        groupName: 'Ingång',
        sentences: ['Dörren är bred.', 'Dörren öppnas automatiskt.'],
      },
    ]);
  });

  it('returns empty arrays for every locale when there are no sentences', () => {
    const data = { accessibility_sentences: [] } as unknown as TprekUnit;
    expect(formAccessibilitySentences(data!)).toStrictEqual({
      fi: [],
      en: [],
      sv: [],
    });
  });

  it('skips sentences missing a group name or a sentence for the locale', () => {
    const data = {
      accessibility_sentences: [
        {
          sentence_group_name: 'entrance',
          sentence_group_fi: 'Sisäänkäynti',
          // sentence_fi missing on purpose
        },
      ],
    } as unknown as TprekUnit;

    expect(formAccessibilitySentences(data!).fi).toStrictEqual([]);
  });
});

describe('makeTranslatableDepartment', () => {
  it('returns null when department is null', () => {
    expect(makeTranslatableDepartment(null as TprekDepartment)).toBeNull();
  });

  it('maps all department fields, translating the translatable ones', () => {
    const department = {
      id: 'dept-1',
      abbr_fi: 'lyh',
      abbr_en: 'abbr',
      abbr_sv: 'förk',
      address_city_fi: 'Helsinki',
      address_city_en: 'Helsinki',
      address_city_sv: 'Helsingfors',
      address_postal_full_fi: '00100 Helsinki',
      address_postal_full_en: '00100 Helsinki',
      address_postal_full_sv: '00100 Helsingfors',
      address_zip: '00100',
      business_id: '1234567-8',
      email: 'dept@example.com',
      hierarchy_level: 1,
      municipality_code: 91,
      name_fi: 'Osasto',
      name_en: 'Department',
      name_sv: 'Avdelning',
      oid: 'oid-1',
      org_id: 'org-1',
      organization_type: 'MUNICIPALITY',
      parent_id: 'parent-1',
      phone: '0123456789',
      street_address_fi: 'Katu 1',
      street_address_en: 'Street 1',
      street_address_sv: 'Gatan 1',
      www_fi: 'https://fi.example.com',
      www_en: 'https://en.example.com',
      www_sv: 'https://sv.example.com',
    };

    const result = makeTranslatableDepartment(department);

    expect(result).toStrictEqual({
      abbreviation: { fi: 'lyh', en: 'abbr', sv: 'förk' },
      addressCity: { fi: 'Helsinki', en: 'Helsinki', sv: 'Helsingfors' },
      addressPostalFull: {
        fi: '00100 Helsinki',
        en: '00100 Helsinki',
        sv: '00100 Helsingfors',
      },
      addressZip: '00100',
      businessId: '1234567-8',
      email: 'dept@example.com',
      hierarchyLevel: 1,
      id: 'dept-1',
      municipalityCode: 91,
      name: { fi: 'Osasto', en: 'Department', sv: 'Avdelning' },
      oid: 'oid-1',
      organizationId: 'org-1',
      organizationType: 'MUNICIPALITY',
      parentId: 'parent-1',
      phone: '0123456789',
      streetAddress: { fi: 'Katu 1', en: 'Street 1', sv: 'Gatan 1' },
      www: {
        fi: 'https://fi.example.com',
        en: 'https://en.example.com',
        sv: 'https://sv.example.com',
      },
    });
  });

  it('falls back to null for optional fields that are missing', () => {
    const department = { id: 'dept-2' };
    const result = makeTranslatableDepartment(department);

    expect(result?.addressZip).toBeNull();
    expect(result?.businessId).toBeNull();
    expect(result?.email).toBeNull();
    expect(result?.hierarchyLevel).toBeNull();
    expect(result?.municipalityCode).toBeNull();
    expect(result?.oid).toBeNull();
    expect(result?.organizationId).toBeNull();
    expect(result?.organizationType).toBeNull();
    expect(result?.parentId).toBeNull();
    expect(result?.phone).toBeNull();
    expect(result?.abbreviation).toBeNull();
    expect(result?.name).toBeNull();
  });
});

describe('getTprekId', () => {
  it('joins the default tprek source and id', () => {
    expect(getTprekId(undefined, '12345')).toBe('tprek:12345');
  });

  it('joins a given source and id', () => {
    expect(getTprekId('linked', 'abc')).toBe('linked:abc');
  });

  it('returns null when id is missing', () => {
    expect(getTprekId('tprek', '')).toBeNull();
  });

  it('returns null when source is falsy', () => {
    expect(getTprekId('', '12345')).toBeNull();
  });
});

describe('getPointFromLongAndLat', () => {
  it('returns a Point when both long and lat are given', () => {
    expect(getPointFromLongAndLat(24.9, 60.2)).toStrictEqual({
      __typename: 'Point',
      coordinates: [24.9, 60.2],
    });
  });

  it('returns null when long is missing', () => {
    expect(getPointFromLongAndLat(null, 60.2)).toBeNull();
  });

  it('returns null when lat is missing', () => {
    expect(getPointFromLongAndLat(24.9, undefined)).toBeNull();
  });

  it('returns null when both are missing', () => {
    expect(getPointFromLongAndLat(undefined, undefined)).toBeNull();
  });
});

describe('translateOntologyIdLabel', () => {
  const ontologyIdLabel: TranslatableOntologyIdLabel = {
    id: 1,
    label: { fi, en, sv } as TranslationsObject,
  };

  it.each<Locale>(AppConfig.supportedLocales)(
    'translates the label to the given locale %s',
    (locale) => {
      const context = { language: locale } as VenueContext;
      expect(translateOntologyIdLabel(ontologyIdLabel, context)).toStrictEqual({
        id: 1,
        label: ontologyIdLabel.label![locale],
      });
    }
  );

  it('uses a fallback locale when the requested one is missing and fallback is enabled', () => {
    const label = { fi, sv } as TranslationsObject;
    const context = { language: 'en' } as VenueContext;
    expect(
      translateOntologyIdLabel({ id: 2, label }, context, true)
    ).toStrictEqual({ id: 2, label: fi });
  });

  it('does not use a fallback locale when fallback is disabled', () => {
    const label = { fi, sv } as TranslationsObject;
    const context = { language: 'en' } as VenueContext;
    expect(
      translateOntologyIdLabel({ id: 3, label }, context, false)
    ).toStrictEqual({ id: 3, label: null });
  });
});

describe('translateOntologyIdLabels', () => {
  it('translates every ontology id label in the given array', () => {
    const context = { language: 'fi' } as VenueContext;
    const ontologyIdLabels: TranslatableOntologyIdLabel[] = [
      { id: 1, label: { fi, en, sv } as TranslationsObject },
      { id: 2, label: { fi: 'toinen', en: 'second', sv: 'andra' } },
    ];

    expect(translateOntologyIdLabels(ontologyIdLabels, context)).toStrictEqual([
      { id: 1, label: fi },
      { id: 2, label: 'toinen' },
    ]);
  });

  it('returns an empty array when given an empty array', () => {
    const context = { language: 'fi' } as VenueContext;
    expect(translateOntologyIdLabels([], context)).toStrictEqual([]);
  });
});

describe('translateAccessibilitySentences', () => {
  const sentences: AccessibilitySentences[] = [
    { groupName: 'Entrance', sentences: ['The door is wide.'] },
  ];

  it('returns an empty array when accessibilitySentences is null', () => {
    const context = { language: 'fi' } as VenueContext;
    expect(translateAccessibilitySentences(null, context)).toStrictEqual([]);
  });

  it('returns the sentences for the requested locale', () => {
    const accessibilitySentences: TranslatableAccessibilitySentences = {
      fi: sentences,
      en: [],
      sv: [],
    };
    const context = { language: 'fi' } as VenueContext;
    expect(
      translateAccessibilitySentences(accessibilitySentences, context)
    ).toStrictEqual(sentences);
  });

  it('falls back to another locale when the requested one is missing and fallback is enabled', () => {
    const accessibilitySentences = {
      fi: sentences,
      sv: [],
    } as unknown as TranslatableAccessibilitySentences;
    const context = { language: 'en' } as VenueContext;
    expect(
      translateAccessibilitySentences(accessibilitySentences, context, true)
    ).toStrictEqual(sentences);
  });

  it('returns an empty array when no locale (including fallbacks) has sentences', () => {
    const accessibilitySentences = {} as TranslatableAccessibilitySentences;
    const context = { language: 'en' } as VenueContext;
    expect(
      translateAccessibilitySentences(accessibilitySentences, context, true)
    ).toStrictEqual([]);
  });
});

describe('translateDepartment', () => {
  it('returns null when department is null', () => {
    const context = { language: 'fi' } as VenueContext;
    expect(translateDepartment(null, context)).toBeNull();
  });

  it('translates all translatable department fields to the given locale', () => {
    const department: TranslatableDepartment = {
      abbreviation: { fi, en, sv } as TranslationsObject,
      addressCity: { fi, en, sv } as TranslationsObject,
      addressPostalFull: { fi, en, sv } as TranslationsObject,
      addressZip: '00100',
      businessId: '1234567-8',
      email: 'dept@example.com',
      hierarchyLevel: 1,
      id: 'dept-1',
      municipalityCode: 91,
      name: { fi, en, sv } as TranslationsObject,
      oid: 'oid-1',
      organizationId: 'org-1',
      organizationType: 'MUNICIPALITY',
      parentId: 'parent-1',
      phone: '0123456789',
      streetAddress: { fi, en, sv } as TranslationsObject,
      www: { fi, en, sv } as TranslationsObject,
    };
    const context = { language: 'sv' } as VenueContext;

    const result = translateDepartment(department, context);

    expect(result).toStrictEqual({
      ...department,
      abbreviation: sv,
      addressCity: sv,
      addressPostalFull: sv,
      name: sv,
      streetAddress: sv,
      www: sv,
    });
  });
});
