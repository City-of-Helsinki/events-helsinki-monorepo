const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
module.exports = {
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      legacyRootApi: true,
      builder: {
        fsCache: true
      }
    }
  },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(ts|tsx|js|jsx)'],
  features: {
    // Still issues with mdx2 and react 18
    // @link https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#opt-in-mdx2-support
    previewMdx2: false
  },
  webpackFinal: async config => {
    config.resolve.plugins = config.resolve.plugins || [];
    config.resolve.plugins.push(new TsconfigPathsPlugin({
      configFile: path.resolve(__dirname, '../tsconfig.json')
    }));
    config.resolve.alias = {
      ...config.resolve.alias,
      'next-i18next': 'react-i18next'
    };
    config.resolve.fallback = {
      crypto: require.resolve("crypto-browserify"),
      zlib: false,
      stream: false,
      fs: false
    };
    return config;
  },
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', {
    name: '@storybook/addon-storysource',
    options: {
      loaderOptions: {
        injectStoryParameters: true
      }
    }
  }, {
    name: 'storybook-addon-sass-postcss',
    options: {
      postcssLoaderOptions: {
        implementation: require('postcss')
      }
    }
  }, 'storybook-react-i18next', '@storybook/addon-mdx-gfm'],
  docs: {
    autodocs: false
  }
};