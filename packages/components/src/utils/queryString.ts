import { APP_LANGUAGES } from '../constants';
import { assertUnreachable } from './typescript.utils';

export const mappedPlaces: Record<string, string> = {};

type QueryParamValue = string | string[];

export type QueryParams = {
  places?: string;
  returnPath?: QueryParamValue;
};

export type QueryParam = keyof QueryParams;

const langPathRegExp = new RegExp(`/(${APP_LANGUAGES.join('|')})`);

const stripLanguageFromPath = (path: string) =>
  path.replace(langPathRegExp, '');

const getParamValue = ({
  param,
  value,
}: {
  param: QueryParam;
  value: string;
}) => {
  switch (param) {
    case 'places':
      return mappedPlaces[value];
    case 'returnPath':
      return stripLanguageFromPath(value);
    default:
      return assertUnreachable(param, 'Unknown query parameter');
  }
};

export const addParamsToQueryString = (
  queryString: string,
  queryParams: QueryParams
): string => {
  const searchParams = new URLSearchParams(queryString);
  Object.entries(queryParams).forEach(([key, values]) => {
    const param = key as QueryParam;
    if (Array.isArray(values)) {
      values.forEach((value) =>
        searchParams.append(param, getParamValue({ param, value }))
      );
    } else if (values) {
      searchParams.append(param, getParamValue({ param, value: values }));
    }
  });
  return '?' + searchParams.toString();
};
