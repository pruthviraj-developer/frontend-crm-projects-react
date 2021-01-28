import React, { FC } from 'react';
import { FilterListPage } from './FilterListPage';
import { FiltersOptions , IHsFiltersList} from './IFilterListPage';
import { Story } from '@storybook/react/types-6-0';

export default {
  title: 'Hs Filter List Page',
  component: FilterListPage,
};

const reasonOptions = [
  {
  "key": 1,
  "value": "SKU Count Exceed",
  "second": "SKU Count Exceed",
  "first": 1
  },
  {
  "key": 2,
  "value": "ASV Exceed",
  "second": "ASV Exceed",
  "first": 2
  }
];

const reasonSideBarOption: FiltersOptions = {
  isSelect: true,
  name: 'sreason',
  label: 'mReason',
  options: reasonOptions,
  type: 'autocomplete',
};

const testFieldSideBarOption: FiltersOptions = {
  isSelect: true,
  name: 'treason',
  label: 'Text Field Reason',
};

const autoSideBarOption: FiltersOptions = {
  isSelect: true,
  name: 'areason',
  label: 'Auto Reason',
  options: reasonOptions,
  type: 'autocomplete',
};


const aaa = [{"options":[{"key":"All","value":"All","second":"All","first":"All"},{"key":"Spring / Summer","value":"Spring / Summer","second":"Spring / Summer","first":"Spring / Summer"},
{"key":"Autumn","value":"Autumn","second":"Autumn","first":"Autumn"},{"key":"Winter","value":"Winter","second":"Winter","first":"Winter"},{"key":"Monsoon/Rainy","value":"Monsoon/Rainy","second":"Monsoon/Rainy","first":"Monsoon/Rainy"},
],"key":"Season","input_type":"S","display":"Season"}];

const updateFilters = (a) => { console.log(a)};
const props: any = {
  sideBar: [...aaa],
  sideBarState: {right:true},
  updateFilters,
  updatedFilter: updateFilters,
  toggleSideBar: {right:true}
};

const Template: Story<any> = (args) => (
  <FilterListPage {...args} />
);

export const FilterListPageComponent = Template.bind({});
FilterListPageComponent.args = props;
