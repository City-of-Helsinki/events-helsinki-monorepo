import { useLocale } from 'events-helsinki-components';
import type { AppLanguage } from 'events-helsinki-components';
import { Button, IconSearch } from 'hds-react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';

import { ROUTES } from '../../../../constants';
import { getI18nPath } from '../../../../utils/routerUtils';
import styles from './resultsInfo.module.scss';

const ResultsInfoContainer: React.FC<{
  resultsCount: number;
}> = ({ resultsCount }) => {
  const { t } = useTranslation('search');
  const router = useRouter();
  const locale = useLocale();
  const isFinnish = locale === 'fi';

  const goToFinnishSearch = () => {
    router.push(getI18nPath(ROUTES.SEARCH, 'fi' as AppLanguage));
  };

  const ActionButtons = () => (
    <>
      {!isFinnish && (
        <Button variant="success" onClick={goToFinnishSearch}>
          {t('searchNotification.buttons.labelSearchInFinnish')}
        </Button>
      )}
    </>
  );

  if (resultsCount === 0) {
    return (
      <ResultsInfo
        bigText={t(`searchNotification.noResultsTitle`)}
        actionsSection={<ActionButtons />}
      />
    );
  }

  if (resultsCount < 5) {
    return (
      <ResultsInfo
        bigText={t(`searchNotification.fewResultsTitle`)}
        actionsSection={<ActionButtons />}
      />
    );
  }

  return null;
};

const ResultsInfo: React.FC<{
  smallText?: string;
  bigText: string;
  actionsSection?: JSX.Element;
}> = ({ bigText, smallText, actionsSection }) => {
  return (
    <div className={styles.noResultsInfo}>
      <div className={styles.iconWrapper}>
        <IconSearch aria-hidden />
      </div>
      <div className={styles.bigText}>{bigText}</div>
      {smallText && <div className={styles.smallText}>{smallText}</div>}
      {actionsSection && <div className={styles.actions}>{actionsSection}</div>}
    </div>
  );
};

export default ResultsInfoContainer;
