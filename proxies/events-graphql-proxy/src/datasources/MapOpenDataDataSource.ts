import type { WillSendRequestOptions } from '@apollo/datasource-rest';
import DataSourceWithContext from './DataSourceWithContext';

abstract class MapOpenDataDataSource extends DataSourceWithContext {
  override baseURL = process.env.GRAPHQL_PROXY_MAP_OPEN_DATA_API_BASE_URL;

  public willSendRequest(request: WillSendRequestOptions) {
    request.headers['Content-Type'] = 'application/json';
  }
}

export default MapOpenDataDataSource;
