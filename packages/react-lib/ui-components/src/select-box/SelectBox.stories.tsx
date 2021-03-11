import React, { FC } from 'react';
import { SelectBox } from './SelectBox';
import { SelectBoxProps } from './IselectBox';
import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react/types-6-0';
export default {
  title: 'Select Box',
  component: SelectBox,
};

const SelectTestData: SelectBoxProps = {
  placeholder: 'Position',
  options: [
    { display: '1', value: '1' },
    { display: '2', value: '2' },
    { display: '3', value: '3' },
  ],
  selectedValue: 2,
};
// export const SelectBoxComponent: FC = () => (
//   <SelectBox {...SelectTestData} onChange={action('on-formChange')}></SelectBox>
// );

const Template: Story<SelectBoxProps> = (args) => (
  <SelectBox onChange={action('on-formChange')} {...args} />
);
export const SelectBoxComponent = Template.bind({});
SelectBoxComponent.args = SelectTestData;
