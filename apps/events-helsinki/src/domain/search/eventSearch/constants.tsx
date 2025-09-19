import {
  EVENT_SEARCH_FILTERS,
  EventTypeId,
  IconCultureAndArts,
  IconDance,
  IconFood,
  IconMovies,
  IconMuseum,
  IconMusic,
  IconSports,
  IconTheatre,
  IconTree,
} from '@events-helsinki/components';
import { IconSpeechbubbleText } from 'hds-react';
import React from 'react';
import type { Filters, SearchCategoryOption } from './types';

// Page size of the event list
export const PAGE_SIZE = 10;

export enum EVENT_CATEGORIES {
  CULTURE = 'culture',
  DANCE = 'dance',
  FOOD = 'food',
  INFLUENCE = 'influence',
  MOVIE = 'movie',
  MUSEUM = 'museum',
  MUSIC = 'music',
  NATURE = 'nature',
  SPORT = 'sport',
  THEATRE = 'theatre',
}

export const EVENT_DEFAULT_SEARCH_FILTERS: Omit<
  Filters,
  EVENT_SEARCH_FILTERS.ONGOING
> = {
  [EVENT_SEARCH_FILTERS.CATEGORIES]: [],
  [EVENT_SEARCH_FILTERS.DATE_TYPES]: [],
  [EVENT_SEARCH_FILTERS.END]: null,
  [EVENT_SEARCH_FILTERS.IS_FREE]: false,
  [EVENT_SEARCH_FILTERS.KEYWORD]: [],
  [EVENT_SEARCH_FILTERS.KEYWORD_NOT]: [],
  [EVENT_SEARCH_FILTERS.PLACES]: [],
  [EVENT_SEARCH_FILTERS.PUBLISHER]: null,
  [EVENT_SEARCH_FILTERS.START]: null,
  [EVENT_SEARCH_FILTERS.TEXT]: [],
};

export const CATEGORY_CATALOG = {
  [EventTypeId.General]: {
    default: [
      EVENT_CATEGORIES.MOVIE,
      EVENT_CATEGORIES.CULTURE,
      EVENT_CATEGORIES.SPORT,
      EVENT_CATEGORIES.NATURE,
      EVENT_CATEGORIES.MUSEUM,
      EVENT_CATEGORIES.MUSIC,
      EVENT_CATEGORIES.INFLUENCE,
      EVENT_CATEGORIES.FOOD,
      EVENT_CATEGORIES.DANCE,
      EVENT_CATEGORIES.THEATRE,
    ],
    landingPage: [
      EVENT_CATEGORIES.MOVIE,
      EVENT_CATEGORIES.CULTURE,
      EVENT_CATEGORIES.SPORT,
      EVENT_CATEGORIES.NATURE,
      EVENT_CATEGORIES.MUSEUM,
      EVENT_CATEGORIES.MUSIC,
      EVENT_CATEGORIES.DANCE,
      EVENT_CATEGORIES.THEATRE,
    ],
  },
  [EventTypeId.Course]: {},
};

export const CULTURE_KEYWORDS: readonly string[] = [
  'kulke:33', // Teatteri
  'kulke:51', // Sirkus
  'kulke:205', // Elokuva ja media
  'kulke:351', // Teatteri ja sirkus
  'matko:teatteri', // teatteri
  'yso:p360', // cultural events
  'yso:p1235', // films
  'yso:p1278', // dance (performing arts)
  'yso:p1808', // music
  'yso:p2625', // in Finnish teatteritaide, "theatre arts"
  'yso:p2739', // fine arts
  'yso:p2850', // performing arts
  'yso:p2851', // art
  'yso:p4934', // museums
  'yso:p5121', // exhibitions
  'yso:p6889', // art exhibitions
  'yso:p7969', // literary art
  'yso:p8113', // literature
  'yso:p8144', // art museums
  'yso:p9592', // modern art
  'yso:p9593', // contemporary art
  'yso:p10105', // contemporary dance
  'yso:p16327', // cinema (art forms)
] as const;

export const DANCE_KEYWORDS: readonly string[] = [
  'yso:p1278', // Tanssi
] as const;

