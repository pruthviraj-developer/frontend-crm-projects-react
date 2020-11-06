export interface merchandisersDropDownObject {
  key: number;
  value: string;
  second: string;
  first: number;
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
  sourcing_stage?: merchandisersDropDownObject[];
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
  country: string | null;
  category_id: string | null;
  sub_category_ids: Array<merchandisersDropDownObject>;
  product_class_ids: Array<merchandisersDropDownObject>;
  vendor_id: merchandisersDropDownObject | null;
  brand_id: merchandisersDropDownObject | null;
  gender: string | null;
  status: string | null;
  sourcing_stage: string | null;
  start_date: Date | null;
  end_date: Date | null;
}

export interface merchandisersExcelForm {
  age?: string;
  country?: string;
  sourcing_stage?: string;
  category_id?: number;
  vendor_id?: number;
  brand_id?: number;
  gender?: string;
  sub_category_ids?: number[] | null;
  product_class_ids?: number[] | null;
  start_date?: string;
  end_date?: string;
  status_type?: string;
}
