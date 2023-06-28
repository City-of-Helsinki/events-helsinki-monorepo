import { RouterContext } from "next/dist/shared/lib/router-context"; // next 12
import i18n from './i18next.js';

// Enable hds-design-tokens in storybook
// import 'hds-design-tokens/lib/all.min.css';

import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

// Enable HelsinkiGrotesk font in storybook
// import './helsinkiGrotesk.css';
// import './storybookOverrides.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
  i18n,
  locale: 'en',
  locales: {
    en: 'English',
    fr: 'Français',
    ja: '日本語',    
  },
};