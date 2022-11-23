import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { SearchAndSortDetails } from './SearchAndSortDetails';
import { IPlpSearchAndSortDetailsProps } from './ISearchAndSortDetails';

export default {
  title: 'Search and sort',
  component: SearchAndSortDetails,
};

const Template: Story<IPlpSearchAndSortDetailsProps> = (args) => (
  <SearchAndSortDetails {...args} />
);
export const SearchAndSortDetailsComponent = Template.bind({});

SearchAndSortDetailsComponent.args = {
  title: 'Sort by:',

  screenName: 'Plp',
  totalRecords: 230,
  sortingOptions: [
    {
      orderRule: -1,
      sortName: 'Popular',
      eventSortName: 'Popular',
      isSelected: true,
    },
    {
      orderRule: 1,
      sortName: 'Price high to low',
      eventSortName: 'PriceHighLow',
      isSelected: false,
    },
    {
      orderRule: 2,
      sortName: 'Price low to high',
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
  updateSortParameters: () => {
    // console.log('on size select clicked');
  },
};
