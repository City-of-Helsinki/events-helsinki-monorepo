import { useTranslation } from 'next-i18next/pages';
import { appSportsConfig } from '../translations/appSports.config';

const useAppSportsTranslation = () =>
  useTranslation(appSportsConfig.i18nNamespaces);

export default useAppSportsTranslation;
