import type { Source } from '../../types';

export type HaukiIntegrationConfig = {
  getId: (id: string, source: Source) => string;
};
