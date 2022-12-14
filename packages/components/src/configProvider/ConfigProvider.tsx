import React from 'react';

import configContext from './configContext';
import defaultConfig from './defaultConfig';
import type { Config } from './types';

type ConfigProviderProps = {
  config: Config;
  children: React.ReactNode;
};

export default function ConfigProvider({
  config: userConfig,
  children,
}: ConfigProviderProps) {
  const config = React.useMemo(
    () => ({
      ...defaultConfig,
      ...userConfig,
    }),
    [userConfig]
  );

  return (
    <configContext.Provider value={config}>{children}</configContext.Provider>
  );
}
