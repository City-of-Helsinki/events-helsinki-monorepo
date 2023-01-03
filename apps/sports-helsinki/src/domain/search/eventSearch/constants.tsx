import { Season } from 'events-helsinki-components';
import React from 'react';

import IconGym from '../../../assets/icons/IconGym';
import IconIceSkating from '../../../assets/icons/IconIceSkating';
import IconIndoorSportsHalls from '../../../assets/icons/IconIndoorSportsHalls';
import IconOutdoorRecreation from '../../../assets/icons/IconOutdoorRecreation';
import IconSkiing from '../../../assets/icons/IconSkiing';
import IconSports from '../../../assets/icons/IconSports';
import IconSwimming from '../../../assets/icons/IconSwimming';

import type { Filters, SearchCategoryOption } from './types';

// Page size of the event list
export const PAGE_SIZE = 10;

export enum COURSE_CATEGORIES {
  SPORT = 'sport',
}

export enum SPORTS_CATEGORIES {
  SWIMMING = 'swimming',
  SKIING = 'skiing',
  ICE_SKATING = 'ice_skating',
  GYM = 'gym',
  NEIGHBOURHOOD_SPORTS_SITES = 'neighbourhood_sports_sites',
  INDOOR_SPORTS_HALLS = 'indoor_sports_halls',
  OUTDOOR_RECREATION = 'outdoor_recreation',
  GUIDED_EXERCISE = 'guided_exercise',
}

// TODO: Remove these since they should not be needed when the general events are not used at all.
export const EVENT_DEFAULT_SEARCH_FILTERS: Filters = {
  dateTypes: [],
  end: null,
  keyword: [],
  keywordNot: [],
  places: [],
  publisher: null,
  start: null,
  text: [],
  eventType: [],
};

export const COURSE_DEFAULT_SEARCH_FILTERS = EVENT_DEFAULT_SEARCH_FILTERS;

export enum EVENT_SORT_OPTIONS {
  DURATION = 'duration',
  DURATION_DESC = '-duration',
  END_TIME = 'end_time',
  END_TIME_DESC = '-end_time',
  LAST_MODIFIED_TIME = 'last_modified_time',
  LAST_MODIFIED_TIME_DESC = '-last_modified_time',
  START_TIME = 'start_time',
  START_TIME_DESC = '-start_time',
}

export enum EVENT_SEARCH_FILTERS {
  CATEGORIES = 'categories',
  HOBBY_TYPES = 'hobbyTypes',
  DATE_TYPES = 'dateTypes',
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
  TEXT = 'text',
  MIN_AGE = 'audienceMinAgeLt',
  MAX_AGE = 'audienceMaxAgeGt',
  SUITABLE = 'suitableFor',
  EVENT_TYPE = 'eventType',
}

export const CATEGORY_CATALOG = {
  sportsCategories: {
    default: [
      SPORTS_CATEGORIES.SWIMMING,
      SPORTS_CATEGORIES.SKIING,
      SPORTS_CATEGORIES.ICE_SKATING,
      SPORTS_CATEGORIES.GYM,
      SPORTS_CATEGORIES.NEIGHBOURHOOD_SPORTS_SITES,
      SPORTS_CATEGORIES.INDOOR_SPORTS_HALLS,
      SPORTS_CATEGORIES.OUTDOOR_RECREATION,
      SPORTS_CATEGORIES.GUIDED_EXERCISE,
    ],
    landingPage: [
      SPORTS_CATEGORIES.SWIMMING,
      SPORTS_CATEGORIES.SKIING,
      SPORTS_CATEGORIES.ICE_SKATING,
      SPORTS_CATEGORIES.GYM,
      SPORTS_CATEGORIES.NEIGHBOURHOOD_SPORTS_SITES,
      SPORTS_CATEGORIES.INDOOR_SPORTS_HALLS,
      SPORTS_CATEGORIES.OUTDOOR_RECREATION,
      SPORTS_CATEGORIES.GUIDED_EXERCISE,
    ],
  },
};

export const SPORT_COURSES_KEYWORDS = [
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
  },
  [SPORTS_CATEGORIES.SKIING]: {
    icon: <IconSkiing />,
    labelKey: 'appSports:home.sportsCategory.skiing',
    seasons: [Season.Winter],
  },
  [SPORTS_CATEGORIES.ICE_SKATING]: {
    icon: <IconIceSkating />,
    labelKey: 'appSports:home.sportsCategory.iceSkating',
    seasons: [Season.Winter],
  },
  [SPORTS_CATEGORIES.GYM]: {
    icon: <IconGym />,
    labelKey: 'appSports:home.sportsCategory.gym',
    seasons: [Season.Summer, Season.Winter],
  },
  [SPORTS_CATEGORIES.NEIGHBOURHOOD_SPORTS_SITES]: {
    // TODO proper icon missing
    icon: <IconSports />,
    labelKey: 'appSports:home.sportsCategory.neighbourhoodSportsSites',
    seasons: [Season.Summer, Season.Winter],
  },
  [SPORTS_CATEGORIES.INDOOR_SPORTS_HALLS]: {
    icon: <IconIndoorSportsHalls />,
    labelKey: 'appSports:home.sportsCategory.indoorSportsHalls',
    seasons: [Season.Summer, Season.Winter],
  },
  [SPORTS_CATEGORIES.OUTDOOR_RECREATION]: {
    icon: <IconOutdoorRecreation />,
    labelKey: 'appSports:home.sportsCategory.outdoorRecreation',
    seasons: [Season.Summer, Season.Winter],
  },
  [SPORTS_CATEGORIES.GUIDED_EXERCISE]: {
    // TODO proper icon missing
    icon: <IconSports />,
    labelKey: 'appSports:home.sportsCategory.guidedExercise',
    seasons: [Season.Summer, Season.Winter],
  },
};

export const MAPPED_PLACES: Record<string, string> = {};
