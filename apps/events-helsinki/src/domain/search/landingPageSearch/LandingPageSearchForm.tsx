import classnames from 'classnames';
import type { AutosuggestMenuOption } from 'events-helsinki-components';
import {
  DateSelector,
  MobileDateSelector,
  useLocale,
  useHomeTranslation,
} from 'events-helsinki-components';
import { Button, IconSearch } from 'hds-react';
import { SecondaryLink } from 'react-helsinki-headless-cms';
import SearchAutosuggest from '../../../common-events/components/search/SearchAutosuggest';
import { ROUTES } from '../../../constants';
import { getI18nPath } from '../../../utils/routerUtils';
import styles from './landingPageSearchForm.module.scss';

export type LandingPageSearchFormProps = {
  className?: string;
  dateTypes: string[];
  start: Date | null;
  end: Date | null;
  isCustomDate: boolean;
  autosuggestInput: string;
  setStart: (value: Date | null) => void;
  setEnd: (value: Date | null) => void;
  setAutosuggestInput: (value: string) => void;
  handleChangeDateTypes: (value: string[]) => void;
  toggleIsCustomDate: () => void;
  handleSubmit: () => void;
  handleMenuOptionClick: (option: AutosuggestMenuOption) => void;
};

export default function LandingPageSearchForm({
  className,
  dateTypes,
  start,
  setStart,
  end,
  setEnd,
  isCustomDate,
  autosuggestInput,
  setAutosuggestInput,
  handleChangeDateTypes,
  toggleIsCustomDate,
  handleSubmit,
  handleMenuOptionClick,
}: LandingPageSearchFormProps) {
  const { t } = useHomeTranslation();
  const locale = useLocale();

  return (
    <div className={classnames(className, styles.landingPageSearch)}>
      <h2>{t('home:eventSearch.title')}</h2>
      <div className={styles.searchRow}>
        <div className={styles.autosuggestWrapper}>
          <SearchAutosuggest
            name="search"
            onChangeSearchValue={setAutosuggestInput}
            onOptionClick={handleMenuOptionClick}
            placeholder={t('home:search.placeholder')}
            searchValue={autosuggestInput}
          />
        </div>
        <div className={styles.dateAndButtonWrapper}>
          <div className={styles.dateSelectorWrapper}>
            <div className={styles.desktopDateSelector}>
              <DateSelector
                dateTypes={dateTypes}
                endDate={end}
                isCustomDate={isCustomDate}
                name="date"
                onChangeDateTypes={handleChangeDateTypes}
                onChangeEndDate={setEnd}
                onChangeStartDate={setStart}
                startDate={start}
                toggleIsCustomDate={toggleIsCustomDate}
              />
            </div>
            <MobileDateSelector
              dateTypes={dateTypes}
              endDate={end}
              name={'mobile_date'}
              onChangeDateTypes={handleChangeDateTypes}
              onChangeEndDate={setEnd}
              onChangeStartDate={setStart}
              startDate={start}
            />
          </div>
          <div className={styles.buttonWrapper}>
            <Button
              fullWidth={true}
              iconLeft={<IconSearch />}
              onClick={handleSubmit}
              variant="success"
            >
              {t('home:eventSearch.buttonSearch')}
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.linkRow}>
        <SecondaryLink
          variant="arrowRight"
          className={styles.link}
          href={getI18nPath(ROUTES.SEARCH, locale)}
        >
          {t('home:eventSearch.linkAdvancedSearch')}
        </SecondaryLink>
      </div>
    </div>
  );
}
