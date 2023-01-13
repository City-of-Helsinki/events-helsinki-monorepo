import { ContextValue } from 'events-helsinki-graphql-proxy-server/src';

import EventDataSource from '../datasources/eventDataSource';
import KeywordDataSource from '../datasources/keywordDataSource';
import NeighborhoodDataSource from '../datasources/neighborhoodDataSource';
import OrganizationDataSource from '../datasources/organizationDataSource';
import PlaceDataSource from '../datasources/placeDataSource';
import type { EventDataSources } from '../types';

class EventContext extends ContextValue<EventDataSources> {
  protected initializeDataSources() {
    return {
      event: new EventDataSource(this),
      keyword: new KeywordDataSource(this),
      neighborhood: new NeighborhoodDataSource(this),
      organization: new OrganizationDataSource(this),
      place: new PlaceDataSource(this),
    };
  }
}
export default EventContext;
