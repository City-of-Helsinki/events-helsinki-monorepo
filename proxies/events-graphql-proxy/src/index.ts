/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config();
import { RewriteFrames } from '@sentry/integrations';
import * as Sentry from '@sentry/node';
import type { ExpressContext } from 'apollo-server-express';
import { ApolloServer } from 'apollo-server-express';
import type { GraphQLRequestContext } from 'apollo-server-plugin-base';
import cors from 'cors';
import express from 'express';
import depthLimit from 'graphql-depth-limit';
import EventAPI from './datasources/event';
import KeywordAPI from './datasources/keyword';
import NeighborhoodAPI from './datasources/neighborhood';
import OrganizationAPI from './datasources/organization';
import PlaceAPI from './datasources/place';
import schema from './schema';
import type { DataSources } from './types';
import apolloLoggingPlugin from './utils/apolloLoggingPlugin';

const OK = 'OK';
const SERVER_IS_NOT_READY = 'SERVER_IS_NOT_READY';

Sentry.init({
  dsn: process.env.GRAPHQL_PROXY_SENTRY_DSN,
  environment: process.env.GRAPHQL_PROXY_SENTRY_ENVIRONMENT,
  integrations: [
    // used for rewriting SourceMaps from js to ts
    // check that sourcemaps are enabled in tsconfig.js
    // read the docs https://docs.sentry.io/platforms/node/typescript/
    new RewriteFrames({
      root: process.cwd(),
    }),
  ],
});

const apolloServerSentryPlugin = {
  // For plugin definition see the docs: https://www.apollographql.com/docs/apollo-server/integrations/plugins/
  async requestDidStart() {
    return {
      async didEncounterErrors(rc: GraphQLRequestContext) {
        Sentry.withScope((scope) => {
          scope.setTags({
            graphql: rc.operation?.operation || 'parse_err',
            graphqlName: rc.operationName || rc.request.operationName,
          });

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          rc.errors.forEach((error) => {
            if (error.path || error.name !== 'GraphQLError') {
              scope.setExtras({
                path: error.path,
              });
              Sentry.captureException(error);
            } else {
              scope.setExtras({});
              Sentry.captureMessage(`GraphQLWrongQuery: ${error.message}`);
            }
          });
        });
      },
    };
  },
};

const dataSources = (): DataSources => ({
  eventAPI: new EventAPI(),
  keywordAPI: new KeywordAPI(),
  neighborhoodAPI: new NeighborhoodAPI(),
  organizationAPI: new OrganizationAPI(),
  placeAPI: new PlaceAPI(),
});

(async () => {
  const server = new ApolloServer({
    // for some reason typing not working here automatically after package updates
    context: ({ req }: { req: { headers: { authorization: string } } }) => {
      const token = req.headers.authorization || '';
      return { token };
    },
    dataSources,
    debug:
      process.env.GRAPHQL_PROXY_DEBUG === 'debug' ||
      process.env.GRAPHQL_PROXY_ENV !== 'production',
    formatError: (err) => {
      return err;
    },
    plugins: [apolloServerSentryPlugin, apolloLoggingPlugin],
    schema,
    validationRules: [depthLimit(10)],
  });

  let serverIsReady = false;

  const signalReady = () => {
    serverIsReady = true;
  };

  const checkIsServerReady = (response: ExpressContext['res']) => {
    if (serverIsReady) {
      response.send(OK);
    } else {
      response.status(500).send(SERVER_IS_NOT_READY);
    }
  };

  const app = express();

  app.use(cors());

  app.get('/healthz', (request, response) => {
    checkIsServerReady(response);
  });

  app.get('/readiness', (request, response) => {
    checkIsServerReady(response);
  });
  await server.start();
  server.applyMiddleware({ app, path: '/proxy/graphql' });

  const port = process.env.GRAPHQL_PROXY_PORT || 4100;

  app.listen({ port }, () => {
    signalReady();

    // eslint-disable-next-line no-console
    console.info(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    );
  });
})();
