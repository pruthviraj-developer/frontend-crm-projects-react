import React, { FC } from 'react';
import { SelectBox } from './SelectBox';
import { SelectBoxProps } from './IselectBox';
export default {
  title: 'Select Box',
};

const SelectTestData: SelectBoxProps = {
  placeholder: 'Position',
  options: [
    { name: '1', value: '1' },
    { name: '2', value: '2' },
    { name: '3', value: '3' },
  ],
  selectedValue: 2,
};
export const SelectBoxComponent: FC = () => (
  <SelectBox {...SelectTestData}></SelectBox>
);
