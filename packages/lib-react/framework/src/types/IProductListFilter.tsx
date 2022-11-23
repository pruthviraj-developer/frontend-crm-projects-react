import { IPlpUpdateFilterProps, IFilterSectionProps } from './IProductList';

export interface IPlpFilterProps {
  filterSection?: IFilterSectionProps[];
  updateFilter: IPlpUpdateFilterProps;
  clearFilters: () => void;
}
