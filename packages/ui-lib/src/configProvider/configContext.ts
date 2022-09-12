import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import type { NextRouter } from 'next/router';
import type React from 'react';
import { createContext } from 'react';

import type { UnionTFunction } from '../types';

export type Config = {
  router?: NextRouter; // TODO: Support the react-router
  apolloClient?: ApolloClient<NormalizedCacheObject>;
  t: UnionTFunction;
  /* eslint-disable @typescript-eslint/naming-convention */
  components: {
    A: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => JSX.Element;
    Link?: (
      props: React.AnchorHTMLAttributes<HTMLAnchorElement>
    ) => JSX.Element;
  };
  /* eslint-enable @typescript-eslint/naming-convention */
};

const configContext = createContext<Config>({} as Config);

export default configContext;
