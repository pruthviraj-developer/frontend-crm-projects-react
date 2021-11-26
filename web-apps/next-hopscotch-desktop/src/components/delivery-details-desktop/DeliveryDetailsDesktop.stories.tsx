import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { DeliveryDetailsDesktop } from './DeliveryDetailsDesktop';
import { IDeliveryDetailsProps } from './IDeliveryDetailsDesktop';

export default {
  title: 'Delivery Details desktop',
  component: DeliveryDetailsDesktop,
};

const Template: Story<IDeliveryDetailsProps> = (args) => <DeliveryDetailsDesktop {...args} />;
export const DetailsComponent = Template.bind({});

DetailsComponent.args = {};
