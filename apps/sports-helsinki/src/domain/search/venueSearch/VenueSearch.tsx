import type { ParsedUrlQueryInput } from 'querystring';
import type { AutosuggestMenuOption } from 'events-helsinki-components';
import { buildQueryFromObject, useLocale } from 'events-helsinki-components';
import { Button, IconSearch } from 'hds-react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import qs, { parse } from 'query-string';
import type { FormEvent } from 'react';
import React from 'react';
import { ContentContainer, PageSection } from 'react-helsinki-headless-cms';
import SearchAutosuggest from '../../../common-events/components/search/SearchAutosuggest';
import { SEARCH_ROUTES } from '../../../constants';
import { getI18nPath } from '../../../utils/routerUtils';
import FilterSummary from '../eventSearch/filterSummary/FilterSummary';
import styles from './search.module.scss';

export type SearchComponentProps = {
  scrollToResultList?: () => void;
  'data-testid'?: string;
  korosBottom?: boolean;
  showTitle?: boolean;
  searchRoute?: typeof SEARCH_ROUTES[keyof typeof SEARCH_ROUTES]; // TODO: Allow only SEARCH_ROUTE values
};

const SimpleVenueSearch: React.FC<SearchComponentProps> = ({
  scrollToResultList,
  'data-testid': dataTestId,
  korosBottom = false,
  showTitle = false,
  searchRoute = SEARCH_ROUTES.SEARCH,
}) => {
  const { t } = useTranslation('search');
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
      pathname: getI18nPath(searchRoute, locale),
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
    scrollToResultList && scrollToResultList();
  };

  // Initialize fields when page is loaded
  React.useEffect(() => {
    setAutosuggestInput(searchParams.get('q') ?? '');
  }, [searchParams]);

  const handleMenuOptionClick = async (option: AutosuggestMenuOption) => {
    const value = option.text;
    const search = buildQueryFromObject({ q: value });
    goToSearch(search);
    scrollToResultList && scrollToResultList();
  };
  return (
    <PageSection
      korosBottom={korosBottom}
      korosBottomClassName={styles.searchContainerKoros}
      className={`${styles.searchContainer} ${!korosBottom && styles.noKoros}`}
      data-testid={dataTestId}
    >
      <ContentContainer
        className={`${styles.contentContainer} ${
          !korosBottom && styles.noKoros
        }`}
      >
        <form onSubmit={handleSubmit}>
          <div className={styles.searchWrapper}>
            {showTitle && <h2>{t('search.labelSearchField')}</h2>}
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
                  variant="success"
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
