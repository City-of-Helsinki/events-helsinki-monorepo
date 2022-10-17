import { useTranslation } from 'next-i18next';
import { footerConfig } from '../translations/footer.config';

const useFooterTranslation = () => useTranslation(footerConfig.i18nNamespaces);

export default useFooterTranslation;
