import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { ProductNamePrice } from './ProductNamePrice';
import { IProductNamePriceProps } from '../IProductNamePrice';
export default {
  title: 'Product Name Price',
  component: ProductNamePrice,
};

// const addToWishlist = () => {
//   console.log(12345);
// };

const Template: Story<IProductNamePriceProps> = (args) => (
  <ProductNamePrice {...args} />
);
export const CarouselComponent = Template.bind({});
// CarouselComponent.args = {
//   productName: 'Red Flip Flops With Backstrap',
//   selectedSku: {
//     productName: 'Multigrain Health Mix - Sathu Mavu  - 500 g',
//     skuId: 'HFC-3037588',
//     attrs: [
//       { name: 'Colour', value: 'Multi' },
//       { name: 'From Age', value: '6' },
//       { name: 'HBT', value: 'T2' },
//       { name: 'Season', value: 'All Season' },
//       { name: 'Size', value: '500 g' },
//       { name: 'Colour', value: 'Multi' },
//       { name: 'To Age', value: '60' },
//       { name: 'Year', value: '2020' },
//     ],
//     retailPrice: 665,
//     regularPrice: 665,
//     availableQuantity: 10,
//     saleType: 'PO',
//     deliveryMsg: '5-6 weeks',
//     rackStatus: 'Y',
//     gender: 'Unisex',
//     discount: 0,
//     isPresale: 1,
//     canWishList: 1,
//     maxDeliveryDays: 38,
//     highlightEDD: 1,
//     onSale: 0,
//     finalSale: 0,
//     fromAge: 6,
//     toAge: 60,
//     eddPrefix: 'Get it in ',
//     eddColor: '#ffcc33',
//     eddTextColor: '#333333',
//     isFastEdd: false,
//     isInternationalPreorder: true,
//     preorderAction: '/collections/preorder',
//     preorderInfo: 'Why the wait?',
//     merchType: 'Catalog',
//     deliveryMessage: { action: 'success', msg: '15 days return ', type: 1 },
//     attributes: {
//       colour: 'Multi',
//       'from age': '6',
//       hbt: 'T2',
//       season: 'All Season',
//       size: '500 g',
//       'to age': '60',
//       year: '2020',
//     },
//   },
//   addToWishlist: addToWishlist,
//   deleteFromWishlist: addToWishlist,
//   retailPrice: 665,
//   retailPriceMax: undefined,
//   regularPrice: 665,
//   discount: 0,
// };

export const CarouselWishlisted = Template.bind({});
// CarouselWishlisted.args = {
//   productName: 'Red Flip Flops With Backstrap',
//   selectedSku: {
//     productName: 'White Floral Applique Half Sleeve Top And Shorts Set',
//     skuId: 'YAH-3066826',
//     attrs: [
//       { name: 'Colour', value: 'White' },
//       { name: 'From Age', value: '12' },
//       { name: 'HBT', value: 'T1' },
//       { name: 'Season', value: 'All' },
//       { name: 'Size', value: '1-1.5 years' },
//       { name: 'Colour', value: 'White' },
//       { name: 'To Age', value: '18' },
//       { name: 'Year', value: '2020' },
//     ],
//     retailPrice: 665,
//     regularPrice: 665,
//     availableQuantity: 7,
//     saleType: 'PO',
//     deliveryMsg: '5-6 weeks',
//     rackStatus: 'Y',
//     gender: "Girl's",
//     discount: 0,
//     isPresale: 1,
//     canWishList: 0,
//     maxDeliveryDays: 38,
//     highlightEDD: 1,
//     onSale: 0,
//     finalSale: 0,
//     fromAge: 12,
//     toAge: 18,
//     eddPrefix: 'Get it in ',
//     eddColor: '#ffcc33',
//     eddTextColor: '#333333',
//     isFastEdd: false,
//     isInternationalPreorder: true,
//     preorderAction: '/collections/preorder',
//     preorderInfo: 'Why the wait?',
//     merchType: 'Catalog',
//     deliveryMessage: { action: 'success', msg: '15 days return ', type: 1 },
//     attributes: {
//       colour: 'White',
//       'from age': '12',
//       hbt: 'T1',
//       season: 'All',
//       size: '1-1.5 years',
//       'to age': '18',
//       year: '2020',
//     },
//   },
//   wishlistId: 12313,
//   addToWishlist: addToWishlist,
//   deleteFromWishlist: addToWishlist,
//   retailPrice: 665,
//   retailPriceMax: undefined,
//   regularPrice: 665,
//   discount: 0,
// };
