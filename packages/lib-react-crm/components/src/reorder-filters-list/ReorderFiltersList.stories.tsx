import React, { FC } from 'react';
import { ReorderFiltersList } from './ReorderFiltersList';
import { action } from '@storybook/addon-actions';
import { ReorderFiltersObjectProps } from './IReorderFiltersList';
export default {
  title: 'ReorderFiltersList',
  component: ReorderFiltersList,
};

const onSubmit = (e: Record<string, unknown>) => {
  action('ReorderFiltersList')(e);
};

const onChange = (e) => {
  // console.log(e);
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
    display: 'Season',
    clearFields: ['mathOperator', 'Cakes'],
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
  {
    options: [
      { name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
      { name: 'Donut', calories: 452, fat: 25, carbs: 51, protein: 4.9 },
      { name: 'Eclair', calories: 262, fat: 16, carbs: 24, protein: 6 },
      { name: 'Frozen yoghurt', calories: 159, fat: 6, carbs: 24, protein: 4 },
      { name: 'Gingerbread', calories: 356, fat: 16, carbs: 49, protein: 3.9 },
      { name: 'Honeycomb', calories: 408, fat: 3.2, carbs: 87, protein: 6.5 },
    ],
    key: 'Cakes',
    input_type: 'S',
    multi: true,
    display: 'Cake',
  },
  {
    options: [
      { name: 'test ', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
      { name: 'Chocolate ', calories: 452, fat: 25, carbs: 51, protein: 4.9 },
      { name: 'Biscuits ', calories: 262, fat: 16, carbs: 24, protein: 6 },
      { name: 'yoghurt', calories: 159, fat: 6, carbs: 24, protein: 4 },
      { name: 'Break', calories: 356, fat: 16, carbs: 49, protein: 3.9 },
      { name: 'Breakfast ', calories: 408, fat: 3.2, carbs: 87, protein: 6.5 },
    ],
    key: 'Chocolates',
    input_type: 'autoselectall',
    type: 'autoselectall',
    multi: true,
    display: 'Cake',
  },
];

const data: ReorderFiltersObjectProps = {
  sideBar: [...aaa],
  defaultSelectedValues: {},
  onSubmit: onSubmit,
  onChange: onChange,
};

export const ReOrderFiltersComponent: FC = () => (
  <ReorderFiltersList {...data} />
);
