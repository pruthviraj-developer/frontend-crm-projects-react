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
