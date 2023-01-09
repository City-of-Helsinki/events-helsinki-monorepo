import { useSearchTranslation } from 'events-helsinki-components';
import React from 'react';
import { ContentContainer, PageSection } from 'react-helsinki-headless-cms';
import OrderBySelect from './OrderBySelect';
import ResultsInfoContainer from './ResultsInfo';
import styles from './searchResultList.module.scss';

interface Props {
  loading: boolean;
  eventsCount: number;
  eventList: React.ReactElement;
  showOrderBySelect?: boolean;
}

const SearchResultsContainer: React.FC<Props> = ({
  loading,
  eventsCount,
  eventList,
  showOrderBySelect = false,
}) => {
  const { t } = useSearchTranslation();

  return (
    <PageSection className={styles.searchResultListContainer}>
      <ContentContainer>
        {!loading && (
          <div className={styles.row}>
            <div className={styles.rowGroup}>
              <h2 className={styles.count}>
                {t('search:textFoundEvents', {
                  count: eventsCount,
                })}
              </h2>
              {showOrderBySelect && <OrderBySelect />}
            </div>
          </div>
        )}
        {!!eventsCount && eventList}
        {!loading && <ResultsInfoContainer resultsCount={eventsCount} />}
      </ContentContainer>
    </PageSection>
  );
};

export default SearchResultsContainer;
