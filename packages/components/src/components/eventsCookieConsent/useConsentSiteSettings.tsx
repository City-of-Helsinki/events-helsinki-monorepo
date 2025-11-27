import React from 'react';
import { DEFAULT_LANGUAGE } from '../../constants';
import { useCookieConfigurationContext } from '../../cookieConfigurationProvider';
import useConsentTranslation from '../../hooks/useConsentTranslation';
import { consentGroupIds } from './constants';
import type { SiteSettingsLanguage } from './types';
import { createLocaleDictBuilder } from './utils';

function useLanguages(): SiteSettingsLanguage[] {
  return [
    { code: 'en', title: 'English', direction: 'ltr' },
    { code: 'fi', title: 'Suomi', direction: 'ltr' },
    { code: 'sv', title: 'Svenska', direction: 'ltr' },
  ];
}

function useAppCookieName() {
  const { appName } = useCookieConfigurationContext();
  return `${appName.toLowerCase()}-cookie-consents`;
}

function useConsentContentSource() {
  const { t } = useConsentTranslation();
  const languages = useLanguages();
  const languageCodes = languages.map((lang) => lang.code);

  const buildDict = createLocaleDictBuilder(languageCodes, t);
  const cookieName = useAppCookieName();
  const { cookieDomain, appName } = useCookieConfigurationContext();

  const requiredGroups = [
    {
      groupId: consentGroupIds.essentials,
      title: buildDict('consent:groups.essentials.title'),
      description: buildDict('consent:groups.essentials.description'),
      cookies: [
        {
          name: cookieName,
          host: cookieDomain,
          storageType: 1,
          description: buildDict('consent:cookies.app', { appName }),
          expiration: buildDict('consent:expiration.days', { days: 100 }),
        },
        {
          name: '__next_scroll_*',
          host: cookieDomain,
          storageType: 3,
          description: buildDict('consent:cookies.nextjs_scroll'),
          expiration: buildDict('consent:expiration.session'),
        },
        // TODO: Can be reoved, if these are for old cookie consent.
        // {
        //   name: 'city-of-helsinki-consent-version',
        //   host: cookieDomain,
        //   storageType: 1,
        //   description: buildDict(
        //     'consent:cookies.city_of_helsinki_consent_version'
        //   ),
        //   expiration: buildDict('consent:expiration.session'),
        // },
        // {
        //   name: 'city-of-helsinki-cookie-consents',
        //   host: cookieDomain,
        //   storageType: 1,
        //   description: buildDict(
        //     'consent:cookies.city_of_helsinki_cookie_consents'
        //   ),
        //   expiration: buildDict('consent:expiration.session'),
        // },
        // TODO: Is wordpress cookie needed at all?
        // {
        //   name: 'wordpress_*, wp-settings-*',
        //   host: '.hel.fi',
        //   storageType: 1,
        //   description: buildDict('consent:cookies.wordpress'),
        //   expiration: buildDict('consent:expiration.session'),
        // },
        // TODO: Why would linkedevents-api-prod-csrftoken be needed?
        // {
        //   name: 'linkedevents-api-prod-csrftoken',
        //   host: 'api.hel.fi',
        //   storageType: 1,
        //   description: buildDict('consent:cookies.linkedevents'),
        //   expiration: buildDict('consent:expiration.year'),
        // },
      ],
    },
  ] as const;

  const optionalGroups = [
    {
      groupId: consentGroupIds.serviceMap,
      title: buildDict('consent:groups.optionalServiceMap.title'),
      description: buildDict('consent:groups.optionalServiceMap.text'),
      cookies: [
        {
          name: '_pk.fi*',
          host: 'palvelukartta.hel.fi',
          storageType: 1,
          description: buildDict('consent:cookies.servicemap_analytics'),
          expiration: buildDict('consent:expiration.days', { days: 393 }),
        },
        {
          name: 'ADRUM',
          host: 'palvelukartta.hel.fi',
          storageType: 1,
          description: buildDict('consent:cookies.servicemap_session'),
          expiration: buildDict('consent:expiration.session'),
        },
        {
          name: '_ga*',
          host: 'palvelukartta.hel.fi',
          storageType: 1,
          description: buildDict('consent:cookies.servicemap_ga'),
          expiration: buildDict('consent:expiration.session'),
        },
      ],
    },
    {
      groupId: consentGroupIds.matomo,
      title: buildDict('consent:groups.optionalMatomo.title'),
      description: buildDict('consent:groups.optionalMatomo.text'),
      cookies: [
        {
          name: '_pk*',
          host: 'digia.fi',
          storageType: 1,
          description: buildDict('consent:cookies.matomo'),
          expiration: buildDict('consent:expiration.days', { days: 393 }),
        },
      ],
    },
    {
      groupId: consentGroupIds.askem,
      title: buildDict('consent:groups.optionalAskem.title'),
      description: buildDict('consent:groups.optionalAskem.text'),
      cookies: [
        {
          name: 'rnsbid',
          host: 'reactandshare.com',
          storageType: 1,
          description: buildDict('consent:cookies.askem'),
          expiration: buildDict('-'),
        },
        {
          name: 'rnsbid_ts',
          host: 'reactandshare.com',
          storageType: 1,
          description: buildDict('consent:cookies.askem'),
          expiration: buildDict('-'),
        },
        {
          name: 'rns_reaction_*',
          host: 'reactandshare.com',
          storageType: 1,
          description: buildDict('consent:cookies.askem'),
          expiration: buildDict('-'),
        },
      ],
    },
  ] as const;

  return {
    requiredGroups,
    optionalGroups,
  };
}

