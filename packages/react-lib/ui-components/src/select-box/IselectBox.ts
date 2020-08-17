import { FormControlProps } from '@material-ui/core';

type SelectBoxOption = Record<'name' | 'value', string>;
export interface SelectBoxProps extends FormControlProps {
  placeholder: string;
  options?: Array<SelectBoxOption>;
  selectedOption?: SelectBoxOption;
}