export const FOOD_KEYWORDS: readonly string[] = [
  'yso:p3670', // Ruoka
] as const;

export const INFLUENCE_KEYWORDS: readonly string[] = [
  'yso:p1657', // Vaikuttaminen
  'yso:p742', // Demokratia
  'yso:p5164', // Osallisuus
  'yso:p8268', // Kaavoitus
  'yso:p15882', // Asemakaavoitus
  'yso:p15292', // Kaupunkipolitiikka
] as const;

export const MOVIE_KEYWORDS: readonly string[] = [
  'yso:p1235', // Elokuvat
] as const;

export const MUSEUM_KEYWORDS: readonly string[] = [
  'matko:museo', // Museo
  'yso:p4934', // Museot
  'yso:p8144', // Taidemuseot
] as const;

export const MUSIC_KEYWORDS: readonly string[] = [
  'yso:p1808', // Musiikki
  'kulke:31', // Musiikki
  'kulke:348', // Musiikki
] as const;

export const NATURE_KEYWORDS: readonly string[] = [
  'yso:p2771', // Ulkoilu
  'yso:p13084', // Luonto
] as const;

export const SPORT_KEYWORDS: readonly string[] = [
  'yso:p916', // Liikunta
  'yso:p965', // Urheilu
] as const;

export const THEATRE_KEYWORDS: readonly string[] = [
  'kulke:33', // Teatteri
  'yso:p2625', // Teatteritaide
] as const;

export const MAPPED_EVENT_CATEGORIES: Record<
  EVENT_CATEGORIES,
  readonly string[]
> = {
  [EVENT_CATEGORIES.CULTURE]: CULTURE_KEYWORDS,
  [EVENT_CATEGORIES.DANCE]: DANCE_KEYWORDS,
  [EVENT_CATEGORIES.FOOD]: FOOD_KEYWORDS,
  [EVENT_CATEGORIES.INFLUENCE]: INFLUENCE_KEYWORDS,
  [EVENT_CATEGORIES.MOVIE]: MOVIE_KEYWORDS,
  [EVENT_CATEGORIES.MUSEUM]: MUSEUM_KEYWORDS,
  [EVENT_CATEGORIES.MUSIC]: MUSIC_KEYWORDS,
  [EVENT_CATEGORIES.NATURE]: NATURE_KEYWORDS,
  [EVENT_CATEGORIES.SPORT]: SPORT_KEYWORDS,
  [EVENT_CATEGORIES.THEATRE]: THEATRE_KEYWORDS,
} as const;

export const eventCategories: Record<EVENT_CATEGORIES, SearchCategoryOption> = {
  [EVENT_CATEGORIES.MOVIE]: {
    icon: <IconMovies />,
    labelKey: 'home:category.movie',
  },
  [EVENT_CATEGORIES.MUSIC]: {
    icon: <IconMusic />,
    labelKey: 'home:category.music',
  },
  [EVENT_CATEGORIES.SPORT]: {
    icon: <IconSports />,
    labelKey: 'home:category.sport',
  },
  [EVENT_CATEGORIES.MUSEUM]: {
    icon: <IconMuseum />,
    labelKey: 'home:category.museum',
  },
  [EVENT_CATEGORIES.DANCE]: {
    icon: <IconDance />,
    labelKey: 'home:category.dance',
  },
  [EVENT_CATEGORIES.CULTURE]: {
    icon: <IconCultureAndArts />,
    labelKey: 'home:category.culture',
  },
  [EVENT_CATEGORIES.NATURE]: {
    icon: <IconTree />,
    labelKey: 'home:category.nature',
  },
  [EVENT_CATEGORIES.INFLUENCE]: {
    icon: <IconSpeechbubbleText aria-hidden />,
    labelKey: 'home:category.influence',
  },
  [EVENT_CATEGORIES.THEATRE]: {
    icon: <IconTheatre />,
    labelKey: 'home:category.theatre',
  },
  [EVENT_CATEGORIES.FOOD]: {
    icon: <IconFood />,
    labelKey: 'home:category.food',
  },
} as const;
