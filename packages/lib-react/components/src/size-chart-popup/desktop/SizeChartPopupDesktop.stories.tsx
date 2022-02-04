import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import { SizeChartPopupDesktop } from './SizeChartPopupDesktop';
import { ISizeChartPopupDesktop } from './ISizeChartPopupDesktop';

export default {
  title: 'Size Chart Desktop',
  component: SizeChartPopupDesktop,
};

const Template: Story<ISizeChartPopupDesktop> = (args) => (
  <SizeChartPopupDesktop {...args} />
);
export const SizeChartPopupComponent = Template.bind({});

SizeChartPopupComponent.args = {};
