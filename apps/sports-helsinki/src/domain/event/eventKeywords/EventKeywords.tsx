/* eslint-disable sonarjs/cognitive-complexity */
import {
  KeywordTag,
  useLocale,
  DATE_TYPES,
  scrollToTop,
  getEventFields,
} from 'events-helsinki-components';
import type { EventFieldsFragment } from 'events-helsinki-components';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';

import { ROUTES } from '../../../constants';
import { getI18nPath } from '../../../utils/routerUtils';
import { EVENT_DEFAULT_SEARCH_FILTERS } from '../../search/eventSearch/constants';
import { getSearchQuery } from '../../search/eventSearch/utils';
import styles from './eventKeywords.module.scss';

interface Props {
  blackOnMobile?: boolean;
  event: EventFieldsFragment;
  hideKeywordsOnMobile?: boolean;
  showIsFree: boolean;
  showKeywords?: boolean;
  showKeywordsCount?: boolean;
  withActions?: boolean;
}
const EventKeywords: React.FC<Props> = ({
  blackOnMobile,
  event,
  hideKeywordsOnMobile = false,
  showIsFree,
  showKeywords = true,
  showKeywordsCount,
  withActions = true,
}) => {
  const { t } = useTranslation('event');
  const locale = useLocale();
  const router = useRouter();
  const { freeEvent, keywords, thisWeek, today } = getEventFields(
    event,
    locale
  );

  const handleClick =
    (type: 'dateType' | 'isFree' | 'text', value = '') =>
    () => {
      const search = getSearchQuery({
        ...EVENT_DEFAULT_SEARCH_FILTERS,
        dateTypes: type === 'dateType' ? [value] : [],
        isFree: type === 'isFree',
        text: type === 'text' ? [value] : [],
      });

      router.push(`${getI18nPath(ROUTES.SEARCH, locale)}${search}`);
      scrollToTop();
    };

  const showComponent =
    today ||
    thisWeek ||
    (showKeywords && keywords.length) ||
    (showIsFree && freeEvent);

  if (!showComponent) {
    return null;
  }

  const [first, second, ...restKeywords] = keywords;
  const customTagsCount = Number(thisWeek) + Number(showIsFree && freeEvent);

  /**
   * 2 custom tags: isFree and today || thisWeek: so customTags count is from 0-2
   * Depending on the value, we should either show either hide first and second keywords and adjust the
   * count tag value accordingly
   */

  return (
    <div className={styles.keywordsWrapper}>
      <div className={styles.keywordsMain}>
        {today && (
          <KeywordTag
            color="engelLight50"
            keyword={t('categories.labelToday')}
            onClick={
              withActions
                ? handleClick('dateType', DATE_TYPES.TODAY)
                : undefined
            }
          />
        )}
        {!today && thisWeek && (
          <KeywordTag
            color="engelLight50"
            keyword={t('categories.labelThisWeek')}
            onClick={
              withActions
                ? handleClick('dateType', DATE_TYPES.THIS_WEEK)
                : undefined
            }
          />
        )}
        {showIsFree && freeEvent && (
          <KeywordTag
            color="tramLight20"
            keyword={t('categories.labelFree')}
            onClick={withActions ? handleClick('isFree') : undefined}
          />
        )}
        {showKeywords &&
          first &&
          (showKeywordsCount ? customTagsCount < 2 : true) && (
            <KeywordTag
              color="engelLight50"
              blackOnMobile={blackOnMobile}
              hideOnMobile={hideKeywordsOnMobile}
              key={first.id}
              keyword={first.name}
              onClick={
                withActions ? handleClick('text', first.name) : undefined
              }
            />
          )}
        {showKeywords &&
          second &&
          (showKeywordsCount
            ? customTagsCount + Number(Boolean(first)) < 2
            : true) && (
            <KeywordTag
              color="engelLight50"
              blackOnMobile={blackOnMobile}
              hideOnMobile={hideKeywordsOnMobile}
              key={second.id}
              keyword={second.name}
              onClick={
                withActions ? handleClick('text', second.name) : undefined
              }
            />
          )}
        {!!restKeywords.length &&
          showKeywords &&
          !showKeywordsCount &&
          restKeywords.map((tag) => (
            <KeywordTag
              color="engelLight50"
              blackOnMobile={blackOnMobile}
              hideOnMobile={hideKeywordsOnMobile}
              key={tag.id}
              keyword={tag.name}
              onClick={withActions ? handleClick('text', tag.name) : undefined}
            />
          ))}
      </div>
      <div className={styles.keywordsCount}>
        {!!restKeywords.length && showKeywords && showKeywordsCount && (
          <KeywordTag
            color="transparent"
            blackOnMobile={blackOnMobile}
            hideOnMobile={hideKeywordsOnMobile}
            keyword={`+${restKeywords.length + customTagsCount}`}
          />
        )}
      </div>
    </div>
  );
};

export default EventKeywords;
