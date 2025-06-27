import type { Meta } from '@storybook/nextjs';

import DateRangePicker from './DateRangePicker';

export default {
  title: 'Example/DateRangePicker',
  component: DateRangePicker,
} as Meta<typeof DateRangePicker>;

export const DateRangePickerDefault = {
  args: {
    onChangeStartDate: () => {
      // eslint-disable-next-line no-console
      console.log('onChangeStartDate');
    },
    onChangeEndDate: () => {
      // eslint-disable-next-line no-console
      console.log('onChangeEndDate');
    },
  },
};
