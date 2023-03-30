import {
  getLocalizedString,
  useLocale,
  usePlaceDetailsQuery,
} from '@events-helsinki/components';
import React from 'react';

interface Props {
  id: string;
}

const PlaceText: React.FC<Props> = ({ id }) => {
  const locale = useLocale();
  const { data } = usePlaceDetailsQuery({
    variables: { id },
  });

  return (
    <>{getLocalizedString((data && data.placeDetails.name) || {}, locale)}</>
  );
};

export default PlaceText;
