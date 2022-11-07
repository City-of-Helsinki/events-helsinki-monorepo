import type { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';
import DateSelector from './DateSelector';

export default {
  title: 'Example/DateSelector',
  component: DateSelector,
} as ComponentMeta<typeof DateSelector>;

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

const Template: ComponentStory<typeof DateSelector> = (args) => (
  <div style={styles.dateAndButtonWrapper}>
    <div style={styles.dateSelectorWrapper}>
      <DateSelector {...args} />
    </div>
  </div>
);

export const DateSelectorDefault = Template.bind({});

const today = new Date();
const nextMonth = new Date(today);
nextMonth.setDate(today.getDate() + 31);
nextMonth.toLocaleDateString();

DateSelectorDefault.args = {
  dateTypes: ['today', 'tomorrow'],
  startDate: today,
  endDate: nextMonth,
  isCustomDate: false,
  name: 'date',
};
DateSelectorDefault.argTypes = {
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
};
