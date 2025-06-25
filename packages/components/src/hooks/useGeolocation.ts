import { useContext } from 'react';
import GeolocationContext from '../geolocation/GeolocationContext';
import type { GeolocationContextType } from '../geolocation/types';

export default function useGeolocation(): GeolocationContextType {
  return useContext(GeolocationContext);
}
