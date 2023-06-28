import type { Meta, StoryFn } from '@storybook/react';

import React from 'react';
import DateRangePicker from './DateRangePicker';

export default {
  title: 'Example/DateRangePicker',
  component: DateRangePicker,
} as Meta<typeof DateRangePicker>;

export const DateRangePickerDefault = {
  args: {},
};
