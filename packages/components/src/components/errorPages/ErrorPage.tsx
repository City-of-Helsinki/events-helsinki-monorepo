import { Button, IconCrossCircle } from 'hds-react';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { Page as RHHCPage } from 'react-helsinki-headless-cms';
import { MAIN_CONTENT_ID } from '../../constants';
import useErrorsTranslation from '../../hooks/useErrorsTranslation';
import useLocale from '../../hooks/useLocale';
import NavigationContext from '../../navigationProvider/NavigationContext';
import FooterSection from '../footer/Footer';
import MatomoWrapper from '../matomoWrapper/MatomoWrapper';

import Navigation from '../navigation/Navigation';
import styles from './errorPage.module.scss';

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
  const { footerMenu } = useContext(NavigationContext);
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
        navigation={<Navigation />}
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
        footer={<FooterSection menu={footerMenu} appName={appName} />}
      />
    </MatomoWrapper>
  );
};
export default ErrorPage;