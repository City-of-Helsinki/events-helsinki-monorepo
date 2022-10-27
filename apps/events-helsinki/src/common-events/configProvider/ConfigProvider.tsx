import type { Config } from 'events-helsinki-components';
import { configContext } from 'events-helsinki-components';
import React from 'react';

import defaultConfig from './defaultConfig';

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
