import { useTranslation } from 'next-i18next/pages';
import { errorsConfig } from '../translations/errors.config';

const useErrorsTranslation = () => useTranslation(errorsConfig.i18nNamespaces);

export default useErrorsTranslation;
