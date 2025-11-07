import React from 'react';
import { isLanguage } from 'react-helsinki-headless-cms';
import { useLanguagesQuery } from 'react-helsinki-headless-cms/apollo';
import { DEFAULT_LANGUAGE } from '../../constants';
import { useCookieConfigurationContext } from '../../cookieConfigurationProvider';
import useConsentTranslation from '../../hooks/useConsentTranslation';
import type { SiteSettingsLanguage } from './types';
import { createLocaleDictBuilder } from './utils';

function useLanguages(): SiteSettingsLanguage[] {
  const languagesQuery = useLanguagesQuery();
  const languageOptions = languagesQuery.data?.languages?.filter(isLanguage);
  return (
    languageOptions?.map((langOption) => ({
      code: langOption.code ?? '',
      name: langOption.name ?? '',
      direction: 'ltr',
    })) ?? []
  );
}

function useCookieName() {
  const { cookieDomain } = useCookieConfigurationContext();
  const prefix = cookieDomain.replaceAll('.', '-');
  return `${prefix}-cookie-consents`;
}

function useConsentContentSource() {
  const { t } = useConsentTranslation();
  const languages = useLanguages();
  const languageCodes = languages.map((lang) => lang.code);

  const buildDict = createLocaleDictBuilder(languageCodes, t);

  const requiredGroups = [
    {
      groupId: 'essential',
      title: buildDict('consent:groups.essentials.title'),
      description: buildDict('consent:groups.essentials.description'),
      cookies: [
        {
          name: 'wordpress_*, wp-settings-*',
          host: 'api.hel.fi',
          storageType: 1,
          description: buildDict('consent:cookies.wordpress'),
          expiration: buildDict('consent:expiration.session'),
        },
        {
          name: 'linkedevents-api-prod-csrftoken',
          host: 'api.hel.fi',
          storageType: 1,
          description: buildDict('consent:cookies.linkedevents'),
          expiration: buildDict('consent:expiration.year'),
        },
        {
          name: 'i18next',
          host: 'api.hel.fi',
          storageType: 1,
          description: buildDict('consent:cookies.i18next'),
          expiration: buildDict('consent:expiration.session'),
        },
      ],
    },
  ] as const;

  const optionalGroups = [
    {
      groupId: 'optionalServiceMap',
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
      groupId: 'optionalMatomo',
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
      groupId: 'optionalAskem',
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
      bannerAriaLabel: buildDict('bannerAriaLabel'),
      heading: buildDict('heading'),
      description: buildDict('description'),
      showDetails: buildDict('showDetails'),
      hideDetails: buildDict('hideDetails'),
      formHeading: buildDict('formHeading'),
      formText: buildDict('formText'),
      highlightedGroup: buildDict('highlightedGroup'),
      highlightedGroupAria: buildDict('highlightedGroupAria'),
      showCookieSettings: buildDict('showCookieSettings'),
      hideCookieSettings: buildDict('hideCookieSettings'),
      acceptedAt: buildDict('acceptedAt'),
      tableHeadingsName: buildDict('tableHeadingsName'),
      tableHeadingsHostName: buildDict('tableHeadingsHostName'),
      tableHeadingsDescription: buildDict('tableHeadingsDescription'),
      tableHeadingsExpiration: buildDict('tableHeadingsExpiration'),
      tableHeadingsType: buildDict('tableHeadingsType'),
      approveAllConsents: buildDict('approveAllConsents'),
      approveRequiredAndSelectedConsents: buildDict(
        'approveRequiredAndSelectedConsents'
      ),
      approveOnlyRequiredConsents: buildDict('approveOnlyRequiredConsents'),
      settingsSaved: buildDict('settingsSaved'),
      notificationAriaLabel: buildDict('notificationAriaLabel'),
      storageType1: buildDict('storageType1'),
      storageType2: buildDict('storageType2'),
      storageType3: buildDict('storageType3'),
      storageType4: buildDict('storageType4'),
      storageType5: buildDict('storageType5'),
    },
  } as const;
}

export type useConsentSiteSettingsProps = {
  appName: string;
};

function useConsentSiteSettings({
  appName: siteName,
}: useConsentSiteSettingsProps) {
  const languages = useLanguages();
  const cookieName = useCookieName();
  const { requiredGroups, optionalGroups } = useConsentContentSource();
  const { translations } = useConsentTranslations();

  const siteSettings = React.useMemo(
    () => ({
      languages,
      siteName,
      cookieName,
      monitorInterval: 500,
      fallbackLanguage: DEFAULT_LANGUAGE as string,
      requiredGroups,
      optionalGroups,
      robotCookies: [
        {
          name: 'helfi_accordions_open',
          storageType: 1,
        },
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
