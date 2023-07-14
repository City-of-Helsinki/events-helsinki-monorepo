import type { NeighborhoodListResponse } from '../types/types';
import MapOpenDataDataSource from './MapOpenDataDataSource';

class NeighborhoodDataSource extends MapOpenDataDataSource {
  public async getNeighborhoodList(): Promise<
    NeighborhoodListResponse['data']
  > {
    return this.get(
      `wfs?request=getFeature&typeName=avoindata:Kaupunginosajako&outputFormat=json`
    );
  }
}

export default NeighborhoodDataSource;
