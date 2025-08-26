import {
  EVENT_SEARCH_FILTERS,
  EventTypeId,
  HELSINKI_OCD_DIVISION_ID,
  TARGET_GROUPS,
} from '@events-helsinki/components';
import type { CombinedSearchAdapterInput } from '../../types';
import EventSearchAdapter from '../EventSearchAdapter';

describe('EventSearchAdapter', () => {
  describe('getQueryVariables', () => {
    it.each([EventTypeId.General, EventTypeId.Course])(
      'converts the form values input to %s search variables as an output',
      (eventType) => {
        const input: CombinedSearchAdapterInput = {
          text: 'test text',
          eventOrderBy: 'event-field-asc',
          courseOrderBy: null,
          venueOrderBy: null,
          sportsCategories: [],
          targetGroups: [TARGET_GROUPS.SENIORS, TARGET_GROUPS.YOUTH],
          helsinkiOnly: true,
          organization: null,
          keywords: [],
        };
        const adapter = new EventSearchAdapter(input, eventType);
        const result = {
          eventType,
          xFullText: input.text,
          xOngoing: true,
          start: 'now',
          end: '',
          keywordAnd: input.keywords,
          keywordNot: [],
          keywordOrSet1: [
            // SPORT_COURSES_KEYWORDS
            'yso:p916', // liikunta / physical training
            'kulke:710', // liikuntaleiri / sports camp
            'yso:p17018', // liikuntaleikit / exercise games
            'yso:p1963', // liikuntatapahtumat / sports events
            'yso:p9824', // liikuntapalvelut / physical activity services
            'yso:p965', // urheilu / sports
            'yso:p6409', // jalkapallo / football
            'yso:p8781', // koripallo / basketball
            'yso:p26619', // ulkoliikunta / outdoor sports
            'yso:p13035', // liikuntaharrastus / physical hobbies
            'yso:p2041', // urheilu- ja liikuntaseurat / sports clubs
          ],
          keywordOrSet2: [],
          keywordOrSet3: [
            // SENIORS_KEYWORDS
            'helmet:12023', // Senioreille
            'kulke:354', // Seniorit
            'yso:p23544', // senioritalot
            'yso:p5056', // ikääntyminen
            'yso:p2433', // ikääntyneet
            'yso:p5590', // aikuiset
            // YOUTH_KEYWORDS
            'yso:p11617', // nuoret
            'kulke:734', // Nuorille
            'yso:p4806', // nuorisokulttuuri
            'yso:p29165', // nuorisopalvelut
            'yso:p3765', // nuorisopolitiikka
            'yso:p25948', // nuorisotalot
            'yso:p16162', // nuorisoteatterit
            'yso:p17790', // nuorisotilat
            'yso:p1925', // nuorisotyö
            'yso:p7401', // lukio
            'yso:p12736', // lukiolaiset
            'yso:p15979', // nuoret aikuiset
          ],
          location: [],
          pageSize: 10,
          publisher: null,
          publisherAncestor: 'ahjo:00001',
          include: ['keywords', 'location'],
          // Always filter with HELSINKI_OCD_DIVISION_ID to limit the results to city of Helsinki events.
          // NOTE: This is not needed if using any `*Ongoing` -filter as
          // they automatically limit the results to city of Helsinki events.
          [EVENT_SEARCH_FILTERS.DIVISIONS]: [HELSINKI_OCD_DIVISION_ID],
          // Removed to experiment LIIKUNTA-512 (https://helsinkisolutionoffice.atlassian.net/browse/LIIKUNTA-512).
          // superEventType: ['umbrella', 'none'],
          // Added for courses in LIIKUNTA-512 (https://helsinkisolutionoffice.atlassian.net/browse/LIIKUNTA-512).
          superEvent: eventType === EventTypeId.Course ? 'none' : undefined,
          sort:
            eventType === EventTypeId.General ? input.eventOrderBy : 'end_time',
        };
        // Remove undefined keys
        Object.keys(result).forEach(
          (key) =>
            result[key as keyof typeof result] === undefined &&
            delete result[key as keyof typeof result]
        );
        expect(adapter.getQueryVariables()).toStrictEqual(result);
      }
    );
  });
});
