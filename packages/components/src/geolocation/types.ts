import type { Coordinates } from '../types';

export type GeolocationContextType = {
  coordinates: Coordinates | null;
  loading: boolean;
  called: boolean;
  error?: GeolocationPositionError | null;
  clearError?: () => void;
  resolve: () => Promise<Coordinates | null>;
};

export const isGeolocationPositionError = (
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
