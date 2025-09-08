import React from 'react';
import CmsHelperContext from './CmsHelperContext';

export default function useCmsRoutedAppHelper() {
  const context = React.useContext(CmsHelperContext);
  if (!context || Object.keys(context).length === 0) {
    throw new Error(
      `CmsHelper-utility cannot be used outside the CmsHelperprovider`
    );
  }
  if (!context.routerHelper) {
    throw new Error(
      `The routerHelper should be defined in the CmsHelperContext, but is currently undefined.`
    );
  }
  return context.routerHelper;
}
