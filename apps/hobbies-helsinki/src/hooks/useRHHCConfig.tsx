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
  const { t: commonTranslation } = useTranslation('common');
  const { t: cmsTranslation } = useTranslation('cms');
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Head: (props: any) => <Head {...props} />,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Link: ({ href, ...props }: any) => (
          <Link href={href || ''} {...props} />
        ),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        EventCardContent: (props: any) => (
          <EventDetails {...(props as EventDetailsProps)} />
        ),
        ArticleCardContent: (props: ArticleDetailsProps) => (
          <ArticleDetails {...props} />
        ),
      },
      fallbackImageUrls: [
        '/shared-assets/images/event_placeholder_A.jpg',
        '/shared-assets/images/event_placeholder_B.jpg',
        '/shared-assets/images/event_placeholder_C.jpg',
        '/shared-assets/images/event_placeholder_D.jpg',
      ],
      siteName: commonTranslation('appName'),
      currentLanguageCode: locale.toUpperCase(),
      apolloClient: cmsApolloClient,
      eventsApolloClient: eventsApolloClient,
      copy: {
        breadcrumbNavigationLabel: commonTranslation(
          'breadcrumb.breadcrumbNavigationLabel'
        ),
        breadcrumbListLabel: commonTranslation(
          'breadcrumb.breadcrumbListLabel'
        ),
        menuToggleAriaLabel: commonTranslation('menu.menuToggleAriaLabel'),
        skipToContentLabel: commonTranslation('linkSkipToContent'),
        openInExternalDomainAriaLabel: commonTranslation(
          'srOnly.opensInAnExternalSite'
        ),
        openInNewTabAriaLabel: commonTranslation('srOnly.opensInANewTab'),
        closeButtonLabelText: commonTranslation('button.close'),
        loadMoreButtonLabelText: commonTranslation('button.loadMore'),
        showAllText: commonTranslation('button.showAll'),
        archiveSearch: {
          title: cmsTranslation('archiveSearch.title'),
          searchTextPlaceholder: cmsTranslation(
            'archiveSearch.searchTextPlaceholder'
          ),
          searchButtonLabelText: cmsTranslation(
            'archiveSearch.searchButtonLabelText'
          ),
          loadMoreButtonLabelText: cmsTranslation(
            'archiveSearch.loadMoreButtonLabelText'
          ),
          noResultsTitle: cmsTranslation('archiveSearch.noResultsTitle'),
          noResultsText: cmsTranslation('archiveSearch.noResultsText'),
          clearAll: cmsTranslation('archiveSearch.buttonClearFilters'),
        },
      },
      utils: {
        ...rhhcDefaultConfig.utils,
        getIsHrefExternal,
      },
      internalHrefOrigins,
    } as unknown as Config;
  }, [
    commonTranslation,
    cmsTranslation,
    cmsApolloClient,
    eventsApolloClient,
    locale,
  ]);
}
