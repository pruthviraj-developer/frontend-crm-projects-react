import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { ProductInfoMobile } from './ProductInfo';
import { IProductInfoProps } from '../IProductInfo';

export default {
  title: 'Product Info Mobile',
  component: ProductInfoMobile,
};

const Template: Story<IProductInfoProps> = (args) => (
  <ProductInfoMobile {...args} />
);
export const ProductInfoMobileComponent = Template.bind({});

ProductInfoMobileComponent.args = {
  productName: 'Lovely Pink Bow Applique Knee Length Dress',
  isProductSoldOut: true,
  retailPrice: 1048,
  retailPriceMax: 1509,
  regularPrice: 2229,
  discount: 53,
};

export const OfferComponent = Template.bind({});

OfferComponent.args = {
  productName: 'White Waistcoat With Shirt,And Pant Set',
  isProductSoldOut: false,
  retailPrice: 1799,
  regularPrice: 3999,
  discount: 0,
};

export const DiscountComponent = Template.bind({});

DiscountComponent.args = {
  productName: 'Girls Brown Sleeveless Blouse And Short Set',
  isProductSoldOut: false,
  retailPrice: 936,
  regularPrice: 999,
  discount: 55,
};

export const OnlyComponent = Template.bind({});

OnlyComponent.args = {
  productName: 'Girls Brown Sleeveless Blouse And Short Set',
  isProductSoldOut: false,
  retailPrice: 1599,
  regularPrice: 1599,
  discount: 0,
};
