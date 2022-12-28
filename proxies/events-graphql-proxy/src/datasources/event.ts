import type { EventDetails, EventListResponse } from '../types/types';
import DataSource from './LinkedEventsDataSource';

class EventAPI extends DataSource {
  public async getEventDetails(
    id: string,
    query: string
  ): Promise<EventDetails> {
    return this.get(`event/${id}${query}`);
  }

  public async getEventList(query: string): Promise<EventListResponse> {
    return this.get(`event${query}`);
  }
}

export default EventAPI;
