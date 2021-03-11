import React, { FC } from 'react';
import { HsFilters } from './HSfilters';
import { IHsFilters } from './IFilters';
import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react/types-6-0';
export default {
  title: 'HsFilters',
  component: HsFilters,
};

const updateFilters = (values) => {
  action(values);
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
      { key: '>', value: '>' },
      { key: '<', value: '<' },
      { key: '=', value: '=' },
      { key: '>=', value: '>=' },
      { key: '<=', value: '<=' },
    ],
    key: 'mathOperator',
    input_type: 'S',
    display: 'Select operator',
  },
];

const data: IHsFilters = {
  sideBar: [...aaa],
  sideBarState: { right: true },
  defaultSelectedValues: {},
  updateFilters: updateFilters,
  updateFilter: updateFilters,
};

//export const HsFiltersComponent: FC = () => <HsFilters {...data} />;

const Template: Story<IHsFilters> = (args) => <HsFilters {...args} />;
export const HsFiltersComponent = Template.bind({});
HsFiltersComponent.args = data;
