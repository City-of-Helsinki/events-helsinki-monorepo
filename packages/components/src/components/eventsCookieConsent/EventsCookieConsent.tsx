// import useMatomo from '@jonkoops/matomo-tracker-react/lib/useMatomo.js';
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
  // const { asPath: pathname } = useRouter();
  // const { pushInstruction } = useMatomo();

  // useEffect(() => {
  //   handleMatomoUpdate();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pathname]);

  // TODO: Matomo update?
  // const handleMatomoUpdate = useCallback(() => {
  //   const getConsentStatus = (cookieId: string) => {
  //     const consents = getAllConsents();
  //     return consents[cookieId];
  //   };
  //   if (getConsentStatus('matomo')) {
  //     pushInstruction('setCookieConsentGiven');
  //   } else {
  //     pushInstruction('forgetCookieConsentGiven');
  //     setShowCookieConsentModal(true);
  //   }
  // }, [getAllConsents, pushInstruction]);

  const siteSettings = useConsentSiteSettings();
  const options = { language };

  const onChange = (_e: CookieConsentChangeEvent) => {
    console.log('TODO: implement onChange handler to cookie consent');
  };

  // const onAllConsentsGiven = () => {
  //   setShowCookieConsentModal(false);
  //   if (onConsentGiven) {
  //     handleMatomoUpdate();
  //     onConsentGiven();
  //   }
  // };

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
