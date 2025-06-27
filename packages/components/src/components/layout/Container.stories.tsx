import type { Meta } from '@storybook/nextjs';
import React from 'react';

import Container from './Container';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Container',
  component: Container,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof Container>;

export const WithChildren = {
  args: {
    children: <p>hello!</p>,
  },
};
