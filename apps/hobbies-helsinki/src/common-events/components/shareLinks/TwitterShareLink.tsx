import type { ShareLinkProps } from 'events-helsinki-components';
import { ShareLinkBase } from 'events-helsinki-components';
import { useTranslation } from 'next-i18next';
import React from 'react';

import TwitterIcon from '../../../assets/icons/svg/twitter.svg';

const twitterShareUrl = 'https://twitter.com/share';

const TwitterShareLink: React.FC<ShareLinkProps> = ({ sharedLink }) => {
  const { t } = useTranslation('common');
  const queryParameters = { url: sharedLink };
  const linkLabel = t('shareLink.shareOnTwitter');

  return (
    <ShareLinkBase
      url={twitterShareUrl}
      queryParameters={queryParameters}
      windowName={linkLabel}
      linkLabel={linkLabel}
      icon={<TwitterIcon />}
    />
  );
};

export default TwitterShareLink;
