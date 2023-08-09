import {
  IconTennis,
  IconGym,
  IconIceSkating,
  IconIndoorSportsHalls,
  IconKindergarten,
  IconOutdoorGyms,
  IconOutdoorRecreation,
  IconSkateboarding,
  IconSkiing,
  IconSports,
  IconSwimming,
  Season,
  SPORTS_CATEGORIES,
  TARGET_GROUPS,
} from '@events-helsinki/components';
import {
  IconFamily,
  IconPersonGenderless,
  IconCompany,
  IconYouth,
  IconSenior,
  IconPersonWheelchair,
} from 'hds-react';
import React from 'react';
import type { Filters, SearchCategoryOption } from './types';

// Page size of the event list
export const PAGE_SIZE = 10;

export enum COURSE_CATEGORIES {
  SPORT = 'sport',
}

// Swimming / Uinti
export const SWIMMING_KEYWORDS = [
  'yso:p4330', // uinti / swimming
  'yso:p9415', // uimahallit / indoor swimming pools (sports halls)
  'yso:p17551', // uimakoulut / swimming classes
  'yso:p17887', // avantouinti / winter swimming
  'yso:p17975', // uima-altaat / swimming pools
];

// Skiing / Hiihto
export const SKIING_KEYWORDS = [
  'yso:p11029', // laskettelu / downhill skiing
  'yso:p11094', // hiihto / skiing
];

// Ice skating / Luistelu
export const ICE_SKATING_KEYWORDS = [
  'yso:p1244', // retkiluistelu / tour skating
  'yso:p1245', // luistelu / skating
  'yso:p10154', // luistinradat / skating rinks
  'yso:p15818', // taitoluistelu / figure skating
];

// Gym / Kuntosalit
export const GYM_KEYWORDS = [
  'yso:p8504', // kuntosalit / gyms
];

// Outdoor gyms / Ulkokuntosalit
export const OUTDOOR_GYMS_KEYWORDS = [
  'yso:p3413', // kuntoiluvälineet / exercise equipment
];

// Playgrounds / Leikkipuistot
export const PLAYGROUNDS_KEYWORDS = [
  'yso:p8105', // leikkipuistot / playgrounds
];

// Tennis
export const TENNIS_KEYWORDS = [
  'yso:p1928', // tennis
];

// Skateboarding / Skeittaus
export const SKATEBOARDING_KEYWORDS = [
  'yso:p14113', // rullalautailu / skateboarding
];

// Indoor sports halls / Sisäliikuntahallit
export const INDOOR_SPORTS_HALLS_KEYWORDS = [
  'yso:p86', // liikuntatilat / sports facilities
  'yso:p398', // keilahallit / bowling alleys
  'yso:p6408', // futsal / futsal
  'yso:p9415', // uimahallit / indoor swimming pools (sports halls)
  'yso:p16554', // sähly / sähly
  'yso:p16781', // soutulaitteet / rowing machines
  'yso:p18081', // seinäkiipeily / indoor climbing
  'yso:p27970', // dancehall / dancehall (dance)
];

