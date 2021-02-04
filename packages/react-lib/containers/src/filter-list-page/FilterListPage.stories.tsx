import React from 'react';
import { FilterListPage } from './FilterListPage';
import { Story } from '@storybook/react/types-6-0';

export default {
  title: 'Hs Filter List Page',
  component: FilterListPage,
};

const aaa = [
  {
    options: [
      { key: 'All', value: 'All', second: 'All', first: 'All' },
      {
        key: 'Spring / Summer',
        value: 'Spring / Summer',
        second: 'Spring / Summer',
        first: 'Spring / Summer',
      },
      { key: 'Autumn', value: 'Autumn', second: 'Autumn', first: 'Autumn' },
      { key: 'Winter', value: 'Winter', second: 'Winter', first: 'Winter' },
      {
        key: 'Monsoon/Rainy',
        value: 'Monsoon/Rainy',
        second: 'Monsoon/Rainy',
        first: 'Monsoon/Rainy',
      },
    ],
    key: 'Season',
    input_type: 'S',
    display: 'Season',
  },
  {
    options: [
      { key: 'Greater than', value: 'Greater than' },
      { key: 'Lesser than', value: 'Lesser than' },
      { key: 'Equal To', value: 'Equal To' },
      { key: 'Greater Than or Equal To', value: 'Greater Than or Equal To' },
      { key: 'Lesser Than or Equal To', value: 'Lesser Than or Equal To' },
    ],
    key: 'mathOperator',
    input_type: 'S',
    display: 'Select operator',
  },
];

const updateFilters = (a: any) => {
  // console.log(a);
};
const props: any = {
  sideBar: [...aaa],
  sideBarState: { right: true },
  updateFilters,
  updatedFilter: updateFilters,
  toggleSideBar: { right: true },
};

const Template: Story<any> = (args) => <FilterListPage {...args} />;

export const FilterListPageComponent = Template.bind({});
FilterListPageComponent.args = props;
