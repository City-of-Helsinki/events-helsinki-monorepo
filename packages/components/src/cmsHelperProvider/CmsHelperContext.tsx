import React from 'react';
import type { CmsRoutedAppHelper, HeadlessCMSHelper } from '../utils';

export type CmsHelperContextProps = {
  cmsHelper?: HeadlessCMSHelper;
  routerHelper?: CmsRoutedAppHelper;
};

const CmsHelperContext = React.createContext<CmsHelperContextProps>({});

export default CmsHelperContext;
