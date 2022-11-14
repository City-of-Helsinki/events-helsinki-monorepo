import { useTranslation } from 'next-i18next';
import { appHobbiesConfig } from '../translations/appHobbies.config';

const useAppHobbiesTranslation = () =>
  useTranslation(appHobbiesConfig.i18nNamespaces);

export default useAppHobbiesTranslation;
