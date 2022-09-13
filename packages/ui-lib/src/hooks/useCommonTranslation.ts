import { useTranslation } from 'next-i18next';
import { commonConfig } from '../translations/common.config';

export default () => useTranslation(commonConfig.i18nNamespaces);
