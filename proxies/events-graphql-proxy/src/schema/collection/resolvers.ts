import type { QueryResolvers } from '../../types';
import type {
  CollectionDetails,
  CollectionListResponse,
} from '../../types/types';
import composeQuery from '../../utils/composeQuery';
import normalizeKeys from '../../utils/normalizeKeys';
import normalizeLocalizedObject from '../../utils/normalizeLocalizedObject';

const normalizeCollection = (collection: CollectionDetails) => {
  let normalizedCollection = normalizeKeys(collection) as Record<
    string,
    unknown
  >;
  const normalizedKeys = [
    'title',
    'description',
    'keywords',
    'linkText',
    'linkUrl',
    'socialMediaDescription',
    'curatedEventsTitle',
    'eventListQuery',
    'eventListTitle',
  ];

  normalizedKeys.forEach((item) => {
    normalizedCollection = normalizeLocalizedObject(normalizedCollection, item);
  });

  return normalizedCollection;
};

const collectionQueryBuilder = (draft?: boolean | null) => {
  let query = '';

  if (draft != null) {
    query = composeQuery(query, 'draft', draft ? 'true' : 'false');
  }

  return query;
};

const collectionListQueryBuilder = (visibleOnFrontpage?: boolean | null) => {
  let query = '';

  if (visibleOnFrontpage != null) {
    query = composeQuery(
      query,
      'visible_on_frontpage',
      visibleOnFrontpage ? 'true' : 'false'
    );
  }

  return query;
};

const Query: QueryResolvers = {
  collectionDetails: async (_, { draft, slug }, { dataSources }) => {
    const data = await dataSources.collectionAPI.getCollectionDetails(
      slug,
      collectionQueryBuilder(draft)
    );

    return normalizeCollection(data) as CollectionDetails;
  },
  collectionList: async (_, { visibleOnFrontpage }, { dataSources }) => {
    const data = await dataSources.collectionAPI.getCollectionList(
      collectionListQueryBuilder(visibleOnFrontpage)
    );

    return {
      data: data.map((collection: CollectionDetails) =>
        normalizeCollection(collection)
      ),
    } as CollectionListResponse;
  },
};

export default { Query };
