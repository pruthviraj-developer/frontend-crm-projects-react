import React from 'react';
import { action } from '@storybook/addon-actions';
import { FilterPan } from './FilterPan';
import { FilterProps } from './IFilterPan';
import { Story } from '@storybook/react/types-6-0';

export default {
  title: 'FilterPan Component',
  component: FilterPan,
};

const handleChange = (filtersData) => {
  action('Filters')(filtersData);
};

const data = [
  {
    display: 'Created date',
    key: 'createdDate',
    fieldType: 'DatePicker',
  },
  {
    display: 'Product type',
    key: 'productType',
    multiSelect: false,
    options: [
      { display: 'Product 1', key: '3277' },
      { display: 'Product 2', key: '4543' },
    ],
  },
  {
    display: 'VSKU',
    key: 'vsku',
    options: [
      { display: 'Vsku 1', key: '3289' },
      { display: 'Vsku 2', key: '3290' },
      { display: 'Vsku 3', key: '3291' },
      { display: 'Vsku 4', key: '3292' },
    ],
  },
  {
    display: 'Shippment number',
    key: 'shippmentNumber',
    fieldType: 'InputText',
  },
  {
    display: 'HSN code',
    key: 'hsnCode',
    multiSelect: true,
    options: [
      { display: 'HSN 1', key: '3277' },
      { display: 'HSN 2', key: '4543' },
      { display: 'HSN 3', key: '4578' },
      { display: 'HSN 4', key: '4579' },
    ],
  },
];

const filterData: FilterProps = {
  data: [...data],
  onChange: handleChange,
};

const Template: Story<FilterProps> = (args) => <FilterPan {...args} />;

export const FilterPanComponent = Template.bind({});
FilterPanComponent.args = { ...filterData };

// export const FilterPanComponent: FC = () => <FilterPan {...filterData} />;
