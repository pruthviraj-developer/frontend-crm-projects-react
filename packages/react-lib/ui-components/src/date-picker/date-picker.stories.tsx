import React, { FC } from 'react';
import { DatePickerComponent } from './date-picker';

const props = {
  placeholder: 'Enter Date',
  dateFormat: 'dd/MM/yyyy, hh:mm aa',
  selectedDate: '2020-08-15T20:07:00',
};

export default {
  title: 'Date Picker',
  component: DatePickerComponent,
};
export const DateSelector: FC = () => <DatePickerComponent {...props} />;
