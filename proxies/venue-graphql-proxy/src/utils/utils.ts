import get from 'lodash/get.js';
import AppConfig from '../config/AppConfig.js';
import { Sources } from '../contants/constants.js';
import type VenueContext from '../context/VenueContext.js';
import type { UnenrichedUnitFields } from '../resolvers/integrations/VenueServiceMapIntegration.js';
import type { Point } from '../types/__generated__.js';
import type {
  TprekAccessibilitySentence,
  AccessibilitySentences,
  Locale,
  TprekUnit,
  TprekUnitWithoutNull,
  TprekDepartmentWithoutNull,
  TranslatableVenueDetails,
  TranslationsObject,
  TranslatedVenueDetails,
  TprekUnitConnection,
  TprekOntologyTreeNode,
  TprekOntologyWord,
  TranslatableDepartment,
  TranslatableOntologyIdLabel,
  TranslatableAccessibilitySentences,
  TranslatedAccessibilitySentences,
  TranslatedDepartment,
  TranslatedOntologyIdLabel,
  TprekDepartment,
} from '../types.js';

/**
 * Extract prefixes from strings that are suffixed with underscore and any given locale.
 * @example ExtractPrefixesFromLocaleSuffixedNames<'a_fi' | 'b_sv' | 'c'> == 'a' | 'b'
 *
 * NOTE: this is also available in '@events-helsinki/components/src/utils/typescript.utils.js',
 * but the module type does not match
 */
export type ExtractPrefixesFromLocaleSuffixedNames<
  T extends string,
  Locale extends string = 'fi' | 'en' | 'sv',
> = T extends `${infer Prefix}_${Locale}` ? Prefix : never;

/** Mapping from Locale to its TprekAccessibilitySentence sentence group name */
const LOCALIZED_SENTENCE_GROUP_NAME: Record<
  Locale,
  keyof TprekAccessibilitySentence & `sentence_group_${Locale}`
> = {
  fi: 'sentence_group_fi',
  en: 'sentence_group_en',
  sv: 'sentence_group_sv',
};

/** Mapping from Locale to its TprekAccessibilitySentence sentence name */
const LOCALIZED_SENTENCE_NAME: Record<
  Locale,
  keyof TprekAccessibilitySentence & `sentence_${Locale}`
> = {
  fi: 'sentence_fi',
  en: 'sentence_en',
  sv: 'sentence_sv',
};

// Get locale from context with fallback to default locale
const getContextLocale = (context: VenueContext): Locale =>
  context.language ?? AppConfig.defaultLocale;

type TranslatableObjectType =
  | TprekUnitWithoutNull
  | TprekUnitConnection
  | TprekDepartmentWithoutNull
  | TprekOntologyTreeNode
  | TprekOntologyWord;

/**
 * Extract translatable field name prefixes from given type
 * i.e. the prefixes that are suffixed with an underscore and a locale.
 * @example ExtractTranslatableFieldNamePrefixes<keyof TprekOntologyWord> ==
 *          'extra_searchwords' | 'ontologyword'
 */
type ExtractTranslatableFieldNamePrefixes<T extends string> =
  ExtractPrefixesFromLocaleSuffixedNames<T, Locale>;

export type TranslatableFieldsFor<T extends TranslatableObjectType> =
  T extends TprekUnitWithoutNull
    ? ExtractTranslatableFieldNamePrefixes<keyof TprekUnitWithoutNull>
    : T extends TprekUnitConnection
      ? ExtractTranslatableFieldNamePrefixes<keyof TprekUnitConnection>
      : T extends TprekDepartmentWithoutNull
        ? ExtractTranslatableFieldNamePrefixes<keyof TprekDepartmentWithoutNull>
        : T extends TprekOntologyTreeNode
          ? ExtractTranslatableFieldNamePrefixes<keyof TprekOntologyTreeNode>
          : T extends TprekOntologyWord
            ? ExtractTranslatableFieldNamePrefixes<keyof TprekOntologyWord>
            : never;

export function formTranslationObject<
  InputObjectType extends TranslatableObjectType,
