import { GraphQLError } from 'graphql';
import AppConfig from '../config/AppConfig';
import { Sources } from '../contants/constants';
import type VenueContext from '../context/VenueContext';
import type { AnyObject, Source, VenueDetails } from '../types';
import createQueryResolver from '../utils/createQueryResolver';
import parseVenueId, { IdParseError } from '../utils/parseVenueId';
import VenueOntologyEnricher from './enrichers/VenueOntologyEnricher';
import HaukiIntegration from './integrations/VenueHaukiIntegration';
import type VenueResolverIntegration from './integrations/VenueResolverIntegration';
import VenueServiceMapIntegration from './integrations/VenueServiceMapIntegration';
import VenueResolver from './VenueResolver';

const resolvers: Map<Source, (config: AppConfig) => VenueResolver> = new Map();
resolvers.set(
  Sources.TPREK,
  () =>
    new VenueResolver({
      integrations: [
        new VenueServiceMapIntegration({
          enrichers: [new VenueOntologyEnricher()],
        }),
        AppConfig.isHaukiEnabled
          ? new HaukiIntegration({
              getId: (id, source) => `${source}:${id}`,
            })
          : null,
      ].filter((item) => !!item) as VenueResolverIntegration<AnyObject>[],
    })
);
resolvers.set(
  Sources.LINKED,
  () =>
    new VenueResolver({
      integrations: [
        AppConfig.isHaukiEnabled
          ? new HaukiIntegration({
              // I'm not sure if we can expect for this to always work
              getId: (id) => `tprek:${id}`,
            })
          : null,
      ].filter((item) => item) as VenueResolverIntegration<AnyObject>[],
    })
);

async function resolver(_: unknown, params: unknown, context: VenueContext) {
  const paramId = (params as { id: string }).id;
  const [source, id] = parseVenueId(paramId) ?? [];
  const dataResolverFactory = source ? resolvers.get(source) ?? null : null;
  const dataResolver = dataResolverFactory
    ? dataResolverFactory({ haukiEnabled: AppConfig.isHaukiEnabled })
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

export default createQueryResolver<VenueDetails>(resolver, onError);
