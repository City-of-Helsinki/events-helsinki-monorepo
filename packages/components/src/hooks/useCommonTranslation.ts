import { useTranslation } from 'next-i18next';
import { commonConfig } from '../translations/common.config';

const useCommonTranslation = () =>
  // TODO: Fix this problem
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useTranslation(commonConfig.i18nNamespaces);

export default useCommonTranslation;
