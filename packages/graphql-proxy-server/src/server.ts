import http from 'http';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import type { GraphQLSchema } from 'graphql';
import depthLimit from 'graphql-depth-limit';
import { X_IGNORED_ERROR_CODE } from './constants.js';
import type ContextValue from './context/ContextValue.js';
import type { ContextConstructorArgs } from './context/ContextValue.js';
import apolloLoggingPlugin from './plugins/apolloLoggingPlugin.js';
import sentryLoggingPlugin from './plugins/sentryLoggingPlugin.js';
import type { ServerConfig } from './server-config/server-config.js';
import { createServerConfig } from './server-config/server-config.js';
import acceptsLanguage from './utils/acceptLanguage.js';

const OK = 'OK';
const SERVER_IS_NOT_READY = 'SERVER_IS_NOT_READY';
const GRAPHQL_PATH = '/proxy/graphql';

type StartServerArgs<Datasources, Context extends ContextValue<Datasources>> = {
  config: ServerConfig;
  schema: GraphQLSchema;
  contextCallback: (args: ContextConstructorArgs) => Promise<Context>;
};

export const startServer = async <
  Datasources,
  Context extends ContextValue<Datasources>,
>({
  config,
  schema,
  contextCallback,
}: StartServerArgs<Datasources, Context>) => {
  const serverConfig = createServerConfig(config);
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

  const isProd = serverConfig.env === 'production';

  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer<Context>({
    schema,
    includeStacktraceInErrorResponses: serverConfig.debug || !isProd,
    plugins: [
      sentryLoggingPlugin(),
      apolloLoggingPlugin(),
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault(),
    ],
    validationRules: [depthLimit(10)],
    introspection: serverConfig.introspection,
    formatError: serverConfig.formatError,
  });

  await server.start();

  app.use(
    GRAPHQL_PATH,
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) =>
        contextCallback({
          token: req.headers.authorization || '',
          cache: server.cache,
          // Some fields are relying on language set in the header.
          // The translation object will be returned as a string
          // and the language from the context is used to select the right translation.
          language: acceptsLanguage(req, config?.languages ?? []),
          ignoredErrorCodes: req.headers[X_IGNORED_ERROR_CODE],
        }),
    })
  );

  const readinessRouter = express.Router();

  app.use('/api', readinessRouter);

  readinessRouter.get(
    '/healthz',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (request: express.Request, response: express.Response) => {
      checkIsServerReady(response);
    }
  );

  readinessRouter.get(
    '/readiness',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (request: express.Request, response: express.Response) => {
      checkIsServerReady(response);
    }
  );
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: serverConfig.serverPort }, resolve)
  );
  signalReady();
  // eslint-disable-next-line no-console
  console.info(
    `🚀 Server ready at http://localhost:${serverConfig.serverPort}${GRAPHQL_PATH}`
  );
  if (config.debug) {
    // eslint-disable-next-line no-console
    console.info('Server config', { config: serverConfig });
  }
};
