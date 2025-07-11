import { ContextValue } from '@events-helsinki/graphql-proxy-server';

import EventDataSource from '../datasources/eventDataSource.js';
import KeywordDataSource from '../datasources/keywordDataSource.js';
import NeighborhoodDataSource from '../datasources/neighborhoodDataSource.js';
import OrganizationDataSource from '../datasources/organizationDataSource.js';
import PlaceDataSource from '../datasources/placeDataSource.js';
import type { EventDataSources } from '../types.js';

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
