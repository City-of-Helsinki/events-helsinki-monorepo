import type { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';
import DateRangePicker from './DateRangePicker';

export default {
  title: 'Example/DateRangePicker',
  component: DateRangePicker,
} as ComponentMeta<typeof DateRangePicker>;

const Template: ComponentStory<typeof DateRangePicker> = (args) => (
  <DateRangePicker {...args} />
);

export const DateRangePickerDefault = Template.bind({});

DateRangePickerDefault.args = {};
