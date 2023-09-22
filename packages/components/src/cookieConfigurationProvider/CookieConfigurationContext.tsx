import React from 'react';

export type CookieConfigurationContextProps = {
  cookieDomain: string;
};

const defaultCookieDomain = '';

const CookieConfigurationContext =
  React.createContext<CookieConfigurationContextProps>({
    cookieDomain: defaultCookieDomain,
  });

export default CookieConfigurationContext;
