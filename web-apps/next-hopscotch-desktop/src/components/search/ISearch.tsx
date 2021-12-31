import { IResourceProps } from '@/types';

export interface ISearch {
  close: () => void;
  resource?: IResourceProps;
  searchText: string;
}

export interface IRecentSearchesProps {
  label: string;
  name: string;
  term: string;
  id: number;
  type: string;
  recent?: null;
}

export interface IResoucreProps {
  action: string;
  categories?: CategoriesEntity[] | null;
  brands?: BrandsEntity[] | null;
  browseCategoryList?: BrowseCategoryListEntity[] | null;
  supportInfo: SupportInfo;
  updateDate: string;
  departmentResponses?: DepartmentResponsesEntity[] | null;
  searchBackgroundImageUrl: string;
  awsInfo: AwsInfo;
  shouldShowSearchNudge: boolean;
}
export interface CategoriesEntity {
  id: number;
  name: string;
  subCategory: SubCategoryEntity[] | null;
}
export interface SubCategoryEntity {
  id: number;
  name: string;
  parentName: string;
  productTypeList?: ProductTypeListEntity[] | null;
}
export interface ProductTypeListEntity {
  id: number;
  name: string;
}
export interface BrandsEntity {
  id: number;
  name: string;
  isFavourite: boolean;
}
export interface BrowseCategoryListEntity {
  id: number;
  showName: string;
  paramValue: string;
}
export interface SupportInfo {
  supportPhone: string;
  supportEmail: string;
}
export interface DepartmentResponsesEntity {
  name: string;
  position: number;
  image_url: string;
  search_image_url: string;
  action_uri: string;
  web_action_uri: string;
  image_width: number;
  image_height: number;
  search_image_width: number;
  search_image_height: number;
  search_category: string;
  title: string;
  web_title: string;
  sub_title: string;
  gender_age_segment: string;
  store_image_url: string;
  department_image_url: string;
  store_image_width: number;
  store_image_height: number;
  department_image_width: number;
  department_image_height: number;
  category_title: string;
  category_description: string;
  web_store_image_url: string;
  web_department_image_url: string;
  web_store_image_width: number;
  web_store_image_height: number;
  web_department_image_width: number;
  web_department_image_height: number;
}
export interface AwsInfo {
  bucketNameS3: string;
  bucketS3BaseFolder: string;
  regionS3Bucket: string;
  congnitoPoolId: string;
  regionPoolId: string;
  customerProfileBaseFolder: string;
  prefixProfilePic: string;
}

export interface IEulerAutoSuggestionsProps {
  action: string;
  suggestions: IEulerSuggestionsEntity[];
}
export interface IEulerSuggestionsEntity {
  id: string;
  type: string;
  term: string;
  search_params: string;
  displayName: string;
  trackingData: TrackingData;
  label: string;
  name: string;
  recent?: null;
}
export interface TrackingData {
  section: string;
}
