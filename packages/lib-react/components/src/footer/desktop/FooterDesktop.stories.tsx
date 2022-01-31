import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import { FooterDesktop } from './FooterDesktop';

export default {
  title: 'Footer Desktop',
  component: FooterDesktop,
};

const Template: Story = (args) => <FooterDesktop {...args} />;
export const Footer = Template.bind({});

Footer.args = {};
