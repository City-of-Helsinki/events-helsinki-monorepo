import React from 'react';
import CmsHelperContext from './CmsHelperContext';

export default function useCmsHelper() {
  const context = React.useContext(CmsHelperContext);
  if (!context) {
    throw new Error(
      `CmsHelper-utility cannot be used outside the CmsHelperprovider`
    );
  }
  if (!context.cmsHelper) {
    throw new Error(
      `The cmsHelper should be defined in the CmsHelperContext, but is currently undefined.`
    );
  }
  return context.cmsHelper;
}
