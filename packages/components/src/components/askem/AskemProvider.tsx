import React from 'react';
import AskemContext from './AskemContext';
import type { AskemInstance } from './types';

export interface AskemProviderProps {
  children?: React.ReactNode;
  value: AskemInstance | null;
}

const AskemProvider: React.FC<AskemProviderProps> = function ({
  children,
  value,
}) {
  const Context = AskemContext;

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default AskemProvider;
