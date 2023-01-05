import type { KeyValueCache } from '@apollo/utils.keyvaluecache';
import EventAPI from '../datasources/event';
import KeywordAPI from '../datasources/keyword';
import NeighborhoodAPI from '../datasources/neighborhood';
import OrganizationAPI from '../datasources/organization';
import PlaceAPI from '../datasources/place';

class ContextValue {
  public readonly token: string;
  public readonly cache?: KeyValueCache;
  public readonly dataSources: {
    eventAPI: EventAPI;
    keywordAPI: KeywordAPI;
    neighborhoodAPI: NeighborhoodAPI;
    organizationAPI: OrganizationAPI;
    placeAPI: PlaceAPI;
  };

  public X_REQUEST_ID?: string;

  constructor({ token, cache }: { token: string; cache?: KeyValueCache }) {
    this.token = token;
    this.cache = cache;
    this.dataSources = {
      eventAPI: new EventAPI(this),
      keywordAPI: new KeywordAPI(this),
      neighborhoodAPI: new NeighborhoodAPI(this),
      organizationAPI: new OrganizationAPI(this),
      placeAPI: new PlaceAPI(this),
    };
  }
}
export default ContextValue;
