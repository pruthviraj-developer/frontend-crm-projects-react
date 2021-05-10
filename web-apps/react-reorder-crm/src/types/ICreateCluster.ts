import { ReorderFiltersProps, ReorderFiltersOptions } from '@hs/components';

export interface FilterType {
  bucket?: OptionType[] | null;
  sku_attribute?: SkuAttributeEntity[] | null;
  reason?: OptionType[] | null;
  category_id?: OptionType[] | null;
  gender?: OptionType[] | null;
  buyers?: OptionType[] | null;
  plc?: OptionType[] | null;
  vendor_id?: OptionType[] | null;
  age?: OptionType[] | null;
  status?: OptionType[] | null;
  brand_id?: OptionType[] | null;
}
interface OptionType {
  key: string | number;
  value: string;
  second: string | number;
  first: string | number;
}

export interface SkuAttributeEntity {
  options?: OptionType[] | null;
  key: string;
  input_type: string;
  display: string;
}

export interface Brand {
  brandList?: BrandListEntity[] | null;
}
interface BrandListEntity {
  id: number;
  display: string;
}
export interface ISubCategory {
  sub_cat?: OptionType[] | null;
}

export interface IProductTypes {
  pt?: OptionType[] | null;
}

export enum ActionType {
  removeItems = 'removeItem',
  addItems = 'addItem',
}

export type Action = [ActionType.removeItems, string[]] | [ActionType.addItems, ReorderFiltersProps[]];

export interface ISelectedValues {
  [key: string]: OptionType | BrandListEntity | ReorderFiltersOptions | string | number;
}

export interface ICreateConstraintResponseType {
  action: string;
  message: string;
}

export interface ICreateClusterType {
  vendor_id: OptionType;
  brand_id: BrandListEntity;
  category_id: OptionType;
  sub_category_id: OptionType;
  product_type_id: OptionType;
  gender: OptionType;
  age_constraints?: AgeConstraintsEntity[] | null;
  color_constraints?: ColorConstraintsEntity[] | null;
  attribute: Attribute;
}

interface AgeConstraintsEntity {
  from: number;
  to: number;
}
export interface Attribute {
  key: string;
  name: string;
  type: string;
}

interface ColorConstraintsEntity {
  display: string;
  key: string;
}

export interface IUpdateConstraintType {
  action: string;
  message: string;
  params: string;
  statusCode: number;
  data: IUpdateConstraintResponseDataType;
}
export interface IUpdateConstraintResponseDataType {
  id: number;
  vendor_id: OptionType;
  brand_id: OptionType;
  category_id: OptionType;
  sub_category_id: OptionType;
  product_type_id: OptionType;
  gender: OptionType;
  constraint_key: ConstraintKey;
}

export interface ConstraintKey {
  name: string;
  group_id: number;
  value?: AgeConstraintsEntity[] | ColorConstraintsEntity[] | null;
}

export interface ICreateClusterDropDownProps {
  options?: ReorderFiltersOptions[] | BrandListEntity[] | OptionType[] | null;
  key: string;
  input_type: string;
  apiKey?: string;
  type?: string;
  name?: string;
  label?: string;
  multi?: boolean;
  disabled?: boolean;
  display: string;
  clearFields?: Array<string>;
  display_position: number;
}

export interface IUrlParamsEntity {
  id: string;
  group_id: string;
}

export interface ICreateClusterProps {
  header: string;
}
