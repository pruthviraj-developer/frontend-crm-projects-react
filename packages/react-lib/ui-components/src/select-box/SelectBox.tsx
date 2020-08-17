import { FormControl, InputLabel, Select } from '@material-ui/core';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { SelectBoxProps } from './IselectBox';
import { Colors } from '@hs/utils';
const StyledFormControl = styled(FormControl)`
  min-width: 110;
`;

export const SelectBox = (props: SelectBoxProps) => {
  const [state, setState] = useState<{ value: SelectBoxProps['value'] }>({
    value: props.value,
  });
  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof state;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  return (
    <StyledFormControl
      variant={'outlined'}
      margin={'normal'}
      size={'small'}
      color={'primary'}
    >
      <InputLabel htmlFor="outlined-select">Position</InputLabel>
      <Select
        native
        value={state.value}
        onChange={handleChange}
        label="Position"
        inputProps={{
          id: 'outlined-select',
        }}
      >
        <option aria-label="None" value="" />
        <option value={10}>Ten</option>
        <option value={20}>Twenty</option>
        <option value={30}>Thirty</option>
      </Select>
    </StyledFormControl>
  );
};
