import type { RequestOptions } from '@apollo/datasource-rest';
import { RESTDataSource as ApolloRESTDataSource } from '@apollo/datasource-rest';
import type { DataSourceConfig } from '@apollo/datasource-rest/dist/RESTDataSource';
import type { Logger } from '../types';
import { dataSourceLogger } from './logger';

export default abstract class RESTDataSource extends ApolloRESTDataSource {
  logger: Logger;

  constructor(config: DataSourceConfig, logger = dataSourceLogger) {
    super(config);
    this.logger = logger;
  }

  protected async trace<TResult>(
    url: URL,
    request: RequestOptions,
    fn: () => Promise<TResult>
  ): Promise<TResult> {
    if (process && process.env && process.env.NODE_ENV === 'development') {
      const startTime = Date.now();
      try {
        return await fn();
      } finally {
        const duration = Date.now() - startTime;
        const label = `${request.method || 'GET'} ${url}`;
        this.logger.debug(`Tracing: ${label} (${duration}ms)`);
      }
    } else {
      return fn();
    }
  }
}
