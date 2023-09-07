import type {
  Subset,
  KeysOfUnionType,
} from '@events-helsinki/components/src/utils/typescript.utils';
import { GraphQLError } from 'graphql';
import AppConfig from '../config/AppConfig';
import { Sources } from '../contants/constants';
import type VenueContext from '../context/VenueContext';
import type { Source, TranslatedVenueDetails } from '../types';
import createQueryResolver from '../utils/createQueryResolver';
import parseVenueId, { IdParseError } from '../utils/parseVenueId';
import VenueDepartmentEnricher from './enrichers/VenueDepartmentEnricher';
import VenueOntologyTreeEnricher from './enrichers/VenueOntologyTreeEnricher';
import VenueOntologyWordsEnricher from './enrichers/VenueOntologyWordsEnricher';
import VenueOrganizationEnricher from './enrichers/VenueOrganizationEnricher';
import type { HaukiIntegrationConfig } from './integrations/HaukiIntegrationConfig';
import IsOpenHaukiIntegration from './integrations/IsOpenHaukiIntegration';
import OpeningHoursHaukiIntegration from './integrations/OpeningHoursHaukiIntegration';
import VenueServiceMapIntegration from './integrations/VenueServiceMapIntegration';
import VenueResolver from './VenueResolver';

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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type _CheckVenueDetailsIsFullyPopulated = [
  // TranslatedVenueDetails must contain all the fields added by
  // all the integrations and enrichers
  Subset<
    FieldsAddedByAllIntegrationsAndEnrichers,
    keyof TranslatedVenueDetails
  >,
  // All the fields added by all the integrations and enrichers
  // must be in TranslatedVenueDetails
  Subset<keyof TranslatedVenueDetails, FieldsAddedByAllIntegrationsAndEnrichers>
];

const HAUKI_CONFIGS: Record<Source, HaukiIntegrationConfig> = {
  tprek: { getId: (id, source) => `${source}:${id}` },
  // Not sure whether this will always work
  linked: { getId: (id, _) => `tprek:${id}` },
};

const resolvers: Map<Source, (config: AppConfig) => VenueResolver> = new Map();
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
  const dataResolverFactory = source ? resolvers.get(source) ?? null : null;
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
