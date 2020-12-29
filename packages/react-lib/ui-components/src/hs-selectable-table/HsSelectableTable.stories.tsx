import React, { FC } from 'react';
import { HsSelectableTable } from './HsSelectableTable';
import { SelectableTableProps } from './ISelectableTable';
import { action } from '@storybook/addon-actions';
export default {
  title: 'HsSelectableTable',
  component: HsSelectableTable,
};

const fetchTableData = (e) => {
  action(e);
};
const data: SelectableTableProps = {
  columns: ['Name', 'Calories', 'Fat', 'Cards', 'Protein'],
  rowKeys: ['name', 'calories', 'fat', 'carbs', 'protein'],
  rows: [
    { name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
    { name: 'Donut', calories: 452, fat: 25, carbs: 51, protein: 4.9 },
    { name: 'Eclair', calories: 262, fat: 16, carbs: 24, protein: 6 },
    { name: 'Frozen yoghurt', calories: 159, fat: 6, carbs: 24, protein: 4 },
    { name: 'Gingerbread', calories: 356, fat: 16, carbs: 49, protein: 3.9 },
    { name: 'Honeycomb', calories: 408, fat: 3.2, carbs: 87, protein: 6.5 },
    {
      name: 'Ice cream sandwich',
      calories: 237,
      fat: 9,
      carbs: 37,
      protein: 4.3,
    },
    { name: 'Jelly Bean', calories: 375, fat: 0, carbs: 94, protein: 0 },
    { name: 'KitKat', calories: 518, fat: 26, carbs: 65, protein: 7 },
    { name: 'Lollipop', calories: 392, fat: 0.2, carbs: 98, protein: 0 },
    { name: 'Marshmallow', calories: 318, fat: 0, carbs: 81, protein: 2 },
    { name: 'Nougat', calories: 360, fat: 19, carbs: 9, protein: 37 },
    { name: 'Oreo', calories: 437, fat: 18, carbs: 63, protein: 4 },
  ],
  sortingId: 'name',
  fetchTableData: fetchTableData,
};

export const HsSelectableTableComponent: FC = () => (
  <HsSelectableTable {...data} />
);
