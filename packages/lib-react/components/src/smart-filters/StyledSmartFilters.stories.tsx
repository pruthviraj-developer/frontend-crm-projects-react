import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { SmartFilters } from './SmartFilters';
import {
  ISmartFilterProps,
  IProductListSmartFilterTile,
  IProductListAppliedSmartFilters,
} from '@hs/framework';
export default {
  title: 'Smart Filters',
  component: SmartFilters,
};

const Template: Story<ISmartFilterProps> = (args) => <SmartFilters {...args} />;
export const SmartFiltersComponent = Template.bind({});
SmartFiltersComponent.args = {
  addSmartFilter: (sectionType: string, data: IProductListSmartFilterTile) => {
    // console.log(data);
    // console.log(sectionType);
  },
  removeSmartFilter: (data: IProductListAppliedSmartFilters) => {
    // console.log(data);
  },
  productListName: 'casual+affair',
  filters: {
    smartFilterSections: [
      {
        smartFilterTiles: [
          {
            filterValue: '437',
            name: 'One-Pieces & Bodysuits',
          },
          {
            filterValue: '426',
            name: 'Bottoms',
          },
          {
            filterValue: '475',
            name: 'Ethnicwear',
          },
          {
            filterValue: '444',
            name: 'Dresses',
          },
          {
            filterValue: '412',
            name: 'Sets',
          },
          {
            filterValue: '413',
            name: 'Tops',
          },
        ],
        index: 0,
        sectionType: 'subCategorySmartFilter',
      },
      {
        smartFilterTiles: [
          {
            name: 'Blue',
          },
          {
            name: 'Pink',
          },
        ],
        index: 0,
        sectionType: 'colourSmartFilter',
      },
    ],
    keywords: [],
    appliedSmartFilters: [
      {
        filterValue: '2-4 years',
        name: '2-4 years',
        sectionType: 'ageListSmartFilter',
      },
    ],
    smartFilterRule: 'Apparel - Children',
  },
};
