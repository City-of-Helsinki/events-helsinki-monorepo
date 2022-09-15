import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import type { TFunction } from 'next-i18next';
import type { NextRouter } from 'next/router';

export interface Config {
  router?: NextRouter; // TODO: Support the react-router
  apolloClient?: ApolloClient<NormalizedCacheObject>;
  t: TFunction;
  /* eslint-disable @typescript-eslint/naming-convention */
  components: {
    A: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => JSX.Element;
    Link?: (
      props: React.AnchorHTMLAttributes<HTMLAnchorElement>
    ) => JSX.Element;
  };
  /* eslint-enable @typescript-eslint/naming-convention */
}
