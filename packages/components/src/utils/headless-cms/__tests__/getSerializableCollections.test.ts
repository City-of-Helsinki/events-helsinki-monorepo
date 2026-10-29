import { getCollections } from '@city-of-helsinki/react-helsinki-headless-cms';
import { isSerializableProps } from 'next/dist/lib/is-serializable-props';
import { vi } from 'vitest';
import getSerializableCollections from '../getSerializableCollections';

vi.mock('@city-of-helsinki/react-helsinki-headless-cms', () => ({
  getCollections: vi.fn(),
}));

it('omits undefined collection fields and preserves content and null values', () => {
  const collections: ReturnType<typeof getCollections> = [
    {
      id: '0',
      title: 'Collection',
      description: undefined,
      showAllUrl: undefined,
      items: [
        {
          __typename: 'Page',
          id: 'page',
          title: 'Page',
          featuredImage: null,
          content: undefined,
        },
      ],
    },
  ];
  vi.mocked(getCollections).mockReturnValue(collections);

  const result = getSerializableCollections([]);

  expect(result).toStrictEqual([
    {
      id: '0',
      title: 'Collection',
      items: [
        {
          __typename: 'Page',
          id: 'page',
          title: 'Page',
          featuredImage: null,
        },
      ],
    },
  ]);
  expect(Object.hasOwn(result[0], 'description')).toBe(false);
  expect(
    isSerializableProps('/articles/[...slug]', 'getStaticProps', {
      collections: result,
    })
  ).toBe(true);
  expect(collections?.[0]).toHaveProperty('description', undefined);
});

it('returns an empty collection list when no collections are returned', () => {
  vi.mocked(getCollections).mockReturnValue([]);
  expect(getSerializableCollections([])).toStrictEqual([]);
});
