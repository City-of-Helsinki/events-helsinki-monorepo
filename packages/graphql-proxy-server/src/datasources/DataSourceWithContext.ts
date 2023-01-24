import type { WillSendRequestOptions } from '@apollo/datasource-rest';
import { RESTDataSource } from '@apollo/datasource-rest';
import type ContextValue from '../context/ContextValue';

abstract class DataSourceWithContext<
  DataSources,
  Context extends ContextValue<DataSources>
> extends RESTDataSource {
  private readonly contextValue: Context;

  public constructor(contextValue: Context) {
    super({ cache: contextValue.cache }); // this should send `cache` through
    this.contextValue = contextValue;
  }

  override willSendRequest(request: WillSendRequestOptions) {
    request.headers['authorization'] = this.contextValue.token;

    if (this.contextValue.X_REQUEST_ID) {
      request.headers.X_REQUEST_ID = this.contextValue.X_REQUEST_ID;
    }
    request.headers['Content-Type'] = 'application/json';
    request.headers['Connection'] = 'keep-alive';
  }
}
export default DataSourceWithContext;
