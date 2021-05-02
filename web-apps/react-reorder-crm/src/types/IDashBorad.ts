export interface Irows {
  pid: string;
  sku: string;
  count: number;
  country: string;
  asv_present: number;
  asv_previous_week: number;
  reason: string;
  age_class: string;
  sub_category: string;
  product_type: string;
  cost_price: number;
  season: string;
  product_sub_type: string;
  quantity: number;
  modified_quantity: number;
}

export interface IDashboardData {
  count: number;
  page_num: number;
  page_size: number;
  total_sku: number;
  total_pid: number;
  total_quantity: number;
  suggested_quantity: number;
  total_asv: number;
  total_amount: number;
  records: Irows[];
}
