import type { ContentSource } from 'hds-react';
import { CookieModal } from 'hds-react';
import React from 'react';
import { MAIN_CONTENT_ID } from '../../constants';
import { useCommonTranslation } from '../../hooks';
import useLocale from '../../hooks/useLocale';

const EventsCookieConsent: React.FC = () => {
  const locale = useLocale();
  const { i18n } = useCommonTranslation();
  const onLanguageChange = (newLang: string) => {
    void i18n.changeLanguage(newLang);
  };

  const contentSource: ContentSource = {
    siteName: 'Testisivusto',
    currentLanguage: locale,
    requiredCookies: {
      groups: [
        {
          commonGroup: 'login',
          cookies: [
            {
              commonCookie: 'tunnistamo',
            },
            {
              commonCookie: 'keycloak',
            },
          ],
        },
        {
          commonGroup: 'essential',
          cookies: [
            {
              commonCookie: 'cms-session',
            },
          ],
        },
        {
          commonGroup: 'loadBalancing',
          cookies: [
            {
              id: 'loadbalancer',
              name: 'Loadbalancer Cookie',
              hostName: 'CDN site',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1h',
            },
          ],
        },
        {
          commonGroup: 'accessibility',
          cookies: [
            {
              id: 'accessibility',
              name: 'Accessibility cookie',
              hostName: 'CDN site',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1h',
            },
          ],
        },
        {
          commonGroup: 'userInputs',
          cookies: [
            {
              id: 'userInputs',
              name: 'User inputs cookie',
              hostName: 'CDN site',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1h',
            },
          ],
        },
      ],
    },
    optionalCookies: {
      groups: [
        {
          commonGroup: 'marketing',
          cookies: [
            {
              id: 'marketing',
              name: 'Custom Marketing cookie',
              hostName: 'Host name',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1h',
            },
          ],
        },
        {
          commonGroup: 'preferences',
          cookies: [
            {
              id: 'preferences1',
              name: 'Preference 1',
              hostName: 'Host name',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1h',
            },
            {
              id: 'preferences2',
              name: 'Preference 2',
              hostName: 'Host name',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1 years',
            },
            {
              id: 'preferences3',
              name: 'Preference 3',
              hostName: 'Host name',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '2h',
            },
          ],
        },
        {
          commonGroup: 'statistics',
          cookies: [
            {
              commonCookie: 'matomo',
            },
            {
              commonCookie: 'cookiehub',
            },
            {
              id: 'someOtherConsent',
              name: 'Other consent',
              hostName: 'Host name',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1h',
            },
          ],
        },
        {
          commonGroup: 'location',
          cookies: [
            {
              id: 'location',
              name: 'Location consent',
              hostName: 'Host name',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1h',
            },
          ],
        },
        {
          commonGroup: 'content',
          cookies: [
            {
              id: 'content',
              name: 'Content consent',
              hostName: 'Host name',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1h',
            },
          ],
        },
        {
          commonGroup: 'thirdParty',
          cookies: [
            {
              id: 'thirdParty',
              name: 'ThirdParty consent',
              hostName: 'Host name',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1h',
            },
          ],
        },
        {
          commonGroup: 'chat',
          cookies: [
            {
              id: 'chat',
              name: 'Chat consent',
              hostName: 'Host name',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1h',
            },
          ],
        },
        {
          commonGroup: 'deviceInfo',
          cookies: [
            {
              id: 'deviceInfo',
              name: 'Device info consent',
              hostName: 'Host name',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1h',
            },
          ],
        },
        {
          commonGroup: 'socialMedia',
          cookies: [
            {
              id: 'socialMedia',
              name: 'Social media consent',
              hostName: 'Host name',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1h',
            },
          ],
        },
        {
          commonGroup: 'informationSecurity',
          cookies: [
            {
              id: 'informationSecurity',
              name: 'Information security consent',
              hostName: 'Host name',
              description:
                'Description lectus lacinia sed. Phasellus purus nisi, imperdiet id volutpat vel, pellentesque in ex. In pretium maximus finibus',
              expiration: '1h',
            },
          ],
        },
      ],
    },

    language: {
      onLanguageChange,
    },
    onAllConsentsGiven: (consents) => {
      if (consents.matomo) {
        //  start tracking
        // window._paq.push(['setConsentGiven']);
        // window._paq.push(['setCookieConsentGiven']);
      }
    },
    onConsentsParsed: (consents, hasUserHandledAllConsents) => {
      if (consents.matomo === undefined) {
        // tell matomo to wait for consent:
        // window._paq.push(['requireConsent']);
        // window._paq.push(['requireCookieConsent']);
        // eslint-disable-next-line sonarjs/no-duplicated-branches
      } else if (consents.matomo === false) {
        // tell matomo to forget conset
        // window._paq.push(['forgetConsentGiven']);
      }
      if (hasUserHandledAllConsents) {
        // cookie consent modal will not be shown
      }
    },
    focusTargetSelector: MAIN_CONTENT_ID,
  };

  return <CookieModal contentSource={contentSource} />;
};

export default EventsCookieConsent;
