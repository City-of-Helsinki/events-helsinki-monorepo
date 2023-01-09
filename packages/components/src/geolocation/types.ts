import type { Coordinates } from '../types';

export type GeolocationContextType = {
  coordinates: Coordinates | null;
  loading: boolean;
  called: boolean;
  error?: GeolocationPositionError | null;
  resolve: () => Promise<Coordinates | null>;
};
