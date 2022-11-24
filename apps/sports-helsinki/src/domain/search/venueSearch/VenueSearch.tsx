import type { ParsedUrlQueryInput } from 'querystring';
import type { AutosuggestMenuOption } from 'events-helsinki-components';
import {
  buildQueryFromObject,
  useAppSportsTranslation,
  useLocale,
} from 'events-helsinki-components';
import { Button, IconSearch } from 'hds-react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import qs, { parse } from 'query-string';
import type { FormEvent } from 'react';
import React from 'react';
import { ContentContainer, PageSection } from 'react-helsinki-headless-cms';
import SearchAutosuggest from 'common-events/components/search/SearchAutosuggest';
import { getI18nPath } from 'utils/routerUtils';
import { ROUTES } from '../../../constants';
import FilterSummary from '../eventSearch/filterSummary/FilterSummary';
import styles from './search.module.scss';

const SimpleVenueSearch: React.FC<{
  scrollToResultList: () => void;
  'data-testid'?: string;
}> = ({ scrollToResultList, 'data-testid': dataTestId }) => {
  const { t } = useTranslation('search');
  const { t: tAppSports } = useAppSportsTranslation();
  const locale = useLocale();
  const router = useRouter();

  const [autosuggestInput, setAutosuggestInput] = React.useState('');

  const searchParams = React.useMemo(
    () => new URLSearchParams(qs.stringify(router.query)),
    [router.query]
  );
  const searchFilters = {
    q: autosuggestInput,
  };
  const goToSearch = (search: string): void => {
    router.push({
      pathname: getI18nPath(ROUTES.SEARCH, locale),
      query: parse(search) as ParsedUrlQueryInput,
    });
  };
  const moveToSearchPage = () => {
    const filters = {
      ...searchFilters,
    };
    const search = buildQueryFromObject(filters);
    goToSearch(search);
  };

  const clearInputValues = () => {
    setAutosuggestInput('');
  };

  const clearFilters = () => {
    const search = '';
    goToSearch(search);
    clearInputValues();
  };

  const handleSubmit = (event?: FormEvent) => {
    if (event) {
      event.preventDefault();
    }

    moveToSearchPage();
    scrollToResultList();
  };

  // Initialize fields when page is loaded
  React.useEffect(() => {
    setAutosuggestInput(searchParams.get('q') ?? '');
  }, [searchParams]);

  const handleMenuOptionClick = async (option: AutosuggestMenuOption) => {
    const value = option.text;
    const search = buildQueryFromObject({ q: value });
    goToSearch(search);
    scrollToResultList();
  };
  return (
    <PageSection
      korosBottom
      korosBottomClassName={styles.searchContainerKoros}
      className={styles.searchContainer}
      data-testid={dataTestId}
    >
      <ContentContainer className={styles.contentContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.searchWrapper}>
            <h2>{tAppSports('appSports:search.title')}</h2>
            <div className={styles.rowWrapper}>
              <div>
                <SearchAutosuggest
                  name="search"
                  onChangeSearchValue={setAutosuggestInput}
                  onOptionClick={handleMenuOptionClick}
                  placeholder={t('search.placeholder')}
                  searchValue={autosuggestInput}
                />
              </div>
              <div className={styles.buttonWrapper}>
                <Button
                  theme="coat"
                  fullWidth={true}
                  iconLeft={<IconSearch aria-hidden />}
                  type="submit"
                >
                  {t('search.buttonSearch')}
                </Button>
              </div>
            </div>
            <FilterSummary onClear={clearFilters} />
          </div>
        </form>
      </ContentContainer>
    </PageSection>
  );
};

export default SimpleVenueSearch;
