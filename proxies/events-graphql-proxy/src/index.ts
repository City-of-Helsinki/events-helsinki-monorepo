// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import http from 'http';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { RewriteFrames } from '@sentry/integrations';
import * as Sentry from '@sentry/node';
import { json } from 'body-parser';
import cors from 'cors';
import express from 'express';
import depthLimit from 'graphql-depth-limit';
import ContextValue from './context/context-value';
import resolvers from './schema/resolvers';
import typeDefs from './schema/typeDefs';
import apolloLoggingPlugin from './utils/apolloLoggingPlugin';
import sentryLoggingPlugin from './utils/sentryLoggingPlugin';

const OK = 'OK';
const SERVER_IS_NOT_READY = 'SERVER_IS_NOT_READY';
const GRAPHQL_PATH = '/proxy/graphql';

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

const port = process.env.GRAPHQL_PROXY_PORT || 4100;

let serverIsReady = false;

const signalReady = () => {
  serverIsReady = true;
};

const checkIsServerReady = (response: express.Response) => {
  if (serverIsReady) {
    response.send(OK);
  } else {
    response.status(500).send(SERVER_IS_NOT_READY);
  }
};

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer<ContextValue>({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
  includeStacktraceInErrorResponses:
    process.env.GRAPHQL_PROXY_DEBUG === 'debug' ||
    process.env.GRAPHQL_PROXY_ENV !== 'production',
  plugins: [
    sentryLoggingPlugin,
    apolloLoggingPlugin,
    ApolloServerPluginDrainHttpServer({ httpServer }),
  ],
  validationRules: [depthLimit(10)],
});

(async () => {
  await server.start();

  app.use(
    GRAPHQL_PATH,
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) =>
        new ContextValue({
          token: req.headers.authorization || '',
          cache: server.cache,
        }),
    })
  );
  app.get(
    '/healthz',
    (request: express.Request, response: express.Response) => {
      checkIsServerReady(response);
    }
  );

  app.get(
    '/readiness',
    (request: express.Request, response: express.Response) => {
      checkIsServerReady(response);
    }
  );
  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  signalReady();
  // eslint-disable-next-line no-console
  console.info(`🚀 Server ready at http://localhost:${port}${GRAPHQL_PATH}`);
})();
