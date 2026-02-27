import {
  EVENT_SEARCH_FILTERS,
  EventTypeId,
  IconArt,
  IconCamp,
  IconCraft,
  IconDance,
  IconFood,
  IconGames,
  IconLiterature,
  IconMovies,
  IconMusic,
  IconOutdoorRecreation,
  IconSports,
  IconTheatre,
} from '@events-helsinki/components';
import React from 'react';

import type { Filters, SearchCategoryOption } from './types';

export enum COURSE_CATEGORIES {
  MOVIE = 'movie_and_media',
  LITERATURE = 'literature',
  VISUAL_ARTS = 'visual_arts',
  HANDICRAFTS = 'handicrafts',
  SPORT = 'sport',
  MUSIC = 'music',
  GAMES = 'games',
  FOOD = 'food',
  DANCE = 'dance',
  THEATRE = 'theatre',
  ANIMALS = 'animals',
  CAMPS = 'camps_and_trips',
}

/**
 * Hobby categories in popularity order.
 * */
export const sortedHobbyCategories = [
  COURSE_CATEGORIES.SPORT,
  COURSE_CATEGORIES.DANCE,
  COURSE_CATEGORIES.ANIMALS,
  COURSE_CATEGORIES.VISUAL_ARTS,
  COURSE_CATEGORIES.HANDICRAFTS,
  COURSE_CATEGORIES.MUSIC,
  COURSE_CATEGORIES.GAMES,
  COURSE_CATEGORIES.LITERATURE,
  COURSE_CATEGORIES.THEATRE,
  COURSE_CATEGORIES.FOOD,
  COURSE_CATEGORIES.MOVIE,
  COURSE_CATEGORIES.CAMPS,
];

export const COURSE_DEFAULT_SEARCH_FILTERS: Omit<
  Filters,
  EVENT_SEARCH_FILTERS.ONGOING
> = {
  [EVENT_SEARCH_FILTERS.CATEGORIES]: [],
  [EVENT_SEARCH_FILTERS.DATE_TYPES]: [],
  [EVENT_SEARCH_FILTERS.END]: null,
  [EVENT_SEARCH_FILTERS.IS_FREE]: false,
  [EVENT_SEARCH_FILTERS.PLACES]: [],
  [EVENT_SEARCH_FILTERS.START]: null,
  [EVENT_SEARCH_FILTERS.TEXT]: [],
  [EVENT_SEARCH_FILTERS.SUITABLE]: undefined,
};

export const CATEGORY_CATALOG = {
  [EventTypeId.Course]: {
    default: [
      COURSE_CATEGORIES.MOVIE,
      COURSE_CATEGORIES.LITERATURE,
      COURSE_CATEGORIES.VISUAL_ARTS,
      COURSE_CATEGORIES.HANDICRAFTS,
      COURSE_CATEGORIES.SPORT,
      COURSE_CATEGORIES.MUSIC,
      COURSE_CATEGORIES.GAMES,
      COURSE_CATEGORIES.FOOD,
      COURSE_CATEGORIES.DANCE,
      COURSE_CATEGORIES.THEATRE,
      COURSE_CATEGORIES.ANIMALS,
      COURSE_CATEGORIES.CAMPS,
    ],
    landingPage: [
      COURSE_CATEGORIES.LITERATURE,
      COURSE_CATEGORIES.VISUAL_ARTS,
      COURSE_CATEGORIES.HANDICRAFTS,
      COURSE_CATEGORIES.SPORT,
      COURSE_CATEGORIES.MUSIC,
      COURSE_CATEGORIES.GAMES,
      COURSE_CATEGORIES.DANCE,
      COURSE_CATEGORIES.THEATRE,
    ],
  },
};

/**
 * Keywords that are always excluded from hobbies search results,
 * regardless of user-provided filters.
 */
export const HOBBIES_EXCLUDED_KEYWORDS = [
  // Secondary school cross-institutional studies are not hobbies
  'helsinki:secondary_schools_cross_institutional_studies',
];

export const MOVIES_AND_MEDIA_COURSES_KEYWORDS = [
  'yso:p1235', // elokuva
  'kulke:29', // elokuvat
  'yso:p16327', // media
  'kulke:205', // mediataide
  'yso:p9731', // valokuva
  'kulke:87', // valokuvaus
  'yso:p1979', // valokuvaus
  'kulke:205', // elokuva ja media
  'yso:p10649', // valokuvataide
  'yso:p2699', // valokuvat
  'kultus:23', // elokuva, valokuva ja media
  'matko:elokuva',
  'yso:p16866', //  valokuvanäyttelyt
  'kulke:87', // valokuva
];

