import type { Place, PlaceListResponse } from '../types/__generated__.js';
import LinkedEventsDataSource from './LinkedEventsDataSource.js';
class PlaceDataSource extends LinkedEventsDataSource {
  public getPlaceDetails(id: string): Promise<Place> {
    return this.get(`place/${id}/`);
  }
  public getPlaceList(query: string): Promise<PlaceListResponse> {
    return this.get(`place/${query}`);
  }
}

export default PlaceDataSource;
