// @ts-check

const { prettierBaseConfig } = require('@events-helsinki/eslint-config-bases');

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
  ],
};

module.exports = config;
