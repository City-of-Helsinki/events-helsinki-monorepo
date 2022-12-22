import { SEARCH_ROUTES } from '../../../constants';
import SimpleVenueSearch from './VenueSearch';

export const searchContainerDataTestId = 'mapSearchContainer';

const SimpleVenueMapSearch = () => (
  <SimpleVenueSearch
    data-testid={searchContainerDataTestId}
    searchRoute={SEARCH_ROUTES.MAPSEARCH}
    searchUtilities={null}
    korosBottom={false}
    showTitle={false}
  />
);

export default SimpleVenueMapSearch;