>(obj: InputObjectType, field: TranslatableFieldsFor<InputObjectType>) {
  const result = {
    fi: get(obj, `${field}_fi`) ?? undefined,
    en: get(obj, `${field}_en`) ?? undefined,
    sv: get(obj, `${field}_sv`) ?? undefined,
  } as TranslationsObject;
  if (
    result.fi === undefined &&
    result.en === undefined &&
    result.sv === undefined
  ) {
    return null;
  }
  return result;
}

export const formAccessibilitySentences = (
  data: TprekUnit
): Record<Locale, Array<AccessibilitySentences>> => {
  const sentencesForLanguages: Record<Locale, Array<AccessibilitySentences>> = {
    fi: [],
    en: [],
    sv: [],
  };

  for (const language of AppConfig.supportedLocales) {
    const sentences = sentencesForLanguages[language];

    data?.accessibility_sentences?.forEach(
      (accessibilitySentence: TprekAccessibilitySentence) => {
        const groupName =
          accessibilitySentence[LOCALIZED_SENTENCE_GROUP_NAME[language]];

        const existing = sentences?.find(
          (obj: AccessibilitySentences) => obj?.groupName === groupName
        );
        const sentence =
          accessibilitySentence[LOCALIZED_SENTENCE_NAME[language]];

        if (sentence && groupName) {
          if (!existing) {
            sentences.push({
              groupName: groupName,
              sentences: [sentence],
            });
          } else {
            const index = sentences.indexOf(existing);
            sentences[index].sentences.push(sentence);
          }
        }
      }
    );
  }
  return sentencesForLanguages;
};

export function makeTranslatableDepartment(
  department: TprekDepartment
): TranslatableDepartment | null {
  if (!department) {
    return null;
  }
  return {
    abbreviation: formTranslationObject(department, 'abbr'),
    addressCity: formTranslationObject(
      department,
      'address_city' as ExtractTranslatableFieldNamePrefixes<
        keyof TprekDepartmentWithoutNull
      >
    ),
    addressPostalFull: formTranslationObject(
      department,
      'address_postal_full' as ExtractTranslatableFieldNamePrefixes<
        keyof TprekDepartmentWithoutNull
      >
    ),
    addressZip: department?.address_zip ?? null,
    businessId: department?.business_id ?? null,
    email: department?.email ?? null,
    hierarchyLevel: department?.hierarchy_level ?? null,
    id: department.id,
    municipalityCode: department?.municipality_code ?? null,
    name: formTranslationObject(department, 'name'),
    oid: department?.oid ?? null,
    organizationId: department?.org_id ?? null,
    organizationType: department?.organization_type ?? null,
    parentId: department?.parent_id ?? null,
    phone: department?.phone ?? null,
    streetAddress: formTranslationObject(
      department,
      'street_address' as ExtractTranslatableFieldNamePrefixes<
        keyof TprekDepartmentWithoutNull
      >
    ),
    www: formTranslationObject(department, 'www'),
  };
}

export function getTprekId(
  source: string = Sources.TPREK,
  id: string
): string | null {
  if (!source || !id) {
    return null;
  }

  return [source, id].join(':');
}

export function getPointFromLongAndLat(
  long?: number | null,
  lat?: number | null
): Point | null {
  if (!long || !lat) {
    return null;
  }

  return {
    __typename: 'Point',
    coordinates: [long, lat],
  };
}

/**
 * Use 'pickLocale' or use a next fallback locale
 * from the prioritized list of the fallback locales with it.
 * */
export function pickLocaleWithFallback(
  locale: Locale,
  obj?: TranslationsObject | null
) {
  let translation = pickLocale(locale, obj);
  if (!translation) {
    for (const fallbackLng of AppConfig.fallbackLocales) {
      translation = pickLocale(fallbackLng, obj);
      if (translation) return translation;
    }
  }
  return translation || null;
}

function pickLocale(locale: Locale, obj?: TranslationsObject | null) {
  return get(obj, locale, null) ?? null;
}

