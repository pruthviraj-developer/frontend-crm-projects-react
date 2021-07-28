import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { IOptionType, IFilterPropsType } from './IFilterPan';

const FilterSelect = (props: IFilterPropsType) => {
  const { filter, setSelectedFilter } = props;

  const returnArrValues = (arr: IOptionType[]) => {
    const values: any = [];
    arr.forEach((item: IOptionType) => {
      if (!values.includes(item.key || item)) {
        values.push(item.key || item);
      }
    });

    if (values.length > 0) {
      return values;
    }
    return;
  };

  return (
    <Grid xs item>
      <Autocomplete
        multiple={filter.multiSelect || false}
        limitTags={filter.multiSelect ? filter.limitTags : 0}
        id={filter.key}
        disableCloseOnSelect={filter.multiSelect ? true : false}
        options={filter.options}
        getOptionLabel={(option) => option.display}
        getOptionSelected={(option: IOptionType, selectedValue: IOptionType) =>
          option.key == selectedValue?.key
        }
        onChange={(e: any, values: any) => {
          if (e) {
            setSelectedFilter({
              [filter.key]: values
                ? Array.isArray(values)
                  ? returnArrValues(values)
                  : [values.key]
                : undefined,
            });
          }
        }}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label={filter.display} />
        )}
      />
    </Grid>
  );
};

export { FilterSelect };
