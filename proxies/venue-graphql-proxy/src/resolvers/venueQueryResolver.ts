import { GraphQLError } from 'graphql';
import AppConfig from '../config/AppConfig';
import { Sources } from '../contants/constants';
import VenueOntologyEnricher from '../enrichers/VenueOntologyEnricher';
import HaukiIntegration from '../integrations/VenueHaukiIntegration';
import VenueLinkedIntegration from '../integrations/VenueLinkedIntegration';
import type VenueResolverIntegration from '../integrations/VenueResolverIntegration';
import VenueTprekIntegration from '../integrations/VenueTprekIntegration';
import type { AnyObject, Source } from '../types';
import createQueryResolver from '../utils/createQueryResolver';
import parseVenueId, { IdParseError } from '../utils/parseVenueId';
import VenueResolver from './VenueResolver';

const resolvers: Map<Source, (config: AppConfig) => VenueResolver> = new Map();
resolvers.set(
  Sources.TPREK,
  () =>
    new VenueResolver({
      integrations: [
        new VenueTprekIntegration({
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
        new VenueLinkedIntegration({
          enrichers: [],
        }),
        AppConfig.isHaukiEnabled
          ? new HaukiIntegration({
              // I'm not sure if we can expect for this to always work
              getId: (id) => `tprek:${id}`,
            })
          : null,
      ].filter((item) => item) as VenueResolverIntegration<AnyObject>[],
    })
);

async function resolver(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { id: idWithSource }: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { language, dataSources, haukiEnabled }: any
) {
  const [source, id] = parseVenueId(idWithSource) ?? [];
  const dataResolverFactory = source ? resolvers.get(source) ?? null : null;
  const dataResolver = dataResolverFactory
    ? dataResolverFactory({ haukiEnabled })
    : null;

  return id && source
    ? dataResolver?.resolveVenue(id, source, { language, dataSources })
    : null;
}

function onError(e: unknown) {
  if (e instanceof IdParseError) {
    throw new GraphQLError('Invalid ID parameter');
  }
}

export default createQueryResolver(resolver, onError);
