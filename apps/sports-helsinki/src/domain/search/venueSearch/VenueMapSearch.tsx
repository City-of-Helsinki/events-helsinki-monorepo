import { SEARCH_ROUTES } from '../../../constants';
import styles from './search.module.scss';
import SimpleVenueSearch from './VenueSearch';
export const searchContainerDataTestId = 'mapSearchContainer';

const SimpleVenueMapSearch = () => (
  <SimpleVenueSearch
    data-testid={searchContainerDataTestId}
    searchRoute={SEARCH_ROUTES.MAPSEARCH}
    searchUtilities={null}
    korosBottom={false}
    showTitle={false}
    className={styles.mapView}
    scrollToResultList={() => true}
  />
);

export default SimpleVenueMapSearch;
