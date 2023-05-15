import type { EventTypeId } from '@events-helsinki/components';
import { IconSearch } from 'hds-react';

import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from './resultsInfo.module.scss';

const ResultsInfoContainer: React.FC<{
  resultsCount: number;
  itemType?: EventTypeId | 'Venue';
}> = ({ resultsCount }) => {
  const { t } = useTranslation('search');

  if (resultsCount === 0) {
    return <ResultsInfo bigText={t(`searchNotification.noResultsTitle`)} />;
  }

  if (resultsCount < 5) {
    return <ResultsInfo bigText={t(`searchNotification.fewResultsTitle`)} />;
  }

  return null;
};

const ResultsInfo: React.FC<{
  smallText?: string;
  bigText: string;
}> = ({ bigText, smallText }) => {
  return (
    <div className={styles.noResultsInfo}>
      <div className={styles.iconWrapper}>
        <IconSearch aria-hidden />
      </div>
      <div className={styles.bigText}>{bigText}</div>
      {smallText && <div className={styles.smallText}>{smallText}</div>}
    </div>
  );
};

export default ResultsInfoContainer;
