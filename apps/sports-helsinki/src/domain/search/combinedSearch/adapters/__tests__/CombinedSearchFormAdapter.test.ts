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
  orderBy: 'field-asc',
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
          orderBy: 'to-be-order-by',
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
          orderBy: 'to-be-order-by',
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
          ontologyWords: outputQuery.keywords,
          orderBy: outputQuery.orderBy,
        },
      ],
      [
        'EventSearchAdapter',
        {
          text: outputQuery.text,
          keywords: outputQuery.keywords,
          sort: outputQuery.orderBy,
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
