import { Notification } from 'hds-react';
import { useTranslation } from 'next-i18next';
import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode, Context } from 'react';
import useCommonTranslation from '../hooks/useCommonTranslation';
import type { Coordinates } from '../types';
import geolocationService from './GeolocationService';
import type { GeolocationContextType } from './types';

const GeolocationContext: Context<GeolocationContextType> =
  createContext<GeolocationContextType>({
    coordinates: null,
    loading: false,
    called: false,
    error: null,
    clearError: () => null,
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
  const { t: commonTranslation } = useCommonTranslation();
  const { t } = useTranslation('geolocationProvider');
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [called, setCalled] = useState<boolean>(false);
  const [error, setError] = useState<GeolocationPositionError | null>(null);

  // i want to generate a GeolocationPositionError
  const resolve = async () =>
    setError({
      code: 1,
      message: 'test',
      PERMISSION_DENIED: 1,
      POSITION_UNAVAILABLE: 2,
      TIMEOUT: 3,
    });

  // interface GeolocationPositionError {
  //     /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/GeolocationPositionError/code) */
  //     readonly code: number;
  //     /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/GeolocationPositionError/message) */
  //     readonly message: string;
  //     readonly PERMISSION_DENIED: 1;
  //     readonly POSITION_UNAVAILABLE: 2;
  //     readonly TIMEOUT: 3;
  // }

  // const resolve = async () => {
  //   setLoading(true);
  //
  //   if (!('geolocation' in navigator)) {
  //     setLocation(null);
  //     setLoading(false);
  //     setCalled(true);
  //
  //     return null;
  //   }
  //
  //   let geolocation = null;
  //
  //   try {
  //     geolocation = await geolocationService.getCurrentPosition();
  //
  //     setLocation(geolocation);
  //   } catch (e) {
  //     if (isGeolocationPositionError(e)) {
  //       setLocation(null);
  //       setError(e);
  //       console.log('Geolocation error set:', e);
  //     }
  //   }
  //
  //   setLoading(false);
  //   setCalled(true);
  //
  //   return geolocation;
  // };

  const clearError = () => setError(null);

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

export function useGeolocationContext(): GeolocationContextType {
  return useContext(GeolocationContext);
}
