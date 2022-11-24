import { logger } from '../../loggers/logger';
import queryPersister from '../queryPersister';

describe('queryPersister', () => {
  let processBrowser: any;
  const loggerSpy = jest.spyOn(logger, 'error');

  beforeAll(() => {
    processBrowser = false;
  });

  afterAll(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    process.browser = processBrowser;
  });

  it('should allow for a query to be persisted and read', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    process.browser = true;

    const query = {
      q: 'Swimming place near Itis',
    };

    queryPersister.persistQuery(query);

    expect(queryPersister.readPersistedQuery()).toStrictEqual(query);
  });

  it('should not persist the query if it is called with process.browser as false', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    process.browser = false;

    const query = {
      q: 'Swimming place near Aurinkolahti',
    };

    queryPersister.persistQuery(query);

    expect(loggerSpy).toHaveBeenCalledWith(
      'There was a query persist attempt during a non-client render. Queries should only be persisted in browser.'
    );
    expect(queryPersister.readPersistedQuery()).not.toStrictEqual(query);
  });

  it('should error with a message if saving a value into the storage fails', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    process.browser = true;
    jest.spyOn(Storage.prototype, 'setItem').mockImplementationOnce(() => {
      throw Error('Storage full');
    });

    const query = null;

    queryPersister.persistQuery(query);

    expect(loggerSpy).toHaveBeenCalledWith(
      'Error while persisting query: Error: Storage full'
    );
  });
});
