import type {
  EventDetails,
  EventListResponse,
} from '../types/__generated__.js';
import LinkedEventsDataSource from './LinkedEventsDataSource.js';

class EventDataSource extends LinkedEventsDataSource {
  public getEventDetails(id: string, query: string): Promise<EventDetails> {
    return this.get(`event/${id}/${query}`);
  }

  public getEventList(query: string): Promise<EventListResponse> {
    return this.get(`event/${query}`);
  }
}

export default EventDataSource;
