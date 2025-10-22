import type { Meta, StoryFn } from '@storybook/nextjs';

import React from 'react';
import DateSelector from './DateSelector';

export default {
  title: 'Example/DateSelector',
  component: DateSelector,
} as Meta<typeof DateSelector>;

const today = new Date();
const nextMonth = new Date(today);
nextMonth.setDate(today.getDate() + 31);

const styles = {
  dateAndButtonWrapper: {
    width: '100%',
    display: 'flex',
    // flexDirection: 'column',
    color: 'var(--color-primary-black)',
    // @include respond-above(m) {
    //   display: "grid",
    //   grid-template-columns: "1fr",
    //   grid-gap: "1.25rem",
    //   height: "fit-content",
    //   grid-template-columns: "2fr 1fr";
    // }
  },
  dateSelectorWrapper: {
    width: '100%',
    marginBottom: '1.25rem',
    gridColumnStart: 1,
  },
};

const Template: StoryFn<typeof DateSelector> = (args) => (
  <div style={styles.dateAndButtonWrapper}>
    <div style={styles.dateSelectorWrapper}>
      <DateSelector {...args} />
    </div>
  </div>
);

export const DateSelectorDefault = {
  render: Template,

  args: {
    dateTypes: ['today', 'tomorrow'],
    startDate: today,
    endDate: nextMonth.toLocaleDateString(),
    isCustomDate: false,
    name: 'date',
    onChangeStartDate: () => {
      // eslint-disable-next-line no-console
      console.log('onChangeStartDate');
    },
    onChangeEndDate: () => {
      // eslint-disable-next-line no-console
      console.log('onChangeEndDate');
    },
  },

  argTypes: {
    isCustomDate: {
      options: [true, false],
      control: { type: 'radio' },
    },
    onChangeDateTypes: {
      control: false,
    },
    onChangeEndDate: {
      control: false,
    },
    onChangeStartDate: {
      control: false,
    },
    toggleIsCustomDate: {
      control: false,
    },
  },
};
