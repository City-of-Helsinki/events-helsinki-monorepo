import { isBoolean, isNumber } from 'util';

import composeQuery from './composeQuery.js';

interface VariableToKeyItem {
  key: string;
  value?: (string | null | number)[] | string | number | boolean | null;
}

const queryBuilder = (items: VariableToKeyItem[]): string => {
  return items.reduce((query, item) => {
    if (Array.isArray(item.value) && item.value.length) {
      return composeQuery(query, item.key, item.value.join(','));
    } else if (
      (item.value || isBoolean(item.value) || isNumber(item.value)) &&
      !Array.isArray(item.value)
    ) {
      return composeQuery(query, item.key, item.value);
    }
    return query;
  }, '');
};

export default queryBuilder;
