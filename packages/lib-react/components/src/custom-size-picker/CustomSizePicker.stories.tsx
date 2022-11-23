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

CustomSizePickerComponent.args = {
  simpleSkus: [
    {
      productName: 'Lovely Pink Bow Applique Knee Length Dress',
      skuId: 'SRS-2030599',
      attrs: [
        {
          name: 'Closure',
          value: 'Tie,Zipper',
        },
        {
          name: 'Colour',
          value: 'Pink',
        },
        {
          name: 'HBT',
          value: 'H2',
        },
        {
          name: 'Hem Length',
          value: 'Knee',
        },
        {
          name: 'Neckline',
          value: 'Round',
        },
        {
          name: 'Occasion',
          value: 'Party',
        },
        {
          name: 'Pattern',
          value: 'Solid',
        },
        {
          name: 'Print',
          value: 'Applique',
        },
        {
          name: 'Season',
          value: 'All',
        },
        {
          name: 'Size',
          value: '2-3 years',
        },
        {
          name: 'Closure',
          value: 'Tie,Zipper',
        },
        {
          name: 'Sleeve Length',
          value: 'Sleeveless',
        },
        {
          name: 'Sleeves',
          value: 'Sleeveless',
        },
        {
          name: 'Taste',
          value: 'Trendy',
        },
        {
          name: 'Year',
          value: '2018',
        },
      ],
      retailPrice: 1569,
      regularPrice: 2229,
      availableQuantity: 2,
      saleType: 'PO',
      deliveryMsg: '4-5 weeks',
      rackStatus: 'Y',
      gender: "Girl's",
      discount: 30,
      isPresale: 0,
      canWishList: 0,
      maxDeliveryDays: 31,
      highlightEDD: 0,
      onSale: 0,
      finalSale: 0,
      fromAge: 24,
      toAge: 36,
      eddPrefix: 'Get it in ',
      eddColor: '#ffcc33',
      eddTextColor: '#333333',
      isFastEdd: false,
      isInternationalPreorder: false,
      merchType: 'Catalog',
      deliveryMessage: {
        action: 'success',
        msg: '15 days return ',
        type: 1,
      },
      attributes: {
        closure: 'Tie,Zipper',
        colour: 'Pink',
        hbt: 'H2',
        neckline: 'Round',
        occasion: 'Party',
        print: 'Applique',
        season: 'All',
        size: '2-3 years',
        sleeves: 'Sleeveless',
        taste: 'Trendy',
        year: '2018',
      },
      preorderAction: 'test',
      preorderInfo: 'test',
    },
    {
      productName: 'Lovely Pink Bow Applique Knee Length Dress',
      skuId: 'SRS-2030600',
      attrs: [
        {
          name: 'Closure',
          value: 'Tie,Zipper',
        },
        {
          name: 'Colour',
          value: 'Pink',
        },
        {
          name: 'HBT',
          value: 'H2',
        },
        {
          name: 'Hem Length',
          value: 'Knee',
        },
        {
          name: 'Neckline',
          value: 'Round',
        },
        {
          name: 'Occasion',
          value: 'Party',
        },
        {
          name: 'Pattern',
          value: 'Solid',
        },
        {
          name: 'Print',
          value: 'Applique',
        },
        {
          name: 'Season',
          value: 'All',
        },
        {
          name: 'Size',
          value: '3-4 years',
        },
        {
          name: 'Closure',
          value: 'Tie,Zipper',
        },
        {
          name: 'Sleeve Length',
          value: 'Sleeveless',
        },
        {
          name: 'Sleeves',
          value: 'Sleeveless',
        },
        {
          name: 'Taste',
          value: 'Trendy',
        },
        {
          name: 'Year',
          value: '2018',
        },
      ],
      retailPrice: 1569,
      regularPrice: 2229,
      availableQuantity: 10,
      saleType: 'PO',
      deliveryMsg: '4-5 weeks',
      rackStatus: 'Y',
      gender: "Girl's",
      discount: 30,
      isPresale: 0,
      canWishList: 0,
      maxDeliveryDays: 31,
      highlightEDD: 0,
      onSale: 0,
      finalSale: 0,
      fromAge: 36,
      toAge: 48,
      eddPrefix: 'Get it in ',
      eddColor: '#ffcc33',
      eddTextColor: '#333333',
      isFastEdd: false,
      isInternationalPreorder: false,
      merchType: 'Catalog',
      deliveryMessage: {
        action: 'success',
        msg: '15 days return ',
        type: 1,
      },
      attributes: {
        closure: 'Tie,Zipper',
        colour: 'Pink',
        hbt: 'H2',
        neckline: 'Round',
        occasion: 'Party',
        print: 'Applique',
        season: 'All',
        size: '3-4 years',
        sleeves: 'Sleeveless',
        taste: 'Trendy',
        year: '2018',
      },
      preorderAction: 'test',
      preorderInfo: 'test',
    },
    {
      productName: 'Lovely Pink Bow Applique Knee Length Dress',
      skuId: 'SRS-2030596',
      attrs: [
        {
          name: 'Closure',
          value: 'Tie,Zipper',
        },
        {
          name: 'Colour',
          value: 'Pink',
        },
        {
          name: 'HBT',
          value: 'H2',
        },
        {
          name: 'Hem Length',
          value: 'Knee',
        },
        {
          name: 'Neckline',
          value: 'Round',
        },
        {
          name: 'Occasion',
          value: 'Party',
        },
        {
          name: 'Pattern',
          value: 'Solid',
        },
        {
          name: 'Print',
          value: 'Applique',
        },
        {
          name: 'Season',
          value: 'All',
        },
        {
          name: 'Size',
          value: '3-6 months',
        },
        {
          name: 'Closure',
          value: 'Tie,Zipper',
        },
        {
          name: 'Sleeve Length',
          value: 'Sleeveless',
        },
        {
          name: 'Sleeves',
          value: 'Sleeveless',
        },
        {
          name: 'Taste',
          value: 'Trendy',
        },
        {
          name: 'Year',
          value: '2018',
        },
      ],
      retailPrice: 1569,
      regularPrice: 2229,
      availableQuantity: 0,
      saleType: 'PO',
      deliveryMsg: '4-5 weeks',
      rackStatus: 'Y',
      gender: "Girl's",
      discount: 30,
      isPresale: 0,
      canWishList: 0,
      maxDeliveryDays: 31,
      highlightEDD: 0,
      onSale: 0,
      finalSale: 0,
      fromAge: 3,
      toAge: 6,
      eddPrefix: 'Get it in ',
      eddColor: '#ffcc33',
      eddTextColor: '#333333',
      isFastEdd: false,
      isInternationalPreorder: false,
      merchType: 'Catalog',
      deliveryMessage: {
        action: 'success',
        msg: '15 days return ',
        type: 1,
      },
      attributes: {
        closure: 'Tie,Zipper',
        colour: 'Pink',
        hbt: 'H2',
        neckline: 'Round',
        occasion: 'Party',
        print: 'Applique',
        season: 'All',
        size: '3-6 months',
        sleeves: 'Sleeveless',
        taste: 'Trendy',
        year: '2018',
      },
      preorderAction: 'test',
      preorderInfo: 'test',
    },
    {
      productName: 'Lovely Pink Bow Applique Knee Length Dress',
      skuId: 'SRS-2030598',
      attrs: [
        {
          name: 'Closure',
          value: 'Tie,Zipper',
        },
        {
          name: 'Colour',
          value: 'Pink',
        },
        {
          name: 'HBT',
          value: 'H2',
        },
        {
          name: 'Hem Length',
          value: 'Knee',
        },
        {
          name: 'Neckline',
          value: 'Round',
        },
        {
          name: 'Occasion',
          value: 'Party',
        },
        {
          name: 'Pattern',
          value: 'Solid',
        },
        {
          name: 'Print',
          value: 'Applique',
        },
        {
          name: 'Season',
          value: 'All',
        },
        {
          name: 'Size',
          value: '1-2 years',
        },
        {
          name: 'Closure',
          value: 'Tie,Zipper',
        },
        {
          name: 'Sleeve Length',
          value: 'Sleeveless',
        },
        {
          name: 'Sleeves',
          value: 'Sleeveless',
        },
        {
          name: 'Taste',
          value: 'Trendy',
        },
        {
          name: 'Year',
          value: '2018',
        },
      ],
      retailPrice: 1569,
      regularPrice: 2229,
      availableQuantity: 0,
      saleType: 'PO',
      deliveryMsg: '5-6 weeks',
      rackStatus: 'Y',
      gender: "Girl's",
      discount: 30,
      isPresale: 1,
      canWishList: 0,
      maxDeliveryDays: 39,
      highlightEDD: 0,
      onSale: 0,
      finalSale: 0,
      fromAge: 12,
      toAge: 24,
      eddPrefix: 'Get it in ',
      eddColor: '#ffcc33',
      eddTextColor: '#333333',
      isFastEdd: false,
      isInternationalPreorder: true,
      preorderAction: '/collections/preorder',
      preorderInfo: 'Why the wait?',
      merchType: 'Catalog',
      deliveryMessage: {
        action: 'success',
        msg: '15 days return ',
        type: 1,
      },
      attributes: {
        closure: 'Tie,Zipper',
        colour: 'Pink',
        hbt: 'H2',

        neckline: 'Round',
        occasion: 'Party',

        print: 'Applique',
        season: 'All',
        size: '1-2 years',

        sleeves: 'Sleeveless',
        taste: 'Trendy',
        year: '2018',
      },
    },
    {
      productName: 'Lovely Pink Bow Applique Knee Length Dress',
      skuId: 'SRS-2664400',
      attrs: [
        {
          name: 'Closure',
          value: 'Tie,Zipper',
        },
        {
          name: 'Colour',
          value: 'Pink',
        },
        {
          name: 'HBT',
          value: 'H2',
        },
        {
          name: 'Hem Length',
          value: 'Knee',
        },
        {
          name: 'Neckline',
          value: 'Round',
        },
        {
          name: 'Occasion',
          value: 'Party',
        },
        {
          name: 'Pattern',
          value: 'Solid',
        },
        {
          name: 'Print',
          value: 'Applique',
        },
        {
          name: 'Season',
          value: 'All',
        },
        {
          name: 'Size',
          value: '4-5 years',
        },
        {
          name: 'Closure',
          value: 'Tie,Zipper',
        },
        {
          name: 'Sleeve Length',
          value: 'Sleeveless',
        },
        {
          name: 'Sleeves',
          value: 'Sleeveless',
        },
        {
          name: 'Taste',
          value: 'Trendy',
        },
        {
          name: 'Year',
          value: '2018',
        },
      ],
      retailPrice: 1658,
      regularPrice: 2149,
      availableQuantity: 0,
      deliveryMsg: '4-5 weeks',
      rackStatus: 'Y',
      gender: "Girl's",
      discount: 23,
      isPresale: 0,
      canWishList: 0,
      maxDeliveryDays: 31,
      highlightEDD: 0,
      onSale: 0,
      finalSale: 0,
      fromAge: 48,
      toAge: 60,
      eddPrefix: 'Get it in ',
      eddColor: '#ffcc33',
      eddTextColor: '#333333',
      isFastEdd: false,
      isInternationalPreorder: false,
      merchType: 'Catalog',
      deliveryMessage: {
        action: 'success',
        msg: '15 days return ',
        type: 1,
      },
      attributes: {
        closure: 'Tie,Zipper',
        colour: 'Pink',
        hbt: 'H2',

        neckline: 'Round',
        occasion: 'Party',

        print: 'Applique',
        season: 'All',
        size: '4-5 years',

        sleeves: 'Sleeveless',
        taste: 'Trendy',
        year: '2018',
      },
      preorderAction: 'test',
      preorderInfo: 'test',
      saleType: 'PO',
    },
  ],
  selectedSku: {
    productName: 'Lovely Pink Bow Applique Knee Length Dress',
    skuId: 'SRS-2030597',
    attrs: [
      {
        name: 'Closure',
        value: 'Tie,Zipper',
      },
      {
        name: 'Colour',
        value: 'Pink',
      },
      {
        name: 'HBT',
        value: 'H2',
      },
      {
        name: 'Hem Length',
        value: 'Knee',
      },
      {
        name: 'Neckline',
        value: 'Round',
      },
      {
        name: 'Occasion',
        value: 'Party',
      },
      {
        name: 'Pattern',
        value: 'Solid',
      },
      {
        name: 'Print',
        value: 'Applique',
      },
      {
        name: 'Season',
        value: 'All',
      },
      {
        name: 'Size',
        value: '6-12 months',
      },
      {
        name: 'Closure',
        value: 'Tie,Zipper',
      },
      {
        name: 'Sleeve Length',
        value: 'Sleeveless',
      },
      {
        name: 'Sleeves',
        value: 'Sleeveless',
      },
      {
        name: 'Taste',
        value: 'Trendy',
      },
      {
        name: 'Year',
        value: '2018',
      },
    ],
    retailPrice: 1569,
    regularPrice: 2229,
    availableQuantity: 10,
    saleType: 'PO',
    deliveryMsg: '4-5 weeks',
    rackStatus: 'Y',
    gender: "Girl's",
    discount: 30,
    isPresale: 0,
    canWishList: 0,
    maxDeliveryDays: 31,
    highlightEDD: 0,
    onSale: 0,
    finalSale: 0,
    fromAge: 6,
    toAge: 12,
    eddPrefix: 'Get it in ',
    eddColor: '#ffcc33',
    eddTextColor: '#333333',
    isFastEdd: false,
    isInternationalPreorder: false,
    merchType: 'Catalog',
    deliveryMessage: {
      action: 'success',
      msg: '15 days return ',
      type: 1,
    },
    attributes: {
      closure: 'Tie,Zipper',
      colour: 'Pink',
      hbt: 'H2',
      neckline: 'Round',
      occasion: 'Party',
      print: 'Applique',
      season: 'All',
      size: '6-12 months',
      sleeves: 'Sleeveless',
      taste: 'Trendy',
      year: '2018',
    },
    preorderAction: 'test',
    preorderInfo: 'test',
  },
};
