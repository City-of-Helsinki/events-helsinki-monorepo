import type { Context } from 'react';
import { createContext } from 'react';
import type { GeolocationContextType } from './types';

const GeolocationContext: Context<GeolocationContextType> =
  createContext<GeolocationContextType>({
    coordinates: null,
    loading: false,
    called: false,
    error: null,
    resolve: () => Promise.resolve(null),
  });

export default GeolocationContext;
