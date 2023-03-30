import { HeadlessCMSHelper } from '@events-helsinki/components';
import ArticleDetails from '../article/articleDetails/ArticleDetails';
import AppConfig from './AppConfig';

const cmsHelper = new HeadlessCMSHelper({
  cmsArticlesContextPath: AppConfig.cmsArticlesContextPath,
  cmsPagesContextPath: AppConfig.cmsPagesContextPath,
  dateFormat: AppConfig.dateFormat,
  ArticleDetails,
});

export default cmsHelper;
