import type { NeighborhoodListResponse } from '../types/types';
import DataSource from './MapOpenDataDataSource';

class NeighborhoodAPI extends DataSource {
  public async getNeighborhoodList(): Promise<
    NeighborhoodListResponse['data']
  > {
    return this.get(
      `/wfs?request=getFeature&typeName=avoindata:Kaupunginosajako&outputFormat=json`
    );
  }
}

export default NeighborhoodAPI;
