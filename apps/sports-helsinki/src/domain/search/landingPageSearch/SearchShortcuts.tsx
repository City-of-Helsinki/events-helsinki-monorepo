import classNames from 'classnames';
import { useLocale } from 'events-helsinki-components';
import React from 'react';

import CategoryFilter from '../../../common-events/components/category/CategoryFilter';
import { ROUTES } from '../../../constants';
import { getLocalizedCmsItemUrl } from '../../../utils/routerUtils';
import type { CategoryOption } from '../eventSearch/types';
import { getSearchQuery } from '../eventSearch/utils';

type SearchShortcutsProps = {
  className: string;
  categories: CategoryOption[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchFilters: any;
};

export default function SearchShortcuts({
  className,
  categories,
  searchFilters,
}: SearchShortcutsProps) {
  const locale = useLocale();

  const getCategoryLink = (category: CategoryOption) => {
    return `${getLocalizedCmsItemUrl(
      ROUTES.SEARCH,
      {},
      locale
    )}${getSearchQuery({
      ...searchFilters,
      categories: [category.value],
    })}`;
  };

  return (
    <div className={classNames(className, 'searchShortcuts')}>
      {categories.map((category) => {
        return (
          <CategoryFilter
            hasHorizontalPadding
            href={getCategoryLink(category)}
            key={category.value}
            icon={category.icon}
            text={category.text}
            value={category.value}
          />
        );
      })}
    </div>
  );
}
