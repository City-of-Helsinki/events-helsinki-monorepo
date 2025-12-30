import {
  ContentContainer,
  PageSection,
} from '@city-of-helsinki/react-helsinki-headless-cms';
import type { EventTypeId } from '@events-helsinki/components';
import { useSearchTranslation } from '@events-helsinki/components';
import React from 'react';
import ResultsInfoContainer from './ResultsInfo';
import styles from './searchResultList.module.scss';

interface Props {
  loading: boolean;
  eventsCount: number;
  eventList: React.ReactElement;
  orderBySelectComponent?: React.ReactElement;
  itemType?: EventTypeId | 'Venue';
}

const SearchResultsContainer: React.FC<Props> = ({
  loading,
  eventsCount,
  eventList,
  orderBySelectComponent,
  itemType,
}) => {
  const { t } = useSearchTranslation();

  return (
    <PageSection className={styles.searchResultListContainer}>
      <ContentContainer>
        {!loading && (
          <div className={styles.row}>
            <div className={styles.rowGroup}>
              <h3 className={styles.count}>
                {t('search:textFoundEvents', {
                  count: eventsCount,
                })}
              </h3>
              {orderBySelectComponent !== undefined && orderBySelectComponent}
            </div>
          </div>
        )}
        {!!eventsCount && eventList}
        {!loading && (
          <ResultsInfoContainer
            itemType={itemType}
            resultsCount={eventsCount}
          />
        )}
      </ContentContainer>
    </PageSection>
  );
};

export default SearchResultsContainer;
