// @ts-check

/**
 * This is the base lint-staged rules config and just includes prettier by default.
 * A good practice is to override this base configuration in each package and/or application
 * where we are able to add customization depending on the nature of the project (eslint...).
 *
 * {@link https://github.com/okonet/lint-staged#how-to-use-lint-staged-in-a-multi-package-monorepo}
 * {@link https://github.com/City-of-Helsinki/events-helsinki-monorepo/blob/main/docs/about-lint-staged.md}
 */

import { concatFilesForPrettier } from './lint-staged.common.mjs';

/**
 * @type {Record<string, (filenames: string[]) => string | string[] | Promise<string | string[]>>}
 */
const rules = {
  '**/*.{json,md,mdx,css,html,yml,yaml,scss,ts,js,tsx,jsx,mjs}': (
    filenames
  ) => {
    if (filenames.length === 0) {
      return [];
    }
    return [`prettier --write ${concatFilesForPrettier(filenames)}`];
  },
};

export default rules;
