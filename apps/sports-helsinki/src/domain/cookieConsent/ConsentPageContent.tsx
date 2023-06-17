import React from 'react';

import styles from './consentPageContent.module.scss';

interface Props {
  children: React.ReactNode;
}

const ConsentPageContent: React.FC<Props> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default ConsentPageContent;
