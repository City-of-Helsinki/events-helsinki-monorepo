import { useTranslation } from 'next-i18next';
import { appEventsConfig } from '../translations/appEvents.config';

const useAppEventsTranslation = () =>
  useTranslation(appEventsConfig.i18nNamespaces);

export default useAppEventsTranslation;
