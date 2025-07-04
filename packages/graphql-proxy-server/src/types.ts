import type { CustomIgnorableGraphQLErrorEnum } from './enums.js';

export type CustomIgnorableGraphQLErrorValues =
  `${CustomIgnorableGraphQLErrorEnum}`;

export const appLanguages = ['fi', 'sv', 'en'] as const;

export type AppLanguage = (typeof appLanguages)[number];
