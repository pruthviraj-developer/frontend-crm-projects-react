import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { ProductNamePrice } from './ProductNamePrice';
import { IProductNamePriceProps } from './IProductNamePrice';
export default {
  title: 'Product Name Price',
  component: ProductNamePrice,
};

const addToWishlist = () => {
  console.log(12345);
};

const Template: Story<IProductNamePriceProps> = (args) => (
  <ProductNamePrice {...args} />
);
export const CarouselComponent = Template.bind({});
CarouselComponent.args = {
  name: 'Red Flip Flops With Backstrap',
  retailPrice: 500,
  retailPriceMax: 523,
  selectedSku: 'PCT2843',
  regularPrice: 98,
  discount: 20,
  addToWishlist: addToWishlist,
  deleteFromWishlist: addToWishlist,
};

export const CarouselWishlisted = Template.bind({});
CarouselWishlisted.args = {
  name: 'Red Flip Flops With Backstrap',
  retailPrice: 500,
  retailPriceMax: 523,
  selectedSku: 'PCT2843',
  regularPrice: 98,
  discount: 20,
  wishlistId: 12313,
  addToWishlist: addToWishlist,
  deleteFromWishlist: addToWishlist,
};
