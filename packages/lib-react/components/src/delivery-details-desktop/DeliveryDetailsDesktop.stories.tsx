import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { DeliveryDetailsDesktop } from './DeliveryDetailsDesktop';
import { IDeliveryDetailsDesktopProps } from './IDeliveryDetailsDesktop';

export default {
  title: 'Delivery Details desktop',
  component: DeliveryDetailsDesktop,
};

const Template: Story<IDeliveryDetailsDesktopProps> = (args) => (
  <DeliveryDetailsDesktop {...args} />
);
export const DetailsComponent = Template.bind({});

DetailsComponent.args = {
  deliveryMessages: [
    { action: 'success', msg: 'Cash on delivery available.', type: 1 },
    { action: 'success', msg: '15 days return ', type: 1 },
    { action: 'success', msg: '15 days exchange ', type: 1 },
  ],
  eddColor: '#35b35d',
  eddTextColor: '#ffffff',
  eddPrefix: 'Get it in ',
  deliveryMsg: '1-2 weeks',
  isEddDifferentForSKUs: true,
  showInternationaPreorder: false,
};
