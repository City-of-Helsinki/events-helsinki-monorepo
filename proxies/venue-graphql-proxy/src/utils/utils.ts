import get from 'lodash/get';
import AppConfig from '../config/AppConfig';
import { Sources } from '../contants/constants';
import type VenueContext from '../context/VenueContext';
import type {
  TprekAccessibilitySentence,
  AccessibilitySentences,
  Locale,
  TprekUnit,
  TprekUnitWithoutNull,
  TranslatableVenueDetails,
  TranslationsObject,
  TranslatedVenueDetails,
  TprekUnitTranslatableFields,
  TprekUnitConnection,
  TprekUnitConnectionTranslatableFields,
} from '../types';
import type { Point } from '../types/types';

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

type TranslatableObjectType = TprekUnitWithoutNull | TprekUnitConnection;
type TranslatableFieldsFor<T extends TranslatableObjectType> =
  T extends TprekUnitWithoutNull
    ? TprekUnitTranslatableFields
    : T extends TprekUnitConnection
    ? TprekUnitConnectionTranslatableFields
    : never;

export function formTranslationObject<
  InputObjectType extends TranslatableObjectType
>(obj: InputObjectType, field: TranslatableFieldsFor<InputObjectType>) {
  const [field_fi, field_en, field_sv] = AppConfig.supportedLocales.map(
    (locale) => `${field}_${locale}` as keyof InputObjectType
  );
  if (!obj[field_fi] && !obj[field_en] && !obj[field_sv]) return null;

  return {
    fi: obj[field_fi] ?? null,
    en: obj[field_en] ?? null,
    sv: obj[field_sv] ?? null,
  } as TranslationsObject;
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
  long: number,
  lat: number
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
  obj: TranslationsObject,
  locale: Locale
) {
  let translation = pickLocale(obj, locale);
  if (!translation) {
    for (const fallbackLng of AppConfig.fallbackLocales) {
      translation = pickLocale(obj, fallbackLng as Locale);
      if (translation) return translation;
    }
  }
  return translation || null;
}

function pickLocale(obj: TranslationsObject, locale: Locale) {
  return get(obj, locale, null);
}

export function translateVenue(
  data: Partial<TranslatableVenueDetails>,
  context: VenueContext,
  isUseFallbackLocalesEnabled = true
): TranslatableVenueDetails | TranslatedVenueDetails {
  if (!context.language) {
    return data as TranslatableVenueDetails;
  }

  const locale = context.language as Locale;
  const pickLocaleFn = isUseFallbackLocalesEnabled
    ? pickLocaleWithFallback
    : pickLocale;

  return {
    ...data,
    addressLocality: data.addressLocality
      ? pickLocaleFn(data.addressLocality, locale)
      : undefined,
    addressPostalFull: data.addressPostalFull
      ? pickLocaleFn(data.addressPostalFull, locale)
      : undefined,
    description: data.description
      ? pickLocaleFn(data.description, locale)
      : undefined,
    displayedServiceOwner: data.displayedServiceOwner
      ? pickLocaleFn(data.displayedServiceOwner, locale)
      : undefined,
    name: data.name ? pickLocaleFn(data.name, locale) : undefined,
    shortDescription: data.shortDescription
      ? pickLocaleFn(data.shortDescription, locale)
      : undefined,
    streetAddress: data.streetAddress
      ? pickLocaleFn(data.streetAddress, locale)
      : undefined,
    infoUrl: data.infoUrl ? pickLocaleFn(data.infoUrl, locale) : undefined,
    telephone: data.telephone
      ? pickLocaleFn(data.telephone, locale)
      : undefined,
    accessibilitySentences:
      // If grouped by translations, find the correct one by language
      data.accessibilitySentences && 'fi' in data.accessibilitySentences
        ? get(data.accessibilitySentences, locale, null)
        : data?.accessibilitySentences,
    connections: data.connections?.map((connection) => ({
      ...connection,
      name: pickLocaleFn(connection.name, locale),
      url: connection.url ? pickLocaleFn(connection.url, locale) : undefined,
    })),
  } as TranslatedVenueDetails;
}
