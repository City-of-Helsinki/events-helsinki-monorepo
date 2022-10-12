import type { ShareLinkProps } from 'events-helsinki-components';
import { ShareLinkBase } from 'events-helsinki-components';
import { useTranslation } from 'next-i18next';
import React from 'react';

import FacebookIcon from '../../../assets/icons/svg/facebook.svg';

const fbShareUrl = 'https://www.facebook.com/sharer/sharer.php';

const FacebookShareLink: React.FC<ShareLinkProps> = ({ sharedLink }) => {
  const { t } = useTranslation('common');

  const queryParameters = { u: sharedLink };
  const linkLabel = t('shareLink.shareOnFacebook');

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
