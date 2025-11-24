import type { CookieConsentChangeEvent } from 'hds-react';
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

  // FIXME: We have no need for onChange -handler, so we can remove it.
  // The onChange property will be made optional in HDS v.4.8.1.
  // See: https://github.com/City-of-Helsinki/helsinki-design-system/releases/tag/v4.8.1.
  const onChange = (event: CookieConsentChangeEvent) => {
    // eslint-disable-next-line no-console
    console.debug('Cookie consent changed: ', { event });
  };

  return (
    <CookieConsentContextProvider
      onChange={onChange}
      options={options}
      siteSettings={siteSettings}
    >
      {children}
    </CookieConsentContextProvider>
  );
};

export default EventsCookieConsent;
