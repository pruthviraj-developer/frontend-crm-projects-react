interface defaultFilterObject {
  key: number;
  value: string;
  second: string;
  first: number;
}

export interface merchandisersFiltersObject {
  bucket?: defaultFilterObject[];
  category_id?: defaultFilterObject[];
  gender?: defaultFilterObject[];
  plc?: defaultFilterObject[];
  age?: defaultFilterObject[];
  status?: defaultFilterObject[];
  brand_id?: defaultFilterObject[];
  bdm?: defaultFilterObject[];
  country?: defaultFilterObject[];
  genders?: defaultFilterObject[];
  vendor_id?: defaultFilterObject[];
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
