import { useContext } from 'react';
import cookieConfigurationContext from './CookieConfigurationContext';

export default function useCookieConfigurationContext() {
  return useContext(cookieConfigurationContext);
}
