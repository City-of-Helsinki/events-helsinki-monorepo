import {
  EventTypeId,
  UnifiedSearchLanguage,
} from '@events-helsinki/components/types';
import mockRouter from 'next-router-mock';
import qs from 'query-string';
import type {
  CombinedSearchAdapterInput,
  CombinedSearchAdapterOutput,
} from '../../types';
import CombinedSearchFormAdapter, {
  cleanFunctionNames,
} from '../CombinedSearchFormAdapter';

const locale = 'fi';

const outputQuery: CombinedSearchAdapterInput = {
  text: 'test text',
  venueOrderBy: 'venue-field-asc',
  eventOrderBy: 'event-field-asc',
  courseOrderBy: 'course-field-asc',
  sportsCategories: [],
  targetGroups: [],
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
  describe('clean', () => {
    it('field specific clean functions are found in CombinedSearchFormAdapter', () => {
      const adapter = new CombinedSearchFormAdapter(locale, input);
      for (const cleanFunctionName of cleanFunctionNames) {
        expect(adapter).toHaveProperty(cleanFunctionName);
        expect(typeof adapter[cleanFunctionName]).toBe('function');
      }
    });

    it('field specific clean functions should have unique names', () => {
      expect(cleanFunctionNames).toHaveLength(new Set(cleanFunctionNames).size);
    });

    it('field specific clean functions take no parameters', () => {
      const adapter = new CombinedSearchFormAdapter(locale, input);
      for (const cleanFunctionName of cleanFunctionNames) {
        expect(adapter[cleanFunctionName]).toHaveLength(0);
      }
    });

    it('field specific clean functions return nothing', () => {
      const adapter = new CombinedSearchFormAdapter(locale, input);
      for (const cleanFunctionName of cleanFunctionNames) {
        expect(adapter[cleanFunctionName]()).toBeUndefined();
      }
    });

    it('clean function calls all field specific clean functions', () => {
      const adapter = new CombinedSearchFormAdapter(locale, input);
      const cleanFunctionSpies = cleanFunctionNames.map((cleanFunctionName) =>
        vitest.spyOn(adapter, cleanFunctionName)
      );
      cleanFunctionSpies.forEach((cleanFunctionSpy) =>
        expect(cleanFunctionSpy).not.toHaveBeenCalled()
      );
      adapter.clean();
      cleanFunctionSpies.forEach((cleanFunctionSpy) =>
        expect(cleanFunctionSpy).toHaveBeenCalled()
      );
    });

    it('CombinedSearchFormAdapter constructor calls clean function', () => {
      const adapterPrototype = CombinedSearchFormAdapter.prototype;
      const cleanFunctionSpy = vitest.spyOn(adapterPrototype, 'clean');
      expect(cleanFunctionSpy).not.toHaveBeenCalled();
      new CombinedSearchFormAdapter(locale, input);
      expect(cleanFunctionSpy).toHaveBeenCalled();
    });
  });

  describe('getURLQuery', () => {
    it('collects the form values from the URL but does not exclude the extra params', () => {
      const adapter = new CombinedSearchFormAdapter(locale, input);
      // eslint-disable-next-line vitest/prefer-strict-equal
      expect(adapter.getURLQuery()).toEqual({
        ...outputQuery,
        ...extraParamsInOutputQuery,
      });
    });
  });

  describe('getFormValues', () => {
    it('returns only the form values without any possible extra params given in a URL', () => {
      const adapter = new CombinedSearchFormAdapter(locale, input);
      // eslint-disable-next-line vitest/prefer-strict-equal
      expect(adapter.getFormValues()).toEqual(outputQuery);
    });
  });

  describe('getSearchVariables', () => {
    it.each<
      [
        keyof ReturnType<CombinedSearchFormAdapter['getSearchVariables']>,
        CombinedSearchAdapterOutput,
      ]
    >([
      [
        'venue',
        {
          includeHaukiFields: false,
          language: UnifiedSearchLanguage.Finnish,
          mustHaveReservableResource: false,
          text: outputQuery.text,
          ontologyWordIdOrSets:
            outputQuery.keywords.length > 0 ? [outputQuery.keywords] : [],
          administrativeDivisionIds: ['ocd-division/country:fi/kunta:helsinki'],
          after: '',
          first: 10,
          ontologyTreeIdOrSets: [['551']],
          openAt: null,
        },
      ],
      [
        'event',
        {
          keywordAnd: outputQuery.keywords,
          sort: outputQuery.eventOrderBy ?? null,
          eventType: EventTypeId.General,
          fullText: outputQuery.text,
          ongoing: true,
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
          keywordOrSet3: [],
          location: [],
          pageSize: 10,
          publisher: null,
          publisherAncestor: null,
          include: ['keywords', 'location'],
          // Removed to experiment:
          // LIIKUNTA-512 (https://helsinkisolutionoffice.atlassian.net/browse/LIIKUNTA-512).
          // superEventType: ['umbrella', 'none'],
        },
      ],
    ])(
      'includes the transformed %s query variables',
      (searchAdapterType, searchVariables) => {
        const adapter = new CombinedSearchFormAdapter(locale, input);
        const searchVariablesByAdapter = adapter.getSearchVariables();
        expect(searchVariablesByAdapter[searchAdapterType]).toStrictEqual(
          searchVariables
        );
      }
    );
  });
});
