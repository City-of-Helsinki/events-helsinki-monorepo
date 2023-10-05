import {
  addDays,
  isBefore,
  isSameDay,
  isSameMonth,
  isSameYear,
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
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
  // eslint-disable-next-line sonarjs/cognitive-complexity
}): string => {
  const language = getLanguageOrDefault(locale);
  const timeZone = 'Europe/Helsinki';
  const startDate = utcToZonedTime(new Date(start), timeZone);
  const nextDay = utcToZonedTime(addDays(startDate, 1), timeZone);
  nextDay.setHours(5, 0, 0, 0);
  const weekdayFormat = locale === 'en' ? 'eee' : 'eeeeee';
  const dateFormat = 'd.M.yyyy ';
  const timeFormat = getTimeFormat(language);
  const weekdayStr = includeWeekday
    ? `${capitalize(formatDate(startDate, weekdayFormat, language))} `
    : '';
  const timeAbbreviationStr = timeAbbreviation ? `${timeAbbreviation} ` : '';

  if (!end) {
    const dateStr = formatDate(startDate, dateFormat, language);
    const timeStr = includeTime
      ? `, ${timeAbbreviationStr}${formatDate(startDate, timeFormat, language)}`
      : '';

    return [weekdayStr, dateStr, timeStr].join('');
  } else {
    const endDate = utcToZonedTime(new Date(end), timeZone);

    if (isSameDay(startDate, endDate) || isBefore(endDate, nextDay)) {
      const weekdayStr = includeWeekday
        ? `${capitalize(formatDate(startDate, weekdayFormat, language))} `
        : '';
      const dateStr = formatDate(startDate, dateFormat, language);
      const startTimeStr = formatDate(startDate, timeFormat, language);
      const endTimeStr = formatDate(endDate, timeFormat, language);
      const timeStr = includeTime
        ? `, ${timeAbbreviationStr}${startTimeStr}–${endTimeStr}`
        : '';

      return [weekdayStr, dateStr, timeStr].join('');
    } else if (isSameMonth(startDate, endDate)) {
      const startDateStr = formatDate(startDate, 'd') + '.';
      const endDateStr = formatDate(endDate, 'd.M.yyyy');

      return `${startDateStr}–${endDateStr}`;
    } else if (isSameYear(startDate, endDate)) {
      const startDateStr = formatDate(startDate, 'd.M') + '.';
      const endDateStr = formatDate(endDate, 'd.M.yyyy');

      return `${startDateStr}–${endDateStr}`;
    } else {
      const startDateStr = formatDate(startDate, 'd.M.yyyy');
      const endDateStr = formatDate(endDate, 'd.M.yyyy');

      return `${startDateStr}–${endDateStr}`;
    }
  }
};

export default getDateRangeStr;
