import { SPORTS_CATEGORIES, TARGET_GROUPS } from '../../../types';

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

// Ontology tree IDs for different sports categories, taken from
// https://www.hel.fi/palvelukarttaws/rest/v4/ontologytree/

// Swimming / Uinti
export const SWIMMING_ONTOLOGY_TREE_IDS = [
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

export const ADAPTED_GROUPS_ONTOLOGY_TREE_IDS = [
  685, // Maauimalat ja uimarannat
  688, // Uimapaikka
  689, // Uimaranta
  690, // Uima-altaat, hallit ja kylpylät
  692, // Uima-allas
  693, // Uimahalli
  262, // Liikuntatilat
  2261, // Liikuntapaikat
  153, // Liikuntatilat
  509, // Liikuntatilat
  577, // Liikunta- ja ulkoilureitit
  608, // Kuntoilukeskukset ja liikuntasalit
  612, // Liikuntasali
  614, // Liikuntahallit
  616, // Liikuntahalli
  633, // Ulkokentät ja liikuntapuistot
  646, // Lähiliikunta ja liikuntapuistot
  647, // Liikuntapuisto
  2358, // Liikuntaneuvonta
  606, // Keilahallit
  607, // Keilahalli
  391, // Futsal
  470, // Sähly
  682, // Soutustadion
  572, // Kiipeilypaikat
  573, // Kiipeilykallio
  359, // Tanssitilat
  473, // Tanssi
  630, // Tanssitila
  548, // Ulkoilusaaret
  574, // Ulkokiipeilypaikka
  653, // Ulkokuntoiluvälineet
  704, // Ulkoilumaja  /  hiihtomaja
  714, // Ulkoilualue
  657, // Koripallokenttä
  396, // Jalkapallo
  615, // Jalkapallohalli
  656, // Jalkapallostadion
  660, // Pesäpallostadion
  602, // Jäähallit
  639, // Jääurheilualueet ja luonnonjäät
  669, // Jääspeedway- rata
  654, // Pallokentät
  659, // Pallokenttä
  619, // Salibandyhalli
  415, // Kuntosali
  611, // Kuntosali
  642, // Luistelukenttä
  643, // Luistelureitti
  648, // Lähiliikuntapaikka
  569, // Hiihtotunneli
  595, // Hiihtomaa
  598, // Hiihtosuunnistusalue
  601, // Sisäliikuntatilat
  624, // Yksittäiset lajikohtaiset sisäliikuntapaikat
  628, // Sisäampumarata
  629, // Sisäkiipeilyseinä
  681, // Soudun ja melonnan sisäharjoittelutila
  623, // Tennishalli
  662, // Tenniskenttäalue
  622, // Sulkapallohalli
  454, // Pöytäfutis
  455, // Pöytäjääkiekko
  627, // Pöytätennistila
  2356, // Pöytätennisalue
];

export const ADULTS_ONTOLOGY_TREE_IDS = [
  262, // Liikuntatilat
  2261, // Liikuntapaikat
  577, // Liikunta- ja ulkoilureitit
  612, // Liikuntasali
  614, // Liikuntahallit
  616, // Liikuntahalli
  633, // Ulkokentät ja liikuntapuistot
  646, // Lähiliikunta ja liikuntapuistot
  647, // Liikuntapuisto
  2358, // Liikuntaneuvonta
  606, // Keilahallit
  607, // Keilahalli
  391, // Futsal
  685, // Maauimalat ja uimarannat
  688, // Uimapaikka
  689, // Uimaranta
  690, // Uima-altaat, hallit ja kylpylät
  692, // Uima-allas
  693, // Uimahalli
  470, // Sähly
  682, // Soutustadion
  572, // Kiipeilypaikat
  573, // Kiipeilykallio
  359, // Tanssitilat
  473, // Tanssi
  630, // Tanssitila
  608, // Kuntoilukeskukset ja liikuntasalit
  548, // Ulkoilusaaret
  574, // Ulkokiipeilypaikka
  653, // Ulkokuntoiluvälineet
  704, // Ulkoilumaja  /  hiihtomaja
  714, // Ulkoilualue
  657, // Koripallokenttä
  396, // Jalkapallo
  615, // Jalkapallohalli
  656, // Jalkapallostadion
  660, // Pesäpallostadion
  602, // Jäähallit
  639, // Jääurheilualueet ja luonnonjäät
  669, // Jääspeedway- rata
  654, // Pallokentät
  659, // Pallokenttä
  619, // Salibandyhalli
  415, // Kuntosali
  611, // Kuntosali
  642, // Luistelukenttä
  643, // Luistelureitti
  648, // Lähiliikuntapaikka
  569, // Hiihtotunneli
  595, // Hiihtomaa
  598, // Hiihtosuunnistusalue
  601, // Sisäliikuntatilat
  624, // Yksittäiset lajikohtaiset sisäliikuntapaikat
  628, // Sisäampumarata
  629, // Sisäkiipeilyseinä
  681, // Soudun ja melonnan sisäharjoittelutila
  623, // Tennishalli
  662, // Tenniskenttäalue
  622, // Sulkapallohalli
  454, // Pöytäfutis
  455, // Pöytäjääkiekko
  627, // Pöytätennistila
  2356, // Pöytätennisalue
];

export const CHILDREN_AND_FAMILIES_ONTOLOGY_TREE_IDS = [
  68, // Leikkipuistot
  2134, // Leikkipuiston järjestämät ryhmät
  2052, // Leikkipuiston järjestämät ryhmät
  2059, // Leikkipuiston järjestämät ryhmät
  69, // Ohjattu leikkipuistotoiminta
  70, // Leikkipaikat (ei ohjattua toimintaa)
  499, // Leikkipuistot
  500, // Ohjattu leikkipuistotoiminta
  501, // Leikkipaikat (ei ohjattua toimintaa)
  975, // Leikkitoiminta
  980, // Leikkikoulu
  981, // Ohjattu leikkipuistotoiminta
  1185, // Päiväkodin järjestämät ryhmät
  685, // Maauimalat ja uimarannat
  688, // Uimapaikka
  689, // Uimaranta
  690, // Uima-altaat, hallit ja kylpylät
  692, // Uima-allas
  693, // Uimahalli
  262, // Liikuntatilat
  2261, // Liikuntapaikat
  577, // Liikunta- ja ulkoilureitit
  612, // Liikuntasali
  614, // Liikuntahallit
  616, // Liikuntahalli
  633, // Ulkokentät ja liikuntapuistot
  646, // Lähiliikunta ja liikuntapuistot
  647, // Liikuntapuisto
  606, // Keilahallit
  607, // Keilahalli
  391, // Futsal
  470, // Sähly
  572, // Kiipeilypaikat
  573, // Kiipeilykallio
  359, // Tanssitilat
  473, // Tanssi
  630, // Tanssitila
  548, // Ulkoilusaaret
  704, // Ulkoilumaja  /  hiihtomaja
  714, // Ulkoilualue
  657, // Koripallokenttä
  396, // Jalkapallo
  615, // Jalkapallohalli
  656, // Jalkapallostadion
  660, // Pesäpallostadion
  602, // Jäähallit
  639, // Jääurheilualueet ja luonnonjäät
  669, // Jääspeedway- rata
  654, // Pallokentät
  659, // Pallokenttä
  619, // Salibandyhalli
  642, // Luistelukenttä
  643, // Luistelureitti
  648, // Lähiliikuntapaikka
  569, // Hiihtotunneli
  595, // Hiihtomaa
  598, // Hiihtosuunnistusalue
  601, // Sisäliikuntatilat
  624, // Yksittäiset lajikohtaiset sisäliikuntapaikat
  629, // Sisäkiipeilyseinä
  681, // Soudun ja melonnan sisäharjoittelutila
  623, // Tennishalli
  662, // Tenniskenttäalue
  622, // Sulkapallohalli
  454, // Pöytäfutis
  455, // Pöytäjääkiekko
  627, // Pöytätennistila
  2356, // Pöytätennisalue
];

export const PARTNERS_ONTOLOGY_TREE_IDS = [
  262, // Liikuntatilat
  2261, // Liikuntapaikat
  153, // Liikuntatilat
  509, // Liikuntatilat
];

export const SENIORS_ONTOLOGY_TREE_IDS = [
  2217, // Senioriliikunta
  2218, // Seniorijumppa
  2219, // Seniorikuntosalit
  2220, // Seniorikävely
  2221, // Senioriliikunta
  2222, // Seniorimiekkailu
  2223, // Senioripalloilu
  2224, // Seniorisäpinät
  2225, // Senioritanssi
  2226, // Seniorivesiliikunta
  262, // Liikuntatilat
  2261, // Liikuntapaikat
  577, // Liikunta- ja ulkoilureitit
  612, // Liikuntasali
  614, // Liikuntahallit
  616, // Liikuntahalli
  633, // Ulkokentät ja liikuntapuistot
  646, // Lähiliikunta ja liikuntapuistot
  647, // Liikuntapuisto
  2358, // Liikuntaneuvonta
  606, // Keilahallit
  607, // Keilahalli
  391, // Futsal
  685, // Maauimalat ja uimarannat
  688, // Uimapaikka
  689, // Uimaranta
  690, // Uima-altaat, hallit ja kylpylät
  692, // Uima-allas
  693, // Uimahalli
  470, // Sähly
  682, // Soutustadion
  572, // Kiipeilypaikat
  573, // Kiipeilykallio
  359, // Tanssitilat
  473, // Tanssi
  630, // Tanssitila
  608, // Kuntoilukeskukset ja liikuntasalit
  548, // Ulkoilusaaret
  574, // Ulkokiipeilypaikka
  653, // Ulkokuntoiluvälineet
  704, // Ulkoilumaja  /  hiihtomaja
  714, // Ulkoilualue
  657, // Koripallokenttä
  396, // Jalkapallo
  615, // Jalkapallohalli
  656, // Jalkapallostadion
  660, // Pesäpallostadion
  602, // Jäähallit
  639, // Jääurheilualueet ja luonnonjäät
  669, // Jääspeedway- rata
  654, // Pallokentät
  659, // Pallokenttä
  619, // Salibandyhalli
  415, // Kuntosali
  611, // Kuntosali
  642, // Luistelukenttä
  643, // Luistelureitti
  648, // Lähiliikuntapaikka
  569, // Hiihtotunneli
  595, // Hiihtomaa
  598, // Hiihtosuunnistusalue
  601, // Sisäliikuntatilat
  624, // Yksittäiset lajikohtaiset sisäliikuntapaikat
  628, // Sisäampumarata
  629, // Sisäkiipeilyseinä
  681, // Soudun ja melonnan sisäharjoittelutila
  623, // Tennishalli
  662, // Tenniskenttäalue
  622, // Sulkapallohalli
  454, // Pöytäfutis
  455, // Pöytäjääkiekko
  627, // Pöytätennistila
  2356, // Pöytätennisalue
];

export const YOUTH_ONTOLOGY_TREE_IDS = [
  2336, // Nuorten asumisen tuki
  490, // Nuorten neuvonta ja ohjaus
  263, // Nuorisotilat
  154, // Nuorisotilat
  510, // Nuorisotilat
  365, // Nuoriso
  366, // Nuorisotalot
  375, // Avoin nuorisotoiminta
  685, // Maauimalat ja uimarannat
  688, // Uimapaikka
  689, // Uimaranta
  690, // Uima-altaat, hallit ja kylpylät
  692, // Uima-allas
  693, // Uimahalli
  262, // Liikuntatilat
  2261, // Liikuntapaikat
  577, // Liikunta- ja ulkoilureitit
  612, // Liikuntasali
  614, // Liikuntahallit
  616, // Liikuntahalli
  633, // Ulkokentät ja liikuntapuistot
  646, // Lähiliikunta ja liikuntapuistot
  647, // Liikuntapuisto
  606, // Keilahallit
  607, // Keilahalli
  391, // Futsal
  470, // Sähly
  572, // Kiipeilypaikat
  573, // Kiipeilykallio
  359, // Tanssitilat
  473, // Tanssi
  630, // Tanssitila
  548, // Ulkoilusaaret
  704, // Ulkoilumaja  /  hiihtomaja
  714, // Ulkoilualue
  657, // Koripallokenttä
  396, // Jalkapallo
  615, // Jalkapallohalli
  656, // Jalkapallostadion
  660, // Pesäpallostadion
  602, // Jäähallit
  639, // Jääurheilualueet ja luonnonjäät
  669, // Jääspeedway- rata
  654, // Pallokentät
  659, // Pallokenttä
  619, // Salibandyhalli
  642, // Luistelukenttä
  643, // Luistelureitti
  648, // Lähiliikuntapaikka
  569, // Hiihtotunneli
  595, // Hiihtomaa
  598, // Hiihtosuunnistusalue
  601, // Sisäliikuntatilat
  624, // Yksittäiset lajikohtaiset sisäliikuntapaikat
  629, // Sisäkiipeilyseinä
  681, // Soudun ja melonnan sisäharjoittelutila
  623, // Tennishalli
  662, // Tenniskenttäalue
  622, // Sulkapallohalli
  454, // Pöytäfutis
  455, // Pöytäjääkiekko
  627, // Pöytätennistila
  2356, // Pöytätennisalue
];

export const TARGET_GROUPS_TO_ONTOLOGY_TREE_IDS: Record<
  TARGET_GROUPS,
  number[]
> = {
  [TARGET_GROUPS.ADAPTED_GROUPS]: ADAPTED_GROUPS_ONTOLOGY_TREE_IDS,
  [TARGET_GROUPS.ADULTS]: ADULTS_ONTOLOGY_TREE_IDS,
  [TARGET_GROUPS.CHILDREN_AND_FAMILIES]:
    CHILDREN_AND_FAMILIES_ONTOLOGY_TREE_IDS,
  [TARGET_GROUPS.PARTNERS]: PARTNERS_ONTOLOGY_TREE_IDS,
  [TARGET_GROUPS.SENIORS]: SENIORS_ONTOLOGY_TREE_IDS,
  [TARGET_GROUPS.YOUTH]: YOUTH_ONTOLOGY_TREE_IDS,
};
