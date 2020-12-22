export interface merchandisersDropDownObject {
  key: number | string | undefined;
  value: number | string | undefined;
  second: string;
  first: number | string;
}

export interface merchandisersFiltersObject {
  bucket?: merchandisersDropDownObject[];
  category_id?: merchandisersDropDownObject[];
  gender?: merchandisersDropDownObject[];
  plc?: merchandisersDropDownObject[];
  age?: merchandisersDropDownObject[];
  status?: merchandisersDropDownObject[];
  brand_id?: merchandisersDropDownObject[];
  bdm?: merchandisersDropDownObject[];
  country?: merchandisersDropDownObject[];
  genders?: merchandisersDropDownObject[];
  vendor_id?: merchandisersDropDownObject[];
  sub_category_ids?: merchandisersDropDownObject[];
  product_class_ids?: merchandisersDropDownObject[];
}

interface merchandisersRowObject {
  pid_count: number;
  status: string;
  priority: string;
  rowSpan?: number;
}

interface merchandisersArrayObject {
  product_detail: merchandisersRowObject[];
}

export interface merchandisersDataObject {
  data: merchandisersArrayObject;
}

export interface merchandisersFormFilters {
  age: string | null;
  category_id: string | null;
  sub_category_ids: Array<merchandisersDropDownObject>;
  product_class_ids: Array<merchandisersDropDownObject>;
  bdm_id: merchandisersDropDownObject | null;
  country: merchandisersDropDownObject | null;
  vendor_id: merchandisersDropDownObject | null;
  brand_id: merchandisersDropDownObject | null;
  gender: string | null;
  status: string | null;
  start_date: Date | null;
  end_date: Date | null;
}

export interface merchandisersOptionalFormFilters {
  age?: string;
  country?: string;
  category_id?: number;
  vendor_id?: number;
  brand_id?: number;
  gender?: string;
  sub_category_ids?: number[] | null;
  product_class_ids?: number[] | null;
  start_date?: string;
  end_date?: string;
  status_type?: string;
  export_type?: string;
}

export interface downloadTemplateUrlObjectKey {
  sheetKey: string;
}

export interface downloadTemplateObject {
  data: downloadTemplateUrlObjectKey;
}

export interface brandIdparams {
  vendorId?: string | number;
}

export interface downloadTemplateUrlObject {
  isAvailable: boolean;
  url: string;
}
