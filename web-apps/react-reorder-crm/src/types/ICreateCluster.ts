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
  second: string;
  first: string | number;
}

export interface SkuAttributeEntity {
  options?: OptionType[] | null;
  key: string;
  input_type: string;
  display: string;
}
