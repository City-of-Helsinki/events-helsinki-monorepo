import { useTranslation } from 'next-i18next';
import { homeConfig } from '../translations/home.config';

const useHomeTranslation = () => useTranslation(homeConfig.i18nNamespaces);

export default useHomeTranslation;
