import {
  CmsRoutedAppHelper,
  SUPPORT_LANGUAGES,
} from 'events-helsinki-components';

import i18nRoutes from '../../../i18nRoutes.config';
import AppConfig from './AppConfig';

const routerHelper = new CmsRoutedAppHelper({
  i18nRoutes,
  locales: Object.values(SUPPORT_LANGUAGES),
  URLRewriteMapping: AppConfig.URLRewriteMapping,
});

export default routerHelper;
