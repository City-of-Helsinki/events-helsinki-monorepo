import {
  getLocalizedString,
  useLocale,
  useNeighborhoodListQuery,
  additionalDivisions,
} from '@events-helsinki/components';
import type { Neighborhood } from '@events-helsinki/components';
import sortBy from 'lodash/sortBy';

export const DIVISION_BLOCKLIST = [
  'kaupunginosa:aluemeri',
  'kaupunginosa:ultuna',
];

type DivisionOption = {
  text: string;
  value: string;
};

const useDivisionOptions = (): DivisionOption[] => {
  const locale = useLocale();
  const { data: neighborhoodsData } = useNeighborhoodListQuery();
  const filteredNeighborhoodList = getFilteredNeighborhoodList(
    neighborhoodsData?.neighborhoodList.data
  );
  const neighborhoodList = [
    ...filteredNeighborhoodList,
    ...additionalDivisions,
  ];

  const neighborhoodOptionList =
    neighborhoodList?.map((neighborhood: Neighborhood) => ({
      text: getLocalizedString(neighborhood.name, locale),
      value: neighborhood.id,
    })) ?? [];

  return sortBy(neighborhoodOptionList, 'text');
};

export const getFilteredNeighborhoodList = (
  data: Neighborhood[] | undefined
): Neighborhood[] => {
  return (
    data?.filter((option) => !DIVISION_BLOCKLIST.includes(option.id)) ?? []
  );
};

export default useDivisionOptions;
