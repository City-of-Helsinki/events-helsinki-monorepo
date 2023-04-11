import type { EventFields } from '@events-helsinki/components';
import { useClickCapture, useLocale } from '@events-helsinki/components';
import React from 'react';
import {
  Card,
  getEventCardProps,
  useConfig,
} from 'react-helsinki-headless-cms';
import { getCardUrl } from '../search/eventSearch/utils';

type useEventCardsProps = {
  events?: EventFields[] | null;
  returnPath?: string;
};

function useEventCards({ events, returnPath }: useEventCardsProps) {
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
          url={getCardUrl(event, locale, returnPath)}
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
