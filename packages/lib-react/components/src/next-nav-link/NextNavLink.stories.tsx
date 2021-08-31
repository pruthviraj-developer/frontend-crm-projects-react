import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import { NextNavLink } from './NextNavLink';
import { INextNavLinkProps } from './INextNavLink';

export default {
  title: 'Next Nav Link',
  component: NextNavLink,
};

const Template: Story<INextNavLinkProps> = (args) => <NextNavLink {...args} />;
export const WebNavBarComponent = Template.bind({});

WebNavBarComponent.args = { href: '/accounts/order', name: 'Orders' };
