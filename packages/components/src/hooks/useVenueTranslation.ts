import { useTranslation } from 'next-i18next';
import { venueConfig } from '../translations/venue.config';

const useVenueTranslation = () => useTranslation(venueConfig.i18nNamespaces);

export default useVenueTranslation;
