const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  framework: '@storybook/react',
  core: {
    builder: {
      name: 'webpack5',
      options: {
        fsCache: true,
      },
    },
  },
  // Keep react 17 render, till mdx 2 is fully supported
  // - https://github.com/mdx-js/mdx/issues/1945
  // - https://github.com/storybookjs/storybook/issues/18094
  // @link https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#react18-new-root-api
  reactOptions: { legacyRootApi: true },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(ts|tsx|js|jsx)'],
  features: {
    // Still issues with mdx2 and react 18
    // @link https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#opt-in-mdx2-support
    previewMdx2: false,
  },
  webpackFinal: async (config) => {
    config.resolve.plugins = config.resolve.plugins || [];
    config.resolve.plugins.push(
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../tsconfig.json'),
      })
    );
    config.resolve.alias = {
      ...config.resolve.alias,
      'next-i18next': 'react-i18next'
    };
    return config;
  },
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-storysource',
      options: {
        loaderOptions: {
          injectStoryParameters: true,
        },
      },
    },
    {
      name: 'storybook-addon-sass-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
    'storybook-addon-next-router',
    'storybook-react-i18next',
  ],
};
