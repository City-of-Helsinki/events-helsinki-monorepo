import { describe, it, expect, vi } from 'vitest';
import type VenueContext from '../../../context/VenueContext.js';
import type { TprekUnit } from '../../../types.js';
import VenueDepartmentEnricher from '../VenueDepartmentEnricher.js';
import VenueOntologyTreeEnricher from '../VenueOntologyTreeEnricher.js';
import VenueOntologyWordsEnricher from '../VenueOntologyWordsEnricher.js';
import VenueOrganizationEnricher from '../VenueOrganizationEnricher.js';

const createMockContext = (): VenueContext => {
  const mockContext = {} as VenueContext;
  mockContext.dataSources = {
    serviceMap: {
      getDepartment: vi.fn(),
      getOrganization: vi.fn(),
      getOntologyTreeSubset: vi.fn(),
      getOntologyWordsSubset: vi.fn(),
    } as any,
  } as any;
  return mockContext;
};

const createTprekUnitMock = (overrides?: Partial<TprekUnit>): TprekUnit =>
  ({
    id: 1,
    name_fi: 'Test Venue',
    created_time: '2020-01-01T00:00:00Z',
    modified_time: '2020-01-01T00:00:00Z',
    connections: [],
    ontologyword_details: [],
    service_descriptions: [],
    accessibility_sentences: [],
    ...overrides,
  }) as unknown as TprekUnit;

describe('VenueDepartmentEnricher', () => {
  it('returns null department when dept_id is missing', async () => {
    const context = createMockContext();
    const enricher = new VenueDepartmentEnricher();
    const data = createTprekUnitMock({ dept_id: null });

    const result = await enricher.getEnrichments(data, context);

    expect(result.department).toBeNull();
    expect(context.dataSources.serviceMap.getDepartment).not.toHaveBeenCalled();
  });

  it('fetches and formats department when dept_id is present', async () => {
    const context = createMockContext();
    const mockDepartment = {
      id: 'dept1',
      name_fi: 'Test Department',
      name_sv: 'Test Department SV',
      name_en: 'Test Department EN',
    };

    (context.dataSources.serviceMap.getDepartment as any).mockResolvedValue(
      mockDepartment
    );

    const enricher = new VenueDepartmentEnricher();
    const data = createTprekUnitMock({ dept_id: 'dept1' });

    const result = await enricher.getEnrichments(data, context);

    expect(context.dataSources.serviceMap.getDepartment).toHaveBeenCalledWith(
      'dept1'
    );
    expect(result.department).toBeDefined();
  });
});

describe('VenueOrganizationEnricher', () => {
  it('returns null organization when org_id is missing', async () => {
    const context = createMockContext();
    const enricher = new VenueOrganizationEnricher();
    const data = createTprekUnitMock({ org_id: null });

    const result = await enricher.getEnrichments(data, context);

    expect(result.organization).toBeNull();
    expect(
      context.dataSources.serviceMap.getOrganization
    ).not.toHaveBeenCalled();
  });

  it('fetches and formats organization when org_id is present', async () => {
    const context = createMockContext();
    const mockOrganization = {
      id: 'org1',
      name_fi: 'Test Organization',
      name_sv: 'Test Organization SV',
      name_en: 'Test Organization EN',
    };

    (context.dataSources.serviceMap.getOrganization as any).mockResolvedValue(
      mockOrganization
    );

    const enricher = new VenueOrganizationEnricher();
    const data = createTprekUnitMock({ org_id: 'org1' });

    const result = await enricher.getEnrichments(data, context);

    expect(context.dataSources.serviceMap.getOrganization).toHaveBeenCalledWith(
      'org1'
    );
    expect(result.organization).toBeDefined();
  });
});

describe('VenueOntologyTreeEnricher', () => {
  it('returns empty array when ontologytree_ids is missing', async () => {
    const context = createMockContext();
    const enricher = new VenueOntologyTreeEnricher();
    const data = createTprekUnitMock({ ontologytree_ids: null });

    const result = await enricher.getEnrichments(data, context);

    expect(result.ontologyTree).toStrictEqual([]);
    expect(
      context.dataSources.serviceMap.getOntologyTreeSubset
    ).not.toHaveBeenCalled();
  });

  it('fetches and formats ontology tree when ontologytree_ids is present', async () => {
    const context = createMockContext();
    const mockOntologyForest = [
      {
        id: 'tree1',
        name_fi: 'Tree 1',
        name_sv: 'Tree 1 SV',
        name_en: 'Tree 1 EN',
      },
    ];

    (
      context.dataSources.serviceMap.getOntologyTreeSubset as any
    ).mockResolvedValue(mockOntologyForest);

    const enricher = new VenueOntologyTreeEnricher();
    const data = createTprekUnitMock({ ontologytree_ids: ['tree1'] });

    const result = await enricher.getEnrichments(data, context);

    expect(
      context.dataSources.serviceMap.getOntologyTreeSubset
    ).toHaveBeenCalledWith(['tree1']);
    expect(result.ontologyTree).toBeDefined();
    expect(Array.isArray(result.ontologyTree)).toBe(true);
  });
});

describe('VenueOntologyWordsEnricher', () => {
  it('returns empty array when ontologyword_ids is missing', async () => {
    const context = createMockContext();
    const enricher = new VenueOntologyWordsEnricher();
    const data = createTprekUnitMock({ ontologyword_ids: null });

    const result = await enricher.getEnrichments(data, context);

    expect(result.ontologyWords).toStrictEqual([]);
    expect(
      context.dataSources.serviceMap.getOntologyWordsSubset
    ).not.toHaveBeenCalled();
  });

  it('fetches and formats ontology words when ontologyword_ids is present', async () => {
    const context = createMockContext();
    const mockOntologyWords = [
      {
        id: 'word1',
        ontologyword_fi: 'Word 1',
        ontologyword_sv: 'Word 1 SV',
        ontologyword_en: 'Word 1 EN',
      },
    ];

    (
      context.dataSources.serviceMap.getOntologyWordsSubset as any
    ).mockResolvedValue(mockOntologyWords);

    const enricher = new VenueOntologyWordsEnricher();
    const data = createTprekUnitMock({ ontologyword_ids: ['word1'] });

    const result = await enricher.getEnrichments(data, context);

    expect(
      context.dataSources.serviceMap.getOntologyWordsSubset
    ).toHaveBeenCalledWith(['word1']);
    expect(result.ontologyWords).toBeDefined();
    expect(Array.isArray(result.ontologyWords)).toBe(true);
  });
});
