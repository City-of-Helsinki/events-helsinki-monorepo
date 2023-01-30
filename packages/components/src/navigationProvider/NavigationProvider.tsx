import React from 'react';
import type { NavigationContextProps } from './NavigationContext';
import NavigationContext from './NavigationContext';

export type NavigationProviderProps = NavigationContextProps & {
  children: React.ReactNode;
};

export default function NavigationProvider({
  headerMenu,
  footerMenu,
  languages,
  children,
}: NavigationProviderProps) {
  const context = { headerMenu, footerMenu, languages };
  return (
    <NavigationContext.Provider value={context}>
      {children}
    </NavigationContext.Provider>
  );
}
