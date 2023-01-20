import type { KeyValueCache } from '@apollo/utils.keyvaluecache';

export type ContextValueArgs<DataSources> = {
  token: string;
  cache?: KeyValueCache;
  language?: string;
};
abstract class ContextValue<DataSources> {
  public readonly token: string;
  public readonly cache?: KeyValueCache;
  public readonly dataSources: DataSources;
  // Some fields are relying on language set in the header.
  // The translation object will be returned as a string
  // and the language from the context is used to select the right translation.
  public readonly language?: string;

  public X_REQUEST_ID?: string;

  protected abstract initializeDataSources(): DataSources;

  public constructor({
    token,
    cache,
    language,
  }: ContextValueArgs<DataSources>) {
    this.token = token;
    this.cache = cache;
    this.dataSources = this.initializeDataSources();
    this.language = language;
  }
}
export default ContextValue;
