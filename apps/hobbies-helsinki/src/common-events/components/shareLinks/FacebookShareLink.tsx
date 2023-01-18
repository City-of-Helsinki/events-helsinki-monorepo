import type { ShareLinkProps } from 'events-helsinki-components';
import {
  useCommonTranslation,
  ShareLinkBase,
} from 'events-helsinki-components';
import React from 'react';

import FacebookIcon from '../../../assets/icons/svg/facebook.svg';

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
