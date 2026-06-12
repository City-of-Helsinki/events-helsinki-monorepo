import composeQuery from './composeQuery.js';

interface VariableToKeyItem {
  key: string;
  value?: (string | null | number)[] | string | number | boolean | null;
}

const isScalarQueryValue = (
  value: VariableToKeyItem['value']
): value is string | number | boolean => {
  if (Array.isArray(value)) {
    return false;
  }
  return (
    typeof value === 'boolean' ||
    typeof value === 'number' ||
    (value !== null && value !== undefined && value !== '')
  );
};

const queryBuilder = (items: VariableToKeyItem[]): string => {
  return items.reduce((query, item) => {
    if (Array.isArray(item.value) && item.value.length) {
      return composeQuery(query, item.key, item.value.join(','));
    }
    if (isScalarQueryValue(item.value)) {
      return composeQuery(query, item.key, item.value);
    }
    return query;
  }, '');
};

export default queryBuilder;
