import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { FilterPanOptionPropsType } from './IFilterPan';

const DatePickerComponent = (props: FilterPanOptionPropsType) => {
  const { filter, setSelectedFilter } = props;
  const [dateValue, setDateValue] = useState(null);

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
          id={filter.key}
          label={filter.display}
          value={dateValue}
          inputVariant="outlined"
          onChange={(e: any) => {
            // if (e) {
            setDateValue(e);
            setSelectedFilter({
              [filter.key]: e ? e.toISOString().split('T')[0] : undefined,
            });
            // }
          }}
          style={{ ...filter.customCss, marginTop: '0rem' }}
        />
      </MuiPickersUtilsProvider>
    </Grid>
  );
};
export { DatePickerComponent };
