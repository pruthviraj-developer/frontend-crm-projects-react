import React from 'react';
import { Story } from '@storybook/react/types-6-0';

import { Footer } from './Footer';

export default {
  title: 'Footer',
  component: Footer,
};

const Template: Story = (args) => <Footer {...args} />;
export const FooterComponent = Template.bind({});

FooterComponent.args = {};
