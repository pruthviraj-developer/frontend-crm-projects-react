import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { DeliveryDetails } from './DeliveryDetails';
import { IDeliveryDetailsProps } from './IDeliveryDetails';

export default {
  title: 'Delivery Details test',
  component: DeliveryDetails,
};

const Template: Story<IDeliveryDetailsProps> = (args) => (
  <DeliveryDetails {...args} />
);
export const DetailsComponent = Template.bind({});

DetailsComponent.args = {};
