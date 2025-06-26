/* eslint-disable import/no-duplicates */
import { format as formatDateStr, isAfter, isValid, parse } from 'date-fns';
import fi from 'date-fns/locale/fi/index';
import en from 'date-fns/locale/en-GB/index';
import sv from 'date-fns/locale/sv/index';
import get from 'lodash/get';
import type { AppLanguage } from '../types';
/* eslint-enable import/no-duplicates */

const locales = { en, fi, sv };

export const formatDate = (
  date: Date | number | null,
  format = 'd.M.yyyy',
  locale: AppLanguage = 'fi'
): string => {
  if (!date) {
    return '';
  }

  return formatDateStr(date, format, {
    locale: get(locales, locale),
  }).trim();
};

export const isValidDateString = (date: string) => {
  return isValidDate(parse(date, 'd.M.yyyy', new Date()));
};

export const parseDate = (date: string) => {
  return parse(date, 'd.M.yyyy', new Date());
};

/**
 * Test is date valid
 */
const isValidDate = (date: Date): boolean =>
  isValid(date) && isAfter(date, new Date('1000-01-01'));

/**
 * Test is entered string a date string in Finnish format without dots (e.g. 31122019)
 */
const isShortDateStr = (str: string) =>
  str.length === 8 && /^[\d.]+$/.test(str);

const getShortDateStr = (str: string): string =>
  [str.substring(0, 2), str.substring(2, 4), str.substring(4, 9)].join('.');

/**
 * Get date object from valid Finnish date string
 */
const getParsedDate = (value: string): Date =>
  parse(value, 'd.M.yyyy', new Date(), { locale: fi });

/**
 * Convert string in Finnish date format (e.g. 31.12.2019) or in format without dots (e.g. 31122019) to Date object
 */
export const convertFinnishDateStrToDate = (str: string): Date | null => {
  let parsedDate = getParsedDate(str);

  if (isValidDate(parsedDate)) {
    return parsedDate;
  } else if (isShortDateStr(str)) {
    const dateStr = getShortDateStr(str);

    parsedDate = getParsedDate(dateStr);

    if (isValidDate(parsedDate)) {
      return parsedDate;
    }
  }
  return null;
};
