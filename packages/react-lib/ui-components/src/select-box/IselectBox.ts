import { FormControlProps } from '@material-ui/core';

type SelectBoxOption = Record<'display' | 'value', string | number>;
export interface SelectBoxProps extends FormControlProps {
  placeholder: string;
  options?: Array<SelectBoxOption>;
  selectedValue?: SelectBoxOption['value'];
  onChange?: (value: unknown) => void;
}
