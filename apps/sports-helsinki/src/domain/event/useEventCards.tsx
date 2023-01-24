import type { EventFields } from 'events-helsinki-components';
import { useLocale } from 'events-helsinki-components';
import React from 'react';
import {
  Card,
  getEventCardProps,
  useConfig,
} from 'react-helsinki-headless-cms';
import { ROUTES } from '../../constants';
import { getLocalizedCmsItemUrl } from '../../utils/routerUtils';

type useEventCardsProps = {
  events?: EventFields[] | null;
  returnPath?: string;
};

function useEventCards({ events, returnPath }: useEventCardsProps) {
  const locale = useLocale();
  const {
    components: { EventCardContent },
  } = useConfig();
  return (
    events?.map((event, i) => {
      const cardProps = getEventCardProps(event, locale);
      const url = getLocalizedCmsItemUrl(
        ROUTES.COURSES,
        { eventId: event.id, returnPath },
        locale
      );
      return (
        <Card
          key={cardProps.id}
          {...cardProps}
          url={url}
          direction="fixed-vertical"
          customContent={
            EventCardContent && <EventCardContent event={events[i]} />
          }
        />
      );
    }) ?? []
  );
}

export default useEventCards;
