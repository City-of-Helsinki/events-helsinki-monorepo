import type { EventDetails, EventListResponse } from '../types/types.js';
import LinkedEventsDataSource from './LinkedEventsDataSource.js';

class EventDataSource extends LinkedEventsDataSource {
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

export default EventDataSource;
