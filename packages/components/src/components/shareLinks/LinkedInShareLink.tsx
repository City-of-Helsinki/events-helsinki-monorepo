import React from 'react';

import useCommonTranslation from '../../hooks/useCommonTranslation';
import LinkedInIcon from '../../icons/svg/linkedin.svg';
import ShareLinkBase from './ShareLinkBase';
import type { ShareLinkProps } from './types';

const linkedInShareUrl = 'https://linkedin.com/shareArticle';

const LinkedInShareLink: React.FC<ShareLinkProps> = ({ sharedLink }) => {
  const { t } = useCommonTranslation();
  const queryParameters = { url: sharedLink };
  const linkLabel = t('common:shareLink.shareOnLinkedIn');

  return (
    <ShareLinkBase
      url={linkedInShareUrl}
      queryParameters={queryParameters}
      windowName={linkLabel}
      linkLabel={linkLabel}
      icon={<LinkedInIcon />}
    />
  );
};

export default LinkedInShareLink;
