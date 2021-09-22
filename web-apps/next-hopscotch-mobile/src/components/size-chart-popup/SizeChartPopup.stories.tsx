import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import { SizeChartPopup } from './SizeChartPopup';
import { ISizeChartPopup } from './ISizeChartPopup';

export default {
  title: 'Size Chart',
  component: SizeChartPopup,
};

const Template: Story<ISizeChartPopup> = (args) => <SizeChartPopup {...args} />;
export const SizeChartPopupComponent = Template.bind({});

SizeChartPopupComponent.args = {};
