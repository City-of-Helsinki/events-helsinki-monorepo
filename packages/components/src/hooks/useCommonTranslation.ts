import { useTranslation } from 'next-i18next';
import { commonConfig } from '../translations/common.config';

const useCommonTranslation = () => useTranslation(commonConfig.i18nNamespaces);

export default useCommonTranslation;
