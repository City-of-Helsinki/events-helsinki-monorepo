import { DataSourceWithContext } from '@events-helsinki/graphql-proxy-server';
import AppConfig from '../config/AppConfig.js';
import type EventContext from '../context/EventContext.js';
import type { EventDataSources } from '../types.js';

abstract class LinkedEventsDataSource extends DataSourceWithContext<
  EventDataSources,
  EventContext
> {
  public constructor(contextValue: EventContext) {
    super(contextValue);
    this.baseURL = AppConfig.apiBaseUrl;
  }
}
export default LinkedEventsDataSource;
