import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import { AddToCart } from './AddToCart';
import { IAddToCartProps } from './IAddToCart';

export default {
  title: 'Add To Cart Button',
  component: AddToCart,
};

const Template: Story<IAddToCartProps> = (args) => <AddToCart {...args} />;
export const AddToCartComponentDisabled = Template.bind({});

AddToCartComponentDisabled.args = { disabled: true, show: true };
export const AddToCartComponentActive = Template.bind({});

AddToCartComponentActive.args = { disabled: false, show: true };
