import {
  useAppSportsTranslation,
  useLocale,
  useHomeTranslation,
  AdvancedSearchTextInput,
} from '@events-helsinki/components';
import classnames from 'classnames';
import { Button, IconSearch } from 'hds-react';
import { SecondaryLink } from 'react-helsinki-headless-cms';
import { ROUTES } from '../../../constants';
import routerHelper from '../../../domain/app/routerHelper';
import styles from './landingPageSearchForm.module.scss';

export type LandingPageSearchFormProps = Readonly<{
  className?: string;
  textSearchInput: string;
  setTextSearchInput: (value: string) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}>;

export default function LandingPageSearchForm({
  className,
  textSearchInput,
  setTextSearchInput,
  handleSubmit,
}: LandingPageSearchFormProps) {
  const { t } = useHomeTranslation();
  const { t: tAppSports } = useAppSportsTranslation();
  const locale = useLocale();

  return (
    <form
      className={classnames(className, styles.landingPageSearch)}
      onSubmit={handleSubmit}
    >
      <h1>{tAppSports('appSports:home.search.title')}</h1>
      <div className={styles.searchRow}>
        <div className={styles.textSearchWrapper}>
          <AdvancedSearchTextInput
            id="search"
            name="search"
            placeholder={t('home:search.placeholder')}
            value={textSearchInput}
            onChange={(event) => setTextSearchInput(event.target.value)}
            clearButton
            clearButtonAriaLabel={tAppSports(
              'appSports:search.search.clearButtonAriaLabel'
            )}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <Button
            variant="success"
            fullWidth={true}
            iconLeft={<IconSearch />}
            type="submit"
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
    </form>
  );
}
