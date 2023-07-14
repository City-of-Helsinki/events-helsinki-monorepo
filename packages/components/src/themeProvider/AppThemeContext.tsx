import type { CommonButtonProps } from 'hds-react';
import React from 'react';

export type AppThemeContextProps = {
  defaultButtonTheme?: CommonButtonProps['theme'];
  defaultButtonVariant?: CommonButtonProps['variant'];
};

const AppThemeContext = React.createContext<AppThemeContextProps>({});

export default AppThemeContext;
