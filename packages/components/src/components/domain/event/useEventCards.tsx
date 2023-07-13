import React from 'react';
import {
  Card,
  getEventCardProps,
  useConfig,
} from 'react-helsinki-headless-cms';
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
    components: { EventCardContent },
  } = useConfig();
  useClickCapture(1000);
  return (
    events?.map((event, i) => {
      const cardProps = getEventCardProps(event, locale);
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