function useConsentTranslations() {
  const { t } = useConsentTranslation();
  const languages = useLanguages();
  const languageCodes = languages.map((lang) => lang.code);

  const buildDict = createLocaleDictBuilder(languageCodes, t);

  return {
    translations: {
      bannerAriaLabel: buildDict('consent:hdsCookieConsent.bannerAriaLabel'),
      heading: buildDict('consent:hdsCookieConsent.heading'),
      description: buildDict('consent:hdsCookieConsent.description'),
      showDetails: buildDict('consent:hdsCookieConsent.showDetails'),
      hideDetails: buildDict('consent:hdsCookieConsent.hideDetails'),
      formHeading: buildDict('consent:hdsCookieConsent.formHeading'),
      formText: buildDict('consent:hdsCookieConsent.formText'),
      highlightedGroup: buildDict('consent:hdsCookieConsent.highlightedGroup'),
      highlightedGroupAria: buildDict(
        'consent:hdsCookieConsent.highlightedGroupAria'
      ),
      showCookieSettings: buildDict(
        'consent:hdsCookieConsent.showCookieSettings'
      ),
      hideCookieSettings: buildDict(
        'consent:hdsCookieConsent.hideCookieSettings'
      ),
      acceptedAt: buildDict('consent:hdsCookieConsent.acceptedAt'),
      tableHeadingsName: buildDict(
        'consent:hdsCookieConsent.tableHeadingsName'
      ),
      tableHeadingsHostName: buildDict(
        'consent:hdsCookieConsent.tableHeadingsHostName'
      ),
      tableHeadingsDescription: buildDict(
        'consent:hdsCookieConsent.tableHeadingsDescription'
      ),
      tableHeadingsExpiration: buildDict(
        'consent:hdsCookieConsent.tableHeadingsExpiration'
      ),
      tableHeadingsType: buildDict(
        'consent:hdsCookieConsent.tableHeadingsType'
      ),
      approveAllConsents: buildDict(
        'consent:hdsCookieConsent.approveAllConsents'
      ),
      approveRequiredAndSelectedConsents: buildDict(
        'consent:hdsCookieConsent.approveRequiredAndSelectedConsents'
      ),
      approveOnlyRequiredConsents: buildDict(
        'consent:hdsCookieConsent.approveOnlyRequiredConsents'
      ),
      settingsSaved: buildDict('consent:hdsCookieConsent.settingsSaved'),
      notificationAriaLabel: buildDict(
        'consent:hdsCookieConsent.notificationAriaLabel'
      ),
      storageType1: buildDict('consent:hdsCookieConsent.storageType1'),
      storageType2: buildDict('consent:hdsCookieConsent.storageType2'),
      storageType3: buildDict('consent:hdsCookieConsent.storageType3'),
      storageType4: buildDict('consent:hdsCookieConsent.storageType4'),
      storageType5: buildDict('consent:hdsCookieConsent.storageType5'),
    },
  } as const;
}

function useConsentSiteSettings() {
  const languages = useLanguages();
  const cookieName = useAppCookieName();
  const { requiredGroups, optionalGroups } = useConsentContentSource();
  const { translations } = useConsentTranslations();
  const { appName: siteName } = useCookieConfigurationContext();

  const siteSettings = React.useMemo(
    () => ({
      languages,
      siteName,
      cookieName,
      monitorInterval: 500,
      fallbackLanguage: DEFAULT_LANGUAGE,
      requiredGroups,
      optionalGroups,
      robotCookies: [
        // {
        //   name: 'helfi_accordions_open',
        //   storageType: 1,
        // },
      ] as const,
      translations,
    }),
    [
      cookieName,
      languages,
      optionalGroups,
      requiredGroups,
      siteName,
      translations,
    ]
  );

  return siteSettings;
}

export default useConsentSiteSettings;
