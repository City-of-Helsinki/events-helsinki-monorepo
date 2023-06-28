import type { Meta, StoryFn } from '@storybook/react';

import React from 'react';
import Checkbox from './Checkbox';

export default {
  title: 'Example/Checkbox',
  component: Checkbox,
} as Meta<typeof Checkbox>;

export const CheckboxDefault = {
  args: {
    label: 'label',
  },
};