// Outdoor recreation / Ulkoilu
export const OUTDOOR_RECREATION_KEYWORDS = [
  'yso:p934', // juoksulajit / track events
  'yso:p935', // yleisurheilu / track and field
  'yso:p1052', // ulkoleikit / outdoor games
  'yso:p1101', // virkistyskäyttö / recreational use
  'yso:p1102', // vaellus / trekking
  'yso:p1103', // retkeily / hiking and backpacking
  'yso:p1120', // suunnistus / orienteering
  'yso:p2239', // vesiurheilu / water sports
  'yso:p2712', // maratonjuoksu / marathon running
  'yso:p2771', // ulkoilu / outdoor recreation
  'yso:p3706', // kävely / walking (motion)
  'yso:p4058', // virkistysalueet / recreation areas
  'yso:p4858', // ulkoilualueet / outdoor recreation areas
  'yso:p5349', // luontopolut / nature trails
  'yso:p5350', // ulkoilureitit / outdoor routes
  'yso:p5454', // metsät / forests
  'yso:p6963', // hevosurheilu / horse sports
  'yso:p7071', // luontoliikunta / outdoor exercise in nature
  'yso:p9087', // juoksu / running
  'yso:p9088', // maastojuoksu / cross-country running
  'yso:p10409', // pyöräily / cycling
  'yso:p10713', // pyörätiet / bicycle paths
  'yso:p10784', // eräretkeily / wilderness hiking
  'yso:p12075', // melontaretkeily / canoe camping
  'yso:p12078', // melonta / canoeing
  'yso:p12441', // virkistystoiminta / recreation
  'yso:p13638', // golf / golf
  'yso:p14113', // rullalautailu / skateboarding
  'yso:p15427', // esteratsastus / show jumping
  'yso:p16791', // beach volley / beach volley
  'yso:p17728', // kaupunkiluonto / urban nature
  'yso:p18266', // moottoripyöräily / motorcycling
  'yso:p18572', // sauvakävely / nordic walking
  'yso:p22509', // parkour / parkour
  'yso:p25200', // frisbeegolf / disc golf
  'yso:p25338', // kävelykierrokset / walking tours
  'yso:p26468', // pyöräilyreitit / cycling routes
  'yso:p26619', // ulkoliikunta / outdoor sports
  'yso:p28285', // polkujuoksu / trail running
  'yso:p36670', // sup-lautailu / stand-up paddle surfing
];

// Guided exercise / Ohjattu liikunta
export const GUIDED_EXERCISE_KEYWORDS = [
  'yso:p915', // talviliikunta / winter exercise
  'yso:p1884', // musiikkiliikunta / musical exercise
  'yso:p3093', // erityisliikunta / adapted physical activity
  'yso:p3111', // jooga / yoga
  'yso:p6433', // vesiliikunta / water exercise
  'yso:p7858', // venyttely / stretching exercise
  'yso:p13335', // harjoitukset / exercises
  'yso:p17018', // liikuntaleikit / exercise games
  'yso:p18388', // ryukyu kempo / ryukyu kempo
  'yso:p19453', // keppijumppa / broomstick exercise
  'yso:p21559', // asahi / asahi
  'yso:p27829', // tuolijumppa / chair exercise
];

// TODO: Remove these since they should not be needed when the general events are not used at all.
export const EVENT_DEFAULT_SEARCH_FILTERS: Filters = {
  dateTypes: [],
  sportsCategories: [],
  end: null,
  keyword: [],
  keywordNot: [],
  places: [],
  publisher: null,
  start: null,
  q: [],
  eventType: [],
};

export const COURSE_DEFAULT_SEARCH_FILTERS = EVENT_DEFAULT_SEARCH_FILTERS;

export enum EVENT_SEARCH_FILTERS {
  CATEGORIES = 'categories',
  HOBBY_TYPES = 'hobbyTypes',
  DATE_TYPES = 'dateTypes',
  SPORTS_CATEGORIES = 'sportsCategories',
  DIVISIONS = 'divisions',
  END = 'end',
  IS_FREE = 'isFree',
  KEYWORD = 'keyword',
  KEYWORD_NOT = 'keywordNot',
  ONLY_CHILDREN_EVENTS = 'onlyChildrenEvents',
  ONLY_EVENING_EVENTS = 'onlyEveningEvents',
  ONLY_REMOTE_EVENTS = 'onlyRemoteEvents',
  PAGE = 'page',
  PLACES = 'places',
  PUBLISHER = 'publisher',
  START = 'start',
  MIN_AGE = 'audienceMinAgeLt',
  MAX_AGE = 'audienceMaxAgeGt',
  SUITABLE = 'suitableFor',
  EVENT_TYPE = 'eventType',
}

