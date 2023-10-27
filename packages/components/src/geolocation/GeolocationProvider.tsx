import type { ReactNode } from 'react';
import { useState } from 'react';
import type { Coordinates } from '../types';
import GeolocationContext from './GeolocationContext';
import geolocationService from './GeolocationService';
import { isGeolocationPositionError } from './types';

export type GeolocationProviderProps = {
  children: ReactNode;
};

export default function GeolocationProvider({
  children,
}: GeolocationProviderProps) {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [called, setCalled] = useState<boolean>(false);
  const [error, setError] = useState<GeolocationPositionError | null>(null);
  const clearError = () => setError(null);

  const resolve = async () => {
    setLoading(true);

    if (!('geolocation' in navigator)) {
      setLocation(null);
      setLoading(false);
      setCalled(true);

      return null;
    }

    let geolocation = null;

    try {
      geolocation = await geolocationService.getCurrentPosition();

      setLocation(geolocation);
    } catch (e) {
      if (isGeolocationPositionError(e)) {
        setLocation(null);
        setError(e);
      }
    }

    setLoading(false);
    setCalled(true);

    return geolocation;
  };

  return (
    <GeolocationContext.Provider
      value={{
        coordinates: location,
        loading,
        error,
        clearError,
        called,
        resolve,
      }}
    >
      {children}
    </GeolocationContext.Provider>
  );
}
