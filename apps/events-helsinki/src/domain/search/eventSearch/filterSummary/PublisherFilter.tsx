import type { FilterType } from 'events-helsinki-components';
import {
  FilterButton,
  useOrganizationDetailsQuery,
} from 'events-helsinki-components';
import { useTranslation } from 'next-i18next';
import React from 'react';

interface Props {
  id: string;
  onRemove: (value: string, type: FilterType) => void;
}

const PublisherFilter: React.FC<Props> = ({ id, onRemove }) => {
  const { t } = useTranslation('common');
  const { data, loading } = useOrganizationDetailsQuery({
    variables: { id },
  });

  return loading ? (
    <FilterButton
      onRemove={onRemove}
      text={t('loading')}
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