export const LITERATURE_COURSES_KEYWORDS = [
  'yso:p8113', // kirjallisuus
  'yso:p7969', // sanataide
  'kulke:81', // sarjakuva
  'yso:p38773', // sarjakuvataide
  'kulke:104', // kirjallisuus ja sanataide
  'kulke:206', // kirjallisuus
  'yso:p1148', // sarjakuvat
  'helmet:11193', // kirjallisuus
  'kultus:18', // sanataide ja kirjallisuus
];

export const VISUAL_ARTS_COURSES_KEYWORDS = [
  'kulke:81', // Sarjakuva
  'yso:p1148', // sarjakuvat / comics
  'yso:p2739', // kuvataide / fine arts
  'yso:p38773', // sarjakuvataide / comic art
  'yso:p8883', // maalaustaide / painting (visual arts)
  'yso:p695', // piirtäminen (taide) / drawing (artistic creation)
  'kulke:30', // kuvataide
  'kulke:218', // kuvataide
  'kulke:630', // kuvataide (lyhyt kurssit)
  'kulke:73', // kuvataide
  'yso:p8144', // taidemuseot
  'yso:p6889', // taidenäyttelyt
  'yso:p8884', // maalaus (kuvataide)
];

export const HANDICRAFTS_COURSES_KEYWORDS = [
  'yso:p4923', // käsityö
  'yso:p485', // käsityö (toiminta)
  'kulke:668', // design ja käsityö
  'yso:p8630', // kädentaidot
  'yso:p8631', // askartelu
  'yso:p1420', // keramiikka
  'kulke:72', // keramiikka
];

export const SPORT_COURSES_KEYWORDS = [
  'yso:p916', // liikunta
  'kulke:710', // liikuntaleiri
  'yso:p17018', // liikuntaleikit
  'yso:p1963', // liikuntatapahtumat
  'yso:p9824', // liikuntapalvelut
  'yso:p965', // urheilu
  'yso:p6409', // jalkapallo
  'yso:p8781', // koripallo
  'yso:p26619', // ulkoliikunta
  'yso:p13035', // liikuntaharrastus
  'yso:p2041', // urheilu- ja liikuntaseurat
  'kultus:26', // liikunta ja urheilu
  'matko:liikunta',
  'yso:p3093', // soveltava liikunta
  'kulke:634', // sovellettu liikunta
  'yso:p2771', // ulkoilu
];

export const MUSIC_COURSES_KEYWORDS = [
  'yso:p1808', // Musiikki
  'yso:p10871', // Rap
  'yso:p20421', // Musiikkiklubit
  'yso:p2969', // Popmusiikki
  'yso:p23171', // Vanha musiikki
  'yso:p27962', // Elävä musiikki
  'yso:p18718', // Lastenmusiikki
  'yso:p18434', // Taidemusiikki
  'yso:p15521', // Heavy metal
  'yso:p13408', // Musiikkileirit
  'yso:p29932', // Elektroninen tanssimusiikki
  'yso:p768', // Kuoromusiikki
  'yso:p2841', // Kansanmusiikki
  'kulke:31', // musiikki
  'kulke:348', // musiikki
  'kulke:77', // musiikki
  'matko:musiikki',
  'kultus:17', // musiikki
  'helmet:11835', // musiikki
  'yso:p30071', // musiikin harrastaminen
];

export const GAMES_COURSES_KEYWORDS = [
  'yso:p6062', // pelit
  'yso:p2758', // lautapelit
  'yso:p21628', // konsolipelit
  'yso:p17281', // videopelit?
  'yso:p22610', // verkkopelit
  'yso:p4295', // roolipelit
  'yso:p7990', // virtuaalitodellisuus
  'yso:p14483', // pelaaminen
  'helmet:11687', // Pelitapahtumat
  'yso:p10256', // biljardi
  'yso:p39492', // lähiverkkotapahtumat
];

export const FOOD_COURSES_KEYWORDS = [
  'yso:p367', // pizzat
  'yso:p5529', // ruokakulttuuri
  'yso:p28276', // katuruoka
  'yso:p3670', // ruoka
  'yso:p2846', // ruoanvalmistus
  'yso:p4865', // leipominen
  'matko:ruoka',
];

export const DANCE_COURSES_KEYWORDS = [
  'yso:p6283', // jazztanssi
  'yso:p1278', // tanssi
  'yso:p10105', // nykytanssi
  'yso:p3984', // tanssitapahtumat
  'yso:p25118', // street dance
  'yso:p10218',
  'yso:p21524', // showtanssi
  'yso:p37874', // salsa (tanssit)
  'yso:p14614', // dance
  'kulke:32', // Tanssi
  'kulke:350', // Tanssi
  'kulke:723', // Tanssi
  'kulke:83', // Tanssi
  'matko:tanssi',
  'matko:tanssi ja teatteri', // https://api.hel.fi/linkedevents/v1/keyword/matko:tanssi%20ja%20teatteri/
];

