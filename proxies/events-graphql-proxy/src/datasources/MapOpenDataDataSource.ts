import type { WillSendRequestOptions } from '@apollo/datasource-rest';
import { DataSourceWithContext } from 'events-helsinki-graphql-proxy-server/src';
import type EventContext from '../context/EventContext';
import type { EventDataSources } from '../types';

abstract class MapOpenDataDataSource extends DataSourceWithContext<
  EventDataSources,
  EventContext
> {
  public constructor(contextValue: EventContext) {
    super(contextValue);
    if (!process.env.GRAPHQL_PROXY_MAP_OPEN_DATA_API_BASE_URL) {
      throw new Error(
        'Environment variable "GRAPHQL_PROXY_MAP_OPEN_DATA_API_BASE_URL" is not set!'
      );
    }
    this.baseURL = process.env.GRAPHQL_PROXY_MAP_OPEN_DATA_API_BASE_URL;
  }
  public willSendRequest(request: WillSendRequestOptions) {
    request.headers['Content-Type'] = 'application/json';
  }
}

export default MapOpenDataDataSource;
