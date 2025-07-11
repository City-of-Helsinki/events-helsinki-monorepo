// @ts-check

/**
 * This files overrides the base lint-staged.config.js present in the root directory.
 * It allows to run eslint based the package specific requirements.
 * {@link https://github.com/okonet/lint-staged#how-to-use-lint-staged-in-a-multi-package-monorepo}
 * {@link https://github.com/City-of-Helsinki/events-helsinki-monorepo/blob/main/docs/about-lint-staged.md}
 */

import {
  concatFilesForPrettier,
  getEslintFixCmd,
} from '../../lint-staged.common.mjs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * @type {Record<string, (filenames: string[]) => string | string[] | Promise<string | string[]>>}
 */
export const rules = {
  '**/*.{js,jsx,ts,tsx}': (filenames) => {
    return getEslintFixCmd({
      cwd: __dirname,
      fix: true,
      cache: true,
      // when autofixing staged-files a good tip is to disable react-hooks/exhaustive-deps, cause
      // a change here can potentially break things without proper visibility.
      rules: ['react-hooks/exhaustive-deps: off'],
      maxWarnings: 25,
      files: filenames,
    });
  },
  '**/*.{json,md,mdx,css,html,yml,yaml,scss}': (filenames) => {
    return [`prettier --write ${concatFilesForPrettier(filenames)}`];
  },
};
