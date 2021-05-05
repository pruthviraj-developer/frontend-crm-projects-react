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
  vendor_id: VendorId;
  brand_id: BrandId;
  category_id: CategoryIdOrSubCategoryIdOrProductTypeId;
  sub_category_id: CategoryIdOrSubCategoryIdOrProductTypeId;
  product_type_id: CategoryIdOrSubCategoryIdOrProductTypeId;
  gender: Gender;
  age_constraints?: AgeConstraintsEntity[] | null;
  color_constraints?: ColorConstraintsEntity[] | null;
  attribute: Attribute;
}

export interface VendorId {
  key: number;
  value: string;
  second: number;
  first: number;
}
export interface BrandId {
  id: number;
  display: string;
}
export interface CategoryIdOrSubCategoryIdOrProductTypeId {
  key: number;
  value: string;
  second: string;
  first: number;
}
export interface Gender {
  key: string;
  value: string;
  second: string;
  first: string;
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
