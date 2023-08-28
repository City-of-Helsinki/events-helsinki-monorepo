import React from 'react';
import { useCommonTranslation } from '../../hooks';
import { useOrganizationDetailsQuery } from '../../types';
import { FilterButton } from '../filterButton';
import type { FilterType } from '../filterButton';

interface Props {
  id: string;
  onRemove: (value: string, type: FilterType) => void;
}

const OrganizationFilter: React.FC<Props> = ({ id, onRemove }) => {
  const { t } = useCommonTranslation();
  const { data, loading } = useOrganizationDetailsQuery({
    variables: { id },
  });

  return loading ? (
    <FilterButton
      onRemove={onRemove}
      text={t('common:loading')}
      type="organization"
      value={id}
    />
  ) : data && data.organizationDetails.name ? (
    <FilterButton
      onRemove={onRemove}
      text={data.organizationDetails.name}
      type="organization"
      value={id}
    />
  ) : null;
};

export default OrganizationFilter;
