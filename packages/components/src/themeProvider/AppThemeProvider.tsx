import React from 'react';
import type { AppThemeContextProps } from './AppThemeContext';
import AppThemeContext from './AppThemeContext';

export type AppThemeProviderProps = AppThemeContextProps & {
  children: React.ReactNode;
};

export default function AppThemeProvider({
  defaultButtonTheme,
  defaultButtonVariant,
  children,
}: AppThemeProviderProps) {
  const context = {
    defaultButtonTheme,
    defaultButtonVariant,
  };
  return (
    <AppThemeContext.Provider value={context}>
      {children}
    </AppThemeContext.Provider>
  );
}
