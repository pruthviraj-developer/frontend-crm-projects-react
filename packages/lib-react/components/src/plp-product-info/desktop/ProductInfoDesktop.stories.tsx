import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { IProductInfoProps } from '../IProductInfo';
import { ProductInfoDesktop } from './ProductInfoDesktop';
import { QuickShopStaticData } from '../../plp-quick-shop/desktop/QuickShopData';

export default {
  title: 'Product Info Desktop',
  component: ProductInfoDesktop,
};

const Template: Story<IProductInfoProps> = (args) => (
  <ProductInfoDesktop {...args} />
);
export const ProductInfoDesktopComponent = Template.bind({});

ProductInfoDesktopComponent.args = {
  productName: 'Lovely Pink Bow Applique Knee Length Dress',
  onSizeSelect: () => {
    // console.log('on size select clicked');
  },
  isProductSoldOut: true,
  retailPrice: 1048,
  retailPriceMax: 1509,
  regularPrice: 2229,
  discount: 53,
  ...QuickShopStaticData,
  imageUrl:
    'https://qastatic.hopscotch.in/fstatic/product/202007/e7d32d4c-f9a7-483a-b33c-bd1240b74bd9_large.jpg?version=1595062462545&tr=w-1080,c-at_max,n-medium',
  wishlistId: 0,
  name: 'Green Bow Applique Skirt Set',
  quantity: 18,
  isPresale: 1,
  isTile: 0,
  hasSizeChart: true,
};
