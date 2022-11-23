import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import { Discount } from './Discount';

export default {
  title: 'Offers Discount',
  component: Discount,
};

const message = {
  messageType: 'OFFER_PLP_MESSAGE',
  message:
    'All Apparels & Footwear : Get An Extra 5% Off On  No Minimum Purchase',
  messageUIType: 'MESSAGE_BAR',
  messageDisplayTime: 'IMMEDIATE',
};

const Template: Story = () => <Discount {...message} />;
export const DiscountLabel = Template.bind({});

DiscountLabel.args = {};
