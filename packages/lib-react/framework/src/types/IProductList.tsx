export interface IUseProductListProps {
  pages?: IProductListingData[];
  pageParams?: number[];
}

export interface IProductListingProps {
  productListId: string;
  productListName: string;
  isMobile: boolean;
  url: string;
  error?: IProductListingError | boolean;
  totalPages: number;
}

export interface ISmartFilterProps {
  productListName: string;
  filters?: IProductListSmartFilter;
  addSmartFilter: (
    sectionType: string,
    data: IProductListSmartFilterTile
  ) => void;
  removeSmartFilter: (data: IProductListAppliedSmartFilters) => void;
}

export interface IProductListingError {
  statusCode: number;
  message?: string;
}

export interface IProductListingData {
  pageNo: number;
  action: string;
  pageSize: number;
  orderRule: number;
  screenName: string;
  salePlanId: number;
  totalRecords: number;
  soldOutCount: number;
  baseFilterQuery: string;
  records: IPlpRecordProps[];
  brandFavouriteCount: number;
  messageBar: IMessageBarProps;
  plpSeoData: IPlpSeoDataProps;
  plpFilter: IPlpFilterEntityProps;
  smartFilter: IProductListSmartFilter;
  excludePreorderFilterApplied: boolean;
  salePlanDetail?: IPlpSalePlanDetailProps;
  sortingOptions: IPlpSortingOptionProps[];
  extraQueryParam: IPlpExtraQueryParamProps;
}

export interface IPlpExtraQueryParamProps {
  isCategoryPreselected: boolean;
}

export interface IPlpSeoDataProps {
  description: string;
}

export interface IPlpSalePlanDetailProps {
  restTime: number;
  id: number;
  name: string;
  imageUrl: string;
  imageUrlLarge: string;
  startDate: string;
  endDate: string;
  daysSinceBoutiqueStart: number;
  salePlanInventory: boolean;
  description: string;
  bestSeller: boolean;
  isSale: boolean;
  isNew: boolean;
  isLiveBoutique: boolean;
  brandId: number;
  isPopularBrand: boolean;
  trackChildrenGroupSortAction: boolean;
  showInBoutiqueSetting: boolean;
  isImportant: boolean;
  preOrder: boolean;
  deliveryDays: number;
  isRemind: boolean;
  saleType: string;
  isTile: number;
  isVirtualLabelsBrandBoutique: boolean;
  favourite: boolean;
  flexiImageUrl: string;
  bannerImageUrl: string;
  squareImageUrl: string;
  flexiImageWidth: number;
  flexiImageHeight: number;
  bannerImageWidth: number;
  bannerImageHeight: number;
  heroImageWidth: number;
  heroImageHeight: number;
  homepageImageWidth: number;
  homepageImageHeight: number;
  imageWidth: number;
  imageHeight: number;
  squareImageWidth: number;
  squareImageHeight: number;
  isDynamicCustomTile: boolean;
  showPadding: boolean;
  priceDetail: string;
  region: string;
  tagline: string;
}

