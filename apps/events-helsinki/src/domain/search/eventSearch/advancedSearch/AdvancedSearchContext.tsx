import React from 'react';

type SearchFormState = {
  categoryInput: string;
  setCategoryInput: React.Dispatch<React.SetStateAction<string>>;
  selectedTargetAgeGroup: string;
  setSelectedTargetAgeGroup: React.Dispatch<React.SetStateAction<string>>;
  placeInput: string;
  setPlaceInput: React.Dispatch<React.SetStateAction<string>>;
  selectedDateTypes: string[];
  setSelectedDateTypes: React.Dispatch<React.SetStateAction<string[]>>;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  selectedPlaces: string[];
  setSelectedPlaces: React.Dispatch<React.SetStateAction<string[]>>;
  start: Date | null;
  setStart: React.Dispatch<React.SetStateAction<Date | null>>;
  end: Date | null;
  setEnd: React.Dispatch<React.SetStateAction<Date | null>>;
  isCustomDate: boolean;
  setIsCustomDate: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTexts: string[];
  setSelectedTexts: React.Dispatch<React.SetStateAction<string[]>>;
  textSearchInput: string;
  setTextSearchInput: React.Dispatch<React.SetStateAction<string>>;
  isOnlyEveningEvents: boolean;
  setIsOnlyEveningEvents: React.Dispatch<React.SetStateAction<boolean>>;
  isOnlyRemoteEvents: boolean;
  setIsOnlyRemoteEvents: React.Dispatch<React.SetStateAction<boolean>>;
  isFree: boolean;
  setIsFree: React.Dispatch<React.SetStateAction<boolean>>;
  sortOrder: string;
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
};

export type AdvancedSearchContextType = SearchFormState & {
  scrollToResultList: () => void;
};

const AdvancedSearchContext = React.createContext<
  AdvancedSearchContextType | undefined
>(undefined);

export const useAdvancedSearchContext = () => {
  const context = React.useContext(AdvancedSearchContext);

  if (!context) {
    throw new Error(
      `AdvancedSearchForm should always be rendered inside AdvancedSearchContext`
    );
  }

  return context;
};

export default AdvancedSearchContext;
