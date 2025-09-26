import React from 'react';
import { PageSection, ContentContainer } from 'react-helsinki-headless-cms';
import AdvancedSearchContext from './AdvancedSearchContext';
import AdvancedSearchForm from './AdvancedSearchForm';
import styles from './search.module.scss';
import { useAdvancedSearchFormState } from './useAdvancedSearchFormState';

interface Props {
  'data-testid'?: string;
}

const AdvancedSearch: React.FC<Props> = ({ 'data-testid': dataTestId }) => {
  const searchFormState = useAdvancedSearchFormState();

  const contextValue = React.useMemo(
    () => ({
      ...searchFormState,
    }),
    [searchFormState]
  );
  return (
    <AdvancedSearchContext.Provider value={contextValue}>
      <PageSection
        korosBottom
        korosBottomClassName={styles.searchContainerKoros}
        className={styles.searchContainer}
        data-testid={dataTestId}
      >
        <ContentContainer className={styles.contentContainer}>
          <AdvancedSearchForm />
        </ContentContainer>
      </PageSection>
    </AdvancedSearchContext.Provider>
  );
};

export default AdvancedSearch;
