import {
  DateSelector,
  MobileDateSelector,
  useLocale,
  useHomeTranslation,
  useAppHobbiesTranslation,
  AdvancedSearchTextInput,
} from '@events-helsinki/components';
import classnames from 'classnames';
import { Button, IconSearch } from 'hds-react';
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
  dateTypes: string[];
  start: Date | null;
  end: Date | null;
  isCustomDate: boolean;
  textSearchInput: string;
  setStart: (value: Date | null) => void;
  setEnd: (value: Date | null) => void;
  setTextSearchInput: (value: string) => void;
  handleChangeDateTypes: (value: string[]) => void;
  toggleIsCustomDate: () => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}>;

export default function LandingPageSearchForm({
  className,
  dateTypes,
  start,
  setStart,
  end,
  setEnd,
  isCustomDate,
  textSearchInput,
  setTextSearchInput,
  handleChangeDateTypes,
  toggleIsCustomDate,
  handleSubmit,
}: LandingPageSearchFormProps) {
  const { t } = useHomeTranslation();
  const { t: tAppHobbies } = useAppHobbiesTranslation();
  const locale = useLocale();
  const { page } = usePageContext();
  const heroTitle =
    isPageType(page) && page?.hero?.title?.trim() !== ''
      ? page?.hero?.title?.trim()
      : tAppHobbies('appHobbies:home.search.title');
  const heroDescription =
    isPageType(page) && page?.hero?.description?.trim() !== ''
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
            clearButton
            clearButtonAriaLabel={tAppHobbies(
              'appHobbies:search.search.clearButtonAriaLabel'
            )}
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
              theme="coat"
              fullWidth={true}
              iconLeft={<IconSearch />}
              type="submit"
            >
              {t('home:search.buttonSearch')}
            </Button>
          </div>
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
