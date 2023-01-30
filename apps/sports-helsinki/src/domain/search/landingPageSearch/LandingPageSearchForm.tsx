import classnames from 'classnames';
import type { AutosuggestMenuOption } from 'events-helsinki-components';
import {
  useAppSportsTranslation,
  useLocale,
  useHomeTranslation,
} from 'events-helsinki-components';
import { Button, IconSearch } from 'hds-react';
import { SecondaryLink } from 'react-helsinki-headless-cms';
import SearchAutosuggest from '../../../common-events/components/search/SearchAutosuggest';
import { ROUTES } from '../../../constants';
import routerHelper from '../../../domain/app/routerHelper';
import styles from './landingPageSearchForm.module.scss';

export type LandingPageSearchFormProps = {
  className?: string;
  autosuggestInput: string;
  setAutosuggestInput: (value: string) => void;
  handleSubmit: () => void;
  handleMenuOptionClick: (option: AutosuggestMenuOption) => void;
};

export default function LandingPageSearchForm({
  className,
  autosuggestInput,
  setAutosuggestInput,
  handleSubmit,
  handleMenuOptionClick,
}: LandingPageSearchFormProps) {
  const { t } = useHomeTranslation();
  const { t: tAppSports } = useAppSportsTranslation();
  const locale = useLocale();

  return (
    <div className={classnames(className, styles.landingPageSearch)}>
      <h2>{tAppSports('appSports:home.search.title')}</h2>
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
        <div className={styles.buttonWrapper}>
          <Button
            variant="success"
            fullWidth={true}
            iconLeft={<IconSearch />}
            onClick={handleSubmit}
          >
            {t('home:search.buttonSearch')}
          </Button>
        </div>
      </div>
      <div className={styles.linkRow}>
        <SecondaryLink
          variant="arrowRight"
          className={styles.link}
          href={routerHelper.getI18nPath(ROUTES.SEARCH, locale)}
        >
          {t('home:search.linkAdvancedSearch')}
        </SecondaryLink>
      </div>
    </div>
  );
}
