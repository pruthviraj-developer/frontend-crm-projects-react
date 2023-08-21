import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { Filters } from './Filters';
import { IPlpFilterProps } from './IFilters';

export default {
  title: 'Plp Filters MIP',
  component: Filters,
};

const Template: Story<IPlpFilterProps> = (args) => <Filters {...args} />;
export const WebNavBarComponent = Template.bind({});

const updateFilter = (data, selectedType, nestedSelector) => {
  // console.dir(data);
  // console.dir(selectedType);
  // console.dir(nestedSelector);
};

WebNavBarComponent.args = {
  clearFilters: () => {
    // console.dir('clear');
  },
  filterSection: [
    {
      shouldHide: false,
      showSearch: false,
      filterList: [
        {
          filter: [
            {
              id: 'appreal-children',
              name: 'appreal-children',
              param: 'categoryFilter',
              isSelected: true,
              popularityCount: 1,
              sectionTracking: 'Category',
              isAttribute: false,
            },
          ],
        },
      ],
      name: 'Category',
      uiType: 'Category',
      hasSelected: false,
      isSingleCategory: false,
      isGenericFilter: false,
      isMultiSelect: true,
    },
    {
      shouldHide: false,
      showSearch: false,
      filterList: [
        {
          filter: [
            {
              id: 'jackets',
              name: 'jackets',
              param: 'productTypeFilter',
              isSelected: false,
              popularityCount: 1,
              sectionTracking: 'Product Type',
              isAttribute: false,
            },
          ],
        },
      ],
      name: 'Product Type',
      uiType: 'Product Type',
      hasSelected: false,
      isSingleCategory: false,
      isGenericFilter: false,
      isMultiSelect: true,
    },
    {
      shouldHide: false,
      showSearch: false,
      filterList: [
        {
          filter: [
            {
              id: 'outerwear',
              name: 'outerwear',
              param: 'subCategoryFilter',
              isSelected: true,
              popularityCount: 1,
              sectionTracking: 'Sub Category',
              isAttribute: false,
            },
            {
              id: 'outerwear',
              name: 'outerwear',
              param: 'subCategoryFilter',
              isSelected: true,
              popularityCount: 1,
              sectionTracking: 'Sub Category',
              isAttribute: false,
            },
            {
              id: 'outerwear',
              name: 'outerwear',
              param: 'subCategoryFilter',
              isSelected: true,
              popularityCount: 1,
              sectionTracking: 'Sub Category',
              isAttribute: false,
            },
            {
              id: 'outerwear',
              name: 'outerwear',
              param: 'subCategoryFilter',
              isSelected: true,
              popularityCount: 1,
              sectionTracking: 'Sub Category',
              isAttribute: false,
            },
            {
              id: 'outerwear',
              name: 'outerwear',
              param: 'subCategoryFilter',
              isSelected: true,
              popularityCount: 1,
              sectionTracking: 'Sub Category',
              isAttribute: false,
            },
          ],
        },
      ],
      name: 'Sub Category',
      uiType: 'Sub Category',
      hasSelected: false,
      isSingleCategory: false,
      isGenericFilter: false,
      isMultiSelect: true,
    },
    {
      shouldHide: false,
      showSearch: false,
      filterList: [
        {
          filter: [
            {
              id: 'Boy',
              name: 'Boy',
              param: 'genderFilter',
              isSelected: true,
              popularityCount: 1,
              sectionTracking: 'Gender',
              isAttribute: false,
            },
            {
              id: 'Girl',
              name: 'Girl',
              param: 'genderFilter',
              isSelected: false,
              popularityCount: 1,
              sectionTracking: 'Gender',
              isAttribute: false,
            },
          ],
        },
      ],
      name: 'Gender',
      uiType: 'Gender',
      hasSelected: false,
      isSingleCategory: false,
      isGenericFilter: false,
      isMultiSelect: true,
    },
    {
      shouldHide: false,
      showSearch: false,
      filterList: [
        {
          filter: [
            {
              id: 'All',
              name: 'All',
              param: 'pstGenderType',
              isSelected: true,
              popularityCount: 1,
              sectionTracking: 'Pst-Gender Type',
              isAttribute: false,
            },
            {
              id: 'Validation Pending',
              name: 'Validation Pending',
              param: 'pstGenderType',
              isSelected: false,
              popularityCount: 1,
              sectionTracking: 'Pst-Gender Type',
              isAttribute: false,
            },
          ],
        },
      ],
      name: 'Pst-Gender Type',
      uiType: 'pstGenderType',
      hasSelected: false,
      isSingleCategory: false,
      isGenericFilter: false,
      isMultiSelect: true,
    },
    {
      shouldHide: false,
      showSearch: false,
      filterList: [
        {
          filter: [
            {
              id: '50.0~250.0',
              name: '50.0~250.0',
              param: 'priceRangeFilter',
              isSelected: true,
              popularityCount: 1,
              sectionTracking: 'Price Range',
              isAttribute: false,
            },
          ],
        },
      ],
      name: 'Price Range',
      uiType: 'priceRange',
      hasSelected: false,
      isSingleCategory: false,
      isGenericFilter: false,
      isMultiSelect: true,
    },
  ],
  updateFilter,
};
