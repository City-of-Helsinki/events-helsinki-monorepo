import type { UnPromisify } from '@events-helsinki/core-lib';
import type { SearchPoemsQuery } from './SearchPoemsQuery';

export interface SearchPoemsParams {
  limit?: number;
  offset?: number;
}

export type SearchPoems = UnPromisify<ReturnType<SearchPoemsQuery['execute']>>;
