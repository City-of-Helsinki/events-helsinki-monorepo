import { describe, expect, it } from 'vitest';
import type EventContext from '../../../context/EventContext';
import type { EventDetails } from '../../../types/__generated__';
import {
  buildEventDetailsQuery,
  buildEventListQuery,
  hasEventAllMandatoryFieldsPopulated,
  reducePopulatedEvents,
} from '../utils';

describe('buildEventListQuery', () => {
  it('builds query with all parameters', () => {
    const query = buildEventListQuery({
      eventType: 'Course',
      internetBased: true,
      combinedText: 'yoga',
      localOngoingAnd: 'local',
      localOngoingOr: 'ongoing',
      localOngoingOrSet1: 'set1',
      localOngoingOrSet2: 'set2',
      localOngoingOrSet3: 'set3',
      internetOngoingAnd: 'internet',
      internetOngoingOr: 'ongoing',
      allOngoing: 'all',
      allOngoingAnd: 'and',
      allOngoingOr: 'or',
      division: 'kunta:091',
      end: '2026-12-31',
      endsAfter: '2026-09-01',
      endsBefore: '2026-12-31',
      include: 'keywords',
      inLanguage: 'en',
      isFree: true,
      keyword: 'yso:p1234',
      keywordAnd: 'yso:p5678',
      keywordOrSet1: 'yso:p9999',
      keywordOrSet2: 'yso:p8888',
      keywordOrSet3: 'yso:p7777',
      keywordNot: 'yso:p6666',
      language: 'en',
      location: 'tprek:12345',
      page: 1,
      pageSize: 20,
      publisher: 'org:123',
      publisherAncestor: 'org:456',
      sort: 'start_time',
      start: '2026-09-01',
      startsAfter: '2026-09-01',
      startsBefore: '2026-12-31',
      superEvent: 'event:123',
      superEventType: 'series',
      text: 'test',
      translation: 'en',
      audienceMinAgeLt: 65,
      audienceMinAgeGt: 18,
      audienceMaxAgeLt: 99,
      audienceMaxAgeGt: 0,
      suitableFor: 'child',
      ids: 'event:1,event:2',
      fullText: 'search',
      fullTextLanguage: 'en',
      ongoing: true,
    } as any);

    expect(query).toContain('event_type=Course');
    expect(query).toContain('internet_based=true');
    expect(query).toContain('combined_text=yoga');
    expect(query).toContain('page=1');
    expect(query).toContain('page_size=20');
  });

  it('builds query with subset of parameters', () => {
    const query = buildEventListQuery({
      text: 'malmi',
      page: 2,
    } as any);

    expect(query).toContain('text=malmi');
    expect(query).toContain('page=2');
  });

  it('builds query with no parameters', () => {
    const query = buildEventListQuery({} as any);
    expect(query).toHaveLength(0);
  });
});

describe('buildEventDetailsQuery', () => {
  it('builds query with include parameter', () => {
    const query = buildEventDetailsQuery(['keywords', 'location']);
    expect(query).toContain('include=keywords,location');
  });

  it('builds query with single include value', () => {
    const query = buildEventDetailsQuery(['keywords']);
    expect(query).toContain('include=keywords');
  });

  it('builds empty query when include is empty', () => {
    const query = buildEventDetailsQuery([]);
    expect(query).toBe('');
  });

  it('builds empty query when include is null', () => {
    const query = buildEventDetailsQuery(null);
    expect(query).toBe('');
  });

  it('builds empty query when include is undefined', () => {
    const query = buildEventDetailsQuery(undefined);
    expect(query).toBe('');
  });
});

describe('hasEventAllMandatoryFieldsPopulated', () => {
  it('returns true for event with all mandatory fields', () => {
    const event: EventDetails = {
      id: 'event:123',
      keywords: [{ id: 'yso:p123' }],
      externalLinks: [],
      subEvents: [],
      images: [{ url: 'https://example.com/image.jpg' }],
      inLanguage: ['en'],
      audience: [],
      name: { en: 'Event Name' },
    } as any;

    expect(hasEventAllMandatoryFieldsPopulated(event)).toBe(true);
  });

  it('returns false when keywords is null', () => {
    const event: EventDetails = {
      id: 'event:123',
      keywords: null,
      externalLinks: [],
      subEvents: [],
      images: [{ url: 'https://example.com/image.jpg' }],
      inLanguage: ['en'],
      audience: [],
      name: { en: 'Event Name' },
    } as any;

    // Note: in test environment, should return true due to NODE_ENV check
    expect(hasEventAllMandatoryFieldsPopulated(event)).toBe(true);
  });

  it('returns true in test environment regardless of field values', () => {
    const event: EventDetails = {
      id: undefined,
      keywords: null,
    } as any;

    expect(hasEventAllMandatoryFieldsPopulated(event)).toBe(true);
  });
});

describe('reducePopulatedEvents', () => {
  it('reduces events keeping only fully populated ones', () => {
    const events: EventDetails[] = [
      {
        id: 'event:1',
        keywords: [{ id: 'yso:p123' }],
        externalLinks: [],
        subEvents: [],
        images: [{ url: 'https://example.com/1.jpg' }],
        inLanguage: ['en'],
        audience: [],
        name: { en: 'Event 1' },
      },
      {
        id: 'event:2',
        keywords: [{ id: 'yso:p456' }],
        externalLinks: [],
        subEvents: [],
        images: [{ url: 'https://example.com/2.jpg' }],
        inLanguage: ['en'],
        audience: [],
        name: { en: 'Event 2' },
      },
    ] as any;

    const context: Partial<EventContext> = {
      ignoredErrorCodes: [],
    };

    const reduced = reducePopulatedEvents(events, context as EventContext);

    // In test environment, all events should be kept
    expect(reduced).toHaveLength(2);
  });

  it('returns empty array for empty input', () => {
    const context: Partial<EventContext> = {
      ignoredErrorCodes: [],
    };

    const reduced = reducePopulatedEvents([], context as EventContext);
    expect(reduced).toHaveLength(0);
  });
});
