import { useContext } from 'react';
import appThemeContext from './AppThemeContext';

export default function useAppThemeContext() {
  return useContext(appThemeContext);
}
