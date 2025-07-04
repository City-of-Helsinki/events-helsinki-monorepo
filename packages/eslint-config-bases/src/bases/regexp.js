/**
 * Custom config base for projects that wants to enable regexp rules.
 * @see https://github.com/City-of-Helsinki/events-helsinki-monorepo/tree/main/packages/eslint-config-bases
 */
import * as regexpPlugin from 'eslint-plugin-regexp';

export default [regexpPlugin.configs['flat/recommended']];
