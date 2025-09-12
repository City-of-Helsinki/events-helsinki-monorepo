import {
  getLocalizedString,
  useLocale,
  usePlaceDetailsQuery,
} from '@events-helsinki/components';
import React from 'react';

interface Props {
  id: string;
  errorText?: string;
}

const PlaceText: React.FC<Props> = ({ id, errorText = '' }) => {
  const locale = useLocale();
  const { data, loading } = usePlaceDetailsQuery({
    variables: { id },
    skip: !id,
  });
  const text = getLocalizedString(data?.placeDetails.name || {}, locale);

  return !loading ? <>{text || errorText}</> : null;
};

export default PlaceText;
