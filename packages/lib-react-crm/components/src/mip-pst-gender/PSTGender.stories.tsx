import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { PstGender } from './PstGender';

export default {
  title: 'PstGender',
  component: PstGender,
};

const data = {
  imageUrl:
    'https:///static.hopscotch.in/fstatic/product/201802/b1c48ecd-4ca9-4431-9149-2c6a433089d0_full.jpg?version=1517739931850',
  pstGenderName: 'Pst Gender 1',
  pstId: 32,
  gender: "Boy's",
  discoveryPidCount: 2,
  targetCurrentWidthData: [
    ['Target Width', '100'],
    ['Current Width', '120'],
  ],
  keepCullData: [
    ['Catalog Decision', 'KEEP', 'CULL'],
    ['-Catalog PID #', '80', '60'],
    ['-Full-Set PID #', '40', '10'],
    ['-Broken-Set PID #', '40', '10'],
  ],
};
const Template: Story = (args) => <PstGender {...args} />;
export const PstGenderComponent = Template.bind({});
PstGenderComponent.args = data;
