import { useTranslation } from 'next-i18next';
import { notFoundConfig } from '../translations/notFound.config';

const useNotFoundTranslation = () =>
  useTranslation(notFoundConfig.i18nNamespaces);

export default useNotFoundTranslation;
