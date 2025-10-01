import React from 'react';
import useLocale from '../../../hooks/useLocale';
import { usePlaceDetailsQuery } from '../../../types/generated/graphql';
import getLocalizedString from '../../../utils/getLocalizedString';

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
