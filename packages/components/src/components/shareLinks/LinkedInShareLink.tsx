import { useTranslation } from 'next-i18next';
import React from 'react';
import type { ShareLinkProps } from 'events-helsinki-components';
import { ShareLinkBase } from 'events-helsinki-components';

import LinkedInIcon from '../../assets/icons/svg/linkedin.svg';

const linkedInShareUrl = 'https://linkedin.com/shareArticle';

const LinkedInShareLink: React.FC<ShareLinkProps> = ({ sharedLink }) => {
  const { t } = useTranslation('common');
  const queryParameters = { url: sharedLink };
  const linkLabel = t('shareLink.shareOnLinkedIn');

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
