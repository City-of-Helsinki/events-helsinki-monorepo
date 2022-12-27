import React from 'react';
import NavigationContext from './NavigationContext';

type NavigationProviderProps = {
  navigation: JSX.Element;
  children: React.ReactNode;
};

export default function NavigationProvider({
  navigation,
  children,
}: NavigationProviderProps) {
  return (
    <NavigationContext.Provider value={navigation}>
      {children}
    </NavigationContext.Provider>
  );
}
