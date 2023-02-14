import React from 'react';
import { useCommonTranslation, useErrorBoundary } from '../../hooks';
import { useOrganizationDetailsQuery } from '../../types';
import { FilterButton } from '../filterButton';
import type { FilterType } from '../filterButton';

interface Props {
  id: string;
  onRemove: (value: string, type: FilterType) => void;
}

const PublisherFilter: React.FC<Props> = ({ id, onRemove }) => {
  const { t } = useCommonTranslation();
  const { data, loading, error } = useOrganizationDetailsQuery({
    variables: { id },
  });
  useErrorBoundary(error);
  return loading ? (
    <FilterButton
      onRemove={onRemove}
      text={t('common:loading')}
      type="publisher"
      value={id}
    />
  ) : data && data.organizationDetails.name ? (
    <FilterButton
      onRemove={onRemove}
      text={data.organizationDetails.name}
      type="publisher"
      value={id}
    />
  ) : null;
};

export default PublisherFilter;