export const CATEGORY_CATALOG = {
  targetGroups: {
    default: [
      TARGET_GROUPS.ADAPTED_GROUPS,
      TARGET_GROUPS.ADULTS,
      TARGET_GROUPS.CHILDREN_AND_FAMILIES,
      TARGET_GROUPS.PARTNERS,
      TARGET_GROUPS.SENIORS,
      TARGET_GROUPS.YOUTH,
    ],
  },
  sportsCategories: {
    default: [
      SPORTS_CATEGORIES.SWIMMING,
      SPORTS_CATEGORIES.SKIING,
      SPORTS_CATEGORIES.ICE_SKATING,
      SPORTS_CATEGORIES.GYM,
      SPORTS_CATEGORIES.OUTDOOR_GYMS,
      SPORTS_CATEGORIES.PLAYGROUNDS,
      SPORTS_CATEGORIES.TENNIS,
      SPORTS_CATEGORIES.SKATEBOARDING,
      SPORTS_CATEGORIES.INDOOR_SPORTS_HALLS,
      SPORTS_CATEGORIES.OUTDOOR_RECREATION,
      SPORTS_CATEGORIES.GUIDED_EXERCISE,
    ],
    landingPage: [
      SPORTS_CATEGORIES.SWIMMING,
      SPORTS_CATEGORIES.SKIING,
      SPORTS_CATEGORIES.ICE_SKATING,
      SPORTS_CATEGORIES.GYM,
      SPORTS_CATEGORIES.OUTDOOR_GYMS,
      SPORTS_CATEGORIES.PLAYGROUNDS,
      SPORTS_CATEGORIES.TENNIS,
      SPORTS_CATEGORIES.SKATEBOARDING,
      SPORTS_CATEGORIES.INDOOR_SPORTS_HALLS,
      SPORTS_CATEGORIES.OUTDOOR_RECREATION,
      SPORTS_CATEGORIES.GUIDED_EXERCISE,
    ],
  },
};

export const SPORT_COURSES_KEYWORDS = [
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
];

// todo: replace with valid keyword ids
export const MAPPED_COURSE_CATEGORIES: Record<string, string[]> = {
  [COURSE_CATEGORIES.SPORT]: SPORT_COURSES_KEYWORDS,
};

