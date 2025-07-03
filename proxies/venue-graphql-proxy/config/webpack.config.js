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
    // --- CRITICAL CHANGE 1: Add allowlist to nodeExternals ---
    externals: [
      nodeExternals({
        // This is necessary to bundle your internal monorepo packages.
        // It tells webpack-node-externals to NOT exclude packages
        // matching the regex (i.e., all @events-helsinki scoped packages).
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
                // --- CRITICAL CHANGE 2: Point ts-loader to your project's tsconfig.json ---
                // This tells ts-loader where to find the tsconfig for this specific project,
                // so it can correctly resolve 'baseUrl' and 'paths'.
                configFile: _resolve(__dirname, '../tsconfig.json'), // Adjust path if tsconfig.json is not in parent dir
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
    // --- TsconfigPathsPlugin is now correctly in resolve.plugins ---
    plugins: [new webpack.DefinePlugin(env.stringified)],
    output: {
      filename: 'index.js',
      path: _resolve(__dirname, appBuild),
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.json'],
      modules: [_resolve(__dirname, 'src'), 'node_modules'],
      plugins: [
        // This is correctly placed now for TsconfigPathsPlugin
        new TsconfigPathsPlugin({
          configFile: _resolve(__dirname, '../tsconfig.json'), // Adjust path if tsconfig.json is not in parent dir
        }),
      ],
    },
    target: 'node',
  };
}
