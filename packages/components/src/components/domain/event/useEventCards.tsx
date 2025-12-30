import {
  Card,
  getEventCardProps,
  useConfig,
} from '@city-of-helsinki/react-helsinki-headless-cms';
import React from 'react';
import useClickCapture from '../../../hooks/useClickCapture';
import useLocale from '../../../hooks/useLocale';
import type { EventFields } from '../../../types/event-types';
import type { GetCardUrlType } from '../../../types/types';

type useEventCardsProps = {
  events?: EventFields[] | null;
  getCardUrl: GetCardUrlType;
};

function useEventCards({ events, getCardUrl }: useEventCardsProps) {
  const locale = useLocale();
  const {
    organisationPrefixes,
    components: { EventCardContent },
  } = useConfig();
  useClickCapture(1000);
  return (
    events?.map((event, i) => {
      const cardProps = getEventCardProps(event, organisationPrefixes, locale);
      return (
        <Card
          key={cardProps.id}
          {...cardProps}
          url={getCardUrl(event, locale)}
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