export const THEATRE_COURSES_KEYWORDS = [
  'yso:p2625', // teatteritaide
  'yso:p27886', // teatterlehdet
  'yso:p2315', // teatteritapahtumat
  'yso:p16164', // lastenteatterit
  'yso:p9058', // musiikkiteatteri (taiteet)
  'kulke:33', // Teatteri
  'kulke:84', // teatteri
  'matko:teatteri', //
  'kulke:351', // Teatteri ja sirkus
  'kulke:51', // Sirkus
  'yso:p11693', // musikaalit
  'yso:p27769', // teatteri-ilmaisu
  'yso:p5007', // sirkustaide
  'yso:p9380', // sirkukset
  'kultus:16', // Teatteri, tanssi ja sirkus
  'matko:tanssi ja teatteri', // https://api.hel.fi/linkedevents/v1/keyword/matko:tanssi%20ja%20teatteri/
];

export const ANIMAL_KEYWORDS = [
  'yso:p2023', // eläimet
  'yso:p39417', // eläintenhoito
];

export const CAMP_KEYWORDS = [
  'yso:p143', // leirit
  'yso:p21435', // kesäleirit
  'yso:p25261', // retket
];

// todo: replace with valid keyword ids
export const MAPPED_COURSE_CATEGORIES: Record<COURSE_CATEGORIES, string[]> = {
  [COURSE_CATEGORIES.MOVIE]: MOVIES_AND_MEDIA_COURSES_KEYWORDS,
  [COURSE_CATEGORIES.LITERATURE]: LITERATURE_COURSES_KEYWORDS,
  [COURSE_CATEGORIES.VISUAL_ARTS]: VISUAL_ARTS_COURSES_KEYWORDS,
  [COURSE_CATEGORIES.HANDICRAFTS]: HANDICRAFTS_COURSES_KEYWORDS,
  [COURSE_CATEGORIES.SPORT]: SPORT_COURSES_KEYWORDS,
  [COURSE_CATEGORIES.MUSIC]: MUSIC_COURSES_KEYWORDS,
  [COURSE_CATEGORIES.GAMES]: GAMES_COURSES_KEYWORDS,
  [COURSE_CATEGORIES.FOOD]: FOOD_COURSES_KEYWORDS,
  [COURSE_CATEGORIES.DANCE]: DANCE_COURSES_KEYWORDS,
  [COURSE_CATEGORIES.THEATRE]: THEATRE_COURSES_KEYWORDS,
  [COURSE_CATEGORIES.ANIMALS]: ANIMAL_KEYWORDS,
  [COURSE_CATEGORIES.CAMPS]: CAMP_KEYWORDS,
};

export const courseCategories: Record<COURSE_CATEGORIES, SearchCategoryOption> =
  {
    [COURSE_CATEGORIES.MOVIE]: {
      icon: <IconMovies />,
      labelKey: 'home:category.courses.movieAndMedia',
    },
    [COURSE_CATEGORIES.LITERATURE]: {
      icon: <IconLiterature />,
      labelKey: 'home:category.courses.literature',
    },
    [COURSE_CATEGORIES.VISUAL_ARTS]: {
      icon: <IconArt />,
      labelKey: 'home:category.courses.visualArts',
    },
    [COURSE_CATEGORIES.HANDICRAFTS]: {
      icon: <IconCraft />,
      labelKey: 'home:category.courses.handicrafts',
    },
    [COURSE_CATEGORIES.SPORT]: {
      icon: <IconSports />,
      labelKey: 'home:category.courses.sport',
    },
    [COURSE_CATEGORIES.MUSIC]: {
      icon: <IconMusic />,
      labelKey: 'home:category.courses.music',
    },
    [COURSE_CATEGORIES.GAMES]: {
      icon: <IconGames />,
      labelKey: 'home:category.courses.games',
    },
    [COURSE_CATEGORIES.FOOD]: {
      icon: <IconFood />,
      labelKey: 'home:category.courses.food',
    },
    [COURSE_CATEGORIES.DANCE]: {
      icon: <IconDance />,
      labelKey: 'home:category.courses.dance',
    },
    [COURSE_CATEGORIES.THEATRE]: {
      icon: <IconTheatre />,
      labelKey: 'home:category.courses.theatre',
    },
    [COURSE_CATEGORIES.ANIMALS]: {
      icon: <IconOutdoorRecreation />,
      labelKey: 'home:category.courses.animals',
    },
    [COURSE_CATEGORIES.CAMPS]: {
      icon: <IconCamp />,
      labelKey: 'home:category.courses.campsAndTrips',
    },
  };

export const MAPPED_PLACES: Record<string, string> = {};
