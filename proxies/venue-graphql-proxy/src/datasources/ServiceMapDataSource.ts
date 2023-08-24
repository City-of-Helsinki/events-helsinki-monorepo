import { DataSourceWithContext } from '@events-helsinki/graphql-proxy-server/src';
import type VenueContext from '../context/VenueContext';
import type { VenueDataSources } from '../types/VenueDataSources';

type AnyObject = Record<string, unknown>;

/**
 * Docs: https://www.hel.fi/palvelukarttaws/restpages/ver4.html
 */
export default class ServiceMapDataSource extends DataSourceWithContext<
  VenueDataSources,
  VenueContext
> {
  public constructor(contextValue: VenueContext) {
    super(contextValue);
    if (!process.env.GRAPHQL_PROXY_SERVICE_MAP_DATASOURCE) {
      throw new Error(
        'Environment variable "GRAPHQL_PROXY_SERVICE_MAP_DATASOURCE" is not set!'
      );
    }
    this.baseURL = process.env.GRAPHQL_PROXY_SERVICE_MAP_DATASOURCE;
  }

  async getOntologyTree(ids: number[]): Promise<AnyObject[] | null> {
    const trees = await this.getOntologyTrees();

    if (!trees) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return ids.map((id) => trees.find((tree: any) => id === tree.id));
  }

  async getOntologyWords(ids: number[]): Promise<AnyObject[] | null> {
    const words = await this.getAllOntologyWords();

    if (!words) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return ids.map((id) => words.find((word: any) => id === word.id));
  }

  /**
   * Get unit from service map.
   * @see https://www.hel.fi/palvelukarttaws/restpages/ver4.html#_unit
   * */
  async getUnit(id: string) {
    return this.get(`unit/${id}?newfeatures=yes`);
  }

  private async getAllOntologyWords() {
    return this.get(`ontologyword/`);
  }

  private async getOntologyTrees() {
    return this.get(`ontologytree/`);
  }
}
