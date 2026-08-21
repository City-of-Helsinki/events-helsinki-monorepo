// This file has been automatically migrated to valid ESM format by Storybook.
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import type { StorybookConfig } from '@storybook/nextjs-vite';

import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, 'package.json')));
}

/** Webpack-style `~pkg/...` Sass imports → node_modules resolution for Vite. */
function createTildeImporter() {
  return {
    findFileUrl(url: string) {
      if (!url.startsWith('~')) {
        return null;
      }
      const bare = url.slice(1);
      try {
        return pathToFileURL(require.resolve(bare));
      } catch {
        try {
          return pathToFileURL(require.resolve(`${bare}.scss`));
        } catch {
          return null;
        }
      }
    },
  };
}

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-onboarding'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/nextjs-vite'),
    options: {},
  },
  async viteFinal(viteConfig) {
    const { mergeConfig } = await import('vite');
    return mergeConfig(viteConfig, {
      css: {
        preprocessorOptions: {
          scss: {
            loadPaths: [
              resolve(__dirname, '../src/styles'),
              resolve(__dirname, '../../../node_modules'),
            ],
            importers: [createTildeImporter()],
          },
        },
      },
    });
  },
};

export default config;
