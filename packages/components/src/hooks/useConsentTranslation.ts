import { useTranslation } from 'next-i18next/pages';
import { consentConfig } from '../translations/consent.config';

const useConsentTranslation = () =>
  useTranslation(consentConfig.i18nNamespaces);

export default useConsentTranslation;
