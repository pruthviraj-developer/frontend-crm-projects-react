export interface Irows {
  pid: string;
  sku: string;
  count: number;
  country: string;
  asv_present: number;
  asv_previous_week: number;
  reason: string;
  age_class: string;
  sub_category: string;
  product_type: string;
  cost_price: number;
  season: string;
  product_sub_type: string;
  quantity: number;
  modified_quantity: number;
}

export interface IDashboardData {
  count: number;
  page_num: number;
  page_size: number;
  total_sku: number;
  total_pid: number;
  total_quantity: number;
  suggested_quantity: number;
  total_asv: number;
  total_amount: number;
  records: Irows[];
}

export interface IDropdownOptionsList {
  first: number;
  key: number;
  second: string;
  value: string;
}

export interface IDropdownListData {
  clearFields?: Array<string>;
  display: string;
  input_type: string;
  key: string | any;
  options?: IDropdownOptionsList[] | any;
}

export interface IRecord {
  from: number;
  to: number;
}

export interface IConstraintData {
  group_id: number;
  name: string;
  value: IRecord[];
}

export interface IDashboardSetData {
  id: number;
  brand: Array<string>;
  constraint_key: IConstraintData;
  product_type: string;
  sub_category: string;
  value: string;
  vendor: number | string;
  category: string;
  gender: string;
}

export interface IDashboardResponse {
  action: string;
  data?: IDashboardSetData[];
  message?: string;
  params?: string;
  statusCode: number;
  totalCount: number;
}

export interface IFilterPostData {
  id: string | number;
  group_id: number;
  action: string;
}

export declare type IFilterParams = {
  size: number;
  page: number;
};

export declare type tableParams = {
  size: number;
  page: number;
};

export {};
