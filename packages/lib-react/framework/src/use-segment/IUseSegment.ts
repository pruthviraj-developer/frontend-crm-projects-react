export interface IUseSegmentProps {
  properties?: ISegmentProperties;
  traits?: ISegmentTraits;
}

export interface ISegmentProperties {
  product_id?: number;
  sku?: string[];
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
  sale?: string;
  gender?: string;
  colour?: string;
  low_inventory?: string;
  delivery_days?: number;
  from_age?: number;
  to_age?: number;
  sizes?: number;
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
}
export interface IContextData {
  device?: Device;
  os?: OsOrLibrary;
  hs_site?: string;
  traits?: ISegmentTraits;
  page?: Page;
  userAgent?: string;
  library?: OsOrLibrary;
}
export interface Device {
  model?: string;
  manufacturer?: string;
  id: string;
}
export interface OsOrLibrary {
  name?: string;
  version?: string;
}
export interface ISegmentTraits {
  user_type?: string;
  hs_device_id?: string;
  hs_site?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  utm_date?: string;
  last_visit_date?: string;
  days_since_last_visit?: string;
  experiments?: string;
  in_app_browser?: string;
  user_agent?: string;
  hs_referrer?: string;
}
export interface Page {
  path: string;
  referrer: string;
  search: string;
  title: string;
  url: string;
}

export interface IUtmParam {
  'utm-source'?: string;
  'utm-medium'?: string;
  'utm-campaign'?: string;
  'utm-term'?: string;
  'utm-content'?: string;
  'utm-date'?: string;
}
