import { IPlpUpdateFilterProps } from '@hs/framework';

export interface IPlpFilterProps {
  filterSection?: IFilterSectionProps[];
  updateFilter: IPlpUpdateFilterProps;
  clearFilters: () => void;
}

export interface IFilterSectionProps {
  isSingleCategory: boolean;
  isGenericFilter: boolean;
  name: string;
  shouldHide: boolean;
  isMultiSelect: boolean;
  showSearch: boolean;
  filterList: IFilterListProps[];
  uiType: string;
  hasSelected: boolean;
}

export interface IFilterListProps {
  filter: IPlpFilter1Props[];
  name?: string;
}

export interface IPlpFilter1Props {
  id: string;
  name: string;
  param: string;
  isSelected: boolean;
  sectionTracking: string;
  isAttribute: boolean;
  filter?: IPlpFilter2Props[];
  type?: string;
  popularityCount?: number;
  value?: string;
  rectangelImgUrl?: string;
  ovalImgUrl?: string;
}

export interface IPlpFilter2Props {
  id: string;
  name: string;
  param: string;
  isSelected: boolean;
  filter: IPlpFilter3Props[];
  type: string;
  sectionTracking: string;
  isAttribute: boolean;
}

export interface IPlpFilter3Props {
  id: string;
  name: string;
  param: string;
  isSelected: boolean;
  type: string;
  sectionTracking: string;
  isAttribute: boolean;
}

export interface IPlpSeoDataProps {
  id: number;
  plpId: number;
}

export interface IPlpSortingOptionProps {
  orderRule: number;
  sortName: string;
  eventSortName: string;
  isSelected: boolean;
}
