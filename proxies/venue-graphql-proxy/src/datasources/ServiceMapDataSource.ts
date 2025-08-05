import { DataSourceWithContext } from '@events-helsinki/graphql-proxy-server';
import type VenueContext from '../context/VenueContext.js';
import type { VenueDataSources } from '../types/VenueDataSources.js';
import type {
  TprekDepartment,
  TprekOntologyForest,
  TprekOntologyVocabulary,
  TprekUnit,
} from '../types.js';

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

  async getOntologyTreeSubset(ids: number[]): Promise<TprekOntologyForest> {
    const forest = await this.getOntologyForest();
    const idSet = new Set<number>(ids);
    return forest.filter((treeNode) => idSet.has(treeNode.id));
  }

  async getOntologyWordsSubset(
    ids: number[]
  ): Promise<TprekOntologyVocabulary> {
    const vocabulary = await this.getOntologyVocabulary();
    const idSet = new Set<number>(ids);
    return vocabulary.filter((word) => idSet.has(word.id));
  }

  /**
   * Get unit from service map.
   * @see https://www.hel.fi/palvelukarttaws/restpages/ver4.html#_unit
   * */
  async getUnit(id: string): Promise<TprekUnit> {
    return this.get(`unit/${id}?newfeatures=yes`);
  }

  /**
   * Get department from service map.
   * @see https://www.hel.fi/palvelukarttaws/restpages/ver4.html#_department
   * @param departmentId
   */
  async getDepartment(departmentId: string): Promise<TprekDepartment> {
    return this.get(`department/${departmentId}`);
  }

  /**
   * Get organization from service map
   * @see https://www.hel.fi/palvelukarttaws/restpages/ver4.html#_department
   * @param organizationId
   */
  async getOrganization(organizationId: string): Promise<TprekDepartment> {
    return this.get(`department/${organizationId}`); // Uses department endpoint
  }

  /**
   * Get ontology vocabulary (i.e. a collection of ontology words) from service map.
   * @see https://www.hel.fi/palvelukarttaws/restpages/ver4.html#_ontology_word
   */
  private async getOntologyVocabulary(): Promise<TprekOntologyVocabulary> {
    return this.get(`ontologyword/`);
  }

  /**
   * Get ontology forest (i.e. a collection of ontology trees) from service map.
   * @note Result can have multiple root nodes i.e. nodes without parent_id
   * @see https://www.hel.fi/palvelukarttaws/restpages/ver4.html#_ontology_tree
   */
  private async getOntologyForest(): Promise<TprekOntologyForest> {
    return this.get(`ontologytree/`);
  }
}
