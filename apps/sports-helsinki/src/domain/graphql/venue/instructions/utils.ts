import get from 'lodash/get';
import { Sources } from '../../../app/appConstants';
import type {
  Locale,
  Context,
  Point,
  TranslationsObject,
  VenueDetails,
} from '../../../nextApi/types';

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
    type: 'Point',
    coordinates: [long, lat],
  };
}

function pickLocale(obj: TranslationsObject, locale: Locale) {
  return get(obj, locale, null);
}

export function translateVenue(
  data: Partial<VenueDetails>,
  { language }: Context
): VenueDetails | VenueDetails<string> {
  if (!language) {
    return data as VenueDetails;
  }

  return {
    ...data,
    addressLocality: data.addressLocality
      ? pickLocale(data.addressLocality, language)
      : undefined,
    description: data.description
      ? pickLocale(data.description, language)
      : undefined,
    name: data.name ? pickLocale(data.name, language) : undefined,
    streetAddress: data.streetAddress
      ? pickLocale(data.streetAddress, language)
      : undefined,
    infoUrl: data.infoUrl ? pickLocale(data.infoUrl, language) : undefined,
    telephone: data.telephone
      ? pickLocale(data.telephone, language)
      : undefined,
    accessibilitySentences:
      // If grouped by translations, find the correct one by language
      data.accessibilitySentences && 'fi' in data.accessibilitySentences
        ? get(data.accessibilitySentences, language, null)
        : data?.accessibilitySentences,
    connections: data.connections?.map((connection) => ({
      ...connection,
      name: pickLocale(connection.name, language),
      url: connection.url ? pickLocale(connection.url, language) : undefined,
    })),
  } as VenueDetails<string>;
}
