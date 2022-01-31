import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { DatePickerComponentPropsType } from './DatePickerComponentPropsType';

const DatePickerComponent = (props: DatePickerComponentPropsType) => {
  const { keyName, display, setSelectedDate } = props;
  const selectedDate = props.selectedDate
    ? new Date(props.selectedDate)
    : new Date();
  const [dateValue, setDateValue] = useState(selectedDate);
  const onChangeHandler = (e: Date | null) => {
    if (e) {
      setDateValue(e);
      const year = e.getFullYear();
      const month = ('0' + (e.getMonth() + 1)).slice(-2);
      const date = ('0' + e.getDate()).slice(-2);
      const formatDate = '' + year + '-' + month + '-' + date;
      setSelectedDate({
        [keyName]: e ? formatDate : undefined,
      });
    }
  };

  return (
    <Grid xs item>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          allowKeyboardControl={false}
          fullWidth
          autoOk={true}
          variant="inline"
          format="yyyy-MM-dd"
          margin="normal"
          id={keyName}
          key={keyName}
          label={display}
          value={dateValue}
          inputVariant="outlined"
          style={props.customCss}
          onChange={onChangeHandler}
        />
      </MuiPickersUtilsProvider>
    </Grid>
  );
};
export { DatePickerComponent };
