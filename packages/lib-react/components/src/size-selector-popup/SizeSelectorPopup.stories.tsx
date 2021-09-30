import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import { SizeSelectorPopup } from './SizeSelectorPopup';
import { ISizeSelectorPopupProps } from './ISizeSelectorPopup';

export default {
  title: 'Size Selector Popup',
  component: SizeSelectorPopup,
};

const onSizeChartClick = () => {
  console.log('Size chart');
};
const Template: Story<ISizeSelectorPopupProps> = (args) => (
  <SizeSelectorPopup {...args} />
);
export const DetailsComponent = Template.bind({});

DetailsComponent.args = {
  showRfypCue: true,
  selectedSku: {
    productName: 'Hello Applique Bow Formal Shirt and Pant Set 123',
    skuId: 'LTL-1989283',
    attributes: [
      {
        name: 'Bottom Closure',
        value: 'Elastic',
      },
      {
        name: 'Bottom Pattern',
        value: 'Solid',
      },
      {
        name: 'Bottom Print',
        value: 'Text',
      },
      {
        name: 'Character',
        value: 'Aquaman',
      },
      {
        name: 'Collar',
        value: 'Shirt',
      },
      {
        name: 'Colour',
        value: 'Red',
      },
      {
        name: 'HBT',
        value: 'H1',
      },
      {
        name: 'Occasion',
        value: 'Formal',
      },
      {
        name: 'Pattern',
        value: 'Lace',
      },
      {
        name: 'Season',
        value: 'Winter',
      },
      {
        name: 'Size',
        value: '6-12 months',
      },
      {
        name: 'Bottom Closure',
        value: 'Elastic',
      },
      {
        name: 'Sleeves',
        value: 'Full',
      },
      {
        name: 'Style',
        value: 'CHINO',
      },
      {
        name: 'Taste',
        value: 'Classic',
      },
      {
        name: 'Top Closure',
        value: 'Button',
      },
      {
        name: 'Top Length',
        value: 'Waist',
      },
      {
        name: 'Top Pattern',
        value: 'Solid',
      },
      {
        name: 'Top Print',
        value: 'Polka Dots',
      },
      {
        name: 'Top Style',
        value: 'Basic',
      },
      {
        name: 'Units per sets',
        value: '3',
      },
      {
        name: 'Weave',
        value: 'Knit',
      },
      {
        name: 'Year',
        value: '2018',
      },
    ],
    preorderAction: 'test',
    preorderInfo: 'test',
    shippingReturnInfoForSku: 'test',
    retailPrice: 799.0,
    regularPrice: 1049.0,
    availableQuantity: 10,
    saleType: 'PO',
    deliveryMsg: '4-5 days',
    rackStatus: 'Y',
    gender: "Boy's",
    discount: 24,
    isPresale: 0,
    canWishList: 1,
    maxDeliveryDays: 5,
    highlightEDD: 0,
    onSale: 1,
    finalSale: 0,
    fromAge: 6,
    toAge: 12,
    eddPrefix: 'Get it in ',
    eddColor: '#35b35d',
    eddTextColor: '#ffffff',
    isFastEdd: true,
    isInternationalPreorder: false,
    merchType: 'Catalog',
    deliveryMessage: {
      action: 'success',
      msg: '15 days return ',
      type: 1,
    },
  },
  simpleSkus: [
    {
      productName: 'Hello Applique Bow Formal Shirt and Pant Set 123',
      skuId: 'LTL-1989283',
      attributes: [
        {
          name: 'Bottom Closure',
          value: 'Elastic',
        },
        {
          name: 'Bottom Pattern',
          value: 'Solid',
        },
        {
          name: 'Bottom Print',
          value: 'Text',
        },
        {
          name: 'Character',
          value: 'Aquaman',
        },
        {
          name: 'Collar',
          value: 'Shirt',
        },
        {
          name: 'Colour',
          value: 'Red',
        },
        {
          name: 'HBT',
          value: 'H1',
        },
        {
          name: 'Occasion',
          value: 'Formal',
        },
        {
          name: 'Pattern',
          value: 'Lace',
        },
        {
          name: 'Season',
          value: 'Winter',
        },
        {
          name: 'Size',
          value: '6-12 months',
        },
        {
          name: 'Bottom Closure',
          value: 'Elastic',
        },
        {
          name: 'Sleeves',
          value: 'Full',
        },
        {
          name: 'Style',
          value: 'CHINO',
        },
        {
          name: 'Taste',
          value: 'Classic',
        },
        {
          name: 'Top Closure',
          value: 'Button',
        },
        {
          name: 'Top Length',
          value: 'Waist',
        },
        {
          name: 'Top Pattern',
          value: 'Solid',
        },
        {
          name: 'Top Print',
          value: 'Polka Dots',
        },
        {
          name: 'Top Style',
          value: 'Basic',
        },
        {
          name: 'Units per sets',
          value: '3',
        },
        {
          name: 'Weave',
          value: 'Knit',
        },
        {
          name: 'Year',
          value: '2018',
        },
      ],
      preorderAction: 'test',
      preorderInfo: 'test',
      shippingReturnInfoForSku: 'test',
      retailPrice: 799.0,
      regularPrice: 1049.0,
      availableQuantity: 10,
      saleType: 'PO',
      deliveryMsg: '4-5 days',
      rackStatus: 'Y',
      gender: "Boy's",
      discount: 24,
      isPresale: 0,
      canWishList: 1,
      maxDeliveryDays: 5,
      highlightEDD: 0,
      onSale: 1,
      finalSale: 0,
      fromAge: 6,
      toAge: 12,
      eddPrefix: 'Get it in ',
      eddColor: '#35b35d',
      eddTextColor: '#ffffff',
      isFastEdd: true,
      isInternationalPreorder: false,
      merchType: 'Catalog',
      deliveryMessage: {
        action: 'success',
        msg: '15 days return ',
        type: 1,
      },
    },
    {
      productName: 'Hello Applique Bow Formal Shirt and Pant Set 123',
      skuId: 'LTL-1989284',
      attributes: [
        {
          name: 'Bottom Closure',
          value: 'Elastic',
        },
        {
          name: 'Bottom Pattern',
          value: 'Solid',
        },
        {
          name: 'Bottom Print',
          value: 'Text',
        },
        {
          name: 'Character',
          value: 'Aquaman',
        },
        {
          name: 'Collar',
          value: 'Shirt',
        },
        {
          name: 'Colour',
          value: 'Red',
        },
        {
          name: 'HBT',
          value: 'H1',
        },
        {
          name: 'Occasion',
          value: 'Formal',
        },
        {
          name: 'Pattern',
          value: 'Lace',
        },
        {
          name: 'Season',
          value: 'Winter',
        },
        {
          name: 'Size',
          value: '1-2 years',
        },
        {
          name: 'Bottom Closure',
          value: 'Elastic',
        },
        {
          name: 'Sleeves',
          value: 'Full',
        },
        {
          name: 'Style',
          value: 'CHINO',
        },
        {
          name: 'Taste',
          value: 'Classic',
        },
        {
          name: 'Top Closure',
          value: 'Button',
        },
        {
          name: 'Top Length',
          value: 'Waist',
        },
        {
          name: 'Top Pattern',
          value: 'Solid',
        },
        {
          name: 'Top Print',
          value: 'Polka Dots',
        },
        {
          name: 'Top Style',
          value: 'Basic',
        },
        {
          name: 'Units per sets',
          value: '3',
        },
        {
          name: 'Weave',
          value: 'Knit',
        },
        {
          name: 'Year',
          value: '2018',
        },
      ],
      preorderAction: 'test',
      preorderInfo: 'test',
      shippingReturnInfoForSku: 'test',
      retailPrice: 799.0,
      regularPrice: 1049.0,
      availableQuantity: 1,
      saleType: 'PO',
      deliveryMsg: '4-5 days',
      rackStatus: 'Y',
      gender: "Boy's",
      discount: 24,
      isPresale: 0,
      canWishList: 1,
      maxDeliveryDays: 5,
      highlightEDD: 0,
      onSale: 1,
      finalSale: 0,
      fromAge: 12,
      toAge: 24,
      eddPrefix: 'Get it in ',
      eddColor: '#35b35d',
      eddTextColor: '#ffffff',
      isFastEdd: true,
      isInternationalPreorder: false,
      merchType: 'Catalog',
      deliveryMessage: {
        action: 'success',
        msg: '15 days return ',
        type: 1,
      },
    },
    {
      productName: 'Hello Applique Bow Formal Shirt and Pant Set 123',
      skuId: 'LTL-1989285',
      attributes: [
        {
          name: 'Bottom Closure',
          value: 'Elastic',
        },
        {
          name: 'Bottom Pattern',
          value: 'Solid',
        },
        {
          name: 'Bottom Print',
          value: 'Text',
        },
        {
          name: 'Character',
          value: 'Aquaman',
        },
        {
          name: 'Collar',
          value: 'Shirt',
        },
        {
          name: 'Colour',
          value: 'Red',
        },
        {
          name: 'HBT',
          value: 'H1',
        },
        {
          name: 'Occasion',
          value: 'Formal',
        },
        {
          name: 'Pattern',
          value: 'Lace',
        },
        {
          name: 'Season',
          value: 'Winter',
        },
        {
          name: 'Size',
          value: '2-3 years',
        },
        {
          name: 'Bottom Closure',
          value: 'Elastic',
        },
        {
          name: 'Sleeves',
          value: 'Full',
        },
        {
          name: 'Style',
          value: 'CHINO',
        },
        {
          name: 'Taste',
          value: 'Classic',
        },
        {
          name: 'Top Closure',
          value: 'Button',
        },
        {
          name: 'Top Length',
          value: 'Waist',
        },
        {
          name: 'Top Pattern',
          value: 'Solid',
        },
        {
          name: 'Top Print',
          value: 'Polka Dots',
        },
        {
          name: 'Top Style',
          value: 'Basic',
        },
        {
          name: 'Units per sets',
          value: '3',
        },
        {
          name: 'Weave',
          value: 'Knit',
        },
        {
          name: 'Year',
          value: '2018',
        },
      ],
      preorderAction: 'test',
      preorderInfo: 'test',
      shippingReturnInfoForSku: 'test',
      retailPrice: 799.0,
      regularPrice: 1049.0,
      availableQuantity: 10,
      saleType: 'PO',
      deliveryMsg: '4-5 days',
      rackStatus: 'Y',
      gender: "Boy's",
      discount: 24,
      isPresale: 0,
      canWishList: 1,
      maxDeliveryDays: 5,
      highlightEDD: 0,
      onSale: 1,
      finalSale: 0,
      fromAge: 24,
      toAge: 36,
      eddPrefix: 'Get it in ',
      eddColor: '#35b35d',
      eddTextColor: '#ffffff',
      isFastEdd: true,
      isInternationalPreorder: false,
      merchType: 'Catalog',
      deliveryMessage: {
        action: 'success',
        msg: '15 days return ',
        type: 1,
      },
    },
    {
      productName: 'Hello Applique Bow Formal Shirt and Pant Set 123',
      skuId: 'LTL-1989286',
      attributes: [
        {
          name: 'Bottom Closure',
          value: 'Elastic',
        },
        {
          name: 'Bottom Pattern',
          value: 'Solid',
        },
        {
          name: 'Bottom Print',
          value: 'Text',
        },
        {
          name: 'Character',
          value: 'Aquaman',
        },
        {
          name: 'Collar',
          value: 'Shirt',
        },
        {
          name: 'Colour',
          value: 'Red',
        },
        {
          name: 'HBT',
          value: 'H1',
        },
        {
          name: 'Occasion',
          value: 'Formal',
        },
        {
          name: 'Pattern',
          value: 'Lace',
        },
        {
          name: 'Season',
          value: 'Winter',
        },
        {
          name: 'Size',
          value: '3-4 years',
        },
        {
          name: 'Bottom Closure',
          value: 'Elastic',
        },
        {
          name: 'Sleeves',
          value: 'Full',
        },
        {
          name: 'Style',
          value: 'CHINO',
        },
        {
          name: 'Taste',
          value: 'Classic',
        },
        {
          name: 'Top Closure',
          value: 'Button',
        },
        {
          name: 'Top Length',
          value: 'Waist',
        },
        {
          name: 'Top Pattern',
          value: 'Solid',
        },
        {
          name: 'Top Print',
          value: 'Polka Dots',
        },
        {
          name: 'Top Style',
          value: 'Basic',
        },
        {
          name: 'Units per sets',
          value: '3',
        },
        {
          name: 'Weave',
          value: 'Knit',
        },
        {
          name: 'Year',
          value: '2018',
        },
      ],
      retailPrice: 799.0,
      regularPrice: 1049.0,
      availableQuantity: 0,
      preorderAction: 'test',
      preorderInfo: 'test',
      shippingReturnInfoForSku: 'test',
      saleType: 'PO',
      deliveryMsg: '4-5 days',
      rackStatus: 'Y',
      gender: "Boy's",
      discount: 24,
      isPresale: 0,
      canWishList: 1,
      maxDeliveryDays: 5,
      highlightEDD: 0,
      onSale: 1,
      finalSale: 0,
      fromAge: 36,
      toAge: 48,
      eddPrefix: 'Get it in ',
      eddColor: '#35b35d',
      eddTextColor: '#ffffff',
      isFastEdd: true,
      isInternationalPreorder: false,
      merchType: 'Catalog',
      deliveryMessage: {
        action: 'success',
        msg: '15 days return ',
        type: 1,
      },
    },
  ],
  onSizeChartClick,
};
