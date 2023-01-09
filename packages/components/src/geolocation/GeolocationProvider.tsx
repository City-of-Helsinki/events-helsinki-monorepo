import { useTranslation } from 'next-i18next';
import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode, Context } from 'react';
import type { Coordinates } from '../types';
import { showToast } from '../utils';
import geolocationService from './GeolocationService';
import type { GeolocationContextType } from './types';

const GeolocationContext: Context<GeolocationContextType> =
  createContext<GeolocationContextType>({
    coordinates: null,
    loading: false,
    called: false,
    error: null,
    resolve: () => Promise.resolve(null),
  });

type Props = {
  children: ReactNode;
};

const isGeolocationPositionError = (
  error: unknown
): error is GeolocationPositionError =>
  Boolean(
    error &&
      typeof error === 'object' &&
      'code' in error &&
      'message' in error &&
      'PERMISSION_DENIED' in error &&
      'POSITION_UNAVAILABLE' in error &&
      'TIMEOUT' in error
  );

export default function GeolocationProvider({ children }: Props) {
  const { t } = useTranslation('geolocationProvider');
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [called, setCalled] = useState<boolean>(false);
  const [error, setError] = useState<GeolocationPositionError | null>(null);

  const resolve = useCallback(async () => {
    setLoading(true);

    if (!('geolocation' in navigator)) {
      setLocation(null);
      setLoading(false);
      setCalled(true);

      return null;
    }

    let geolocation = null;

    showToast({
      title: t('a11ymessage.title'),
      message: t('a11ymessage.description'),
      type: 'info',
      options: { invisible: true },
    });

    try {
      geolocation = await geolocationService.getCurrentPosition();

      setLocation(geolocation);
    } catch (e) {
      if (isGeolocationPositionError(e)) {
        setLocation(null);
        setError(e);
        showToast({
          title: t('error.title'),
          message: t(
            e.PERMISSION_DENIED
              ? 'error.description.permissionDenied'
              : 'error.description.generic'
          ),
          type: 'alert',
        });
      }
    }

    setLoading(false);
    setCalled(true);

    return geolocation;
  }, [t]);

  return (
    <GeolocationContext.Provider
      value={{
        coordinates: location,
        loading,
        error,
        called,
        resolve,
      }}
    >
      {children}
    </GeolocationContext.Provider>
  );
}

export function useGeolocationContext(): GeolocationContextType {
  return useContext(GeolocationContext);
}
