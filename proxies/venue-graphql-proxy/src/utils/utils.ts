import get from 'lodash/get';
import { Sources } from '../contants/constants';
import type VenueContext from '../context/VenueContext';
import type { Locale, TranslationsObject, VenueDetails } from '../types';
import type { Point } from '../types/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formTranslationObject = (obj: any, field: any) => {
  const translationsLanguages = ['fi', 'en', 'sv'];
  const [field_fi, field_en, field_sv] = translationsLanguages.map(
    (language) => `${field}_${language}`
  );
  if (!obj[field_fi] && !obj[field_en] && !obj[field_sv]) return null;

  return {
    fi: obj[field_fi] ?? null,
    en: obj[field_en] ?? null,
    sv: obj[field_sv] ?? null,
  } as TranslationsObject;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formAccessibilitySentences = (data: any) => {
  const table = { fi: [], en: [], sv: [] };

  Object.keys(table).forEach((language) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const sentences = table[language];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?.accessibility_sentences?.forEach((group: any) => {
      const key = `sentence_group_${language}`;
      const groupValue = group[key];

      const existing = sentences?.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (obj: any) => obj?.groupName === groupValue
      );
      if (!existing) {
        sentences.push({
          groupName: groupValue,
          sentences: [group[`sentence_${language}`]],
        });
      } else {
        const index = sentences.indexOf(existing);
        sentences[index].sentences.push(group[`sentence_${language}`]);
      }
    });
  });
  return table;
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

function pickLocale(obj: TranslationsObject, locale: Locale) {
  return get(obj, locale, null);
}

export function translateVenue(
  data: Partial<VenueDetails>,
  context: VenueContext
): VenueDetails | VenueDetails<string> {
  if (!context.language) {
    return data as VenueDetails;
  }

  const locale = context.language as Locale;

  return {
    ...data,
    addressLocality: data.addressLocality
      ? pickLocale(data.addressLocality, locale)
      : undefined,
    description: data.description
      ? pickLocale(data.description, locale)
      : undefined,
    name: data.name ? pickLocale(data.name, locale) : undefined,
    streetAddress: data.streetAddress
      ? pickLocale(data.streetAddress, locale)
      : undefined,
    infoUrl: data.infoUrl ? pickLocale(data.infoUrl, locale) : undefined,
    telephone: data.telephone ? pickLocale(data.telephone, locale) : undefined,
    accessibilitySentences:
      // If grouped by translations, find the correct one by language
      data.accessibilitySentences && 'fi' in data.accessibilitySentences
        ? get(data.accessibilitySentences, locale, null)
        : data?.accessibilitySentences,
    connections: data.connections?.map((connection) => ({
      ...connection,
      name: pickLocale(connection.name, locale),
      url: connection.url ? pickLocale(connection.url, locale) : undefined,
    })),
  } as VenueDetails<string>;
}