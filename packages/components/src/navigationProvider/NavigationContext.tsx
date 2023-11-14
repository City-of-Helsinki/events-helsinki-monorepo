import React from 'react';
import type { Language, Menu } from '../types/generated/graphql';

export type NavigationContextProps = {
  headerMenu?: Menu;
  headerUniversalBarMenu?: Menu;
  footerMenu?: Menu;
  languages?: Language[];
};

const NavigationContext = React.createContext<NavigationContextProps>({});

export default NavigationContext;
