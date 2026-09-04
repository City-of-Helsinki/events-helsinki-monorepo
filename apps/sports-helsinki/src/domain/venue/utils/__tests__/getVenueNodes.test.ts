import type { SearchListQuery } from '@events-helsinki/components/types';
import getVenueNodes from '../getVenueNodes';

it('extracts venue nodes from search query', () => {
  const mockQuery: SearchListQuery = {
    unifiedSearch: {
      edges: [
        {
          node: {
            venue: { id: 'venue-1', name: 'Venue 1' },
          },
        },
        {
          node: {
            venue: { id: 'venue-2', name: 'Venue 2' },
          },
        },
      ],
    },
  } as unknown as SearchListQuery;

  expect(getVenueNodes(mockQuery)).toStrictEqual([
    { id: 'venue-1', name: 'Venue 1' },
    { id: 'venue-2', name: 'Venue 2' },
  ]);
});

it('returns undefined when unifiedSearch is not present', () => {
  const mockQuery: SearchListQuery = {
    unifiedSearch: undefined,
  } as unknown as SearchListQuery;

  expect(getVenueNodes(mockQuery)).toBeUndefined();
});

it('returns empty array when edges is empty', () => {
  const mockQuery: SearchListQuery = {
    unifiedSearch: {
      edges: [],
    },
  } as unknown as SearchListQuery;

  expect(getVenueNodes(mockQuery)).toStrictEqual([]);
});
