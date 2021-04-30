import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { ProgressBarProps } from './IProgress';
import { ProgressBar } from './ProgressBar';

export default {
  title: 'ProgressBar',
  component: ProgressBar,
};

const resData = {
  action: 'SUCCESS',
  statusCode: 200,
  data: [
    {
      title: 'Width',
      info: [
        {
          label: 'Target Width',
          value: 0,
        },
        {
          label: 'Max Width',
          value: 427,
        },
        {
          label: 'Current Width',
          value: 0,
        },
      ],
    },
    {
      title: 'Freshness',
      info: [
        {
          label: 'Current Freshness',
          value: 0,
        },
        {
          label: 'Target Freshness',
          value: 55,
        },
      ],
    },
    {
      title: 'Sales',
      info: [
        {
          label: 'Sales WTD',
          value: 3,
        },
        {
          label: 'Sales Target WTD',
          value: 0,
        },
      ],
    },
  ],
};

const Template: Story<ProgressBarProps> = (args) => <ProgressBar {...args} />;

export const ProgressBarComponent = Template.bind({});
ProgressBarComponent.args = {
  ...resData,
};
