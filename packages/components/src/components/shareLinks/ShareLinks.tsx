import classNames from 'classnames';
import { IconLink } from 'hds-react';
import React from 'react';
import { useCommonTranslation } from '../../hooks';
import { isClient } from '../../utils';
import CopyButton from '../copyButton/CopyButton';

import FacebookShareLink from './FacebookShareLink';
import LinkedInShareLink from './LinkedInShareLink';
import styles from './shareLinks.module.scss';
import TwitterShareLink from './TwitterShareLink';

export interface ShareLinksProps {
  title: string;
}

const ShareLinks: React.FC<ShareLinksProps> = ({ title }) => {
  const { t } = useCommonTranslation();
  // We are using the client only accessible href. By doing this, we do not need
  // to pass the original request from the server. This same pattern was used in
  // MyHelsinki. Limitation is that sharing buttons will be re-rendered on client
  // side because href value is different
  const href = isClient
    ? `${window.location.origin}${window.location.pathname}`
    : '';

  return (
    <div className={styles.shareSubSection}>
      <h2 className={styles.shareSubSectionTitle}>{title}</h2>
      <ul className={styles.shareLinkList}>
        <li
          className={classNames(styles.shareLinkItem, styles.relativePosition)}
        >
          <CopyButton
            type="button"
            string={href}
            className={styles.copyButton}
            successClass={styles.linkCopyButtonSuccess}
            successMessage={
              <span className={styles.successTooltip}>
                {t('common:shareLinks.messageLinkCopySuccess')}
              </span>
            }
            aria-label={t('common:shareLinks.buttonCopyLink')}
          >
            <IconLink ariaLabel={t('common:shareLinks.buttonCopyLink')} />
          </CopyButton>
        </li>
        <li className={styles.shareLinkItem}>
          <FacebookShareLink sharedLink={href} />
        </li>
        <li className={styles.shareLinkItem}>
          <TwitterShareLink sharedLink={href} />
        </li>
        <li className={styles.shareLinkItem}>
          <LinkedInShareLink sharedLink={href} />
        </li>
      </ul>
    </div>
  );
};

export default ShareLinks;
