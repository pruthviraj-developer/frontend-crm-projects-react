import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import { NavBarDesktop } from './NavBarDesktop';
import { INavBarDesktopProps } from './INavBarDesktop';

export default {
  title: 'Nav Bar Desktop',
  component: NavBarDesktop,
};

const Template: Story<INavBarDesktopProps> = (args) => (
  <NavBarDesktop {...args} />
);
export const WebNavBarComponent = Template.bind({});

WebNavBarComponent.args = {};
