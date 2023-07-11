/* eslint-disable */
import { SPORTS_CATEGORIES, SortOrder } from '../../../types';

export const OrderDir = {
  asc: 'asc',
  desc: 'desc',
} as const;

export type OrderDirType = (typeof OrderDir)[keyof typeof OrderDir];

export const UnifiedSearchOrderBy = {
  relevance: 'relevance',
  distance: 'distance',
  name: 'name',
} as const;

export type UnifiedSearchOrderByType =
  (typeof UnifiedSearchOrderBy)[keyof typeof UnifiedSearchOrderBy];

export const orderDirToUnifiedSearchDistanceOrder = {
  asc: SortOrder.Ascending,
  desc: SortOrder.Descending,
} as const;

// Ontology tree IDs for different sports categories, taken from
// https://www.hel.fi/palvelukarttaws/rest/v4/ontologytree/

// Swimming / Uinti
export const SWIMMING_ONTOLOGY_TREE_IDS = [
  20, // Koirauimarannat / Dog beaches
  684, // Vesiliikuntapaikat / Water sports facilities
];

// Skiing / Hiihto
export const SKIING_ONTOLOGY_TREE_IDS = [
  569, // Hiihtotunneli / Ski tunnel
  575, // Laskettelurinteet ja rinnehiihtokeskukset / Ski slopes and downhill ski resorts
  580, // Koirahiihtolatu / Dog skijoring track
  592, // Maastohiihtokeskukset / Cross-country ski resorts
  598, // Hiihtosuunnistusalue / Ski orienteering area
  683, // Vesihiihtoalue / Water ski area
  704, // Ulkoilumaja/hiihtomaja / Outdoor/ski lodge
];

// Ice skating / Luistelu
export const ICE_SKATING_ONTOLOGY_TREE_IDS = [
  602, // Jäähallit / Ice-skating arenas
  639, // Jääurheilualueet ja luonnonjäät / Ice sports areas and sites with natural ice
];

// Gym / Kuntosalit
export const GYM_ONTOLOGY_TREE_IDS = [
  415, // Kuntosali / Gym
  611, // Kuntosali / Gym
  2219, // Seniorikuntosalit / Senior gyms
];

// Outdoor gyms / Ulkokuntosalit
export const OUTDOOR_GYMS_ONTOLOGY_TREE_IDS = [
  653, // Ulkokuntoiluvälineet / Fitness training park
];

// Playgrounds / Leikkipuistot
export const PLAYGROUNDS_ONTOLOGY_TREE_IDS = [
  68, // Leikkipuistot / Playgrounds
  69, // Ohjattu leikkipuistotoiminta / Supervised playground activities
  499, // Leikkipuistot / Playgrounds
  500, // Ohjattu leikkipuistotoiminta / Supervised playground activities
  981, // Ohjattu leikkipuistotoiminta / Supervised playground activities
];

// Tennis
export const TENNIS_ONTOLOGY_TREE_IDS = [
  623, // Tennishalli / Tennis hall
  662, // Tenniskenttäalue / Tennis court area
];

// Skateboarding / Skeittaus
export const SKATEBOARDING_ONTOLOGY_TREE_IDS = [
  467, // Skeittaus / Skateboarding
  620, // Skeittihalli / Skateboarding hall
  652, // Skeitti/rullaluistelupaikka / Skateboarding/roller-blading rink
];

// Indoor sports halls / Sisäliikuntahallit
export const INDOOR_SPORTS_HALLS_ONTOLOGY_TREE_IDS = [
  601, // Sisäliikuntatilat / Indoor sports facilities
];

// Outdoor recreation / Ulkoilu
export const OUTDOOR_RECREATION_ONTOLOGY_TREE_IDS = [
  558, // Maastoliikuntapaikat / Cross-country sports facilities
  577, // Liikunta- ja ulkoilureitit / Sports and outdoor recreation routes
  706, // Virkistys- ja retkeilyalueet / Recreational and outdoor areas
];

// Guided exercise / Ohjattu liikunta
export const GUIDED_EXERCISE_ONTOLOGY_TREE_IDS = [
  2358, // Liikuntaneuvonta / Physical education guidance
];

export const SPORTS_CATEGORY_TO_ONTOLOGY_TREE_IDS: Record<
  SPORTS_CATEGORIES,
  number[]
> = {
  [SPORTS_CATEGORIES.SWIMMING]: SWIMMING_ONTOLOGY_TREE_IDS,
  [SPORTS_CATEGORIES.SKIING]: SKIING_ONTOLOGY_TREE_IDS,
  [SPORTS_CATEGORIES.ICE_SKATING]: ICE_SKATING_ONTOLOGY_TREE_IDS,
  [SPORTS_CATEGORIES.GYM]: GYM_ONTOLOGY_TREE_IDS,
  [SPORTS_CATEGORIES.OUTDOOR_GYMS]: OUTDOOR_GYMS_ONTOLOGY_TREE_IDS,
  [SPORTS_CATEGORIES.PLAYGROUNDS]: PLAYGROUNDS_ONTOLOGY_TREE_IDS,
  [SPORTS_CATEGORIES.TENNIS]: TENNIS_ONTOLOGY_TREE_IDS,
  [SPORTS_CATEGORIES.SKATEBOARDING]: SKATEBOARDING_ONTOLOGY_TREE_IDS,
  [SPORTS_CATEGORIES.INDOOR_SPORTS_HALLS]:
    INDOOR_SPORTS_HALLS_ONTOLOGY_TREE_IDS,
  [SPORTS_CATEGORIES.OUTDOOR_RECREATION]: OUTDOOR_RECREATION_ONTOLOGY_TREE_IDS,
  [SPORTS_CATEGORIES.GUIDED_EXERCISE]: GUIDED_EXERCISE_ONTOLOGY_TREE_IDS,
};
