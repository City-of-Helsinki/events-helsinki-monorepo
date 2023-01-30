import type { AutosuggestMenuOption } from 'events-helsinki-components';
import {
  useLocale,
  useCommonTranslation,
  EventTypeId,
} from 'events-helsinki-components';
import { useRouter } from 'next/router';
import React from 'react';
import { ROUTES } from '../../../constants';
import routerHelper from '../../app/routerHelper';
import {
  CATEGORY_CATALOG,
  EVENT_DEFAULT_SEARCH_FILTERS,
} from '../eventSearch/constants';
import { getEventCategoryOptions, getSearchQuery } from '../eventSearch/utils';
import styles from './landingPageSearch.module.scss';
import LandingPageSearchForm from './LandingPageSearchForm';
import SearchShortcuts from './SearchShortcuts';

const Search: React.FC = () => {
  const { t } = useCommonTranslation();
  const locale = useLocale();
  const [dateTypes, setDateTypes] = React.useState<string[]>([]);
  const [start, setStart] = React.useState<Date | null>(null);
  const [end, setEnd] = React.useState<Date | null>(null);
  const [isCustomDate, setIsCustomDate] = React.useState<boolean>(false);
  const [autosuggestInput, setAutosuggestInput] = React.useState('');
  const router = useRouter();

  const handleChangeDateTypes = (value: string[]) => {
    setDateTypes(value);
  };

  const toggleIsCustomDate = () => {
    setIsCustomDate(!isCustomDate);
  };

  const goToSearchPage = (search: string) => {
    router.push({
      pathname: routerHelper.getI18nPath(ROUTES.SEARCH, locale),
      query: routerHelper.getParsedUrlQueryInput(search),
    });
  };

  const handleSubmit = () => {
    const search = getSearchQuery({
      ...EVENT_DEFAULT_SEARCH_FILTERS,
      dateTypes,
      end,
      start,
      text: autosuggestInput ? [autosuggestInput] : [],
    });

    goToSearchPage(search);
  };

  const handleMenuOptionClick = (option: AutosuggestMenuOption) => {
    const search = getSearchQuery({
      ...EVENT_DEFAULT_SEARCH_FILTERS,
      dateTypes,
      end,
      start,
      text: [option.text],
    });
    goToSearchPage(search);
  };

  const categories = getEventCategoryOptions(
    t,
    CATEGORY_CATALOG[EventTypeId.Course].landingPage
  );

  return (
    <div>
      <LandingPageSearchForm
        className={styles.landingPageSearch}
        dateTypes={dateTypes}
        start={start}
        setStart={setStart}
        end={end}
        setEnd={setEnd}
        isCustomDate={isCustomDate}
        autosuggestInput={autosuggestInput}
        setAutosuggestInput={setAutosuggestInput}
        handleChangeDateTypes={handleChangeDateTypes}
        toggleIsCustomDate={toggleIsCustomDate}
        handleSubmit={handleSubmit}
        handleMenuOptionClick={handleMenuOptionClick}
      />
      <SearchShortcuts
        className={styles.categoriesWrapper}
        categories={categories}
        searchFilters={{
          // TODO: use COURSE_DEFAULT_SEARCH_FILTERS
          ...EVENT_DEFAULT_SEARCH_FILTERS,
          dateTypes,
          end,
          start,
        }}
      />
    </div>
  );
};

export default Search;
