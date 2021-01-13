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
    display: 'Non due to quality and sizing',
    value: '1kjh',
    key: '1kjh',
    id: '1',
  },
  {
    display: 'Proc high return due to other reason',
    value: 'lkj2',
    key: 'lkj2',
    id: '2',
  },
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
