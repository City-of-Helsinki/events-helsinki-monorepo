import type { HaukiIsOpen, TranslatedVenueDetails } from '../../types';
import type { HaukiIntegrationConfig } from './HaukiIntegrationConfig';
import VenueResolverIntegration from './VenueResolverIntegration';

export default class IsOpenHaukiIntegration extends VenueResolverIntegration<
  HaukiIsOpen | null,
  Pick<TranslatedVenueDetails, 'isOpen'>
> {
  constructor(config: HaukiIntegrationConfig) {
    super({
      getDataSource: (id, source, { dataSources }) => {
        const haukiId = config.getId(id, source);
        return dataSources.hauki.getIsOpen(haukiId);
      },
      format: (data, _context) => {
        return { isOpen: data?.is_open ?? null };
      },
    });
  }
}
