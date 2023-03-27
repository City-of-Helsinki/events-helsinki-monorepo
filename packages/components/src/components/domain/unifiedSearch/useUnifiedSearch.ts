/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { ParsedUrlQueryInput } from 'querystring';

import fastDeepEqual from 'fast-deep-equal/react';
import type { NextRouter } from 'next/router';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import { useCallback, useMemo, useRef } from 'react';
import type { TransitionOptions } from '../../../types/types';
import { isSportsCategory } from '../../../types/types';
import getIsDateValid from '../../../utils/getIsValidDate';
import type { UnifiedSearchParameters } from './types';
import { SPORTS_CATEGORY_TO_ONTOLOGY_TREE_IDS } from './unifiedSearchConstants';

type FilterValueType = string | number | boolean | Date;

function stringifyQueryValue(value?: string | string[]): string | undefined {
  if (!value) {
    return;
  }

  return Array.isArray(value) ? value.join(',') : value;
}

function makeArray(value?: string | string[]): string[] | undefined {
  if (!value) {
    return;
  }

  if (Array.isArray(value)) {
    return value;
  }

  return [value];
}

function parseNumber(value?: string | string[]): number | undefined {
  if (!value || Array.isArray(value)) {
    return;
  }

  return Number(value);
}

function parseBoolean(value?: string | string[]): boolean | undefined {
  if (!value || Array.isArray(value)) {
    return;
  }

  return value === 'true';
}

function parseDate(value?: string | string[]): Date | undefined {
  if (!value || Array.isArray(value)) {
    return;
  }

  const date = new Date(value);

  if (date && getIsDateValid(date)) {
    return date;
  }
}

function dropUndefinedOrNull(obj: Record<string, unknown>) {
  const objectWithoutUndefined: Record<string, unknown> = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    objectWithoutUndefined[key] = value;
  });

  return objectWithoutUndefined;
}

function parseIntoValue(
  value: string | string[],
  type: FilterConfig['type']
): FilterValueType {
  switch (type) {
    case 'string':
      return stringifyQueryValue(value) as FilterValueType;
    case 'number':
      return parseNumber(value) as FilterValueType;
    case 'boolean':
      return parseBoolean(value) as FilterValueType;
    case 'date':
      return parseDate(value) as FilterValueType;
    default:
      throw Error(`Type "${type}" is not supported`);
  }
}

function filterConfigToEntry(
  { type, key, storeBehaviour, mappedFromKey, valueMapper }: FilterConfig,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  values: any
): [string, FilterValueType | FilterValueType[]] | undefined {
  const value = values[mappedFromKey ?? key];

  if (storeBehaviour === 'list' || storeBehaviour === 'accumulating') {
    const valueAsArray = makeArray(value);
    const parsedValues: FilterValueType[] =
      (valueMapper ? valueAsArray?.flatMap(valueMapper) : valueAsArray)?.map(
        (value) => parseIntoValue(value, type)
      ) ?? ([] as FilterValueType[]);
    return [key, parsedValues];
  }

  if (['string', 'number', 'boolean', 'date'].includes(type)) {
    const parsedValue = parseIntoValue(value, type);

    return [key, parsedValue];
  }
}

type FilterConfig = {
  type: 'string' | 'number' | 'boolean' | 'date';
  storeBehaviour?: 'list' | 'accumulating';
  key: string;
  mappedFromKey?: string;
  valueMapper?: (value: string) => string | string[];
};

export class UnifiedSearch {
  constructor(router: NextRouter, isHaukiEnabled = false) {
    this.router = router;
    this.filterConfig = [
      { type: 'string', storeBehaviour: 'accumulating', key: 'q' },
      {
        type: 'string',
        storeBehaviour: 'list',
        key: 'administrativeDivisionIds',
      },
      { type: 'string', storeBehaviour: 'list', key: 'ontologyTreeIds' },
      // sportsCategories and ontologyTreeIds are mutually exclusive query parameters
      // so only one should be used at a time
      {
        type: 'string',
        storeBehaviour: 'list',
        key: 'ontologyTreeIds',
        mappedFromKey: 'sportsCategories',
        valueMapper: (value: string): string[] =>
          // Map from comma joined string of sports categories
          // to comma joined string of ontology tree IDs, e.g.
          //   "swimming,gym" ->
          //   ["swimming", "gym"] ->
          //   [[20,684], [415,611,2219]] ->
          //   [["20","684"], ["415","611","2219"]] ->
          //   ["20","684","415","611","2219"]
          value
            .split(',')
            .flatMap((value: string) =>
              (isSportsCategory(value)
                ? SPORTS_CATEGORY_TO_ONTOLOGY_TREE_IDS[value]
                : []
              ).map((id) => id.toString())
            ),
      },
      { type: 'string', storeBehaviour: 'list', key: 'ontologyWordIds' },
      { type: 'string', key: 'orderBy' },
      { type: 'string', key: 'orderDir' },
    ];

    if (isHaukiEnabled) {
      this.filterConfig.push(
        { type: 'boolean', key: 'isOpenNow' },
        { type: 'date', key: 'openAt' }
      );
    }
  }

  get filters(): UnifiedSearchParameters {
    const { after, first } = this.query;
    const filters = this.filterConfig.reduce((acc, filter) => {
      // @ts-ignore
      const [key, value] = filterConfigToEntry(filter, this.query);
      return {
        ...acc,
        [key]: value,
      };
    }, {});

    return dropUndefinedOrNull({
      ...filters,
      // @ts-ignore
      after: stringifyQueryValue(after),
      // @ts-ignore
      first: parseNumber(first),
    });
  }

  get query() {
    return queryString.parse(this.router.asPath?.split(/\?/)[1] ?? '');
  }

  setFilters(
    search: UnifiedSearchParameters,
    pathname?: string,
    options?: TransitionOptions
  ) {
    this.router.replace(
      {
        pathname,
        query: this.getQueryObjectFromSearchParameters(search),
      },
      undefined,
      options
    );
  }

  getQueryObjectFromSearchParameters(
    search: UnifiedSearchParameters
  ): ParsedUrlQueryInput {
    const { openAt, orderBy, orderDir, ...delegated } = search;

    return {
      ...delegated,
      ...dropUndefinedOrNull({
        openAt: openAt instanceof Date ? openAt.toJSON() : openAt,
        orderBy: orderBy ?? this.query.orderBy,
        orderDir: orderDir ?? this.query.orderDir,
        sort: this.query.sort,
      }),
    };
  }

  router: NextRouter;
  filterConfig: FilterConfig[];
}

export default function useUnifiedSearch() {
  const router = useRouter();
  const unifiedSearch = useMemo(() => new UnifiedSearch(router), [router]);
  const filters = useRef(unifiedSearch.filters);

  if (!fastDeepEqual(filters.current, unifiedSearch.filters)) {
    filters.current = unifiedSearch.filters;
  }

  const setFilters = useCallback(
    (...params: Parameters<typeof unifiedSearch.setFilters>) => {
      unifiedSearch.setFilters(...params);
    },
    [unifiedSearch]
  );

  return { filters: filters.current, setFilters };
}
