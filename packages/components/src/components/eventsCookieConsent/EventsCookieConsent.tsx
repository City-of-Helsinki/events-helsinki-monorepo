import { CookieConsentContextProvider } from 'hds-react';
import React from 'react';

import useLocale from '../../hooks/useLocale';
import useConsentSiteSettings from './useConsentSiteSettings';

type Props = {
  children?: React.ReactNode;
};

const EventsCookieConsent: React.FC<Props> = ({ children }) => {
  const language = useLocale();

  const siteSettings = useConsentSiteSettings();
  const options = { language };

  return (
    <CookieConsentContextProvider options={options} siteSettings={siteSettings}>
      {children}
    </CookieConsentContextProvider>
  );
};

export default EventsCookieConsent;
