import type { QueryResolvers } from '../../types';
import type { StaticPage } from '../../types/types';
import normalizeKeys from '../../utils/normalizeKeys';
import normalizeLocalizedObject from '../../utils/normalizeLocalizedObject';

const Query: QueryResolvers = {
  aboutPages: async (_, __, { dataSources }) => {
    const data = await dataSources.aboutPageAPI.getAboutPages();

    return {
      data: data.map((page) => normalizeAboutPage(page)),
    };
  },
};

const normalizeAboutPage = (aboutPage: StaticPage) => {
  let normalizedAboutPage = normalizeKeys(aboutPage) as Record<string, unknown>;
  const normalizedKeys = ['headingSection', 'contentSection', 'keywords'];

  normalizedKeys.forEach((item) => {
    normalizedAboutPage = normalizeLocalizedObject(normalizedAboutPage, item);
  });

  return normalizedAboutPage as StaticPage;
};

export default { Query };
