import { useTranslation } from 'next-i18next';
import { errorsConfig } from '../translations/errors.config';

const useErrorsTranslation = () => useTranslation(errorsConfig.i18nNamespaces);

export default useErrorsTranslation;
