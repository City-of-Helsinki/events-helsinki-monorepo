import React from 'react';

import { useLocale } from '../../../../hooks';
import type { EventFields } from '../../../../types';
import { getEventFields } from '../../../../utils';

interface Props {
  event: EventFields;
  showNeighborhood: boolean;
  showLocationName: boolean;
}

const EventLocationText: React.FC<Props> = ({
  event,
  showNeighborhood,
  showLocationName,
}) => {
  const locale = useLocale();

  const getLocationStr = () => {
    const { addressLocality, neighborhood, locationName, streetAddress } =
      getEventFields(event, locale);

    return [
      showLocationName ? locationName : null,
      streetAddress,
      showNeighborhood ? neighborhood : null,
      addressLocality,
    ]
      .filter((e) => e)
      .join(', ');
  };
  return <>{getLocationStr()}</>;
};

export default EventLocationText;
