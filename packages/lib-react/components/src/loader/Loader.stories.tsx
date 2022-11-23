import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { Loader } from './Loader';

export default {
  title: 'Loader',
  component: Loader,
};

const Template: Story = (args) => <Loader {...args} />;
export const LoaderComponent = Template.bind({});
LoaderComponent.args = {};
