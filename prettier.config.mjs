// @ts-check

import { prettierBaseConfig } from '@events-helsinki/eslint-config-bases';

/**
 * @type {import('prettier').Config}
 */
const config = {
  ...prettierBaseConfig,
  overrides: [
    {
      files: '*.md',
      options: {
        singleQuote: false,
        quoteProps: 'preserve',
      },
    },
  ]
};

export default config;
