import HaukiDataSource from '../datasources/HaukiDataSource.js';
import ServiceMapDataSource from '../datasources/ServiceMapDataSource.js';

export type VenueDataSources = {
  hauki: HaukiDataSource;
  serviceMap: ServiceMapDataSource;
};
