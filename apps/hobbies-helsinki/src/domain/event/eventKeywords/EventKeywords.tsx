import {
  Keyword,
  useLocale,
  DATE_TYPES,
  scrollToTop,
} from 'events-helsinki-components';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';

import { ROUTES } from '../../../constants';
import { getI18nPath } from '../../../utils/routerUtils';
import type { EventFieldsFragment } from '../../nextApi/graphql/generated/graphql';
import { EVENT_DEFAULT_SEARCH_FILTERS } from '../../search/eventSearch/constants';
import { getSearchQuery } from '../../search/eventSearch/utils';
import { getEventFields } from '../EventUtils';

interface Props {
  blackOnMobile?: boolean;
  event: EventFieldsFragment;
  hideKeywordsOnMobile?: boolean;
  showIsFree: boolean;
  showKeywords?: boolean;
}
const EventKeywords: React.FC<Props> = ({
  blackOnMobile,
  event,
  hideKeywordsOnMobile = false,
  showIsFree,
  showKeywords = true,
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

  return (
    <>
      {today && (
        <Keyword
          color="engelLight50"
          keyword={t('categories.labelToday')}
          onClick={handleClick('dateType', DATE_TYPES.TODAY)}
        />
      )}
      {!today && thisWeek && (
        <Keyword
          color="engelLight50"
          keyword={t('categories.labelThisWeek')}
          onClick={handleClick('dateType', DATE_TYPES.THIS_WEEK)}
        />
      )}
      {showIsFree && freeEvent && (
        <Keyword
          color="tramLight20"
          keyword={t('categories.labelFree')}
          onClick={handleClick('isFree')}
        />
      )}
      {!!keywords.length &&
        showKeywords &&
        keywords.map((keyword) => {
          return (
            <Keyword
              color="engelLight50"
              blackOnMobile={blackOnMobile}
              hideOnMobile={hideKeywordsOnMobile}
              key={keyword.id}
              keyword={keyword.name}
              onClick={handleClick('text', keyword.name)}
            />
          );
        })}
    </>
  );
};

export default EventKeywords;
