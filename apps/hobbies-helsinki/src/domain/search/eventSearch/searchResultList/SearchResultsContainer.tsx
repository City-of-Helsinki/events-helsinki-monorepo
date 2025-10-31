import { useSearchTranslation } from '@events-helsinki/components';
import React from 'react';
import { ContentContainer, PageSection } from 'react-helsinki-headless-cms';

import ResultsInfoContainer from './ResultsInfo';
import styles from './searchResultList.module.scss';

interface Props {
  loading: boolean;
  eventsCount: number;
  eventList: React.ReactElement;
  orderBySelectComponent?: React.ReactElement;
}

const SearchResultsContainer: React.FC<Props> = ({
  loading,
  eventsCount,
  eventList,
  orderBySelectComponent,
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
              {orderBySelectComponent !== undefined && orderBySelectComponent}
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
