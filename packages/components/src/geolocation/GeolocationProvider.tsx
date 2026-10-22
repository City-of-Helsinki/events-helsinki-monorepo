import type { ReactNode } from 'react';
import { useCallback, useMemo, useState } from 'react';
import type { Coordinates } from '../types';
import GeolocationContext from './GeolocationContext';
import geolocationService from './GeolocationService';
import { isGeolocationPositionError } from './types';

export type GeolocationProviderProps = {
  readonly children: ReactNode;
};

export default function GeolocationProvider({
  children,
}: GeolocationProviderProps) {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [called, setCalled] = useState<boolean>(false);
  const [error, setError] = useState<GeolocationPositionError | null>(null);
  const clearError = useCallback(() => setError(null), []);

  const resolve = useCallback(async () => {
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
  }, []);

  const contextValue = useMemo(
    () => ({
      coordinates: location,
      loading,
      error,
      clearError,
      called,
      resolve,
    }),
    [location, loading, error, clearError, called, resolve]
  );

  return (
    <GeolocationContext.Provider value={contextValue}>
      {children}
    </GeolocationContext.Provider>
  );
}
