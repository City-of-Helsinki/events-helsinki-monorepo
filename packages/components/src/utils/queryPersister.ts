import { logger } from '../loggers/logger';
import isClient from './isClient';

export type AnyObject = Record<string, unknown> | null;

const QUERY_KEY = 'liikunta:qp';

export class QueryPersister {
  persistQuery<T extends AnyObject = AnyObject>(query: T) {
    logger.info(`Trying to persist query`);

    if (isClient) {
      try {
        localStorage.setItem(QUERY_KEY, JSON.stringify(query));
      } catch (e) {
        logger.error(`Error while persisting query: ${e}`);
      }
    } else {
      logger.error(
        'There was a query persist attempt during a non-client render. Queries should only be persisted in browser.'
      );
    }
  }

  readPersistedQuery() {
    logger.info(`Trying to read persisted query`);

    return JSON.parse(localStorage.getItem(QUERY_KEY) as string);
  }
}

export default new QueryPersister();
