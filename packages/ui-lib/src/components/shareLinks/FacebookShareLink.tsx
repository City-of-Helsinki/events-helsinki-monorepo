import React from 'react';

import useCommonTranslation from '../../hooks/useCommonTranslation';
import FacebookIcon from '../../icons/svg/facebook.svg';
import ShareLinkBase from './ShareLinkBase';
import type { ShareLinkProps } from './types';

const fbShareUrl = 'https://www.facebook.com/sharer/sharer.php';

const FacebookShareLink: React.FC<ShareLinkProps> = ({ sharedLink }) => {
  const { t } = useCommonTranslation();

  const queryParameters = { u: sharedLink };
  const linkLabel = t('common:shareLink.shareOnFacebook');

  return (
    <ShareLinkBase
      url={fbShareUrl}
      queryParameters={queryParameters}
      windowName={linkLabel}
      linkLabel={linkLabel}
      icon={<FacebookIcon />}
    />
  );
};

export default FacebookShareLink;
