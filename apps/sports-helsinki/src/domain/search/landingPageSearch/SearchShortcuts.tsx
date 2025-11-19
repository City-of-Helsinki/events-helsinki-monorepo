import { CategoryFilter, useLocale } from '@events-helsinki/components';
import classNames from 'classnames';
import React from 'react';
import { ROUTES } from '../../../constants';
import routerHelper from '../../../domain/app/routerHelper';
import type { CategoryOption } from '../eventSearch/types';
import { getSearchQuery } from '../eventSearch/utils';

type SearchShortcutsProps = Readonly<{
  className: string;
  categories: CategoryOption[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchFilters: any;
}>;

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
      sportsCategories: [category.value],
    })}`;
  };

  return (
    <div
      id="searchShortcuts"
      className={classNames(className, 'searchShortcuts')}
    >
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
