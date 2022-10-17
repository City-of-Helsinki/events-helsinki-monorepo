import { useTranslation } from 'next-i18next';
import { cmsConfig } from '../translations/cms.config';

const useCmsTranslation = () => useTranslation(cmsConfig.i18nNamespaces);

export default useCmsTranslation;