export function translateOntologyIdLabel(
  ontologyIdLabel: TranslatableOntologyIdLabel,
  context: VenueContext,
  isUseFallbackLocalesEnabled = AppConfig.isUseFallbackLocalesEnabled
): TranslatedOntologyIdLabel {
  const locale = getContextLocale(context);
  const pickLocaleFn = isUseFallbackLocalesEnabled
    ? pickLocaleWithFallback
    : pickLocale;
  return {
    id: ontologyIdLabel.id,
    label: pickLocaleFn(locale, ontologyIdLabel.label),
  };
}

export function translateOntologyIdLabels(
  ontologyIdLabels: TranslatableOntologyIdLabel[],
  context: VenueContext,
  isUseFallbackLocalesEnabled = AppConfig.isUseFallbackLocalesEnabled
): TranslatedOntologyIdLabel[] {
  return ontologyIdLabels.map((ontologyIdLabel) =>
    translateOntologyIdLabel(
      ontologyIdLabel,
      context,
      isUseFallbackLocalesEnabled
    )
  );
}

export function translateAccessibilitySentences(
  accessibilitySentences: TranslatableAccessibilitySentences | null,
  context: VenueContext,
  isUseFallbackLocalesEnabled = AppConfig.isUseFallbackLocalesEnabled
): TranslatedAccessibilitySentences {
  if (!accessibilitySentences) {
    return [];
  }

  const locale = getContextLocale(context);
  const tryLocalesInOrder = [locale].concat(
    isUseFallbackLocalesEnabled ? AppConfig.fallbackLocales : []
  );

  for (const locale of tryLocalesInOrder) {
    const sentences = get(accessibilitySentences, locale, null);
    if (sentences) {
      return sentences;
    }
  }

  return [];
}

export function translateDepartment(
  department: TranslatableDepartment | null,
  context: VenueContext,
  isUseFallbackLocalesEnabled = AppConfig.isUseFallbackLocalesEnabled
): TranslatedDepartment | null {
  if (!department) {
    return null;
  }

  const locale = getContextLocale(context);
  const pickLocaleFn = isUseFallbackLocalesEnabled
    ? pickLocaleWithFallback
    : pickLocale;

  return {
    ...department,
    abbreviation: pickLocaleFn(locale, department.abbreviation),
    addressCity: pickLocaleFn(locale, department.addressCity),
    addressPostalFull: pickLocaleFn(locale, department.addressPostalFull),
    name: pickLocaleFn(locale, department.name),
    streetAddress: pickLocaleFn(locale, department.streetAddress),
    www: pickLocaleFn(locale, department.www),
  };
}

export function translateUnenrichedVenue(
  data: Pick<TranslatableVenueDetails, UnenrichedUnitFields>,
  context: VenueContext,
  isUseFallbackLocalesEnabled = AppConfig.isUseFallbackLocalesEnabled
): Pick<TranslatedVenueDetails, UnenrichedUnitFields> {
  const locale = getContextLocale(context);
  const pickLocaleFn = isUseFallbackLocalesEnabled
    ? pickLocaleWithFallback
    : pickLocale;

  return {
    ...data,
    addressLocality: pickLocaleFn(locale, data.addressLocality),
    addressPostalFull: pickLocaleFn(locale, data.addressPostalFull),
    description: pickLocaleFn(locale, data.description),
    displayedServiceOwner: pickLocaleFn(locale, data.displayedServiceOwner),
    name: pickLocaleFn(locale, data.name),
    shortDescription: pickLocaleFn(locale, data.shortDescription),
    streetAddress: pickLocaleFn(locale, data.streetAddress),
    infoUrl: pickLocaleFn(locale, data.infoUrl),
    accessibilitySentences: translateAccessibilitySentences(
      data.accessibilitySentences,
      context,
      isUseFallbackLocalesEnabled
    ),
    connections: data.connections.map((connection) => ({
      ...connection,
      name: pickLocaleFn(locale, connection.name) ?? '',
      url: pickLocaleFn(locale, connection.url),
    })),
  };
}
