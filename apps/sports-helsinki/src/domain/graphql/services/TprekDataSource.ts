// import { dataSourceTprekLogger as logger } from '../../../logger';
import RESTDataSource from '../utils/RESTDataSource';

type AnyObject = Record<string, unknown>;

/**
 * Docs: https://www.hel.fi/palvelukarttaws/restpages/ver4.html
 */
export default class TprekDataSource extends RESTDataSource {
  override baseURL = 'https://www.hel.fi/palvelukarttaws/rest/v4/';

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

  async getUnit(id: string) {
    return this.get(`unit/${id}`);
  }

  private async getAllOntologyWords() {
    return this.get(`ontologyword/`);
  }

  private async getOntologyTrees() {
    return this.get(`ontologytree/`);
  }
}
