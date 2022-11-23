import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { ClearFilters } from './ClearFilters';
import { IClearFilterProps } from './IClearFilters';

export default {
  title: 'Clear filters',
  component: ClearFilters,
};

const Template: Story<IClearFilterProps> = (args) => <ClearFilters {...args} />;
export const ClearFiltersComponent = Template.bind({});
ClearFiltersComponent.args = {
  clearFilters: () => {
    //
  },
};
