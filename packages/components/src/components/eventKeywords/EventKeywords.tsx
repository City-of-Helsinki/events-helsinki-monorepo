import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';
import KeywordTag from '../../components/keyword/KeywordTag';
import { DATE_TYPES } from '../../constants';
import { useLocale } from '../../hooks';
import { useAppRoutingContext } from '../../routingUrlProvider';
import type {
  EventFieldsFragment,
  KeywordOnClickHandlerType,
} from '../../types';
import { getEventFields } from '../../utils';

type EventKeywordsProps = {
  blackOnMobile?: boolean;
  whiteOnly?: boolean;
  event: EventFieldsFragment;
  hideKeywordsOnMobile?: boolean;
  showIsFree: boolean;
  showKeywords?: boolean;
  showKeywordsCount?: boolean;
  withActions?: boolean;
};
const EventKeywords: React.FC<EventKeywordsProps> = ({
  blackOnMobile = false,
  whiteOnly = false,
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
  const { getKeywordOnClickHandler } = useAppRoutingContext();
  const handleClick = (
    type: Parameters<KeywordOnClickHandlerType>[2],
    value = ''
  ) => getKeywordOnClickHandler(router, locale, type, value);

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
    <>
      {showIsFree && freeEvent && (
        <KeywordTag
          whiteOnly={whiteOnly}
          featured={!whiteOnly}
          isFreeEvent
          keyword={t('categories.labelFree')}
          onClick={withActions ? handleClick('isFree') : undefined}
        />
      )}
      {today && (
        <KeywordTag
          whiteOnly={whiteOnly}
          isToday
          keyword={t('categories.labelToday')}
          onClick={
            withActions ? handleClick('dateType', DATE_TYPES.TODAY) : undefined
          }
        />
      )}
      {!today && thisWeek && (
        <KeywordTag
          whiteOnly={whiteOnly}
          keyword={t('categories.labelThisWeek')}
          onClick={
            withActions
              ? handleClick('dateType', DATE_TYPES.THIS_WEEK)
              : undefined
          }
        />
      )}
      {showKeywords &&
        first &&
        (showKeywordsCount ? customTagsCount < 2 : true) && (
          <KeywordTag
            whiteOnly={whiteOnly}
            blackOnMobile={blackOnMobile}
            hideOnMobile={hideKeywordsOnMobile}
            key={first.id}
            keyword={first.name}
            onClick={withActions ? handleClick('text', first.name) : undefined}
          />
        )}
      {showKeywords &&
        second &&
        (showKeywordsCount
          ? customTagsCount + Number(Boolean(first)) < 2
          : true) && (
          <KeywordTag
            whiteOnly={whiteOnly}
            blackOnMobile={blackOnMobile}
            hideOnMobile={hideKeywordsOnMobile}
            key={second.id}
            keyword={second.name}
            onClick={withActions ? handleClick('text', second.name) : undefined}
          />
        )}
      {!!restKeywords.length &&
        showKeywords &&
        !showKeywordsCount &&
        restKeywords.map((tag) => (
          <KeywordTag
            whiteOnly={whiteOnly}
            blackOnMobile={blackOnMobile}
            hideOnMobile={hideKeywordsOnMobile}
            key={tag.id}
            keyword={tag.name}
            onClick={withActions ? handleClick('text', tag.name) : undefined}
          />
        ))}
      {!!restKeywords.length && showKeywords && showKeywordsCount && (
        <KeywordTag
          whiteOnly={whiteOnly}
          transparent
          blackOnMobile={blackOnMobile}
          hideOnMobile={hideKeywordsOnMobile}
          keyword={`+${restKeywords.length + customTagsCount}`}
        />
      )}
    </>
  );
};

export default EventKeywords;
