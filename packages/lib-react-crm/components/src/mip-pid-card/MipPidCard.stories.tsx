import React from 'react';
import { MipPidCard } from './MipPidCard';
import { Story } from '@storybook/react/types-6-0';
import { MipPidCardProps } from './IMipPidCard';

export default {
  title: 'MIP PId Card',
  component: MipPidCard,
};

const sampleProductData = {
  imageUrl:
    'https:///static.hopscotch.in/fstatic/product/201802/b1c48ecd-4ca9-4431-9149-2c6a433089d0_full.jpg?version=1517739931850',
  productId: 203156,
  status: 'keep',
  pidData: [
    ['ASV', '10'],
    ['Views', '10'],
    ['Impression', '20'],
    ['CTR', '20'],
    ['Conversion', '30'],
    ['ASV', '10'],
    ['Views', '10'],
    ['Impression', '20'],
    ['CTR', '20'],
    ['Conversion', '30'],
    ['ASV', '10'],
    ['Views', '10'],
    ['Impression', '20'],
    ['CTR', '20'],
    ['Conversion', '30'],
  ],
  discoveryDecision: 'Catalog',
  catalog: false,
};

const Template: Story<MipPidCardProps> = (args) => {
  return <MipPidCard {...args} />;
};

export const MipPidCardComponent = Template.bind({});
MipPidCardComponent.args = {
  ...sampleProductData,
};
