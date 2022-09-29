import type { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';
import Checkbox from './Checkbox';

export default {
  title: 'Example/Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
);

export const CheckboxDefault = Template.bind({});

CheckboxDefault.args = {
  label: 'label',
};