// TODO seasons not final
export const sportsCategoryData: Record<string, SearchCategoryOption> = {
  [SPORTS_CATEGORIES.SWIMMING]: {
    icon: <IconSwimming />,
    labelKey: 'appSports:home.sportsCategory.swimming',
    seasons: [Season.Summer, Season.Winter],
    keywords: SWIMMING_KEYWORDS,
  },
  [SPORTS_CATEGORIES.SKIING]: {
    icon: <IconSkiing />,
    labelKey: 'appSports:home.sportsCategory.skiing',
    seasons: [Season.Winter],
    keywords: SKIING_KEYWORDS,
  },
  [SPORTS_CATEGORIES.ICE_SKATING]: {
    icon: <IconIceSkating />,
    labelKey: 'appSports:home.sportsCategory.iceSkating',
    seasons: [Season.Winter],
    keywords: ICE_SKATING_KEYWORDS,
  },
  [SPORTS_CATEGORIES.GYM]: {
    icon: <IconGym />,
    labelKey: 'appSports:home.sportsCategory.gym',
    seasons: [Season.Summer, Season.Winter],
    keywords: GYM_KEYWORDS,
  },
  [SPORTS_CATEGORIES.OUTDOOR_GYMS]: {
    icon: <IconOutdoorGyms />,
    labelKey: 'appSports:home.sportsCategory.outdoorGyms',
    seasons: [Season.Summer],
    keywords: OUTDOOR_GYMS_KEYWORDS,
  },
  [SPORTS_CATEGORIES.PLAYGROUNDS]: {
    icon: <IconKindergarten />,
    labelKey: 'appSports:home.sportsCategory.playgrounds',
    seasons: [Season.Summer, Season.Winter],
    keywords: PLAYGROUNDS_KEYWORDS,
  },
  [SPORTS_CATEGORIES.TENNIS]: {
    icon: <IconTennis />,
    labelKey: 'appSports:home.sportsCategory.tennis',
    seasons: [Season.Summer],
    keywords: TENNIS_KEYWORDS,
  },
  [SPORTS_CATEGORIES.SKATEBOARDING]: {
    icon: <IconSkateboarding />,
    labelKey: 'appSports:home.sportsCategory.skateboarding',
    seasons: [Season.Summer],
    keywords: SKATEBOARDING_KEYWORDS,
  },
  [SPORTS_CATEGORIES.INDOOR_SPORTS_HALLS]: {
    icon: <IconIndoorSportsHalls />,
    labelKey: 'appSports:home.sportsCategory.indoorSportsHalls',
    seasons: [Season.Summer, Season.Winter],
    keywords: INDOOR_SPORTS_HALLS_KEYWORDS,
  },
  [SPORTS_CATEGORIES.OUTDOOR_RECREATION]: {
    icon: <IconOutdoorRecreation />,
    labelKey: 'appSports:home.sportsCategory.outdoorRecreation',
    seasons: [Season.Summer, Season.Winter],
    keywords: OUTDOOR_RECREATION_KEYWORDS,
  },
  [SPORTS_CATEGORIES.GUIDED_EXERCISE]: {
    // TODO proper icon missing
    icon: <IconSports />,
    labelKey: 'appSports:home.sportsCategory.guidedExercise',
    seasons: [Season.Winter],
    keywords: GUIDED_EXERCISE_KEYWORDS,
  },
};

export const ADAPTED_GROUPS_KEYWORDS = [
  'helfi:4', // Vammaiset / Disabled
  'kulke:614', // Erityisryhmät aikuisille / (Special groups for adults)
  'tet:6', // Soveltuu näkövammaisille / Suitable for people with visual impairments
  'tet:7', // Soveltuu kuulovammaisille / Suitable for people with hearing impairments
  'yso:p78', // näkövammaiset / visually disabled people
  'yso:p1943', // kuulovammat / hearing disorders
  'yso:p3048', // kehitysvammatyö / work with developmentally disabled persons
  'yso:p3093', // erityisliikunta / adapted physical activity
  'yso:p7179', // vammaiset / disabled people
  'yso:p10060', // kehitysvammaiset / people with intellectual disabilities
  'yso:p12297', // mielenterveyskuntoutujat / patients in psychiatric rehabilitation
  'yso:p15492', // kehitysvammaisten hoitajat / nurses for persons with developmental disabilities
  'yso:p16418', // kehitysvammaisten ohjaajat / instructors for persons with developmental disabilities
  'yso:p17354', // erityisryhmät / special groups
  'yso:p25158', // vammaispalvelut / services for the disabled
  'yso:p28565', // erityislapset / children with special needs
  'yso:p28757', // ikäkuulo / presbycusis
];

export const ADULTS_KEYWORDS = [
  'kulke:613', // Aikuiset / (Adults)
  'yso:p5590', // aikuiset / adults
  'yso:p15979', // nuoret aikuiset / young adults
];

