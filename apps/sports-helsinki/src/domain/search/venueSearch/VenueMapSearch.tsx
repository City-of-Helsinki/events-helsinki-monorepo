import { useSearchTranslation } from '@events-helsinki/components';
import { usePageContext } from 'react-helsinki-headless-cms';
import { SEARCH_ROUTES } from '../../../constants';
import styles from './search.module.scss';
import SimpleVenueSearch from './VenueSearch';
export const searchContainerDataTestId = 'mapSearchContainer';

const SimpleVenueMapSearch = () => {
  const { t } = useSearchTranslation();
  const { page } = usePageContext();
  const fallbackTitle = t('search:search.titlePage');
  const title = page?.title?.trim() || fallbackTitle;
  return (
    <SimpleVenueSearch
      data-testid={searchContainerDataTestId}
      searchRoute={SEARCH_ROUTES.MAPSEARCH}
      searchUtilities={null}
      korosBottom={false}
      title={title}
      className={styles.mapView}
      scrollToResultList={() => true}
    />
  );
};
export default SimpleVenueMapSearch;
