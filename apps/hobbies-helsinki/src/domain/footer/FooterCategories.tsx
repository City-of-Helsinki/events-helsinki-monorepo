import { useLocale } from 'events-helsinki-components';
import useFooterTranslation from 'events-helsinki-components/hooks/useFooterTranslation';
import type { FunctionComponent } from 'react';
import React from 'react';
import CategoryFilter from '../../common-events/components/category/CategoryFilter';

import { ROUTES } from '../../constants';
import { getLocalizedCmsItemUrl } from '../../utils/routerUtils';
import {
  CATEGORY_CATALOG,
  COURSE_DEFAULT_SEARCH_FILTERS,
} from '../search/eventSearch/constants';
import type { CategoryOption, Filters } from '../search/eventSearch/types';
import {
  getEventCategoryOptions,
  getSearchQuery,
} from '../search/eventSearch/utils';
import styles from './footerCategories.module.scss';

const FooterCategories: FunctionComponent = () => {
  const { t } = useFooterTranslation();
  const locale = useLocale();

  const getCategoryLink = (category: CategoryOption) => {
    return `${getLocalizedCmsItemUrl(
      ROUTES.SEARCH,
      {},
      locale
    )}${getSearchQuery({
      ...defaultSearchFiltersMap[ROUTES.SEARCH],
      categories: [category.value],
    })}`;
  };

  const defaultSearchFiltersMap: Record<string, Filters> = {
    [ROUTES.SEARCH]: COURSE_DEFAULT_SEARCH_FILTERS,
  };

  const categories = getEventCategoryOptions(
    t,
    CATEGORY_CATALOG.Course.default
  );
  const footerTitle = t(`footer:titleEventsCategories`);

  return (
    <div className={styles.topFooterWrapper}>
      <hr className={styles.divider} aria-hidden />
      <h2 className={styles.categoriesTitle}>{footerTitle}</h2>
      <div className={styles.categoriesInnerWrapper}>
        {categories.map((category) => {
          return (
            <CategoryFilter
              href={getCategoryLink(category)}
              key={category.value}
              hasHorizontalPadding={true}
              icon={category.icon}
              text={category.text}
              value={category.value}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FooterCategories;
