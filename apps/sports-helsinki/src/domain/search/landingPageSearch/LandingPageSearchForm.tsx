import {
  useAppSportsTranslation,
  useLocale,
  useHomeTranslation,
  AdvancedSearchTextInput,
} from '@events-helsinki/components';
import classnames from 'classnames';
import { Button, ButtonVariant, IconSearch } from 'hds-react';
import {
  isPageType,
  SecondaryLink,
  usePageContext,
} from 'react-helsinki-headless-cms';
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
  const { page } = usePageContext();
  const heroTitle =
    isPageType(page) && page?.hero?.title?.trim() !== ''
      ? page?.hero?.title?.trim()
      : tAppSports('appSports:home.search.title');
  const heroDescription =
    isPageType(page) && page?.hero?.description?.trim()
      ? page?.hero?.description?.trim()
      : undefined;

  return (
    <form
      className={classnames(className, styles.landingPageSearch)}
      onSubmit={handleSubmit}
    >
      <h1
        id="heroTitle"
        className={classnames({ [styles.withDescription]: !!heroDescription })}
      >
        {heroTitle}
      </h1>
      {!!heroDescription && <p id="heroDescription">{heroDescription}</p>}
      <div className={styles.searchRow}>
        <div className={styles.textSearchWrapper}>
          <AdvancedSearchTextInput
            id="search"
            name="search"
            placeholder={t('home:search.placeholder')}
            value={textSearchInput}
            onChange={(event) => setTextSearchInput(event.target.value)}
            clearButton={false} // HH-456 the clear button not working properly when value handled programmatically.
          />
        </div>
        <div className={styles.buttonWrapper}>
          <Button
            variant={ButtonVariant.Success}
            fullWidth={true}
            iconStart={<IconSearch aria-hidden />}
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
