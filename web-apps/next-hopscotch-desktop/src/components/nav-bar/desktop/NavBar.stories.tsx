import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import { NavBarDesktop } from './NavBarDesktop';
import { INavBarProps } from '../INavBar';

export default {
  title: 'Nav Bar Desktop',
  component: NavBarDesktop,
};

const Template: Story<INavBarProps> = (args) => <NavBarDesktop {...args} />;
export const WebNavBarComponent = Template.bind({});

WebNavBarComponent.args = {};
