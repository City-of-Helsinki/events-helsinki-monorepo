import type { KeyValueCache } from '@apollo/utils.keyvaluecache';

export type ContextConstructorArgs<DataSources> = {
  token: string;
  cache?: KeyValueCache;
};
abstract class ContextValue<DataSources> {
  public readonly token: string;
  public readonly cache?: KeyValueCache;
  public readonly dataSources: DataSources;

  public X_REQUEST_ID?: string;

  protected abstract initializeDataSources(): DataSources;

  public constructor({ token, cache }: ContextConstructorArgs<DataSources>) {
    this.token = token;
    this.cache = cache;
    this.dataSources = this.initializeDataSources();
  }
}
export default ContextValue;
