import { GraphQLError } from 'graphql';
import AppConfig from '../config/AppConfig.js';
import { Sources } from '../contants/constants.js';
import type VenueContext from '../context/VenueContext.js';
import type { Source, TranslatedVenueDetails } from '../types.js';
import createQueryResolver from '../utils/createQueryResolver.js';
import parseVenueId, { IdParseError } from '../utils/parseVenueId.js';
import VenueDepartmentEnricher from './enrichers/VenueDepartmentEnricher.js';
import VenueOntologyTreeEnricher from './enrichers/VenueOntologyTreeEnricher.js';
import VenueOntologyWordsEnricher from './enrichers/VenueOntologyWordsEnricher.js';
import VenueOrganizationEnricher from './enrichers/VenueOrganizationEnricher.js';
import type { HaukiIntegrationConfig } from './integrations/HaukiIntegrationConfig.js';
import IsOpenHaukiIntegration from './integrations/IsOpenHaukiIntegration.js';
import OpeningHoursHaukiIntegration from './integrations/OpeningHoursHaukiIntegration.js';
import VenueServiceMapIntegration from './integrations/VenueServiceMapIntegration.js';
import VenueResolver from './VenueResolver.js';

/**
 * Check at compile time that Subtype is a subset of Supertype or not.
 * @warning This works with string literal types, but not necessarily with all types
 * @return Subtype if Subtype is a subset of Supertype, otherwise raise an error.
 *
 * NOTE: this is also available in '@events-helsinki/components/src/utils/typescript.utils.js',
 * but the module type does not match
 */
export type Subset<Supertype, Subtype extends Supertype> = Subtype;

/**
 * Get keys of union type
 * @example KeysOfUnionType<{a: 1} | {b: 2, c: 3}> == 'a' | 'b' | 'c'
 *
 * NOTE: this is also available in '@events-helsinki/components/src/utils/typescript.utils.js',
 * but the module type does not match
 */
export type KeysOfUnionType<T> = T extends infer U ? keyof U : never;

// List of all the enrichers used by VenueServiceMapIntegration
const USED_SERVICE_MAP_ENRICHERS = [
  VenueDepartmentEnricher,
  VenueOntologyTreeEnricher,
  VenueOntologyWordsEnricher,
  VenueOrganizationEnricher,
] as const;

// Union type of all the enrichers used by VenueServiceMapIntegration
type UsedServiceMapEnrichers = (typeof USED_SERVICE_MAP_ENRICHERS)[number];

// Fields added by VenueServiceMapIntegration's enrichers
export type FieldsAddedByServiceMapEnrichers = KeysOfUnionType<
  Awaited<ReturnType<UsedServiceMapEnrichers['prototype']['getEnrichments']>>
>;

const HAUKI_INTEGRATIONS = [
  IsOpenHaukiIntegration,
  OpeningHoursHaukiIntegration,
] as const;

// Union type of Hauki integrations
type HaukiIntegrations = (typeof HAUKI_INTEGRATIONS)[number];

// Fields added by the Hauki integrations
export type FieldsAddedByHaukiIntegrations = KeysOfUnionType<
  Awaited<ReturnType<HaukiIntegrations['prototype']['config']['format']>>
>;

// Fields added by VenueServiceMapIntegration excluding enrichers
export type UnenrichedFieldsAddedByServiceMapIntegration = keyof Awaited<
  ReturnType<VenueServiceMapIntegration['config']['format']>
>;

// All fields added by all the integrations and enrichers
export type FieldsAddedByAllIntegrationsAndEnrichers =
  | UnenrichedFieldsAddedByServiceMapIntegration
  | FieldsAddedByServiceMapEnrichers
  | FieldsAddedByHaukiIntegrations;

// Check that TranslatedVenueDetails is going to be fully populated
type _CheckVenueDetailsIsFullyPopulated = [
  // TranslatedVenueDetails must contain all the fields added by
  // all the integrations and enrichers
  Subset<
    FieldsAddedByAllIntegrationsAndEnrichers,
    keyof TranslatedVenueDetails
  >,
  // All the fields added by all the integrations and enrichers
  // must be in TranslatedVenueDetails
  Subset<
    keyof TranslatedVenueDetails,
    FieldsAddedByAllIntegrationsAndEnrichers
  >,
];

const HAUKI_CONFIGS: Record<Source, HaukiIntegrationConfig> = {
  tprek: { getId: (id, source) => `${source}:${id}` },
  // Not sure whether this will always work
  linked: { getId: (id, _) => `tprek:${id}` },
};

const resolvers = new Map<Source, (config: AppConfig) => VenueResolver>();
resolvers.set(
  Sources.TPREK,
  () =>
    new VenueResolver({
      integrations: [
        new VenueServiceMapIntegration({
          enrichers: USED_SERVICE_MAP_ENRICHERS.map(
            (enricher) => new enricher()
          ),
        }),
        ...(AppConfig.isHaukiEnabled
          ? HAUKI_INTEGRATIONS.map(
              (integration) => new integration(HAUKI_CONFIGS['tprek'])
            )
          : []),
      ],
    })
);
resolvers.set(
  Sources.LINKED,
  () =>
    new VenueResolver({
      integrations: AppConfig.isHaukiEnabled
        ? HAUKI_INTEGRATIONS.map(
            (integration) => new integration(HAUKI_CONFIGS['linked'])
          )
        : [],
    })
);

async function resolver(_: unknown, params: unknown, context: VenueContext) {
  const paramId = (params as { id: string }).id;
  const [source, id] = parseVenueId(paramId) ?? [];
  const dataResolverFactory = source ? (resolvers.get(source) ?? null) : null;
  const dataResolver = dataResolverFactory
    ? dataResolverFactory({ isHaukiEnabled: AppConfig.isHaukiEnabled })
    : null;

  return (
    (id && source && dataResolver?.resolveVenue(id, source, context)) || null
  );
}

function onError(e: unknown) {
  if (e instanceof IdParseError) {
    throw new GraphQLError('Invalid ID parameter');
  }
}

export default createQueryResolver<Partial<TranslatedVenueDetails>>(
  resolver,
  onError
);
