import { FormControl, InputLabel, Select } from '@material-ui/core';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { SelectBoxProps } from './IselectBox';
const StyledFormControl = styled(FormControl)`
  min-width: 110;
`;

export const SelectBox = ({
  placeholder,
  options,
  selectedValue,
  ...props
}: SelectBoxProps) => {
  const [state, setState] = useState<{ value: unknown }>({
    value: selectedValue,
  });
  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    setState({
      ...state,
      value: event.target.value,
    });
  };
  return (
    <StyledFormControl variant={'outlined'} margin={'normal'} {...props}>
      <InputLabel htmlFor="outlined-select">{placeholder}</InputLabel>
      <Select
        native
        value={state.value}
        onChange={handleChange}
        label="Position"
        inputProps={{
          id: 'outlined-select',
        }}
      >
        {options?.map((opt) => (
          <option key={opt.name} value={opt.value}>
            {opt.name}
          </option>
        ))}
      </Select>
    </StyledFormControl>
  );
};
