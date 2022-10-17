import { useTranslation } from 'next-i18next';
import { eventConfig } from '../translations/event.config';

const useEventTranslation = () => useTranslation(eventConfig.i18nNamespaces);

export default useEventTranslation;
