import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import { CustomSizePicker } from './CustomSizePicker';
import { ICustomSizePicker } from './ICustomSizePicker';

export default {
  title: 'Custom Size Picker',
  component: CustomSizePicker,
};

const Template: Story<ICustomSizePicker> = (args) => (
  <CustomSizePicker {...args} />
);
export const CustomSizePickerComponent = Template.bind({});

CustomSizePickerComponent.args = {};
