import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { SortBy } from './SortBy';
import { IPlpSortByProps } from './ISortBy';

export default {
  title: 'Sort By',
  component: SortBy,
};

const Template: Story<IPlpSortByProps> = (args) => <SortBy {...args} />;
export const SortByComponent = Template.bind({});
SortByComponent.args = {
  title: 'Sort by:',
  sortingOptions: [
    {
      orderRule: -1,
      sortName: 'Popular',
      eventSortName: 'Popular',
      isSelected: true,
    },
    {
      orderRule: 1,
      sortName: 'Highest Price',
      eventSortName: 'PriceHighLow',
      isSelected: false,
    },
    {
      orderRule: 2,
      sortName: 'Lowest Price',
      eventSortName: 'PriceLowHigh',
      isSelected: false,
    },
    {
      orderRule: 7,
      sortName: 'New Arrivals',
      eventSortName: 'NewArrivals',
      isSelected: false,
    },
  ],
  updateSortParameters: (index, option) => {
    // console.log(index, option);
  },
};
