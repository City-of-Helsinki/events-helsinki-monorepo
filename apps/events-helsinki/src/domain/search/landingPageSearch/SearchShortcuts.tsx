import { useLocale } from '@events-helsinki/components';
import classNames from 'classnames';
import React from 'react';
import CategoryFilter from '../../../common-events/components/category/CategoryFilter';
import { ROUTES } from '../../../constants';
import routerHelper from '../../../domain/app/routerHelper';
import type { CategoryOption, Filters } from '../eventSearch/types';
import { getSearchQuery } from '../eventSearch/utils';

type SearchShortcutsProps = {
  className: string;
  categories: CategoryOption[];
  searchFilters: Filters;
};

export default function SearchShortcuts({
  className,
  categories,
  searchFilters,
}: SearchShortcutsProps) {
  const locale = useLocale();

  const getCategoryLink = (category: CategoryOption) => {
    return `${routerHelper.getLocalizedCmsItemUrl(
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
