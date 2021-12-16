import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import { AddToCartDesktop } from './AddToCartDesktop';
import { IAddToCartProps } from '../IAddToCart';

export default {
  title: 'Add To Cart Button',
  component: AddToCartDesktop,
};

const Template: Story<IAddToCartProps> = (args) => (
  <AddToCartDesktop {...args} />
);
export const AddToCartComponentDisabled = Template.bind({});

AddToCartComponentDisabled.args = { disabled: true, show: true };
export const AddToCartComponentActive = Template.bind({});

AddToCartComponentActive.args = { disabled: false, show: true };
