import { startServerAndCreateNextHandler } from '@as-integrations/next';
import accepts from 'accepts';
import type { NextApiRequest } from 'next';
// import LinkedDataSource from 'domain/graphql/services/linked/LinkedDataSource';
import AppConfig from '../../domain/app/AppConfig';
import createApolloServer from '../../domain/graphql/createApolloServer';
import HaukiDataSource from '../../domain/graphql/services/HaukiDataSource';
import TprekDataSource from '../../domain/graphql/services/TprekDataSource';
import type { Context } from '../../domain/nextApi/types';

// TODO: Implement sentry connection
const apolloServer = createApolloServer({
  haukiEnabled: AppConfig.isHaukiEnabled,
});

function acceptsLanguages(
  req: NextApiRequest,
  languages: string[]
): typeof languages[number] | false {
  const accept = accepts(req);

  return accept.languages(languages);
}

export default startServerAndCreateNextHandler(apolloServer, {
  context: async (req: NextApiRequest) => {
    const { cache } = apolloServer;
    const language = acceptsLanguages(req, AppConfig.locales);
    return {
      // We create new instances of our data sources with each request,
      // passing in our server's cache.
      dataSources: {
        hauki: new HaukiDataSource({ cache }),
        tprek: new TprekDataSource({ cache }),
        // linked: new LinkedDataSource({ cache }),
      },
      // Some fields are relying on language set in the header.
      // The translation object will be returned as a string
      // and the language from the context is used to select the right translation.
      language,
      haukiEnabled: AppConfig.isHaukiEnabled,
    } as Context;
  },
});
