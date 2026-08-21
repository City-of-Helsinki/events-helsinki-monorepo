import React from 'react';
import { I18nextProvider } from 'react-i18next';
import type { Preview } from '@storybook/nextjs-vite';
import i18n from './i18next';

const withI18next = (Story: React.ComponentType) => {
  return (
    <I18nextProvider i18n={i18n}>
      <Story />
    </I18nextProvider>
  );
};

export const decorators = [withI18next];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
