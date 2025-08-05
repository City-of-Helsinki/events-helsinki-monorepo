import type { Meta, StoryFn } from '@storybook/nextjs';

import React from 'react';
import LoadingSpinner from './LoadingSpinner';

export default {
  title: 'Example/LoadingSpinner',
  component: LoadingSpinner,
} as Meta<typeof LoadingSpinner>;

const Template: StoryFn<typeof LoadingSpinner> = (args) => (
  <LoadingSpinner {...args}>All loaded</LoadingSpinner>
);

export const LoadingSpinnerDefault = {
  render: Template,

  args: {
    isLoading: true,
  },
};
