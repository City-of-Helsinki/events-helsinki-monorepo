import { Button, IconCrossCircle } from 'hds-react';
import { useRouter } from 'next/router';
import React from 'react';
import type { Menu } from 'react-helsinki-headless-cms';
import { Page as RHHCPage } from 'react-helsinki-headless-cms';
import { HARDCODED_LANGUAGES, MAIN_CONTENT_ID } from '../../constants';
import useErrorsTranslation from '../../hooks/useErrorsTranslation';
import useLocale from '../../hooks/useLocale';
import FooterSection from '../footer/Footer';
import MatomoWrapper from '../matomoWrapper/MatomoWrapper';
import Navigation from '../navigation/Navigation';
import styles from './errorPage.module.scss';

/** This is just a mock of footer menu to prevent
 * Apollo client to query it on error page.
 * The error page should not fetch the menu by using the Apollo client,
 * because the network error in the Apollo client is
 * usually the reason to show the error page.
 * */
const HARDCODED_FOOTER_MENU = { menuItems: { nodes: [] } } as unknown as Menu;

export type ErrorPageProps = {
  headerText: string;
  descriptionText: string | React.ReactNode;
  appName: string;
};

const ErrorPage: React.FC<ErrorPageProps> = ({
  headerText,
  descriptionText,
  appName,
}) => {
  const { t } = useErrorsTranslation();
  const router = useRouter();
  const locale = useLocale();

  const moveToHomePage = () => {
    router.push(`${locale}/`);
  };

  return (
    <MatomoWrapper>
      <RHHCPage
        className="pageLayout"
        navigation={<Navigation languages={HARDCODED_LANGUAGES} />}
        content={
          <div className={styles.errorPageWrapper}>
            <main id={MAIN_CONTENT_ID}>
              <div className={styles.errorPageHero}>
                <IconCrossCircle size="xl" />
                <h1>{headerText}</h1>
                <p>{descriptionText}</p>
                <Button onClick={moveToHomePage} variant="success">
                  {t(`errors:moveToHomePageButton`)}
                </Button>
              </div>
            </main>
          </div>
        }
        footer={
          <FooterSection menu={HARDCODED_FOOTER_MENU} appName={appName} />
        }
      />
    </MatomoWrapper>
  );
};
export default ErrorPage;
