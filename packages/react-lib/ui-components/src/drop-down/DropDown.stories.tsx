import React, { FC } from 'react';
import DropDown from './DropDown';

export default {
  title: 'Drop  Down',
};
let datastr = 'Test 13';
let data: Record<string, unknown> = { name: 'Test 2', value: 2 };
const onClickS = (value: string) => {
  datastr = value;
};

const onClick = (value: Record<string, unknown>) => {
  data = value;
};

const props = {
  showList: false,
  isMultiselect: false,
  selectedObject: datastr,
  selectedObjects: [{}],
  onSingleSelect: onClickS,
  //   onMultiSelect: onClick,
  options: ['Test 1', 'Test 12', 'Test 13', 'Test 14', 'Test 5'],
  disabled: false,
  placeholder: 'Select from the list:',
};

const propsobj = {
  showList: false,
  isMultiselect: false,
  selectedObject: data,
  selectedObjects: [{}],
  onSingleSelect: onClick,
  //   onMultiSelect: onClick,
  options: [
    { name: 'Test 1', value: 1 },
    { name: 'Test 2', value: 2 },
    { name: 'Test 3', value: 3 },
    { name: 'Test 4', value: 4 },
    { name: 'Test 5', value: 5 },
    { name: 'Test 6', value: 6 },
  ],
  disabled: false,
  placeholder: 'Select from the list:',
  objName: 'name',
  objKey: 'value',
};
export const DropDownAsString: FC = () => <DropDown {...props} />;
export const DropDownAsList: FC = () => <DropDown {...propsobj} />;
