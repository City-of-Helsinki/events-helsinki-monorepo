import { useCommonTranslation } from '@events-helsinki/components';
import { Button, ButtonPresetTheme, ButtonVariant } from 'hds-react';
import React from 'react';
import { SimpleSearchForm } from '../combinedSearch/SearchForm';
import type { SearchComponentType } from '../combinedSearch/types';

export type SearchUtilitiesProps = {
  switchShowMode: () => void;
};

export type SearchComponentProps = {
  'data-testid'?: string;
  korosBottom?: boolean;
  searchUtilities?: React.ReactNode;
  className?: string;
} & SearchComponentType;

export const VenueSearchUtilities: React.FC<SearchUtilitiesProps> = ({
  switchShowMode,
}) => {
  const { t } = useCommonTranslation();
  return (
    <>
      <Button
        variant={ButtonVariant.Secondary}
        theme={ButtonPresetTheme.Black}
        onClick={switchShowMode}
      >
        {t('common:mapSearch.showOnMap')}
      </Button>
    </>
  );
};

const SimpleVenueSearch: React.FC<SearchComponentProps> = ({
  'data-testid': dataTestId,
  className,
  ...delegatedSimpleVenueSearchFormProps
}) => {
  return <SimpleSearchForm {...delegatedSimpleVenueSearchFormProps} />;
};
export default SimpleVenueSearch;
