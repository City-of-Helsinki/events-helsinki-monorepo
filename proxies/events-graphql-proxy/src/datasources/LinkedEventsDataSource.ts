import DataSourceWithContext from './DataSourceWithContext';

abstract class LinkedEventsDataSource extends DataSourceWithContext {
  override baseURL = process.env.GRAPHQL_PROXY_API_BASE_URL;
}
export default LinkedEventsDataSource;
