import { ContextValue } from 'events-helsinki-graphql-proxy-server/src';
import type { DataSources } from '../types';
import HaukiDataSource from '../datasources/HaukiDataSource';
import TprekDataSource from '../datasources/TprekDataSource';

class VenueContext extends ContextValue<DataSources> {
  protected initializeDataSources() {
    return {
      hauki: new HaukiDataSource({ cache: this.cache }),
      tprek: new TprekDataSource({ cache: this.cache }),
    };
  }
}
export default VenueContext;
