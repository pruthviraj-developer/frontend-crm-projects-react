import React, { FC } from 'react';
import { FiltersList } from './FiltersList';
import { action } from '@storybook/addon-actions';
import { FiltersObject } from './IFiltersList';
export default {
  title: 'FiltersList',
  component: FiltersList,
};

const onSubmit = (e: Record<string, unknown>) => {
  action('FiltersList')(e);
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
    key: 'season',
    input_type: 'S',
    multi: true,
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

const data: FiltersObject = {
  sideBar: [...aaa],
  defaultSelectedValues: {
    season: [
      { key: 'Winter', value: 'Winter', second: 'Winter', first: 'Winter' },
    ],
    mathOperator: { key: '=', value: '=' },
  },
  onSubmit: onSubmit,
};

export const HsFiltersComponent: FC = () => <FiltersList {...data} />;
