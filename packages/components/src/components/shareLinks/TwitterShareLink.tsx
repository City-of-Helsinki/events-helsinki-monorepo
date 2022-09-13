import React from 'react';

import useCommonTranslation from '../../hooks/useCommonTranslation';
import TwitterIcon from '../../icons/svg/twitter.svg';
import ShareLinkBase from './ShareLinkBase';
import type { ShareLinkProps } from './types';

const twitterShareUrl = 'https://twitter.com/share';

const TwitterShareLink: React.FC<ShareLinkProps> = ({ sharedLink }) => {
  const { t } = useCommonTranslation();
  const queryParameters = { url: sharedLink };
  const linkLabel = t('common:shareLink.shareOnTwitter');

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
