import { EVENT_SEARCH_FILTERS } from '@events-helsinki/components';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import React from 'react';
import { MAPPED_PLACES } from '../constants';
import { clampAgeInput, getSearchFilters } from '../utils';

export function useAdvancedSearchFormState() {
  const router = useRouter();
  const params: { place?: string } = router.query;
  const searchParams = React.useMemo(
    () => new URLSearchParams(queryString.stringify(router.query)),
    [router.query]
  );
  const [categoryInput, setCategoryInput] = React.useState('');
  const [ageInput, setAgeInput] = React.useState<number | undefined>(undefined);
  const [placeInput, setPlaceInput] = React.useState('');

  const [selectedDateTypes, setSelectedDateTypes] = React.useState<string[]>(
    []
  );
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  );
  const [selectedPlaces, setSelectedPlaces] = React.useState<string[]>([]);
  const [start, setStart] = React.useState<Date | null>(null);
  const [end, setEnd] = React.useState<Date | null>(null);
  const [isCustomDate, setIsCustomDate] = React.useState<boolean>(false);
  const [selectedTexts, setSelectedTexts] = React.useState<string[]>([]);
  const [textSearchInput, setTextSearchInput] = React.useState('');
  const [isFree, setIsFree] = React.useState<boolean>(false);

  // Initialize fields when page is loaded
  React.useEffect(() => {
    const {
      [EVENT_SEARCH_FILTERS.CATEGORIES]: categories,
      [EVENT_SEARCH_FILTERS.DATE_TYPES]: dateTypes,
      [EVENT_SEARCH_FILTERS.END]: endTime,
      [EVENT_SEARCH_FILTERS.PLACES]: places,
      [EVENT_SEARCH_FILTERS.START]: startTime,
      [EVENT_SEARCH_FILTERS.TEXT]: text,
      [EVENT_SEARCH_FILTERS.SUITABLE]: ageInput,
      [EVENT_SEARCH_FILTERS.IS_FREE]: isFreeEvent,
    } = getSearchFilters(searchParams);

    const pathPlace = params.place && MAPPED_PLACES[params.place.toLowerCase()];

    if (pathPlace) {
      places.push(pathPlace);
    }

    setSelectedCategories(categories);
    setSelectedPlaces(places);
    setSelectedTexts(text || []);
    setEnd(endTime);
    setStart(startTime);
    setAgeInput(clampAgeInput(ageInput));
    setIsFree(isFreeEvent ?? false);

    if (endTime || startTime) {
      setIsCustomDate(true);
    } else {
      setSelectedDateTypes(dateTypes);
    }
    setTextSearchInput(text?.toString() || '');
  }, [searchParams, params]);

  return {
    categoryInput,
    setCategoryInput,
    ageInput,
    setAgeInput,
    placeInput,
    setPlaceInput,
    selectedDateTypes,
    setSelectedDateTypes,
    selectedCategories,
    setSelectedCategories,
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
    textSearchInput,
    setTextSearchInput,
    isFree,
    setIsFree,
  };
}
