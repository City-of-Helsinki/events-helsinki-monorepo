import { resolve as _resolve, dirname } from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import { fileURLToPath } from 'url';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

import getGraphqlProxyEnvironment from './env.mjs';
import { appIndexJs, appBuild } from './paths.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get environment variables to inject into our app.
const env = getGraphqlProxyEnvironment();

export default function () {
  return {
    entry: appIndexJs,
    externals: [
      nodeExternals({
        // Keep only workspace libs bundled; externalizing everything else
        // means the runtime container must have all deps in node_modules.
        // Azure images are missing @apollo/server, so we bundle @apollo/*
        // here to avoid runtime MODULE_NOT_FOUND.
        allowlist: [/@events-helsinki\/.*/, /^@apollo\/.*/],
      }),
    ],
    module: {
      rules: [
        {
          exclude: /node_modules/,
          test: /\.(ts|tsx)$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                configFile: _resolve(__dirname, '../tsconfig.json'),
              },
            },
          ],
        },
        {
          test: /\.graphql$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader',
        },
      ],
    },
    plugins: [new webpack.DefinePlugin(env.stringified)],
    output: {
      // CommonJS output: webpack-node-externals emits require() for externals,
      // which crashes at runtime when bundled as ESM ("require is not defined").
      filename: 'index.cjs',
      path: _resolve(__dirname, appBuild),
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.json'],
      extensionAlias: {
        '.js': ['.js', '.ts'],
        '.cjs': ['.cjs', '.cts'],
        '.mjs': ['.mjs', '.mts'],
      },
      plugins: [
        new TsconfigPathsPlugin({
          configFile: _resolve(__dirname, '../tsconfig.json'),
        }),
      ],
    },
    target: 'node',
  };
}
