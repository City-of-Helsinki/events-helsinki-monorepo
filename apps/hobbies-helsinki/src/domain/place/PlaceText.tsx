import { getLocalizedString, useLocale } from 'events-helsinki-components';
import React from 'react';

import { usePlaceDetailsQuery } from '../nextApi/graphql/generated/graphql';

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
