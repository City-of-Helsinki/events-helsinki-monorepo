import { useTranslation } from 'next-i18next';
import { appSportsConfig } from '../translations/appSports.config';

const useAppSportsTranslation = () =>
  useTranslation(appSportsConfig.i18nNamespaces);

export default useAppSportsTranslation;
