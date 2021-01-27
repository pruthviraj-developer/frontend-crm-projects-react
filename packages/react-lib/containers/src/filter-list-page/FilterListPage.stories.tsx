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

const props: IHsFiltersList = {
  sideBar: [reasonSideBarOption, testFieldSideBarOption, autoSideBarOption],
};

const Template: Story<IHsFiltersList> = (args) => (
  <FilterListPage {...args} />
);

export const FilterListPageComponent = Template.bind({});
FilterListPageComponent.args = props;
