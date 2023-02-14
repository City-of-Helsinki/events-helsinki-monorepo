import type { KeyValueCache } from '@apollo/utils.keyvaluecache';
import type { AppLanguage } from 'events-helsinki-components/src/types/types';
export type ContextConstructorArgs = {
  token: string;
  cache?: KeyValueCache;
  language?: AppLanguage;
};
abstract class ContextValue<DataSources> {
  public readonly token: string;
  public readonly cache?: KeyValueCache;
  public readonly dataSources: DataSources;
  // Some fields are relying on language set in the header.
  // The translation object will be returned as a string
  // and the language from the context is used to select the right translation.
  public readonly language?: AppLanguage;

  public X_REQUEST_ID?: string;

  protected abstract initializeDataSources(): DataSources;

  public constructor({ token, cache, language }: ContextConstructorArgs) {
    this.token = token;
    this.cache = cache;
    this.dataSources = this.initializeDataSources();
    this.language = language;
  }
}
export default ContextValue;
