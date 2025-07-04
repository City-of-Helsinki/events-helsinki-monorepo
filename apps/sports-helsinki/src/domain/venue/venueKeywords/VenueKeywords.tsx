import type { Venue } from '@events-helsinki/components';
import {
  KeywordTag,
  useLocale,
  scrollToTop,
  buildQueryFromObject,
} from '@events-helsinki/components';
import capitalize from 'lodash/capitalize';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { ROUTES } from '../../../constants';
import routerHelper from '../../../domain/app/routerHelper';

interface Props {
  blackOnMobile?: boolean;
  whiteOnly?: boolean;
  venue: Venue;
  hideKeywordsOnMobile?: boolean;
  showIsFree?: boolean;
  showKeywords?: boolean;
  showKeywordsCount?: boolean;
  withActions?: boolean;
}
const VenueKeywords: React.FC<Props> = ({
  blackOnMobile = false,
  whiteOnly = false,
  venue,
  hideKeywordsOnMobile = false,
  showIsFree = true,
  showKeywords = true,
  showKeywordsCount,
  withActions = true,
}) => {
  const { t } = useTranslation('event');
  const locale = useLocale();
  const router = useRouter();

  const freeVenue = null; // TODO - Currently the price / freeness is not available anywhere
  const keywords =
    venue.ontologyWords?.reduce(
      (results: { id: number; label: string }[], ontology) => {
        if (ontology?.id && ontology?.label) {
          return [
            ...results,
            {
              id: ontology.id,
              label: capitalize(ontology.label),
            },
          ];
        }
        return results;
      },
      []
    ) ?? [];

  const handleClick =
    (type: 'text' | 'isFree', value = '') =>
    () => {
      const search = buildQueryFromObject({
        text: type === 'text' ? [value] : [],
      });

      router.push(
        `${routerHelper.getI18nPath(ROUTES.SEARCH, locale)}${search}`
      );
      scrollToTop();
    };

  const showComponent =
    (showKeywords && keywords.length) || (showIsFree && freeVenue);

  if (!showComponent) {
    return null;
  }

  const [first, second, ...restKeywords] = keywords;
  const customTagsCount = Number(showIsFree && freeVenue);

  /**
   * 2 custom tags: isFree and today || thisWeek: so customTags count is from 0-2
   * Depending on the value, we should either show either hide first and second keywords and adjust the
   * count tag value accordingly
   */

  return (
    <>
      {showIsFree && freeVenue && (
        <KeywordTag
          whiteOnly={whiteOnly}
          featured={!whiteOnly}
          isFreeEvent
          keyword={t('categories.labelFree')}
          onClick={handleClick('isFree')}
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
            keyword={first.label}
            onClick={withActions ? handleClick('text', first.label) : undefined}
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
            keyword={second.label}
            onClick={
              withActions ? handleClick('text', second.label) : undefined
            }
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
            keyword={tag.label}
            onClick={withActions ? handleClick('text', tag.label) : undefined}
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

export default VenueKeywords;
