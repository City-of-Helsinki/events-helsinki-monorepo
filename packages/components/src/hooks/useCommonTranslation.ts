import { useTranslation } from 'next-i18next';
import { commonConfig } from '../translations/common.config';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const useCommonTranslation = () => useTranslation(commonConfig.i18nNamespaces);

export default useCommonTranslation;
