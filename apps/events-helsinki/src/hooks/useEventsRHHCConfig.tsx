import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import type { EventFieldsFragment } from '@events-helsinki/components';
import {
  useResilientTranslation,
  getLanguageCode,
  getLinkArrowLabel,
  useLocale,
  useCommonTranslation,
  useEventTranslation,
  MAIN_CONTENT_ID,
  useCommonCmsConfig,
  HelsinkiCityOwnedIcon,
  CITY_OF_HELSINKI_LINKED_EVENTS_ORGANIZATION_PREFIXES,
} from '@events-helsinki/components';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import type { CardProps, Config } from 'react-helsinki-headless-cms';
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

export default function useEventsRHHCConfig(args: {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}): Config {
  const { apolloClient } = args;
  const { t: commonTranslation } = useCommonTranslation();
  const { t: eventTranslation } = useEventTranslation();
  const { resilientT } = useResilientTranslation();
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
      organisationPrefixes:
        CITY_OF_HELSINKI_LINKED_EVENTS_ORGANIZATION_PREFIXES,
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        HelsinkiCityOwnedIcon: (props: any) => (
          <HelsinkiCityOwnedIcon {...props} />
        ),
      },
      siteName: resilientT('appEvents:appName'),
      currentLanguageCode: getLanguageCode(locale),
      apolloClient,
      eventsApolloClient: apolloClient,
      venuesApolloClient: apolloClient,
      utils: {
        ...rhhcDefaultConfig.utils,
        getEventCardProps: AppConfig.showEnrolmentStatusInCardDetails
          ? (
              item: EventFieldsFragment,
              organisationPrefixes: string[],
              locale: string
            ): CardProps => ({
              ...rhhcDefaultConfig.utils.getEventCardProps(
                item,
                organisationPrefixes,
                locale
              ),
              linkArrowLabel: getLinkArrowLabel({
                item,
                locale,
                eventTranslation,
                commonTranslation,
              }),
            })
          : rhhcDefaultConfig.utils.getEventCardProps,
        getRoutedInternalHref: (
          link?: string | null,
          type?: ModuleItemTypeEnum
        ): string => {
          if (type === ModuleItemTypeEnum.Venue) {
            // quick fix for venue url rewrites
            return routerHelper.getLocalizedCmsItemUrl(
              ROUTES.VENUES,
              {
                venueId: getVenueSourceId(link ?? ''),
              },
              locale
            );
          }
          return link || '#';
        },
        getIsHrefExternal,
      },
      internalHrefOrigins,
    };
  }, [
    commonConfig,
    commonTranslation,
    eventTranslation,
    resilientT,
    locale,
    apolloClient,
  ]);
}