export const CHILDREN_AND_FAMILIES_KEYWORDS = [
  'helfi:1', // Lapset ja lapsiperheet / Children and families
  'helmet:10595', // Lapset ja perheet / Children and families
  'helmet:10670', // Lapset / Lapset
  'kulke:355', // Lapset / (Children)
  'kulke:747', // Lapsi ja aikuinen yhdessä / (Child and adult together)
  'yso:p2183', // peruskoulun ala-aste / lower level of comprehensive school
  'yso:p2260', // vanhempi-lapsisuhde / parent-child relationship
  'yso:p2357', // lapset (perheenjäsenet) / children (family members)
  'yso:p4074', // vanhemmat / parents
  'yso:p4354', // lapset (ikäryhmät) / children (age groups)
  'yso:p5627', // yksinhuoltajat / single parents
  'yso:p6911', // esikouluikäiset / preschool children (age group)
  'yso:p6914', // kouluikäiset / school-age children
  'yso:p6915', // leikki-ikäiset / preschoolers (age group)
  'yso:p13050', // lapsiperheet / families with children
  'yso:p20513', // vauvaperheet / families with babies
  'yso:p21828', // alakoulu / lower comprehensive school
  'yso:p27540', // yhden vanhemman perheet / single parent families
  'yso:p28565', // erityislapset / children with special needs
];

export const PARTNERS_KEYWORDS = [
  'helfi:6', // Yritykset / Entrepreneurs
  'helfi:7', // Yhdistykset / Associations
  'helmet:10593', // Yhdistykset ja seurat / Associations
  'helmet:10677', // Yrittäjät / Entrepreneurs
  'yso:p1178', // yrittäjät / entrepreneurs
  'yso:p1181', // yritystoiminta / business operations
  'yso:p1182', // yrittäjyys / entrepreneurship
  'yso:p1393', // järjestöt / associations
  'yso:p3128', // yritykset / enterprises
  'yso:p4785', // järjestötoiminta / organisational activities
  'yso:p7642', // kerhot / clubs (recreational)
  'yso:p20482', // yrityspalvelut / business services
  'yso:p21131', // kasvuyritykset / growth companies
  'yso:p28114', // startup-yritykset / startup companies
  'yso:p39441', // jalkapalloseurat / football clubs
  'yso:p39445', // jääkiekkoseurat / ice hockey clubs
];

export const SENIORS_KEYWORDS = [
  'helfi:5', // Vanhukset / Elderly
  'yso:p2208', // isovanhemmat / grandparents
  'yso:p2433', // ikääntyneet / older people
  'yso:p5056', // ikääntyminen / ageing
  'yso:p6448', // vanhustyö / work with the elderly
  'yso:p12787', // vanhustenhuolto / care for older people
  'yso:p13440', // vanhustenneuvolat / guidance centres for the elderly
  'yso:p20755', // vanhustentalot / municipal housing for the elderly
  'yso:p25147', // vanhuspalvelut / services for older people
];

export const YOUTH_KEYWORDS = [
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
];

export const targetGroupData: Record<string, SearchCategoryOption> = {
  [TARGET_GROUPS.ADAPTED_GROUPS]: {
    icon: <IconPersonWheelchair />,
    labelKey: 'appSports:home.targetGroup.adaptedGroups',
    keywords: ADAPTED_GROUPS_KEYWORDS,
  },
  [TARGET_GROUPS.ADULTS]: {
    icon: <IconPersonGenderless />,
    labelKey: 'appSports:home.targetGroup.adults',
    keywords: ADULTS_KEYWORDS,
  },
  [TARGET_GROUPS.CHILDREN_AND_FAMILIES]: {
    icon: <IconFamily />,
    labelKey: 'appSports:home.targetGroup.childrenAndFamilies',
    keywords: CHILDREN_AND_FAMILIES_KEYWORDS,
  },
  [TARGET_GROUPS.PARTNERS]: {
    icon: <IconCompany />,
    labelKey: 'appSports:home.targetGroup.partners',
    keywords: PARTNERS_KEYWORDS,
  },
  [TARGET_GROUPS.SENIORS]: {
    icon: <IconSenior />,
    labelKey: 'appSports:home.targetGroup.seniors',
    keywords: SENIORS_KEYWORDS,
  },
  [TARGET_GROUPS.YOUTH]: {
    icon: <IconYouth />,
    labelKey: 'appSports:home.targetGroup.youth',
    keywords: YOUTH_KEYWORDS,
  },
};

export const MAPPED_PLACES: Record<string, string> = {};
