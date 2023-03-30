/* eslint-disable @typescript-eslint/naming-convention */
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import type { EventFieldsFragment } from '@events-helsinki/components';
import {
  getLinkArrowLabel,
  useLocale,
  useCommonTranslation,
  useEventTranslation,
  MAIN_CONTENT_ID,
  useCommonCmsConfig,
} from '@events-helsinki/components';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import type { Config } from 'react-helsinki-headless-cms';
import {
  defaultConfig as rhhcDefaultConfig,
  ModuleItemTypeEnum,
} from 'react-helsinki-headless-cms';

import { ROUTES } from '../constants';
import AppConfig from '../domain/app/AppConfig';
import routerHelper from '../domain/app/routerHelper';
import type { ArticleDetailsProps } from '../domain/article/articleDetails/ArticleDetails';
import ArticleDetails from '../domain/article/articleDetails/ArticleDetails';
import type { EventDetailsProps } from '../domain/event/eventDetails/EventDetails';
import EventDetails from '../domain/event/eventDetails/EventDetails';
import getVenueSourceId from '../domain/venue/utils/getVenueSourceId';
import type { VenueDetailsProps } from '../domain/venue/venueDetails/VenueDetails';
import VenueDetails from '../domain/venue/venueDetails/VenueDetails';
const APP_DOMAIN = new URL(AppConfig.origin).origin;
const CMS_API_DOMAIN = new URL(AppConfig.cmsOrigin).origin;
const LINKEDEVENTS_API_EVENT_ENDPOINT = new URL(
  AppConfig.linkedEventsEventEndpoint
).href;

export default function useHobbiesRHHCConfig(args: {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}) {
  const { apolloClient } = args;
  const { t: commonTranslation } = useCommonTranslation();
  const { t: eventTranslation } = useEventTranslation();
  const locale = useLocale();
  const commonConfig = useCommonCmsConfig();

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
      ...commonConfig,
      mainContentId: MAIN_CONTENT_ID,
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        VenueCardContent: (props: any) => (
          <VenueDetails {...(props as VenueDetailsProps)} />
        ),
      },
      siteName: commonTranslation('appHobbies:appName'),
      currentLanguageCode: locale.toUpperCase(),
      apolloClient,
      eventsApolloClient: apolloClient,
      venuesApolloClient: apolloClient,
      utils: {
        ...rhhcDefaultConfig.utils,
        getEventCardProps: AppConfig.showEnrolmentStatusInCardDetails
          ? (item: EventFieldsFragment, locale: string) => ({
              ...rhhcDefaultConfig.utils.getEventCardProps(item, locale),
              linkArrowLabel: getLinkArrowLabel({
                item,
                locale,
                eventTranslation,
                commonTranslation,
              }),
            })
          : rhhcDefaultConfig.utils.getEventCardProps,
        getRoutedInternalHref: (
          link: string,
          _type: ModuleItemTypeEnum
        ): string => {
          if (_type === ModuleItemTypeEnum.Venue) {
            // quick fix for venue url rewrites
            return routerHelper.getLocalizedCmsItemUrl(
              ROUTES.VENUES,
              {
                venueId: getVenueSourceId(link),
              },
              locale
            );
          }
          return link || '#';
        },
        getIsHrefExternal,
      },
      internalHrefOrigins,
    } as unknown as Config;
  }, [commonConfig, commonTranslation, eventTranslation, locale, apolloClient]);
}
