import React from 'react';
import MapBox from '../../../../components/mapBox/MapBox';
import useCommonTranslation from '../../../../hooks/useCommonTranslation';
import useLocale from '../../../../hooks/useLocale';
import type { AppLanguage, EventFields } from '../../../../types';
import { getEventFields, getServiceMapUrl } from '../../../../utils/eventUtils';

interface Props {
  event: EventFields;
}

export const getLocationStr = (
  event: EventFields,
  locale: AppLanguage,
  showDistrict: boolean,
  showLocationName: boolean
) => {
  const { addressLocality, district, locationName, streetAddress } =
    getEventFields(event, locale);

  return [
    showLocationName ? locationName : null,
    streetAddress,
    showDistrict ? district : null,
    addressLocality,
  ]
    .filter((e) => e)
    .join(', ');
};

const EventLocation: React.FC<Props> = ({ event }) => {
  const { t } = useCommonTranslation();
  const locale = useLocale();
  const { googleDirectionsLink, hslDirectionsLink, name } = getEventFields(
    event,
    locale
  );

  // TODO: Migrate the map of VenueLocation and EventLocation to a common component
  return (
    <MapBox
      title={t('common:mapBox.title')}
      serviceMapUrl={getServiceMapUrl(event, locale, true)}
      openMapUrl={getServiceMapUrl(event, locale, false)}
      placeName={name ?? ''}
      placeAddress={getLocationStr(event, locale, true, false)}
      googleDirectionsLink={googleDirectionsLink}
      hslDirectionsLink={hslDirectionsLink}
    />
  );
};

export default EventLocation;
