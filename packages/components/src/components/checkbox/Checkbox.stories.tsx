import type { Meta } from '@storybook/nextjs';

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
