import React from 'react';
import { useLocale, useCommonTranslation } from '../../hooks';
import { usePlaceDetailsQuery } from '../../types';
import { getLocalizedString } from '../../utils';
import { FilterButton } from '../filterButton';
import type { FilterType } from '../filterButton';

interface Props {
  id: string;
  onRemove: (value: string, type: FilterType) => void;
  'aria-labelledby'?: string;
}

const PlaceFilter: React.FC<Props> = ({
  id,
  onRemove,
  'aria-labelledby': ariaLabelledBy,
}) => {
  const { t } = useCommonTranslation();
  const locale = useLocale();
  const { data, loading } = usePlaceDetailsQuery({
    variables: { id },
  });

  return loading ? (
    <FilterButton
      onRemove={onRemove}
      text={t('common:loading')}
      type="place"
      value={id}
      aria-labelledby={ariaLabelledBy}
    />
  ) : data && data.placeDetails.name ? (
    <FilterButton
      onRemove={onRemove}
      text={getLocalizedString(data.placeDetails.name, locale)}
      type="place"
      value={id}
      aria-labelledby={ariaLabelledBy}
    />
  ) : null;
};

export default PlaceFilter;
