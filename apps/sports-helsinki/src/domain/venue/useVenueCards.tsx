import type { Venue } from '@events-helsinki/components';
import { useLocale } from '@events-helsinki/components';
import React from 'react';
import {
  Card,
  getLocationCardProps,
  useConfig,
} from 'react-helsinki-headless-cms';
import { ROUTES } from '../../constants';
import { Sources } from '../../domain/app/appConstants';
import routerHelper from '../../domain/app/routerHelper';
import getVenueIdParts from './utils/getVenueIdParts';
import getVenueSourceId from './utils/getVenueSourceId';

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
    venues
      ?.filter((venue) => !!venue.id)
      ?.map((venue, i) => {
        const cardProps = getLocationCardProps(venue);
        // NOTE: The venue-graphql-proxy seems to always need a TPREK-id,
        // so the id's that has any other source, needs to be converted.
        const venueId = getVenueSourceId(
          getVenueIdParts(venue.id).id,
          Sources.TPREK
        );
        const url = routerHelper.getLocalizedCmsItemUrl(
          ROUTES.VENUES,
          { venueId, returnPath },
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
