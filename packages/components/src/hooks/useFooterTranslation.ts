import { useTranslation } from 'next-i18next/pages';
import { footerConfig } from '../translations/footer.config';

const useFooterTranslation = () => useTranslation(footerConfig.i18nNamespaces);

export default useFooterTranslation;
