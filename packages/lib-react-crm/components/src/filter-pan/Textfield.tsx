import React, { useState } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { FilterPanOptionPropsType } from './IFilterPan';

const Textfield = (props: FilterPanOptionPropsType) => {
  const { filter, setSelectedFilter } = props;
  const [inputValue, setInputValue] = useState<string>('');
  return (
    <Grid xs item>
      <TextField
        id={filter.key}
        name={filter.key}
        label={filter.display}
        variant="outlined"
        fullWidth={true}
        value={inputValue}
        style={filter.customCss}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setInputValue(e.target.value);
        }}
        onBlur={(e) => {
          setSelectedFilter({
            [filter.key]: e.target.value ? e.target.value : undefined,
          });
        }}
      />
    </Grid>
  );
};

export { Textfield };
