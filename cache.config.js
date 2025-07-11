/**
 * Convenience script to harmonize cache directories across various
 * tooling such as eslint and vitest.
 *
 * Recently more & more tools like babel-loader tend to cache in
 * node_modules/.cache (@link https://github.com/avajs/find-cache-dir)
 * It's possible too.
 */
// @ts-check
'use strict';

import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const globalCachePath = resolve(`${__dirname}/.cache`);

/**
 * @param {string} packageName
 * @returns string
 */
export function sanitize(packageName) {
  return packageName.replace('/', '.').replace(/[^a-z0-9.@_-]+/gi, '-');
}

/**
 * @param {string} packageName
 * @returns string
 */
export function getEslintCachePath(packageName) {
  return `${globalCachePath}/${sanitize(packageName)}/eslint`;
}

/**
 * @param {string} packageName
 * @returns string
 */
export function getVitestCachePath(packageName) {
  return `${globalCachePath}/${sanitize(packageName)}/vitest`;
}
