import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { PlpHeader } from './PlpHeader';
import { IPlpHeader } from './IPlpHeader';

export default {
  title: 'Plp Header',
  component: PlpHeader,
};

const Template: Story<IPlpHeader> = (args) => <PlpHeader {...args} />;
export const SortByComponent = Template.bind({});
SortByComponent.args = {
  title: 'Girls Frocks',
};
