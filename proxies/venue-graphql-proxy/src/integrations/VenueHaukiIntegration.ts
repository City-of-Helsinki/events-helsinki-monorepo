import type { Source } from '../types';
import VenueResolverInstruction from './VenueResolverIntegration';

type Config = {
  getId: (id: string, source: Source) => string;
};

export default class HaukiIntegration extends VenueResolverInstruction {
  constructor(config: Config) {
    super({
      getDataSources: (id, source, { dataSources }) => {
        const haukiId = config.getId(id, source);

        return [
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          dataSources.hauki.getIsOpen(haukiId).then((result: any) => ({
            isOpen: result,
          })),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          dataSources.hauki.getOpeningHours(haukiId).then((result: any) => ({
            openingHours: result,
          })),
        ];
      },
    });
  }
}
