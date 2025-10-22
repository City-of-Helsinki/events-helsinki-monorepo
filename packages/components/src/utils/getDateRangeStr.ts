import { addDays, isBefore, isSameDay, isSameYear } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import capitalize from 'lodash/capitalize';

import type { AppLanguage } from '../types';
import { formatDate } from './dateUtils';
import getLanguageOrDefault from './get-language-or-default';
import getTimeFormat from './getTimeFormat';

type GetDateRangeStrProps = {
  start: string;
  end?: string | null;
  locale?: AppLanguage;
  includeWeekday?: boolean;
  includeTime?: boolean;
  timeAbbreviation?: string;
};

type BaseFormatProps = {
  startDate: Date;
  language: AppLanguage;
  timeAbbrStr: string;
  dateFormat: string;
  timeFormat: string;
  includeTime: boolean;
};

type FormatSingleDateProps = BaseFormatProps & {
  weekdayStr: string;
};

type FormatSameDayRangeProps = FormatSingleDateProps & {
  endDate: Date;
};

type FormatMultiDayRangeProps = {
  startDate: Date;
  endDate: Date;
  language: AppLanguage;
  startWeekdayStr: string;
  endWeekdayStr: string;
};

/**
 * Formats a single date (no end date).
 */
const formatSingleDate = ({
  startDate,
  language,
  weekdayStr,
  timeAbbrStr,
  dateFormat,
  timeFormat,
  includeTime,
}: FormatSingleDateProps): string => {
  const dateStr = formatDate(startDate, dateFormat, language);
  const timeStr = includeTime
    ? `, ${timeAbbrStr}${formatDate(startDate, timeFormat, language)}`
    : '';
  return `${weekdayStr}${dateStr}${timeStr}`;
};

/**
 * Formats a range that occurs on the same "day".
 */
const formatSameDayRange = ({
  startDate,
  endDate,
  language,
  weekdayStr,
  timeAbbrStr,
  dateFormat,
  timeFormat,
  includeTime,
}: FormatSameDayRangeProps): string => {
  const dateStr = formatDate(startDate, dateFormat, language);
  const startTimeStr = formatDate(startDate, timeFormat, language);
  const endTimeStr = formatDate(endDate, timeFormat, language);
  const timeStr = includeTime
    ? `, ${timeAbbrStr}${startTimeStr}–${endTimeStr}`
    : '';
  return `${weekdayStr}${dateStr}${timeStr}`;
};

/**
 * Formats a range that spans multiple days.
 */
const formatMultiDayRange = ({
  startDate,
  endDate,
  language,
  startWeekdayStr,
  endWeekdayStr,
}: FormatMultiDayRangeProps): string => {
  // Use a shorter start format if it's the same year
  const startDateFormat = isSameYear(startDate, endDate) ? 'd.M.' : 'd.M.yyyy';

  const startDateStr = formatDate(startDate, startDateFormat, language);
  const endDateStr = formatDate(endDate, 'd.M.yyyy', language);
  const delimiter = startWeekdayStr || endWeekdayStr ? ' – ' : '–';

  return `${startWeekdayStr}${startDateStr}${delimiter}${endWeekdayStr}${endDateStr}`;
};

/**
 * Format and localise date range to show on UI
 */
const getDateRangeStr = ({
  start,
  end,
  locale,
  includeWeekday = true,
  includeTime = false,
  timeAbbreviation = '',
}: GetDateRangeStrProps): string => {
  const language = getLanguageOrDefault(locale);
  const timeZone = 'Europe/Helsinki'; // As in original

  // --- Common Setup ---
  const startDate = toZonedTime(new Date(start), timeZone);
  const weekdayFormat = locale === 'en' ? 'eee' : 'eeeeee';
  const dateFormat = 'd.M.yyyy ';
  const timeFormat = getTimeFormat(language);

  const startWeekdayStr = includeWeekday
    ? `${capitalize(formatDate(startDate, weekdayFormat, language))} `
    : '';
  const timeAbbreviationStr = timeAbbreviation ? `${timeAbbreviation} ` : '';

  // --- Branch 1: Single Date (Guard Clause) ---
  if (!end) {
    return formatSingleDate({
      startDate,
      language,
      weekdayStr: startWeekdayStr,
      timeAbbrStr: timeAbbreviationStr,
      dateFormat,
      timeFormat,
      includeTime,
    });
  }

  // --- Common Setup for Ranges (end exists) ---
  const endDate = toZonedTime(new Date(end), timeZone);

  // This logic defines "same day" as ending before 5 AM the next day
  const nextDay = toZonedTime(addDays(startDate, 1), timeZone);
  nextDay.setHours(5, 0, 0, 0);
  const isEffectivelySameDay =
    isSameDay(startDate, endDate) || isBefore(endDate, nextDay);

  // --- Branch 2: Same Day Range ---
  if (isEffectivelySameDay) {
    return formatSameDayRange({
      startDate,
      endDate,
      language,
      weekdayStr: startWeekdayStr,
      timeAbbrStr: timeAbbreviationStr,
      dateFormat,
      timeFormat,
      includeTime,
    });
  }

  // --- Branch 3: Multi-Day Range ---
  const endWeekdayStr = includeWeekday
    ? `${capitalize(formatDate(endDate, weekdayFormat, language))} `
    : '';

  return formatMultiDayRange({
    startDate,
    endDate,
    language,
    startWeekdayStr,
    endWeekdayStr,
  });
};

export default getDateRangeStr;