export interface IPlpRecordProps {
  id: number;
  edd: string;
  name: string;
  onSale: number;
  isTile: number;
  restTime: number;
  position?: number;
  smallImg: string;
  largeImg: string;
  quantity: number;
  discount: number;
  eddColor: string;
  mediumImg: string;
  brandName: string;
  isPresale: number;
  eddPrefix: string;
  wishlistId: number;
  isReserved: number;
  categoryId: number;
  canPreSale: number;
  retailPrice: number;
  isFinalsale: number;
  canWishList: number;
  regularPrice: number;
  categoryName: string;
  highlightEDD: number;
  eddTextColor: string;
  isWishlisted: boolean;
  subCategoryId: number;
  productTypeId: number;
  hasSizeChart: boolean;
  subCategoryName: string;
  productTypeName: string;
  maxDeliveryDays: number;
  product_class_id: number;
  simpleSkus: IPlpSimpleSkuProps[];
  product_add_to_site_date: string;
  sizePickerDropdownLabel?: string;
  pincode: string;
}
export interface IPlpSimpleSkuProps {
  skuId: string;
  toAge: number;
  gender: string;
  onSale: number;
  fromAge: number;
  hasInv: boolean;
  wmsCode: string;
  variant: string;
  soldOut: boolean;
  eddColor: string;
  discount: number;
  finalSale: number;
  eddPrefix: string;
  saleType?: string;
  rackStatus: string;
  isPresale: boolean;
  retailPrice: number;
  deliveryMsg: string;
  regularPrice: number;
  categoryName: string;
  highlightEDD: number;
  eddTextColor: string;
  isAffectImage: number;
  left_quantity: number;
  can_wish_list: number;
  presaleWmsCode: string;
  maxDeliveryDays: number;
  availableQuantity: number;
  estimatedDeliveryDate: string;
  attrs: IPlpSimpleSkuAttrProps[];
  presaleAvailableQuantity: number;
  deliveryWeekNumberStringOnly?: string;
}

export interface IPlpSimpleSkuAttrProps {
  name: string;
  value: string;
}

export interface IProductListSmartFilter {
  smartFilterRule: string;
  keywords: any[];
  smartFilterSections: IProductListSmartFilterSection[];
  appliedSmartFilters: IProductListAppliedSmartFilters[];
}

export interface IProductListSmartFilterSection {
  smartFilterTiles: IProductListSmartFilterTile[];
  index: number;
  sectionType: string;
}

export interface IProductListAppliedSmartFilters {
  filterValue: string;
  name: string;
  sectionType: string;
}

export interface IProductListSmartFilterTile {
  filterValue?: string;
  name: string;
  sectionType: string;
}

export interface IPlpFilterEntityProps {
  action: string;
  filterSection: IFilterSectionProps[];
  selectedFilters: IFilterSectionProps[];
}

export interface IFilterSectionProps {
  key: string;
  param: string;
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
  key?: string;
  name: string;
  param: string;
  isSelected: boolean;
  sectionTracking: string;
  selectedFilterName: string;
  isAttribute: boolean;
  filter?: IPlpFilter2Props[];
  type?: string;
  popularityCount?: number;
  value: string;
  rectangelImgUrl?: string;
  ovalImgUrl?: string;
}

export interface IPlpFilter2Props {
  id: string;
  key?: string;
  name: string;
  param: string;
  isSelected: boolean;
  filter: IPlpFilter3Props[];
  type: string;
  sectionTracking: string;
  selectedFilterName: string;
  isAttribute: boolean;
}

export interface IPlpFilter3Props {
  id: string;
  key?: string;
  name: string;
  param: string;
  isSelected: boolean;
  type: string;
  sectionTracking: string;
  selectedFilterName: string;
  isAttribute: boolean;
}

export interface IPlpSeoDataProps {
  id?: number;
  plpId?: number;
  title?: string;
  h1Tag?: string;
  urlLabel?: string;
  robotIndex?: string;
  canonicalUrl?: string;
  metaDescription?: string;
}

export interface IPlpSortingOptionProps {
  orderRule: number;
  sortName: string;
  eventSortName: string;
  isSelected: boolean;
}

export interface IPlpUpdateFilterProps {
  (
    key: string,
    data: IPlpFilter1Props | IPlpFilter2Props,
    isMultiSelect: boolean,
    type?: string
  ): void;
}

export interface IPlpSortingOptionsEntityProps {
  orderRule: number;
  sortName: string;
  eventSortName: string;
  isSelected: boolean;
}

export interface IPlpUpdateSortParameters {
  (index: number, option: IPlpSortingOptionsEntityProps): void;
}

export interface IMessageBarProps {
  messageType: string;
  message: string;
  messageUIType: string;
  messageDisplayTime: string;
}
