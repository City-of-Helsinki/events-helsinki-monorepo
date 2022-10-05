/* eslint-disable @typescript-eslint/naming-convention */
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { useLocale } from 'events-helsinki-components';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import type { Config } from 'react-helsinki-headless-cms';
import { defaultConfig as rhhcDefaultConfig } from 'react-helsinki-headless-cms';

import AppConfig from '../domain/app/AppConfig';
import type { ArticleDetailsProps } from '../domain/article/articleDetails/ArticleDetails';
import ArticleDetails from '../domain/article/articleDetails/ArticleDetails';
import type { EventDetailsProps } from '../domain/event/eventDetails/EventDetails';
import EventDetails from '../domain/event/eventDetails/EventDetails';

const APP_DOMAIN = new URL(AppConfig.origin).origin;
const CMS_API_DOMAIN = new URL(AppConfig.cmsGraphqlEndpoint).origin;
const LINKEDEVENTS_API_EVENT_ENDPOINT = new URL(
  AppConfig.linkedEventsEventEndpoint
).href;

export default function useRHHCConfig(
  cmsApolloClient: ApolloClient<NormalizedCacheObject>,
  eventsApolloClient: ApolloClient<NormalizedCacheObject>
) {
  const { t } = useTranslation(['common', 'cms']);
  const locale = useLocale();

  return React.useMemo(() => {
    const internalHrefOrigins = [
      APP_DOMAIN,
      CMS_API_DOMAIN,
      LINKEDEVENTS_API_EVENT_ENDPOINT,
    ];
    const getIsHrefExternal = (href: string) => {
      if (href?.startsWith('/')) return false;
      return !internalHrefOrigins.some((origin) => href?.includes(origin));
    };
    return {
      ...rhhcDefaultConfig,
      components: {
        ...rhhcDefaultConfig.components,
        Head: (props) => <Head {...props} />,
        Link: ({ href, ...props }) => <Link href={href || ''} {...props} />,
        EventCardContent: (props) => (
          <EventDetails {...(props as EventDetailsProps)} />
        ),
        ArticleCardContent: (props: ArticleDetailsProps) => (
          <ArticleDetails {...props} />
        ),
      },
      fallbackImageUrls: [
        '/static/images/event_placeholder_A.jpg',
        '/static/images/event_placeholder_B.jpg',
        '/static/images/event_placeholder_C.jpg',
        '/static/images/event_placeholder_D.jpg',
      ],
      siteName: t('appName'),
      currentLanguageCode: locale.toUpperCase(),
      apolloClient: cmsApolloClient,
      eventsApolloClient: eventsApolloClient,
      copy: {
        breadcrumbNavigationLabel: t(
          'common:breadcrumb.breadcrumbNavigationLabel'
        ),
        breadcrumbListLabel: t('common:breadcrumb.breadcrumbListLabel'),
        menuToggleAriaLabel: t('common:menu.menuToggleAriaLabel'),
        skipToContentLabel: t('common:linkSkipToContent'),
        openInExternalDomainAriaLabel: t('common:srOnly.opensInAnExternalSite'),
        openInNewTabAriaLabel: t('common:srOnly.opensInANewTab'),
        closeButtonLabelText: t('common:button.close'),
        loadMoreButtonLabelText: t('common:button.loadMore'),
        showAllText: t('common:button.showAll'),
        archiveSearch: {
          title: t('cms:archiveSearch.title'),
          searchTextPlaceholder: t('cms:archiveSearch.searchTextPlaceholder'),
          searchButtonLabelText: t('cms:archiveSearch.searchButtonLabelText'),
          loadMoreButtonLabelText: t(
            'cms:archiveSearch.loadMoreButtonLabelText'
          ),
          noResultsTitle: t('cms:archiveSearch.noResultsTitle'),
          noResultsText: t('cms:archiveSearch.noResultsText'),
          clearAll: t('cms:archiveSearch.buttonClearFilters'),
        },
      },
      utils: {
        ...rhhcDefaultConfig.utils,
        getIsHrefExternal,
      },
      internalHrefOrigins,
    } as Config;
  }, [t, cmsApolloClient, eventsApolloClient, locale]);
}
