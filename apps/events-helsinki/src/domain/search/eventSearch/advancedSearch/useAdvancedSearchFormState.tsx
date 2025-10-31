import {
  DEFAULT_EVENT_SORT_OPTION,
  EVENT_SEARCH_FILTERS,
  isEventSortOption,
} from '@events-helsinki/components';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import React from 'react';
import { getSearchFilters } from '../utils';

export function useAdvancedSearchFormState() {
  const router = useRouter();
  const params: { place?: string; sort?: string } = router.query;
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
  const [textSearchInput, setTextSearchInput] = React.useState('');
  const [isOnlyEveningEvents, setIsOnlyEveningEvents] =
    React.useState<boolean>(false);
  const [isOnlyRemoteEvents, setIsOnlyRemoteEvents] =
    React.useState<boolean>(false);
  const [isFree, setIsFree] = React.useState<boolean>(false);
  const [sortOrder, setSortOrder] = React.useState<string>(
    DEFAULT_EVENT_SORT_OPTION
  );

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
      [EVENT_SEARCH_FILTERS.ONLY_EVENING_EVENTS]: onlyEveningEvents,
      [EVENT_SEARCH_FILTERS.ONLY_REMOTE_EVENTS]: onlyRemoteEvents,
      [EVENT_SEARCH_FILTERS.IS_FREE]: isFreeEvent,
    } = getSearchFilters(searchParams);

    if (isEventSortOption(params.sort)) {
      setSortOrder(params.sort);
    } else {
      setSortOrder('');
    }

    setSelectedCategories(categories);
    setSelectedTargetAgeGroup(targetAgeGroup ?? '');
    setSelectedPlaces(places);
    setSelectedTexts(text || []);
    setEnd(endTime);
    setStart(startTime);
    setIsOnlyEveningEvents(onlyEveningEvents ?? false);
    setIsOnlyRemoteEvents(onlyRemoteEvents ?? false);
    setIsFree(isFreeEvent ?? false);

    if (endTime || startTime) {
      setIsCustomDate(true);
    } else {
      setSelectedDateTypes(dateTypes);
    }
    setTextSearchInput(text?.toString() || '');
  }, [searchParams, params]);

  return {
    sortOrder,
    setSortOrder,
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
    textSearchInput,
    setTextSearchInput,
    isOnlyEveningEvents,
    setIsOnlyEveningEvents,
    isOnlyRemoteEvents,
    setIsOnlyRemoteEvents,
    isFree,
    setIsFree,
  };
}
