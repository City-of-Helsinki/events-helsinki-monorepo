import type { AppLanguage } from '@events-helsinki/graphql-proxy-server';
import { ContextValue } from '@events-helsinki/graphql-proxy-server';
import HaukiDataSource from '../datasources/HaukiDataSource.js';
import ServiceMapDataSource from '../datasources/ServiceMapDataSource.js';
import type { VenueDataSources } from '../types/VenueDataSources.js';

class VenueContext extends ContextValue<VenueDataSources> {
  declare language: AppLanguage;
  protected initializeDataSources() {
    return {
      hauki: new HaukiDataSource(this),
      serviceMap: new ServiceMapDataSource(this),
    };
  }
}
export default VenueContext;
