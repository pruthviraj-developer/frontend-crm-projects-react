import { Story } from '@storybook/react/types-6-0';
import React from 'react';
import { DatePickerComponent, Props } from './date-picker';

const props = {
  placeholder: 'Enter Date',
  dateFormat: 'dd/MM/yyyy, hh:mm aa',
  selectedDate: '2020-08-15T20:07:00',
  timeStamp: true,
};

export default {
  title: 'Date Picker',
  component: DatePickerComponent,
};

const DatePicketTemplate: Story<Props> = (args) => (
  <DatePickerComponent {...args} />
);

export const DateSelector = DatePicketTemplate.bind({});
DateSelector.args = {
  ...props,
};

export const DateFormat = DatePicketTemplate.bind({});
DateFormat.args = {
  ...props,
  timeStamp: false,
  dateFormat: 'dd/MM/yyyy',
};
