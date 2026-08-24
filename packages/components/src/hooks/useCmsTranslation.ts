import { useTranslation } from 'next-i18next/pages';
import { cmsConfig } from '../translations/cms.config';

const useCmsTranslation = () => useTranslation(cmsConfig.i18nNamespaces);

export default useCmsTranslation;
