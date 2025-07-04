import type { MapOpenDataDataSource_NeighborhoodListResponse } from '../types/types.js';
import MapOpenDataDataSource from './MapOpenDataDataSource.js';

class NeighborhoodDataSource extends MapOpenDataDataSource {
  public async getNeighborhoodList(): Promise<MapOpenDataDataSource_NeighborhoodListResponse> {
    return this.get(
      `wfs?request=getFeature&typeName=avoindata:Kaupunginosajako&outputFormat=json`
    );
  }
}

export default NeighborhoodDataSource;
