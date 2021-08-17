import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import { Footer } from './Footer';
import { IFooterProps } from './IFooter';

export default {
  title: 'Footer',
  component: Footer,
};

const Template: Story<IFooterProps> = (args) => <Footer {...args} />;
export const FooterComponent = Template.bind({});

FooterComponent.args = {};
