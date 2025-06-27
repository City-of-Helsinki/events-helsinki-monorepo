import type { Source } from '../../types.js';

export type HaukiIntegrationConfig = {
  getId: (id: string, source: Source) => string;
};
