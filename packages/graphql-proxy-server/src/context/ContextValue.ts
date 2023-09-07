import type { KeyValueCache } from '@apollo/utils.keyvaluecache';
import type { AppLanguage } from '@events-helsinki/components/src/types/types';
import { ignorableGraphqlErrorCodes } from '../constants';
import type { CustomIgnorableGraphQLErrorValues } from '../types';

export type ContextConstructorArgs = {
  token: string;
  cache?: KeyValueCache;
  language?: AppLanguage;
  ignoredErrorCodes?: string | string[];
};
abstract class ContextValue<DataSources> {
  public readonly token: string;
  public readonly cache?: KeyValueCache;
  public readonly dataSources: DataSources;
  // Some fields are relying on language set in the header.
  // The translation object will be returned as a string
  // and the language from the context is used to select the right translation.
  public readonly language?: AppLanguage;
  public readonly ignoredErrorCodes?: CustomIgnorableGraphQLErrorValues[];

  public X_REQUEST_ID?: string;

  protected abstract initializeDataSources(): DataSources;

  public constructor({
    token,
    cache,
    language,
    ignoredErrorCodes,
  }: ContextConstructorArgs) {
    this.token = token;
    this.cache = cache;
    this.dataSources = this.initializeDataSources();
    this.language = language;
    this.ignoredErrorCodes = this.parseIgnoreErrorCodes(ignoredErrorCodes);
  }

  private parseIgnoreErrorCodes(
    ignoredErrorCodes?: ContextConstructorArgs['ignoredErrorCodes']
  ) {
    if (Array.isArray(ignoredErrorCodes)) {
      return ignoredErrorCodes.filter((code) =>
        ignorableGraphqlErrorCodes.includes(code)
      ) as CustomIgnorableGraphQLErrorValues[];
    }
    if (ignoredErrorCodes && typeof ignoredErrorCodes === 'string') {
      return ignoredErrorCodes
        ?.split(',')
        .filter((code) =>
          ignorableGraphqlErrorCodes.includes(code)
        ) as CustomIgnorableGraphQLErrorValues[];
    }
  }
}

export default ContextValue;
