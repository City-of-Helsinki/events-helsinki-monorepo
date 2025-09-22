import { addDays, isBefore, isSameDay, isSameYear } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import capitalize from 'lodash/capitalize';

import { formatDate } from './dateUtils';
import getLanguageOrDefault from './get-language-or-default';
import getTimeFormat from './getTimeFormat';

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
}: {
  start: string;
  end?: string | null;
  locale: unknown;
  includeWeekday?: boolean;
  includeTime?: boolean;
  timeAbbreviation?: string;
}): string => {
  const language = getLanguageOrDefault(locale);
  const timeZone = 'Europe/Helsinki';
  const startDate = toZonedTime(new Date(start), timeZone);
  const nextDay = toZonedTime(addDays(startDate, 1), timeZone);
  nextDay.setHours(5, 0, 0, 0);
  const weekdayFormat = locale === 'en' ? 'eee' : 'eeeeee';
  const dateFormat = 'd.M.yyyy ';
  const timeFormat = getTimeFormat(language);
  const startWeekdayStr = includeWeekday
    ? `${capitalize(formatDate(startDate, weekdayFormat, language))} `
    : '';
  const timeAbbreviationStr = timeAbbreviation ? `${timeAbbreviation} ` : '';

  if (!end) {
    const dateStr = formatDate(startDate, dateFormat, language);
    const timeStr = includeTime
      ? `, ${timeAbbreviationStr}${formatDate(startDate, timeFormat, language)}`
      : '';

    return [startWeekdayStr, dateStr, timeStr].join('');
  } else {
    const endDate = toZonedTime(new Date(end), timeZone);
    const endWeekdayStr = includeWeekday
      ? `${capitalize(formatDate(endDate, weekdayFormat, language))} `
      : '';

    const formatDateRangeWithStartDateFormat = (startDateFormat: string) => {
      const startDateStr = formatDate(startDate, startDateFormat);
      const endDateStr = formatDate(endDate, 'd.M.yyyy');
      const delimiter = startWeekdayStr || endWeekdayStr ? ' – ' : '–';
      return `${startWeekdayStr}${startDateStr}${delimiter}${endWeekdayStr}${endDateStr}`;
    };

    if (isSameDay(startDate, endDate) || isBefore(endDate, nextDay)) {
      const dateStr = formatDate(startDate, dateFormat, language);
      const startTimeStr = formatDate(startDate, timeFormat, language);
      const endTimeStr = formatDate(endDate, timeFormat, language);
      const timeStr = includeTime
        ? `, ${timeAbbreviationStr}${startTimeStr}–${endTimeStr}`
        : '';

      return [startWeekdayStr, dateStr, timeStr].join('');
    } else if (isSameYear(startDate, endDate)) {
      return formatDateRangeWithStartDateFormat('d.M.');
    } else {
      return formatDateRangeWithStartDateFormat('d.M.yyyy');
    }
  }
};

export default getDateRangeStr;
