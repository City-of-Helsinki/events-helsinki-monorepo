import { useContext } from 'react';
import appRoutingContext from './AppRoutingContext';

export default function useAppRoutingContext() {
  return useContext(appRoutingContext);
}
