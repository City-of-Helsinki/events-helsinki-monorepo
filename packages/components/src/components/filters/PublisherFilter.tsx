import React from 'react';
import { useCommonTranslation } from '../../hooks';
import { useOrganizationDetailsQuery } from '../../types';
import { FilterButton } from '../filterButton';
import type { FilterType } from '../filterButton';

interface Props {
  id: string;
  onRemove: (value: string, type: FilterType) => void;
}

const PublisherFilter: React.FC<Props> = ({ id, onRemove }) => {
  const { t } = useCommonTranslation();
  const { data, loading } = useOrganizationDetailsQuery({
    variables: { id },
  });

  if (loading) {
    return (
      <FilterButton
        onRemove={onRemove}
        text={t('common:loading')}
        type="publisher"
        value={id}
      />
    );
  }

  if (!data?.organizationDetails?.name) {
    return null;
  }

  return (
    <FilterButton
      onRemove={onRemove}
      text={data.organizationDetails.name}
      type="publisher"
      value={id}
    />
  );
};

export default PublisherFilter;
