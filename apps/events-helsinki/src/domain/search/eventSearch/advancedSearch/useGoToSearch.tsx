import type { ParsedUrlQueryInput } from 'querystring';
import { useLocale } from '@events-helsinki/components';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import { ROUTES } from '../../../../constants';
import routerHelper from '../../../app/routerHelper';

export const useGoToSearch = () => {
  const locale = useLocale();
  const router = useRouter();

  return (search: string): void => {
    router.push(
      {
        pathname: routerHelper.getI18nPath(ROUTES.SEARCH, locale),
        query: queryString.parse(search) as ParsedUrlQueryInput,
      },
      undefined,
      { shallow: true }
    );
  };
};
