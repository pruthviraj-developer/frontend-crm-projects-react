import React, { FC, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './date-picker.css';
import styled from '@emotion/styled';
import { isValid, subDays } from 'date-fns';

interface Props {
  placeholder: string;
  dateFormat: string;
  isEndDate?: string;
  selectedDate?: string;
  handleChange?: (event: React.MouseEvent) => void;
  disabled?: true | false;
  disableMinDate?: true | false;
}

const DateTimePicker = styled.div``;

export const DatePickerComponent: FC<Props> = (props: Props) => {
  const selectedDate = props.selectedDate
    ? new Date(props.selectedDate)
    : new Date();
  const [startDate, setStartDate] = useState<any>(selectedDate);
  const onDateChange = (date: Date | any) => {
    setStartDate(date);
    // console.log(format(date, "yyyy-MM-dd'T'hh:mm:ss"));
  };
  const handleOnBlur = ({ target: { value } }) => {
    const date = new Date(value);
    if (isValid(date)) {
      onDateChange(date);
    } else {
      // console.log('value: ', value, date);
    }
  };
  return (
    <DateTimePicker>
      <DatePicker
        selected={startDate}
        showTimeSelect
        dateFormat={props.dateFormat}
        onBlur={handleOnBlur}
        onChange={(date) => date && onDateChange(date)}
        minDate={subDays(new Date(), 0)}
        placeholderText={props.placeholder}
      />
    </DateTimePicker>
  );
};
