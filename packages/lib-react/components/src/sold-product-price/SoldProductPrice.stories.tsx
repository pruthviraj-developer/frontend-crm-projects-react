import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { SoldProductPrice } from './SoldProductPrice';
import { ISoldProductPriceProps } from './ISoldProductPrice';
export default {
  title: 'Sold Product Price',
  component: SoldProductPrice,
};

const Template: Story<ISoldProductPriceProps> = (args) => (
  <SoldProductPrice {...args} />
);
export const SoldProductPriceComponent = Template.bind({});

SoldProductPriceComponent.args = {};
