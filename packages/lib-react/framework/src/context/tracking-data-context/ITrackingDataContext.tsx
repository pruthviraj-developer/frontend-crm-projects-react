export interface ITrackingDataProps {
  properties?: ISegmentProperties;
  updateProperties: (data: ISegmentProperties) => void;
}

export interface ISegmentProperties {
  product_id?: number;
  sku?: string | string[];
  name?: string;
  brand?: string;
  price?: number;
  mrp?: number;
  discount_percentage?: number;
  category?: string;
  subcategory?: string;
  product_type?: string;
  subproduct_type?: string;
  preorder?: string | null;
  sale?: string | null;
  gender?: string;
  colour?: string;
  low_inventory?: string | null;
  delivery_days?: number;
  from_age?: number;
  to_age?: number;
  sizes?: number;
  add_from?: string;
  add_from_details?: string;
  addFrom?: string;
  addFromDetails?: string;
  v_country?: string;
  merch_type?: string;
  taste?: string;
  hbt?: string;
  style?: string;
  season?: string;
  pattern?: string;
  character?: string;
  weave?: string;
  universal?: string;
  '[time] hour_of_day'?: number;
  '[time] day_of_week'?: number;
  '[time] day_of_month'?: number;
  '[time] month_of_year'?: number;
  '[time] week_of_year'?: number;
  funnel?: string;
  funnel_tile?: string;
  funnel_section?: string;
  source?: string;
  section?: string | null;
  subsection?: string;
  plp?: string;
  _session_start_time?: string;
  sortbar?: string;
  sortbar_group?: string;
  sort_by?: string;
  track?: string[];
  from_screen?: string;
  from_location?: string;
  reco_type?: string;
  atc_user?: string;
  pincode?: string;
  from_pincode?: string;
  quickshop?: string;
  from_section?: string;
  extraSegdata?:any;
}
