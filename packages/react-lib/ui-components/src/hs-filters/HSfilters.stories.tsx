import React, { FC } from 'react';
import { HsFilters } from './HSfilters';
import { FFiltersOptions, IHsFilters } from './IFilters';
import { action } from '@storybook/addon-actions';
export default {
  title: 'HsFilters',
  component: HsFilters,
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

const reasonSideBarOption: FFiltersOptions = {
  isSelect: true,
  name: 'sreason',
  label: 'mReason',
  options: reasonOptions,
  type: 'select',
};

const testFieldSideBarOption: FFiltersOptions = {
  isSelect: true,
  name: 'treason',
  label: 'Text Field Reason',
};

const autoSideBarOption: FFiltersOptions = {
  isSelect: true,
  name: 'areason',
  label: 'Auto Reason',
  options: reasonOptions,
  type: 'autocomplete',
};

const updateFilters = (values) => {
  action(values);
};

const data: IHsFilters = {
  sideBar: [autoSideBarOption, reasonSideBarOption, testFieldSideBarOption],
  sideBarState: {right:true},
  defaultSelectedValues: {
    areason: [
      {
        display: 'Non due to quality and sizing',
        value: '1kjh',
        key: '1kjh',
        id: '1',
      },
    ]
  },
  updateFilters:updateFilters
};

export const HsFiltersComponent: FC = () => <HsFilters {...data} />;
