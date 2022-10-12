import type { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';
import LoadingSpinner from './LoadingSpinner';

export default {
  title: 'Example/LoadingSpinner',
  component: LoadingSpinner,
} as ComponentMeta<typeof LoadingSpinner>;

const Template: ComponentStory<typeof LoadingSpinner> = (args) => (
  <LoadingSpinner {...args}>All loaded</LoadingSpinner>
);

export const LoadingSpinnerDefault = Template.bind({});

LoadingSpinnerDefault.args = {
  isLoading: true,
};
