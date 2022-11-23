import {
  IFilterSectionProps,
  IPlpUpdateFilterProps,
  IProductListSmartFilter,
  IPlpUpdateSortParameters,
  IProductListSmartFilterTile,
  IPlpSortingOptionsEntityProps,
  IProductListAppliedSmartFilters,
  IPlpRecordProps,
  ISimpleSkusEntityProps,
} from '@hs/framework';

export interface IProductListPage {
  plpRoute?: string;
  pageTitle?: string;
  sortBarTitle: string;
  screenName?: string;
  totalRecords?: number;
  isComingSoon: boolean;
  productListName: string;
  clearFilters: () => void;
  disableAddToCart: boolean;
  records?: IPlpRecordProps[];
  filters?: IProductListSmartFilter;
  updateFilter: IPlpUpdateFilterProps;
  filterSection?: IFilterSectionProps[];
  removeSmartFilter: (data: IProductListAppliedSmartFilters) => void;
  updateSortParameters: IPlpUpdateSortParameters;
  sortingOptions?: IPlpSortingOptionsEntityProps[];
  addSmartFilter: (
    sectionType: string,
    data: IProductListSmartFilterTile
  ) => void;
  openSizeChartPopup: (
    product: IPlpRecordProps,
    from_location?: string
  ) => void;
  addToCartFromPlp: (
    productData: IPlpRecordProps,
    sku: ISimpleSkusEntityProps,
    retailPrice: number,
    isOneSize: boolean
  ) => void;
  trackSizeSelectEvent: (
    productData: IPlpRecordProps,
    sku: ISimpleSkusEntityProps
  ) => void;
  messageBar: IMessageBarProps;
}

export interface IMessageBarProps {
  messageType: string;
  message: string;
  messageUIType: string;
  messageDisplayTime: string;
}

export interface IListItemProps {
  isComingSoon: boolean;
  productData: IPlpRecordProps;
  openSizeChartPopup: (
    product: IPlpRecordProps,
    from_location?: string
  ) => void;
  addToCartFromPlp: (
    productData: IPlpRecordProps,
    sku: ISimpleSkusEntityProps,
    retailPrice: number,
    isOneSize: boolean
  ) => void;
}

// export interface addToCartFromPlp {
//   addToCartFromPlp: (
//     productData: IPlpRecordProps,
//     sku: ISimpleSkusEntityProps
//   ) => void;
// }
