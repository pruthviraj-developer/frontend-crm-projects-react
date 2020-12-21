export type sosTableList = {
  id?: number;
  title?: string;
  sorts?: string[];
  startDate?: Date;
  endDate?: Date;
  createdBy?: string;
  createdOn?: Date;
  updatedBy?: string;
  updatedOn?: Date;
  active?: boolean;
};

export type sosTableData = {
  action?: string;
  totalRecords?: number;
  pageSize?: number;
  pageNo?: number;
  records?: sosTableList[];
};

export interface sosErrorMessageDetail {
  code?: string;
  messageType?: string;
  messageUIType: string;
  message: string;
  actionText: string;
  actionLink?: string;
  actionTextRight?: string;
  actionLinkRight?: string;
  title?: string;
  redirectLink?: string;
  value: string;
  backgroundApi?: string;
}

interface errorObject {
  field: string;
  message: string;
}

export interface sosErrorMessage {
  status: string;
  messageDetail: sosErrorMessageDetail;
  errorMessage: string;
  field_errors?: errorObject[];
}

export interface sosFilterParams {
  pageSize: number;
  pageNum: number;
  buyerEmail: null | string;
}

export type updateSosParams = {
  sos_id?: string;
  country?: string;
  status?: string;
  expiry_time?: string;
  action_type?: string;
  action_value?: number;
};

export type sosTableParams = { pageSize: number; pageNum: number };
