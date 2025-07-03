import { resolve as _resolve } from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import getGraphqlProxyEnvironment from './env.js';
import { appIndexJs, appBuild } from './paths.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get environment variables to inject into our app.
const env = getGraphqlProxyEnvironment();

export default function () {
  return {
    entry: appIndexJs,
    externals: [nodeExternals()],
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
              },
            },
          ],
        },
      ],
    },
    plugins: [new webpack.DefinePlugin(env.stringified)],
    node: {
      __dirname: false,
    },
    output: {
      filename: 'index.js',
      path: _resolve(__dirname, appBuild),
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
      modules: [_resolve(__dirname, 'src'), 'node_modules'],
    },
    target: 'node',
  };
}
