import type { ButtonProps, ButtonVariant } from 'hds-react';
import React from 'react';

export type AppThemeContextProps = {
  defaultButtonTheme?: ButtonProps['theme'];
  defaultButtonVariant?: Exclude<ButtonVariant, ButtonVariant.Supplementary>;
};

const AppThemeContext = React.createContext<AppThemeContextProps>({});

export default AppThemeContext;
