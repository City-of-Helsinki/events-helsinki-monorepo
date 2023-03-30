import { ContextValue } from '@events-helsinki/graphql-proxy-server/src';
import HaukiDataSource from '../datasources/HaukiDataSource';
import ServiceMapDataSource from '../datasources/ServiceMapDataSource';
import type { VenueDataSources } from '../types/VenueDataSources';

class VenueContext extends ContextValue<VenueDataSources> {
  protected initializeDataSources() {
    return {
      hauki: new HaukiDataSource(this),
      serviceMap: new ServiceMapDataSource(this),
    };
  }
}
export default VenueContext;
