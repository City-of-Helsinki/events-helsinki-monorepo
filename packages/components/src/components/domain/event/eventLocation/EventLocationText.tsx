import React from 'react';

import { useLocale } from '../../../../hooks';
import type { EventFields } from '../../../../types';
import { getEventFields } from '../../../../utils';

interface Props {
  event: EventFields;
  showDistrict: boolean;
  showLocationName: boolean;
}

const EventLocationText: React.FC<Props> = ({
  event,
  showDistrict,
  showLocationName,
}) => {
  const locale = useLocale();

  const getLocationStr = () => {
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
  return <>{getLocationStr()}</>;
};

export default EventLocationText;
