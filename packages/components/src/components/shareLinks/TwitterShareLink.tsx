import { IconX } from 'hds-react';
import React from 'react';
import { useCommonTranslation } from '../../hooks';
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
      icon={<IconX ariaLabel={linkLabel} />}
    />
  );
};

export default TwitterShareLink;
