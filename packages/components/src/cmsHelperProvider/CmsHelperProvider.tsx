import React from 'react';
import type { CmsHelperContextProps } from './CmsHelperContext';
import CmsHelperContext from './CmsHelperContext';

export type CmsHelperProviderProps = CmsHelperContextProps & {
  children: React.ReactNode;
};

export default function CmsHelperProvider({
  cmsHelper,
  routerHelper,
  children,
}: CmsHelperProviderProps) {
  const context = { cmsHelper, routerHelper };
  return (
    <CmsHelperContext.Provider value={context}>
      {children}
    </CmsHelperContext.Provider>
  );
}
