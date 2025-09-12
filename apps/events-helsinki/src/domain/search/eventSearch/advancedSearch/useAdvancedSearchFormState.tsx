import { EVENT_SEARCH_FILTERS } from '@events-helsinki/components';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import React from 'react';
import { getSearchFilters } from '../utils';

export function useAdvancedSearchFormState() {
  const router = useRouter();
  const params: { place?: string } = router.query;
  const searchParams = React.useMemo(
    () => new URLSearchParams(queryString.stringify(router.query)),
    [router.query]
  );

  const [categoryInput, setCategoryInput] = React.useState('');

  const [placeInput, setPlaceInput] = React.useState('');

  const [selectedDateTypes, setSelectedDateTypes] = React.useState<string[]>(
    []
  );
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  );
  const [selectedTargetAgeGroup, setSelectedTargetAgeGroup] =
    React.useState('');
  const [selectedPlaces, setSelectedPlaces] = React.useState<string[]>([]);
  const [start, setStart] = React.useState<Date | null>(null);
  const [end, setEnd] = React.useState<Date | null>(null);
  const [isCustomDate, setIsCustomDate] = React.useState<boolean>(false);
  const [selectedTexts, setSelectedTexts] = React.useState<string[]>([]);
  const [autosuggestInput, setAutosuggestInput] = React.useState('');

  // Initialize fields when page is loaded
  React.useEffect(() => {
    const {
      [EVENT_SEARCH_FILTERS.CATEGORIES]: categories,
      [EVENT_SEARCH_FILTERS.TARGET_AGE_GROUP]: targetAgeGroup,
      [EVENT_SEARCH_FILTERS.DATE_TYPES]: dateTypes,
      [EVENT_SEARCH_FILTERS.END]: endTime,
      [EVENT_SEARCH_FILTERS.PLACES]: places,
      [EVENT_SEARCH_FILTERS.START]: startTime,
      [EVENT_SEARCH_FILTERS.TEXT]: text,
    } = getSearchFilters(searchParams);

    setSelectedCategories(categories);
    setSelectedTargetAgeGroup(targetAgeGroup ?? '');
    setSelectedPlaces(places);
    setSelectedTexts(text || []);
    setEnd(endTime);
    setStart(startTime);

    if (endTime || startTime) {
      setIsCustomDate(true);
    } else {
      setSelectedDateTypes(dateTypes);
    }
    setAutosuggestInput(text?.toString() || '');
  }, [searchParams, params]);

  return {
    categoryInput,
    setCategoryInput,
    placeInput,
    setPlaceInput,
    selectedDateTypes,
    setSelectedDateTypes,
    selectedCategories,
    setSelectedCategories,
    selectedTargetAgeGroup,
    setSelectedTargetAgeGroup,
    selectedPlaces,
    setSelectedPlaces,
    start,
    setStart,
    end,
    setEnd,
    isCustomDate,
    setIsCustomDate,
    selectedTexts,
    setSelectedTexts,
    autosuggestInput,
    setAutosuggestInput,
  };
}
