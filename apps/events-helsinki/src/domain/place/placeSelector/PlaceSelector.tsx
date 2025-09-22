import type { MultiselectDropdownProps } from '@events-helsinki/components';
import {
  MultiSelectDropdown,
  useDebounce,
  useLocale,
  getLocalizedString,
  usePlaceListQuery,
  HELSINKI_OCD_DIVISION_ID,
} from '@events-helsinki/components';
import uniqBy from 'lodash/uniqBy';
import React from 'react';

import PlaceText from '../PlaceText';
import useFetchPlacesByIds from '../useFetchPlacesByIds';

const PLACES_PAGE_SIZE = 10;
const DIVISIONS = [HELSINKI_OCD_DIVISION_ID];

export type Option = {
  text: string;
  value: string;
};

type Props = Omit<MultiselectDropdownProps, 'options'>;

/**
 * Provides options for the MultiSelectDropdown based on a search query.
 */
const usePlacesSearchQueryOptions = (searchValue: string): Option[] => {
  const locale = useLocale();
  const { data: placesData } = usePlaceListQuery({
    skip: !searchValue,
    variables: {
      divisions: DIVISIONS,
      hasUpcomingEvents: true,
      pageSize: PLACES_PAGE_SIZE,
      // Seems like apollo can get stuck in loading when searched with different casings
      text: searchValue.toLowerCase(),
    },
  });

  const placeOptions = React.useMemo(() => {
    return (placesData?.placeList.data || [])
      .map((place) => ({
        text: getLocalizedString(place.name, locale),
        value: place.id as string,
      }))
      .sort((a, b) => (a.text > b.text ? 1 : -1));
  }, [locale, placesData]);

  return placeOptions;
};

/**
 * Provides options for the MultiSelectDropdown based on selected place IDs.
 */
const useSelectedPlacesOptions = ({
  selectedPlacesIds,
}: {
  selectedPlacesIds: string[];
}): Option[] => {
  const locale = useLocale();
  const { places: selectedPlaces } = useFetchPlacesByIds(selectedPlacesIds);

  const selectedPlacesOptions = React.useMemo(() => {
    if (!selectedPlaces) return [];
    return selectedPlaces.map(
      (place): Option => ({
        text: getLocalizedString(place.name ?? null, locale),
        value: place.id ?? '',
      })
    );
  }, [locale, selectedPlaces]);

  return selectedPlacesOptions;
};

const PlaceSelector: React.FC<Props> = ({
  inputValue,
  setInputValue,
  ...props
}) => {
  const { value, fixedOptions } = props;
  const [internalInputValue, setInternalInputValue] = React.useState('');
  const input = inputValue ?? internalInputValue;
  const searchValue = useDebounce(input, 300);

  // The options that are listed after a search for options has been made
  const optionsFilteredBySearch = usePlacesSearchQueryOptions(searchValue);

  // Fixed options are always visible (e.g remote, reservable)
  const fixedOptionsIds = React.useMemo(
    () => fixedOptions?.map((option) => option.value) ?? [],
    [fixedOptions]
  );

  // Selected places ids should not include the fixed ids or they are duplicated
  const selectedPlacesIds = React.useMemo(() => {
    return value.filter((pid) => !fixedOptionsIds.includes(pid));
  }, [value, fixedOptionsIds]);

  // Query places names for selected ids and make them options
  const selectedOptions = useSelectedPlacesOptions({
    selectedPlacesIds,
  });

  // Remove duplicates, because search result can contain some of the selected items
  const options = React.useMemo(
    () => uniqBy([...optionsFilteredBySearch, ...selectedOptions], 'value'),
    [optionsFilteredBySearch, selectedOptions]
  );

  const renderOptionText = (id: string) => <PlaceText id={id} />;

  return (
    <MultiSelectDropdown
      {...props}
      inputValue={input}
      options={options}
      renderOptionText={renderOptionText}
      setInputValue={setInputValue ?? setInternalInputValue}
      filterByInput={false}
    />
  );
};

export default PlaceSelector;
