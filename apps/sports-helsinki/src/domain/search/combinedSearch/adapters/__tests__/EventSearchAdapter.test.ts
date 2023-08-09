import { EventTypeId, TARGET_GROUPS } from '@events-helsinki/components/types';
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
          organization: null,
          keywords: [],
        };
        const adapter = new EventSearchAdapter(input, eventType);
        expect(adapter.getQueryVariables()).toStrictEqual({
          eventType,
          allOngoingAnd: [input.text],
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
            'helfi:5', // Vanhukset / Elderly
            'yso:p2208', // isovanhemmat / grandparents
            'yso:p2433', // ikääntyneet / older people
            'yso:p5056', // ikääntyminen / ageing
            'yso:p6448', // vanhustyö / work with the elderly
            'yso:p12787', // vanhustenhuolto / care for older people
            'yso:p13440', // vanhustenneuvolat / guidance centres for the elderly
            'yso:p20755', // vanhustentalot / municipal housing for the elderly
            'yso:p25147', // vanhuspalvelut / services for older people
            // YOUTH_KEYWORDS
            'yso:p1925', // nuorisotyö / youth work
            'yso:p4806', // nuorisokulttuuri / youth culture
            'yso:p11617', // nuoret / young people
            'yso:p15327', // nuoruus / youth
            'yso:p16485', // koululaiset / pupils
            'yso:p17790', // nuorisotilat / youth recreational facilities
            'yso:p21292', // yläkoulu / upper comprehensive school
            'yso:p25948', // nuorisotalot / youth clubs
            'yso:p29165', // nuorisopalvelut / youth services
            'yso:p38262', // yläkoululaiset / upper comprehensive school pupils
          ],
          location: [],
          pageSize: 10,
          publisher: null,
          include: ['keywords', 'location'],
          superEventType: ['umbrella', 'none'],
          sort:
            eventType === EventTypeId.General ? input.eventOrderBy : 'end_time',
        });
      }
    );
  });
});
