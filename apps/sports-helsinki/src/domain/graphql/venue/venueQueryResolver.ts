import { GraphQLError } from 'graphql';
import { Sources } from '../../app/appConstants';
import type { AnyObject, Source } from '../../nextApi/types';
import type { LiikuntaServerConfig } from '../createApolloServer';
import createQueryResolver from '../createQueryResolver';
import VenueHaukiIntegration from './instructions/VenueHaukiIntegration';
import VenueLinkedIntegration from './instructions/VenueLinkedIntegration';
import VenueOntologyEnricher from './instructions/VenueOntologyEnricher';
import VenueResolver from './instructions/VenueResolver';
import type VenueResolverIntegration from './instructions/VenueResolverIntegration';
import VenueTprekIntegration from './instructions/VenueTprekIntegration';
import parseVenueId, { IdParseError } from './parseVenueId';

const resolvers: Map<Source, (config: LiikuntaServerConfig) => VenueResolver> =
  new Map();
resolvers.set(
  Sources.TPREK,
  (config) =>
    new VenueResolver({
      integrations: [
        new VenueTprekIntegration({
          enrichers: [new VenueOntologyEnricher()],
        }),
        config.haukiEnabled
          ? new VenueHaukiIntegration({
              getId: (id, source) => `${source}:${id}`,
            })
          : null,
      ].filter((item) => !!item) as VenueResolverIntegration<AnyObject>[],
    })
);
resolvers.set(
  Sources.LINKED,
  (config) =>
    new VenueResolver({
      integrations: [
        new VenueLinkedIntegration({
          enrichers: [],
        }),
        config.haukiEnabled
          ? new VenueHaukiIntegration({
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
