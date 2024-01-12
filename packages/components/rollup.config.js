import path from 'path';

import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import includePaths from 'rollup-plugin-includepaths';
import postcss from 'rollup-plugin-postcss';
import ts from 'rollup-plugin-ts';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import del from 'rollup-plugin-delete';

export default buildConfig();

function buildConfig() {
  const extensions = ['.js', '.jsx', '.ts', '.tsx'];

  return {
    input: {
      index: 'src/index.ts',
    },
    output: [
      {
        dir: 'dist/cjs',
        format: 'cjs',
        entryFileNames: '[name].js',
      },
      {
        dir: 'dist',
        format: 'esm',
        entryFileNames: '[name].js',
      },
    ],
    plugins: [
      del({ targets: 'dist/*' }),
      // Include polyfills for consistent behavior between server and client
      nodePolyfills(),
      includePaths({ paths: ['src'], extensions }),
      resolve(),
      ts(),
      commonjs({
        include: '../../node_modules/**',
      }),
      json(),
      postcss({
        modules: true,
        minimize: {
          preset: [
            'default',
            {
              calc: false,
            },
          ],
        },
        use: [
          [
            'sass',
            {
              includePaths: [path.join(__dirname, 'src/styles')],
            },
          ],
        ],
      }),
      babel({
        babelHelpers: 'bundled',
        exclude: '../../node_modules/**',
        presets: ['@babel/preset-react'],
        extensions,
      }),
    ],
    external: [
      '@types/react-datepicker',
      'classnames',
      'copy-to-clipboard',
      'date-fns-tz',
      'hds-design-tokens',
      'hds-react',
      'html-react-parser',
      'i18next',
      'lodash/camelCase',
      'lodash/capitalize',
      'lodash/forEach',
      'lodash/get',
      'lodash/intersection',
      'lodash/isArray',
      'lodash/isEmpty',
      'lodash/isNil',
      'lodash/isNumber',
      'lodash/map',
      'lodash/merge',
      'lodash/range',
      'lodash/sortBy',
      'lodash/startCase',
      'next',
      'next-i18next',
      'react',
      'react-content-loader',
      'react-datepicker',
      'react/jsx-runtime',
      'react-dom',
      'react-helsinki-headless-cms',
      'react-i18next',
      'sanitize-html',
    ],
  };
}
