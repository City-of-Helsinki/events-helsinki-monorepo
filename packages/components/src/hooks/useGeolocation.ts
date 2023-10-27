import { useContext } from 'react';
import type { GeolocationContextType } from '../geolocation';
import { GeolocationContext } from '../geolocation';

export default function useGeolocation(): GeolocationContextType {
  return useContext(GeolocationContext);
}
