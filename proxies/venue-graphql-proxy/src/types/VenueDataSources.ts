import HaukiDataSource from '../datasources/HaukiDataSource';
import ServiceMapDataSource from '../datasources/ServiceMapDataSource';

export type VenueDataSources = {
  hauki: HaukiDataSource;
  serviceMap: ServiceMapDataSource;
};
