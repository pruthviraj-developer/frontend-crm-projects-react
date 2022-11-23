import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import { SecondaryNavBar } from './SecondaryNavBar';

export default {
  title: 'Secondary Nav Bar',
  component: SecondaryNavBar,
};

const Template: Story = (args) => <SecondaryNavBar {...args} />;
export const SecondaryNavBarComponent = Template.bind({});

SecondaryNavBarComponent.args = {};
