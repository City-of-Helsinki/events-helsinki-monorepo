import type {
  SearchListQueryVariables,
  UnifiedSearchLanguage,
  UnifiedSearchOrderByType,
  OrderDirType,
  Coordinates,
} from 'events-helsinki-components';
import {
  useLocale,
  useUnifiedSearch,
  UnifiedSearchOrderBy,
  OrderDir,
  orderDirToUnifiedSearchDistanceOrder,
  useGeolocation,
} from 'events-helsinki-components';
import {
  HELSINKI_OCD_DIVISION_ID,
  SPORTS_DEPARTMENT_ONTOLOGY_TREE_ID,
} from '../app/appConstants';

function getOpenAt(openAt: Date, isOpenNow: boolean): string | null {
  if (openAt) {
    return openAt.toJSON();
  }

  if (isOpenNow) {
    return 'now';
  }

  return null;
}

type OrderByOptions = {
  position: Coordinates | null;
};

function getOrderBy(
  orderBy: UnifiedSearchOrderByType,
  orderDir: OrderDirType,
  options?: OrderByOptions
) {
  const usOrderDir = orderDirToUnifiedSearchDistanceOrder[orderDir];

  if (orderBy === UnifiedSearchOrderBy.distance && options?.position) {
    return {
      orderByDistance: {
        latitude: options?.position.latitude,
        longitude: options?.position.longitude,
        order: usOrderDir,
      },
    };
  }

  if (orderBy === UnifiedSearchOrderBy.name) {
    return {
      orderByName: {
        order: usOrderDir,
      },
    };
  }

  // With no ordering, Unified Search will return the default sort order of
  // ElasticSearch, which is by relevance.
  return {};
}

const appToUnifiedSearchLanguageMap = {
  fi: 'FINNISH',
  sv: 'SWEDISH',
  en: 'ENGLISH',
};

const defaultPagination = {
  after: '',
  first: 10,
};

export type OverridableVariables = {
  first: number;
};

export default function useUnifiedSearchVariables(
  variables?: OverridableVariables
): SearchListQueryVariables {
  const {
    filters: {
      q,
      ontologyTreeIds,
      administrativeDivisionIds,
      isOpenNow,
      openAt,
      orderBy = UnifiedSearchOrderBy.name,
      orderDir = OrderDir.asc,
      ontologyWordIds,
      after,
      first,
    },
  } = useUnifiedSearch();
  const geolocation = useGeolocation({
    skip: orderBy !== UnifiedSearchOrderBy.distance,
  });
  const locale = useLocale();

  return {
    language: appToUnifiedSearchLanguageMap[locale] as UnifiedSearchLanguage,
    // Default query; everything
    q: (!q || !q.length ? ['*'] : q).join(' '),
    // By default filter by the sports dept. ontology tree id
    ontologyTreeIds: (ontologyTreeIds?.length === 0
      ? [SPORTS_DEPARTMENT_ONTOLOGY_TREE_ID]
      : ontologyTreeIds
    )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ?.map((treeId: any) => treeId.toString()),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ontologyWordIds: ontologyWordIds?.map((wordId: any) => wordId.toString()),
    // Limit results inside Helsinki when there is no administrative division(s) selected
    administrativeDivisionIds:
      administrativeDivisionIds?.length === 0
        ? [HELSINKI_OCD_DIVISION_ID]
        : administrativeDivisionIds,
    openAt: openAt && isOpenNow ? getOpenAt(openAt, isOpenNow) : null,
    ...getOrderBy(orderBy, orderDir, { position: geolocation.coordinates }),
    after: after ?? defaultPagination.after,
    first: variables?.first ?? first ?? defaultPagination.first,
  };
}
