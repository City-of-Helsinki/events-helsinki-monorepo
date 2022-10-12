import type { FilterType } from 'events-helsinki-components';
import {
  getLocalizedString,
  FilterButton,
  useLocale,
} from 'events-helsinki-components';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { usePlaceDetailsQuery } from '../../../nextApi/graphql/generated/graphql';

interface Props {
  id: string;
  onRemove: (value: string, type: FilterType) => void;
}

const PlaceFilter: React.FC<Props> = ({ id, onRemove }) => {
  const { t } = useTranslation('common');
  const locale = useLocale();
  const { data, loading } = usePlaceDetailsQuery({
    variables: { id },
  });

  return loading ? (
    <FilterButton
      onRemove={onRemove}
      text={t('loading')}
      type="place"
      value={id}
    />
  ) : data && data.placeDetails.name ? (
    <FilterButton
      onRemove={onRemove}
      text={getLocalizedString(data.placeDetails.name, locale)}
      type="place"
      value={id}
    />
  ) : null;
};

export default PlaceFilter;
