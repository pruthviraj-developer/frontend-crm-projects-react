import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import { NavBar } from './NavBar';
import { INavBarProps } from './INavBar';

export default {
  title: 'NavBar Component',
  component: NavBar,
};

const Template: Story<INavBarProps> = (args) => <NavBar {...args} />;
export const WebNavBarComponent = Template.bind({});

WebNavBarComponent.args = {};
