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
  countries?: defaultFilterObject[];
  genders?: defaultFilterObject[];
  vendor_id?: defaultFilterObject[];
}
