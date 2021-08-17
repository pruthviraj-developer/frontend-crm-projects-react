import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { ProductNamePrice } from './ProductNamePrice';
import { IProductNamePriceProps } from './IProductNamePrice';
export default {
  title: 'Product Name Price',
  component: ProductNamePrice,
};

const Template: Story<IProductNamePriceProps> = (args) => (
  <ProductNamePrice {...args} />
);
export const CarouselComponent = Template.bind({});

CarouselComponent.args = {};
