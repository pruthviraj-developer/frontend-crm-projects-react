import React, { FC } from 'react';
import { FilterListPage } from './FilterListPage';
import { FiltersOptions } from './IFilterListPage';
export default {
  title: 'HsFilterListPage',
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

const data = {
  sideBar: [reasonSideBarOption, testFieldSideBarOption, autoSideBarOption],
};

export const FilterListPageComponent: FC = () => <FilterListPage {...data} />;
