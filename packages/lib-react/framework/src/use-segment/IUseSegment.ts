export interface IUseSegmentProps {
  traits?: ISegmentTraits;
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
  experiments?: string[];
  in_app_browser?: string;
  user_agent?: string;
  hs_referrer?: string;
  hs_framework?: string;
}
export interface Page {
  path: string;
  referrer: string;
  search: string;
  title: string;
  url: string;
}
