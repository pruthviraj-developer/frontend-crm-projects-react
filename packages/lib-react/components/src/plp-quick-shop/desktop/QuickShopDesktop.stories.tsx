import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { QuickShopDesktop } from './QuickShopDesktop';
import { IQuickShopProps } from '../IQuickShop';
import { QuickShopStaticData } from './QuickShopData';

export default {
  title: 'Quick shop plp',
  component: QuickShopDesktop,
};

const Template: Story<IQuickShopProps> = (args) => (
  <QuickShopDesktop {...args} />
);
export const QuikShop = Template.bind({});

QuikShop.args = QuickShopStaticData;
