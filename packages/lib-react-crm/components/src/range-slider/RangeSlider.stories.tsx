import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { RangeSlider } from './RangeSlider';
import { action } from '@storybook/addon-actions';

export default {
  title: 'RangeSlider',
  component: RangeSlider,
};

const Template: Story<any> = (args) => <RangeSlider {...args} />;
export const RangeSliderComponent = Template.bind({});

const data = {
  min: 0,
  max: 100,
  value: [0, 10],
  updateRange: (value) => action('file-upload')(value),
};
RangeSliderComponent.args = data;
