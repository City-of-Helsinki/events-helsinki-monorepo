import type { AugmentedRequest } from '@apollo/datasource-rest';
import { DataSourceWithContext } from '@events-helsinki/graphql-proxy-server';
import AppConfig from '../config/AppConfig.js';
import type EventContext from '../context/EventContext.js';
import type { EventDataSources } from '../types.js';

abstract class MapOpenDataDataSource extends DataSourceWithContext<
  EventDataSources,
  EventContext
> {
  public constructor(contextValue: EventContext) {
    super(contextValue);
    this.baseURL = AppConfig.mapOpenDataApiBaseUrl;
  }
  override willSendRequest(_path: string, request: AugmentedRequest) {
    request.headers['Content-Type'] = 'application/json';
  }
}

export default MapOpenDataDataSource;
