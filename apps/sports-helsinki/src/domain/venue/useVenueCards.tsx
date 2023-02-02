import type { Venue } from 'events-helsinki-components';
import { useLocale } from 'events-helsinki-components';
import React from 'react';
import {
  Card,
  getLocationCardProps,
  useConfig,
} from 'react-helsinki-headless-cms';
import { ROUTES } from '../../constants';
import routerHelper from '../../domain/app/routerHelper';

type useVenueCardsProps = {
  venues?: Venue[] | null;
  returnPath?: string;
};

function useVenueCards({ venues, returnPath }: useVenueCardsProps) {
  const locale = useLocale();
  const {
    components: { VenueCardContent },
  } = useConfig();
  return (
    venues?.map((venue, i) => {
      const cardProps = getLocationCardProps(venue);
      const url = routerHelper.getLocalizedCmsItemUrl(
        ROUTES.VENUES,
        { venueId: venue.id, returnPath },
        locale
      );
      return (
        <Card
          key={cardProps.id}
          {...cardProps}
          url={url}
          direction="fixed-vertical"
          customContent={
            VenueCardContent && <VenueCardContent location={venues[i]} />
          }
        />
      );
    }) ?? []
  );
}

export default useVenueCards;
