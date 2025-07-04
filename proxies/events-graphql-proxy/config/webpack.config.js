import { resolve as _resolve, dirname } from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import { fileURLToPath } from 'url';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

import getGraphqlProxyEnvironment from './env.js';
import { appIndexJs, appBuild } from './paths.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get environment variables to inject into our app.
const env = getGraphqlProxyEnvironment();

export default function () {
  return {
    entry: appIndexJs,
    externals: [
      nodeExternals({
        allowlist: [/@events-helsinki\/.*/],
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
      filename: 'index.js',
      path: _resolve(__dirname, appBuild),
      library: {
        type: 'module',
      },
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.json'],
      extensionAlias: {
        '.js': ['.js', '.ts'],
        '.cjs': ['.cjs', '.cts'],
        '.mjs': ['.mjs', '.mts'],
      },
      modules: [_resolve(__dirname, 'src'), 'node_modules'],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: _resolve(__dirname, '../tsconfig.json'),
        }),
      ],
    },
    target: 'node',
    experiments: {
      outputModule: true,
    },
  };
}
