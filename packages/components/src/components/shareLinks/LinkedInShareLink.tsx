import { IconLinkedin } from 'hds-react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import ShareLinkBase from './ShareLinkBase';
import type { ShareLinkProps } from './types';

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
      icon={<IconLinkedin ariaLabel={linkLabel} />}
    />
  );
};

export default LinkedInShareLink;
