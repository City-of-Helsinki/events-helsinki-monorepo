import { useTranslation } from 'next-i18next/pages';
import { searchConfig } from '../translations/search.config';

const useSearchTranslation = () => useTranslation(searchConfig.i18nNamespaces);

export default useSearchTranslation;
