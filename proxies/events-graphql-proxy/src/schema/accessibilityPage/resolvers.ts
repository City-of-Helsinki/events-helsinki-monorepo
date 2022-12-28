import type { QueryResolvers } from '../../types';
import type { StaticPage } from '../../types/types';
import normalizeKeys from '../../utils/normalizeKeys';
import normalizeLocalizedObject from '../../utils/normalizeLocalizedObject';

const normalizeAccessibilityPage = (accessibilityPage: StaticPage) => {
  let normalizedAccessibilityPage = normalizeKeys(accessibilityPage) as Record<
    string,
    unknown
  >;
  const normalizedKeys = ['headingSection', 'contentSection', 'keywords'];

  normalizedKeys.forEach((item) => {
    normalizedAccessibilityPage = normalizeLocalizedObject(
      normalizedAccessibilityPage,
      item
    );
  });

  return normalizedAccessibilityPage as StaticPage;
};

const Query: QueryResolvers = {
  accessibilityPages: async (_, __, { dataSources }) => {
    const data = await dataSources.accessibilityPageAPI.getAccessibilityPages();

    return {
      data: data.map((page) => normalizeAccessibilityPage(page)),
    };
  },
};

export default { Query };
