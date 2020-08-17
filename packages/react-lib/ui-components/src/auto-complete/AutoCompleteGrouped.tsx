/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import { AutoCompleteProps, AutoCompleteOption } from './IAutoComplete';

export const AutoCompleteGrouped = <OptionType extends AutoCompleteOption>({
  options,
}: AutoCompleteProps<OptionType>) => {
  const cureatedOptions = options?.map((option) => {
    const firstLetter = option.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });

  return (
    <Autocomplete
      options={cureatedOptions?.sort(
        (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
      )}
      groupBy={(option) => option.firstLetter}
      getOptionLabel={(option) => option.name as string}
      style={{ width: 200 }}
      renderInput={(params) => (
        <TextField {...params} label="Select PLP" variant="outlined" />
      )}
    />
  );
};
