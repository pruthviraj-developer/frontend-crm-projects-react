import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { FilterPanOptionType, FilterPanOptionPropsType } from './IFilterPan';

const FilterSelect = (props: FilterPanOptionPropsType) => {
  const { filter, setSelectedFilter } = props;

  const returnArrValues = (arr: FilterPanOptionType[]) => {
    const values: any = [];
    arr.forEach((item: FilterPanOptionType) => {
      if (!values.includes(item.key || item)) {
        values.push(item.key || item);
      }
    });

    if (values.length > 0) {
      if (filter.isString) {
        return values.toString();
      } else {
        return values;
      }
    }
    return;
  };

  const returnSingleValues = (val: string) => {
    if (filter.isString) {
      return val;
    }
    return [val];
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
        getOptionSelected={(
          option: FilterPanOptionType,
          selectedValue: FilterPanOptionType
        ) => option.key == selectedValue?.key}
        style={filter.customCss}
        onChange={(e: any, values: any) => {
          if (e) {
            setSelectedFilter({
              [filter.key]: values
                ? Array.isArray(values)
                  ? returnArrValues(values)
                  : returnSingleValues(values.key)
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
