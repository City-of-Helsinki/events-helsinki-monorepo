import { EventTypeId, SortOrder } from '@events-helsinki/components/types';
import type { Router } from 'next/router';
import mockRouter from 'next-router-mock';
import qs from 'query-string';
import type {
  CombinedSearchAdapterInput,
  CombinedSearchAdapterOutput,
} from '../../types';
import CombinedSearchFormAdapter from '../CombinedSearchFormAdapter';

const outputQuery: CombinedSearchAdapterInput = {
  text: 'test text',
  venueOrderBy: 'venue-field-asc',
  eventOrderBy: 'event-field-asc',
  courseOrderBy: 'course-field-asc',
  sportsCategories: [],
  organization: null,
  keywords: [],
};
const extraParamsInOutputQuery = {
  searchType: 'Venue',
  unrelatedParam: 'whatever',
};
const inputSearchParams = qs.stringify({
  ...outputQuery,
  ...extraParamsInOutputQuery,
});
const input = new URLSearchParams(inputSearchParams);

beforeEach(() => {
  mockRouter.setCurrentUrl(`/?${input.toString()}`);
});

describe('CombinedSearchFormAdapter', () => {
  describe('getURLQuery', () => {
    it('collects the form values from the URL but does not exclude the extra params', () => {
      const adapter = new CombinedSearchFormAdapter(
        mockRouter as unknown as Router,
        input
      );
      // eslint-disable-next-line jest/prefer-strict-equal
      expect(adapter.getURLQuery()).toEqual({
        ...outputQuery,
        ...extraParamsInOutputQuery,
      });
    });
  });

  describe('getFormValues', () => {
    it('returns only the form values without any possible extra params given in a URL', () => {
      const adapter = new CombinedSearchFormAdapter(
        mockRouter as unknown as Router,
        input
      );
      // eslint-disable-next-line jest/prefer-strict-equal
      expect(adapter.getFormValues()).toEqual(outputQuery);
    });
  });

  describe('routerPush', () => {
    it.each([
      // Test the happy path where nothing changes
      [input, inputSearchParams],
      [
        new URLSearchParams(
          qs.stringify({
            text: 'to be transformed to text',
            venueOrderBy: 'to-be-order-by',
          })
        ),
        qs.stringify({
          organization: null,
          text: 'to be transformed to text',
          venueOrderBy: 'to-be-order-by',
        }),
      ],
      // Test the backward compatibility
      [
        new URLSearchParams(
          qs.stringify({
            q: 'to be transformed to text',
            sort: 'to-be-order-by',
          })
        ),
        qs.stringify({
          organization: null,
          q: 'to be transformed to text',
          sort: 'to-be-order-by',
          text: 'to be transformed to text',
          venueOrderBy: 'to-be-order-by',
          eventOrderBy: 'to-be-order-by',
          courseOrderBy: 'to-be-order-by',
        }),
      ],
    ])(
      'pushes the user to a desired url',
      (searchParams, outputSearchParams) => {
        mockRouter.setCurrentUrl(`/?${searchParams.toString()}`);
        const adapter = new CombinedSearchFormAdapter(
          mockRouter as unknown as Router,
          searchParams
        );
        adapter.routerPush();
        expect(qs.stringify(mockRouter.query)).toBe(outputSearchParams);
      }
    );
  });

  describe('routerReplace', () => {
    it.each([
      // Test the happy path where nothing changes
      [input, inputSearchParams],
      [
        new URLSearchParams(
          qs.stringify({
            text: 'to be transformed to text',
            venueOrderBy: 'to-be-order-by',
          })
        ),
        qs.stringify({
          organization: null,
          text: 'to be transformed to text',
          venueOrderBy: 'to-be-order-by',
        }),
      ],
      // Test the backward compatibility
      [
        new URLSearchParams(
          qs.stringify({
            q: 'to be transformed to text',
            sort: 'to-be-order-by',
          })
        ),
        qs.stringify({
          organization: null,
          q: 'to be transformed to text',
          sort: 'to-be-order-by',
          text: 'to be transformed to text',
          venueOrderBy: 'to-be-order-by',
          eventOrderBy: 'to-be-order-by',
          courseOrderBy: 'to-be-order-by',
        }),
      ],
    ])(
      'replaces the URL to a desired url',
      (searchParams, outputSearchParams) => {
        mockRouter.setCurrentUrl(`/?${searchParams.toString()}`);
        const adapter = new CombinedSearchFormAdapter(
          mockRouter as unknown as Router,
          searchParams
        );
        adapter.routerReplace();
        expect(qs.stringify(mockRouter.query)).toBe(outputSearchParams);
      }
    );
  });

  describe('getSearchVariables', () => {
    it.each<
      [
        keyof ReturnType<CombinedSearchFormAdapter['getSearchVariables']>,
        CombinedSearchAdapterOutput
      ]
    >([
      [
        'VenueSearchAdapter',
        {
          q: outputQuery.text,
          ontologyWordIds: outputQuery.keywords,
          orderByName: { order: SortOrder.Descending },
          administrativeDivisionIds: ['ocd-division/country:fi/kunta:helsinki'],
          after: '',
          first: 10,
          ontologyTreeIds: ['551'],
          openAt: '',
        },
      ],
      [
        'EventSearchAdapter',
        {
          text: outputQuery.text,
          keywordAnd: outputQuery.keywords,
          sort: outputQuery.eventOrderBy ?? null,
          eventType: EventTypeId.General,
          allOngoingAnd: null,
          start: 'now',
          end: '',
          keywordNot: [],
          keywordOrSet1: [
            'yso:p916',
            'kulke:710',
            'yso:p17018',
            'yso:p1963',
            'yso:p9824',
            'yso:p965',
            'yso:p6409',
            'yso:p8781',
            'yso:p26619',
            'yso:p13035',
            'yso:p2041',
          ],
          keywordOrSet2: [],
          location: [],
          pageSize: 10,
          publisher: null,
          include: ['keywords', 'location'],
          superEventType: ['umbrella', 'none'],
        },
      ],
    ])(
      'includes the transformed %s query variables',
      (searchAdapter, searchVariables) => {
        const adapter = new CombinedSearchFormAdapter(
          mockRouter as unknown as Router,
          input
        );
        const searchVariablesByAdapter = adapter.getSearchVariables();
        expect(searchVariablesByAdapter[searchAdapter]).toStrictEqual(
          searchVariables
        );
      }
    );
  });
});
