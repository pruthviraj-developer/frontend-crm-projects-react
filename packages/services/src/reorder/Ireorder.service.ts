interface OptionType {
  key: string | number;
  value: string;
  second: string | number;
  first: string | number;
}

interface BrandListEntity {
  id: number;
  display: string;
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

interface ColorConstraintsEntity {
  display: string;
  key: string;
}

interface Attribute {
  key: string;
  name: string;
  type: string;
}

export interface IReorderCreateConstraint {
  action: string;
  message: string;
}

export interface IReorderCreateConstraintParams {
  id: string;
  group_id: string;
}
